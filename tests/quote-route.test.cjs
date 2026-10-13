const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function loadTs(file, context = {}) {
  const module = { exports: {} };
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  vm.runInNewContext(code, { module, exports: module.exports, require, Buffer, URL, AbortSignal, console, ...context });
  return module.exports;
}

const services = loadTs('data/services.ts');
const details = {
  fullName: 'Test customer', phoneNumber: '074 263 7480', emailAddress: '',
  serviceCategory: services.servicesData[0].title, projectDetails: 'Example project',
  website: '', requestId: 'd48aceb8-7487-4dc1-bf30-cbf9543c9f21',
};

function setup(provider = async () => Response.json({ id: 'provider-test-id' }), key = 're_test_only') {
  const calls = [];
  const route = loadTs('app/api/quote/route.ts', {
    require: (name) => name === '@/data/services' ? services : require(name),
    process: { env: { RESEND_API_KEY: key } },
    console: { error() {} },
    fetch: async (...args) => { calls.push(args); return provider(...args); },
  });
  const send = (data = details, origin = 'http://localhost:3001') => route.POST(new Request('http://localhost:3001/api/quote', {
    method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' }, body: JSON.stringify(data),
  }));
  return { calls, send };
}

test('fixed sender and recipient, optional customer email, plain-text details', async () => {
  const { send, calls } = setup();
  assert.equal((await send()).status, 200);
  const payload = JSON.parse(calls[0][1].body);
  assert.deepEqual(payload.to, ['admin@dynamichandyman.co.za']);
  assert.equal(payload.from, 'Dynamic Handyman <admin@dynamichandyman.co.za>');
  assert.equal(payload.reply_to, undefined);
  assert.match(payload.text, /Example project/);
  assert.match(payload.text, /074 263 7480/);
});

test('customer email becomes Reply-To and repeated requests keep the provider idempotency key', async () => {
  const { send, calls } = setup();
  const data = { ...details, emailAddress: 'customer@example.com', to: 'attacker@example.com' };
  await send(data);
  await send(data);
  assert.equal(JSON.parse(calls[0][1].body).reply_to, data.emailAddress);
  assert.deepEqual(JSON.parse(calls[0][1].body).to, ['admin@dynamichandyman.co.za']);
  assert.equal(calls[0][1].headers['Idempotency-Key'], calls[1][1].headers['Idempotency-Key']);
});

test('reject malformed inputs and bot honeypot without sending', async () => {
  const { send, calls } = setup();
  for (const invalid of [
    { ...details, fullName: '' }, { ...details, fullName: 'Injected\nheader' },
    { ...details, emailAddress: 'invalid' }, { ...details, serviceCategory: 'Unknown service' },
    { ...details, projectDetails: 'x'.repeat(5001) }, { ...details, website: 'spam' },
  ]) assert.equal((await send(invalid)).status, 400);
  assert.equal((await send({ ...details, projectDetails: 'x'.repeat(17000) })).status, 413);
  assert.equal((await send(details, 'https://untrusted.example')).status, 403);
  assert.equal(calls.length, 0);
});

test('provider errors, connection failures and missing IDs never report success', async () => {
  for (const provider of [
    async () => Response.json({ error: 'not verified' }, { status: 403 }),
    async () => { throw new Error('offline'); },
    async () => Response.json({}),
  ]) {
    const { send } = setup(provider);
    const response = await send();
    assert.equal(response.status, 502);
    assert.equal((await response.json()).success, undefined);
  }
});

test('unconfigured sending key fails without calling the provider', async () => {
  const { send, calls } = setup(undefined, 'REPLACE_WITH_YOUR_RESEND_API_KEY');
  assert.equal((await send()).status, 503);
  assert.equal(calls.length, 0);
});

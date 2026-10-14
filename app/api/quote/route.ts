import { NextResponse, type NextRequest } from 'next/server';
import { isIP } from 'node:net';
import { z } from 'zod';
import { servicesData } from '@/data/services';

export const runtime = 'nodejs';

const inquirySchema = z.object({
  fullName: z.string().trim().min(1).max(120).regex(/^[^\r\n]+$/),
  phoneNumber: z.string().trim().regex(/^[\d\s+\-()]{7,18}$/),
  emailAddress: z.union([z.literal(''), z.string().trim().email().max(254)]),
  serviceCategory: z.string().refine((value) =>
    value === 'Multiple Combined Trades' || servicesData.some((service) => service.title === value)),
  projectDetails: z.string().trim().max(5000),
  website: z.string().max(200).default(''),
  requestId: z.string().uuid(),
});

const deliveryError = 'Your request could not be sent. Please try again or contact us by phone or WhatsApp.';
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_MAX_CLIENTS = 10_000;
const quoteRateLimits = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: NextRequest) {
  // Vercel overwrites x-forwarded-for with the public client IP to prevent spoofing.
  const forwardedFor = request.headers.get('x-forwarded-for');
  const candidate = forwardedFor?.split(',')[0]?.trim();
  return candidate && isIP(candidate) ? candidate : 'unknown';
}

function consumeQuoteRateLimit(clientIp: string, now = Date.now()) {
  let entry = quoteRateLimits.get(clientIp);

  if (!entry || entry.resetAt <= now) {
    if (quoteRateLimits.size >= RATE_LIMIT_MAX_CLIENTS && !quoteRateLimits.has(clientIp)) {
      for (const [key, value] of quoteRateLimits) {
        if (value.resetAt <= now) quoteRateLimits.delete(key);
      }
      while (quoteRateLimits.size >= RATE_LIMIT_MAX_CLIENTS) {
        const oldestKey = quoteRateLimits.keys().next().value;
        if (oldestKey === undefined) break;
        quoteRateLimits.delete(oldestKey);
      }
    }

    entry = { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };
    quoteRateLimits.set(clientIp, entry);
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, retryAfter: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)) };
  }

  entry.count += 1;
  return { allowed: true, retryAfter: 0 };
}

function formatInquiryReference(requestId: string, now = new Date()) {
  const date = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Africa/Johannesburg',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now).replaceAll('-', '');
  const shortCode = requestId.replaceAll('-', '').slice(0, 6).toUpperCase();
  return `DH-${date}-${shortCode}`;
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (!origin || origin !== new URL(request.url).origin) {
    return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
  }
  if (!request.headers.get('content-type')?.includes('application/json')) {
    return NextResponse.json({ error: 'Invalid request format.' }, { status: 415 });
  }

  let body: unknown;
  try {
    const raw = await request.text();
    if (Buffer.byteLength(raw, 'utf8') > 16000) {
      return NextResponse.json({ error: 'Your request is too long.' }, { status: 413 });
    }
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: 'Invalid request format.' }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success || parsed.data.website) {
    return NextResponse.json({ error: 'Please check your contact details and service selection.' }, { status: 400 });
  }

  const rateLimit = consumeQuoteRateLimit(getClientIp(request));
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: 'Too many quote requests were sent from this connection. Please try again later.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(rateLimit.retryAfter),
          'Cache-Control': 'no-store',
        },
      },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !apiKey.startsWith('re_')) {
    console.error('Quote delivery is not configured: RESEND_API_KEY is missing.');
    return NextResponse.json({ error: deliveryError }, { status: 503 });
  }

  const { fullName, phoneNumber, emailAddress, serviceCategory, projectDetails, requestId } = parsed.data;
  const inquiryReference = formatInquiryReference(requestId);
  const text = [
    'New quote inquiry — Dynamic Handyman',
    '',
    `Name: ${fullName}`,
    `Phone: ${phoneNumber}`,
    `Email: ${emailAddress || 'Not provided — please contact by phone or WhatsApp.'}`,
    `Service: ${serviceCategory}`,
    '',
    'Project details:',
    projectDetails || 'No project details provided.',
    '',
    `Inquiry reference: ${inquiryReference}`,
    emailAddress ? 'Reply to this email to contact the customer.' : 'The customer did not provide an email address.',
  ].join('\n');

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': `quote-${requestId}`,
      },
      body: JSON.stringify({
        from: 'Dynamic Handyman <admin@dynamichandyman.co.za>',
        to: ['admin@dynamichandyman.co.za'],
        subject: `Quote inquiry: ${serviceCategory} — ${fullName}`,
        text,
        ...(emailAddress ? { reply_to: emailAddress } : {}),
      }),
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) {
      console.error('Quote email provider rejected delivery', { status: response.status });
      return NextResponse.json({ error: deliveryError }, { status: 502 });
    }
    const result: unknown = await response.json();
    if (!result || typeof result !== 'object' || !('id' in result) || typeof result.id !== 'string' || !result.id) {
      return NextResponse.json({ error: deliveryError }, { status: 502 });
    }
    return NextResponse.json({ success: true });
  } catch {
    console.error('Quote email provider could not be reached.');
    return NextResponse.json({ error: deliveryError }, { status: 502 });
  }
}

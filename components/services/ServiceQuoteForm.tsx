'use client';

import { useRef, useState, type FormEvent } from 'react';
import { businessConfig } from '@/config/business';

export function ServiceQuoteForm({ serviceId, serviceTitle, quoteLabel }: { serviceId: string; serviceTitle: string; quoteLabel: string }) {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [invalidFields, setInvalidFields] = useState<Record<string, string>>({});
  const messageRef = useRef<HTMLParagraphElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setInvalidFields({});
    const fields = new FormData(form);
    setStatus('sending');
    setMessage('Sending your quote request…');
    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fields.get('fullName'),
          phoneNumber: fields.get('phoneNumber'),
          emailAddress: fields.get('emailAddress') || '',
          serviceCategory: serviceTitle,
          projectDetails: fields.get('projectDetails') || '',
          website: fields.get('website') || '',
          requestId: crypto.randomUUID(),
        }),
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) throw new Error(result.error || 'Your request could not be sent.');
      form.reset();
      setStatus('success');
      setMessage('Your quote request has been received. We usually respond during business hours.');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Your request could not be sent. Please call or WhatsApp us.');
    }
    requestAnimationFrame(() => messageRef.current?.focus());
  }

  return <form action="/api/quote" method="post" className="mt-6 space-y-4" aria-busy={status === 'sending'} onSubmit={handleSubmit} onInvalidCapture={(event) => {
    const field = event.target as HTMLInputElement | HTMLTextAreaElement;
    if (field.name && field.name !== 'website') setInvalidFields((current) => ({ ...current, [field.name]: field.validationMessage }));
  }} onInputCapture={(event) => {
    const field = event.target as HTMLInputElement | HTMLTextAreaElement;
    if (field.name && field.validity.valid) setInvalidFields((current) => {
      if (!current[field.name]) return current;
      const next = { ...current };
      delete next[field.name];
      return next;
    });
  }}>
    <input type="hidden" name="serviceCategory" value={serviceTitle} />
    <input type="hidden" name="returnTo" value={`/services/${serviceId}`} />
    <div className="sr-only" aria-hidden="true"><label htmlFor="service-quote-website">Leave this field empty</label><input id="service-quote-website" name="website" autoComplete="off" tabIndex={-1} /></div>
    <label className="block text-xs font-bold uppercase tracking-wider text-[#123E61]">Full name<input name="fullName" required aria-required="true" aria-invalid={Boolean(invalidFields.fullName)} aria-describedby={invalidFields.fullName ? 'service-quote-name-error' : undefined} autoComplete="name" maxLength={120} className="mt-1.5 w-full border border-[#D9DEE2] bg-white px-3 py-2.5 text-sm" /></label>
    {invalidFields.fullName && <p id="service-quote-name-error" className="text-xs font-semibold text-red-700">{invalidFields.fullName}</p>}
    <label className="block text-xs font-bold uppercase tracking-wider text-[#123E61]">Phone number<input type="tel" name="phoneNumber" required aria-required="true" aria-invalid={Boolean(invalidFields.phoneNumber)} aria-describedby={`service-quote-phone-hint${invalidFields.phoneNumber ? ' service-quote-phone-error' : ''}`} autoComplete="tel" pattern="[0-9+()\- ]{7,18}" className="mt-1.5 w-full border border-[#D9DEE2] bg-white px-3 py-2.5 text-sm" /></label>
    <p id="service-quote-phone-hint" className="text-xs text-slate-600">Include your area code. Numbers, spaces, +, brackets and hyphens are accepted.</p>
    {invalidFields.phoneNumber && <p id="service-quote-phone-error" className="text-xs font-semibold text-red-700">{invalidFields.phoneNumber}</p>}
    <label className="block text-xs font-bold uppercase tracking-wider text-[#123E61]">Email address <span className="font-normal normal-case tracking-normal text-slate-500">(optional)</span><input type="email" name="emailAddress" aria-invalid={Boolean(invalidFields.emailAddress)} aria-describedby={invalidFields.emailAddress ? 'service-quote-email-error' : undefined} autoComplete="email" className="mt-1.5 w-full border border-[#D9DEE2] bg-white px-3 py-2.5 text-sm" /></label>
    {invalidFields.emailAddress && <p id="service-quote-email-error" className="text-xs font-semibold text-red-700">{invalidFields.emailAddress}</p>}
    <label className="block text-xs font-bold uppercase tracking-wider text-[#123E61]">Project details<textarea name="projectDetails" rows={4} maxLength={5000} className="mt-1.5 w-full resize-y border border-[#D9DEE2] bg-white px-3 py-2.5 text-sm" /></label>
    <p className="text-xs leading-relaxed text-slate-600">We use your contact details only to respond to your quote request and discuss your project.</p>
    <button type="submit" disabled={status === 'sending'} className="inline-flex w-full items-center justify-center bg-[#123E61] px-5 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-[#0C2B44] disabled:opacity-60">{status === 'sending' ? 'Sending…' : `${quoteLabel} →`}</button>
    {message && <p ref={messageRef} tabIndex={-1} role={status === 'error' ? 'alert' : 'status'} aria-live={status === 'error' ? 'assertive' : 'polite'} className={`text-sm font-medium ${status === 'error' ? 'text-red-700' : 'text-[#123E61]'}`}>{message}</p>}
    <p className="text-center text-xs text-slate-500">Or <a href={businessConfig.phone.telHref} className="underline">call {businessConfig.phone.display}</a> or <a href={businessConfig.phone.whatsappUrl} className="underline">WhatsApp us</a>.</p>
  </form>;
}

'use client';

import { useRef, useState, type FormEvent } from 'react';
import { servicesData } from '@/data/services';

const fieldClass = 'mt-2 block w-full border border-[#D9DEE2] bg-white px-3 py-2.5 text-sm text-slate-900';
const primaryButton = 'bg-[#123E61] px-5 py-3 text-sm font-bold text-white hover:bg-[#082F51] disabled:opacity-60';

export function AreaQuoteForm({ city }: { city: string }) {
  const [step, setStep] = useState(1);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const requestId = useRef<string | null>(null);
  const stepLabel = useRef<HTMLParagraphElement>(null);

  function goToStep(next: number) {
    setError('');
    setStep(next);
    requestAnimationFrame(() => stepLabel.current?.focus());
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending || sent) return;
    if (step < 3) {
      goToStep(step + 1);
      return;
    }

    const fields = new FormData(event.currentTarget);
    setSending(true);
    setError('');
    try {
      requestId.current ??= crypto.randomUUID();
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fields.get('fullName'),
          phoneNumber: fields.get('phoneNumber'),
          emailAddress: fields.get('emailAddress') || '',
          serviceCategory: fields.get('serviceCategory'),
          projectDetails: `Property location: ${city}`,
          website: fields.get('website') || '',
          requestId: requestId.current,
        }),
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) {
        setError(result.error || 'Your quote request could not be sent. Please try again.');
        return;
      }
      setSent(true);
    } catch {
      setError('Your quote request could not be sent. Please try again or call us.');
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="rounded-md bg-white p-5 text-[#123E61] sm:p-7">
      {sent ? <p role="status" className="font-bold">Your quote request has been received. We usually respond during business hours.</p> : (
        <form onSubmit={submit} aria-busy={sending} className="space-y-5">
          <p ref={stepLabel} tabIndex={-1} className="text-xs font-bold uppercase tracking-widest">Step {step} of 3</p>
          <div className="hidden" aria-hidden="true">
            <label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
          </div>
          <fieldset hidden={step !== 1} className="space-y-4">
            <label className="block text-sm font-bold">Service
              <select name="serviceCategory" required={step === 1} defaultValue="" className={fieldClass}>
                <option value="" disabled>Select a service</option>
                {servicesData.map(service => <option key={service.id} value={service.title}>{service.title}</option>)}
                <option>Multiple Combined Trades</option>
              </select>
            </label>
            <label className="block text-sm font-bold">City / suburb
              <input name="city" value={city} readOnly className={fieldClass} />
            </label>
          </fieldset>
          <fieldset hidden={step !== 2} className="space-y-4">
            <label className="block text-sm font-bold">Name
              <input name="fullName" autoComplete="name" required={step === 2} pattern=".*[^ ].*" maxLength={120} className={fieldClass} />
            </label>
            <label className="block text-sm font-bold">Phone number
              <input name="phoneNumber" type="tel" autoComplete="tel" required={step === 2} pattern={step === 2 ? String.raw`[0-9+\(\)\- ]{7,18}` : undefined} className={fieldClass} />
            </label>
          </fieldset>
          <fieldset hidden={step !== 3} disabled={sending} className="space-y-3">
            <label className="block text-sm font-bold">Email address <span className="font-normal">(optional)</span>
              <input name="emailAddress" type={step === 3 ? 'email' : 'text'} autoComplete="email" maxLength={254} className={fieldClass} />
            </label>
            <p className="text-xs leading-relaxed text-slate-600">We use your contact details to respond to your quote request.</p>
          </fieldset>
          {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
          <div className="flex flex-wrap gap-3">
            {step > 1 && <button type="button" disabled={sending} onClick={() => goToStep(step - 1)} className="border border-[#D9DEE2] px-5 py-3 text-sm font-bold">Back</button>}
            <button type="submit" disabled={sending} className={primaryButton}>
              {sending ? 'Sending…' : step === 3 ? 'Get My Free Quote' : 'Next'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

import { NextResponse, type NextRequest } from 'next/server';
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

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !apiKey.startsWith('re_')) {
    console.error('Quote delivery is not configured: RESEND_API_KEY is missing.');
    return NextResponse.json({ error: deliveryError }, { status: 503 });
  }

  const { fullName, phoneNumber, emailAddress, serviceCategory, projectDetails, requestId } = parsed.data;
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
    `Inquiry reference: ${requestId}`,
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

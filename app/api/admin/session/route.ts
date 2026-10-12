import { NextResponse } from 'next/server';
import { getAdmin } from '@/lib/gallery/auth';

export async function GET() {
  try {
    const admin = await getAdmin();
    return NextResponse.json({ authorised: !!admin }, { status: admin ? 200 : 403 });
  } catch {
    return NextResponse.json({ error: 'Admin service is not configured.' }, { status: 503 });
  }
}

import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  if (!code) return NextResponse.redirect(new URL('/admin/login?error=invalid-link', request.url));

  try {
    const supabase = await createClient();
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
    if (exchangeError) throw exchangeError;

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    const userId = user?.id;
    if (userError || !userId) throw new Error('No authenticated user');
    const { data: admin, error: membershipError } = await supabase
      .from('admin_users')
      .select('user_id')
      .eq('user_id', userId)
      .maybeSingle();
    if (membershipError || !admin) {
      await supabase.auth.signOut();
      return NextResponse.redirect(new URL('/admin/login?error=not-authorised', request.url));
    }
    const target = request.nextUrl.searchParams.get('mode') === 'recovery' ? '/admin/set-password' : '/admin/gallery';
    return NextResponse.redirect(new URL(target, request.url));
  } catch (error) {
    console.error('Gallery sign-in callback failed', error);
    return NextResponse.redirect(new URL('/admin/login?error=invalid-link', request.url));
  }
}

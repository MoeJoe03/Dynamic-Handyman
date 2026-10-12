import { redirect } from 'next/navigation';
import { getAdmin } from '@/lib/gallery/auth';
import { AdminLogin } from '@/components/admin/AdminLogin';

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string; password?: string }> }) {
  let admin = null;
  try {
    admin = await getAdmin();
  } catch {
    // The login form shows a configuration error when credentials are absent.
  }
  if (admin) redirect('/admin/gallery');
  const params = await searchParams;
  const reason = params.error;
  const initialError = reason === 'not-authorised'
    ? 'This account is not authorised to manage the gallery.'
    : reason === 'invalid-link'
      ? 'The sign-in link is invalid or expired. Request a new one.'
      : '';
  return <AdminLogin initialError={initialError} passwordReady={params.password === 'ready'} />;
}

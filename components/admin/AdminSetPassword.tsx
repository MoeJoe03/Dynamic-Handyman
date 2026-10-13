'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export function AdminSetPassword({ hasAdminSession }: { hasAdminSession: boolean }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const canSetPassword = hasAdminSession;
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function sendReset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setBusy(true);
    try {
      const { error: authError } = await createClient().auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/auth/callback?mode=recovery`,
      });
      if (authError?.status === 429) {
        throw new Error('Supabase has temporarily paused reset emails. Please wait before requesting another link. If you have already chosen a password, you can sign in with it.');
      }
      if (authError) throw authError;
      setSent(true);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not send a reset link.');
    } finally {
      setBusy(false);
    }
  }

  async function savePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    if (password.length < 12) return setError('Use at least 12 characters.');
    if (password !== confirmation) return setError('The passwords do not match.');
    setBusy(true);
    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.updateUser({ password });
      if (authError) throw authError;
      await supabase.auth.signOut();
      setPassword('');
      setConfirmation('');
      router.replace('/admin/login?password=ready');
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not save your password.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-5 py-12">
      <div className="w-full max-w-md border border-[#D9DEE2] bg-white p-7 shadow-sm sm:p-10">
        <p className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[.2em] text-[#19547E]">GALLERY MANAGER</p>
        <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-[#123E61]">SET YOUR PASSWORD</h1>
        {canSetPassword ? (
          <form onSubmit={savePassword} className="space-y-5">
            <p className="text-sm text-slate-600">Choose a password with at least 12 characters.</p>
            <label className="block text-sm font-semibold">New password
              <input type="password" autoComplete="new-password" minLength={12} required value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full border border-[#C9D2D9] px-3 py-3 outline-none focus:border-[#123E61]" />
            </label>
            <label className="block text-sm font-semibold">Confirm password
              <input type="password" autoComplete="new-password" minLength={12} required value={confirmation} onChange={(event) => setConfirmation(event.target.value)} className="mt-2 w-full border border-[#C9D2D9] px-3 py-3 outline-none focus:border-[#123E61]" />
            </label>
            <button disabled={busy} className="w-full bg-[#123E61] px-5 py-3.5 text-sm font-bold uppercase tracking-wider text-white hover:bg-[#0C2B44] disabled:opacity-60">{busy ? 'Saving…' : 'Save Password'}</button>
          </form>
        ) : (
          <>
            <p className="mb-6 text-sm text-slate-600">Enter your admin email to receive a password reset link.</p>
            <form onSubmit={sendReset} className="space-y-4">
              <label className="block text-sm font-semibold">Email
                <input type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full border border-[#C9D2D9] px-3 py-3 outline-none focus:border-[#123E61]" />
              </label>
              <button disabled={busy} className="w-full bg-[#123E61] px-5 py-3.5 text-sm font-bold uppercase tracking-wider text-white hover:bg-[#0C2B44] disabled:opacity-60">{busy ? 'Please Wait…' : 'Email Reset Link'}</button>
            </form>
            {sent && <p role="status" className="mt-5 text-sm text-[#123E61]">If this account exists, check its inbox for the reset link.</p>}
          </>
        )}
        {error && <p role="alert" className="mt-5 text-sm text-red-700">{error}</p>}
        <Link href="/admin/login" className="mt-7 block text-center text-sm font-semibold text-[#123E61] underline underline-offset-4">Back to sign in</Link>
      </div>
    </div>
  );
}

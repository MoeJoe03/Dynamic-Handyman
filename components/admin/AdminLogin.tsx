'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { galleryConfig } from '@/config/gallery.config';
import { createClient } from '@/lib/supabase/client';

export function AdminLogin({ initialError = '', passwordReady = false }: { initialError?: string; passwordReady?: boolean }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(initialError);
  const [busy, setBusy] = useState(false);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setBusy(true);
    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (authError) throw new Error('Incorrect email or password.');
      const permission = await fetch('/api/admin/session', { cache: 'no-store' });
      if (!permission.ok) {
        await supabase.auth.signOut();
        throw new Error('This account is not authorised to manage the gallery.');
      }
      router.replace('/admin/gallery');
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Sign in failed. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-5 py-12">
      <div className="w-full max-w-md border border-[#D9DEE2] bg-white p-7 shadow-sm sm:p-10">
        <Image src={galleryConfig.logoUrl} alt={`${galleryConfig.businessName} logo`} width={220} height={65} priority className="mb-8 h-14 w-auto object-contain" />
        <p className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[.2em] text-[#19547E]">{galleryConfig.businessName}</p>
        <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-[#123E61]">GALLERY MANAGER</h1>
        <p className="mb-8 text-sm text-slate-600">Sign in to manage your website photographs.</p>
        {passwordReady && <p role="status" className="mb-5 text-sm text-[#123E61]">Your password is ready. Sign in below.</p>}
        <form onSubmit={signIn} className="space-y-5">
          <label className="block text-sm font-semibold">Email
            <input type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full border border-[#C9D2D9] px-3 py-3 outline-none focus:border-[#123E61]" />
          </label>
          <label className="block text-sm font-semibold">Password
            <input type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full border border-[#C9D2D9] px-3 py-3 outline-none focus:border-[#123E61]" />
          </label>
          <button disabled={busy} className="w-full bg-[#123E61] px-5 py-3.5 text-sm font-bold uppercase tracking-wider text-white hover:bg-[#0C2B44] disabled:opacity-60">
            {busy ? 'Signing In…' : 'Sign In'}
          </button>
        </form>
        <Link href="/admin/set-password" className="mt-6 block text-center text-sm font-semibold text-[#123E61] underline underline-offset-4">Set or reset your password</Link>
        {error && <p role="alert" className="mt-5 text-sm text-red-700">{error}</p>}
      </div>
    </div>
  );
}

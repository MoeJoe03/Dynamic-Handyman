import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function ServiceNotFound() {
  return <div className="flex min-h-screen flex-col bg-white">
    <Header />
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
      <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#19547E]">Service unavailable · 404</p>
      <h1 className="mt-4 text-3xl font-extrabold uppercase text-[#123E61] sm:text-5xl">We could not find that service</h1>
      <p className="mt-5 max-w-xl text-slate-600">Browse our current services or contact Dynamic Handyman to discuss the work you need in Alberton and surrounding areas.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/services" className="bg-[#123E61] px-6 py-3 text-xs font-bold uppercase tracking-widest text-white">View services</Link>
        <Link href="/contact" className="border border-[#123E61] px-6 py-3 text-xs font-bold uppercase tracking-widest text-[#123E61]">Contact us</Link>
      </div>
    </main>
    <Footer />
  </div>;
}

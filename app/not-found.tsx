import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="mx-auto flex w-full max-w-7xl flex-grow items-center px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
        <section aria-labelledby="not-found-heading" className="relative w-full overflow-hidden bg-[#082F51] p-7 text-white shadow-xl sm:p-12 lg:p-16">
          <span aria-hidden="true" className="pointer-events-none absolute right-4 top-0 select-none text-[140px] font-extrabold leading-none text-white/5 sm:right-10 sm:text-[240px]">404</span>
          <div className="relative max-w-2xl">
            <p className="mb-5 flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-widest text-sky-200">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#00B8E8]" />
              Dynamic Handyman · Page not found
            </p>
            <h1 id="not-found-heading" className="text-4xl font-extrabold tracking-tight sm:text-5xl">Let’s get you back on track.</h1>
            <p className="mt-5 max-w-lg leading-relaxed text-slate-200">The page you’re looking for may have moved or the link may be incorrect. Explore our services or contact us about your project.</p>
            <nav aria-label="Page not found navigation" className="mt-8 flex flex-wrap gap-3">
              <Link href="/" className="bg-white px-6 py-3 text-sm font-bold text-[#123E61] transition-colors hover:bg-sky-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300">Back to Home</Link>
              <Link href="/services" className="border border-white/40 px-6 py-3 text-sm font-bold transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300">Explore Services</Link>
              <Link href="/contact" className="border border-white/40 px-6 py-3 text-sm font-bold transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300">Contact Us</Link>
            </nav>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

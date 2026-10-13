import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { contactPhone } from '@/config/contact';
import { aggregateReviewSummary } from '@/data/reviews';
import { AnimatedFooterArtwork } from '@/components/layout/AnimatedFooterArtwork';

function FooterContent({ currentYear }: { currentYear: number }) {
  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          {/* Brand Summary */}
          <div className="lg:col-span-4 space-y-4">
            <Logo variant="footer" />

            <p className="text-slate-300 text-xs uppercase tracking-widest font-semibold pt-1">
              Domestic &amp; Corporate Maintenance, Repairs &amp; Renovations
            </p>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Dynamic Handyman (PTY) LTD provides turnkey property solutions with multi-trade specialists. High standards, transparent scoping and careful workmanship across Gauteng.
            </p>

            <p className="text-xs font-bold tracking-wider text-white pt-1">
              RELY ON OUR ABILITY!
            </p>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2">
            <h5 className="text-xs font-bold tracking-widest uppercase text-white mb-4">
              Navigation
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  All Trades
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">
                  Project Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Company
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Get a Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Core Trades List */}
          <div className="lg:col-span-3">
            <h5 className="text-xs font-bold tracking-widest uppercase text-white mb-4">
              Core Trades
            </h5>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>Electrical &amp; COC Inspections</li>
              <li>Painting (Interior, Exterior, Roofs)</li>
              <li>Carpentry &amp; Built-In Cupboards</li>
              <li>Plumbing &amp; Sanitaryware Installations</li>
              <li>Palisades &amp; Custom Steel Carports</li>
              <li>Property Alterations &amp; Office Snags</li>
            </ul>
          </div>

          {/* Direct Contact Summary */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="text-xs font-bold tracking-widest uppercase text-white mb-4">
              Contact Direct
            </h5>
            <p className="text-xs text-slate-300">
              <span className="block text-slate-400 text-[10px] uppercase font-bold">Tel:</span>
              <a href={contactPhone.telHref} className="hover:text-white transition-colors">
                {contactPhone.display}
              </a>
            </p>
            <p className="text-xs text-slate-300">
              <span className="block text-slate-400 text-[10px] uppercase font-bold">Email:</span>
              info@dynamichandyman.co.za
            </p>
            <p className="text-xs text-slate-300">
              <span className="block text-slate-400 text-[10px] uppercase font-bold">Operating Scope:</span>
              Gauteng &amp; Surrounding Areas
            </p>
            <div className="pt-2">
              <a
                href="https://www.facebook.com/dynamichandyman/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-xs text-slate-300 hover:text-white transition-colors"
                aria-label="Official Facebook Page"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
                <span>Facebook Official</span>
              </a>
            </div>
            <a
              href={aggregateReviewSummary.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs text-slate-300 underline underline-offset-4 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Read our Google reviews
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 font-mono">
          <div>
            © {currentYear} Dynamic Handyman (PTY) LTD. All rights reserved.
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-6">
            <span>Maintenance • Repairs • Renovations</span>
            <span>Alberton and surrounding Gauteng areas</span>
          </div>
        </div>
      </div>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="bg-[#123E61] text-white border-t border-[#0C2B44] pt-16 pb-12">
        <FooterContent currentYear={currentYear} />
      </footer>
      <AnimatedFooterArtwork />
    </>
  );
}

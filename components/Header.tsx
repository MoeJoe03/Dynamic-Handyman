'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { PublicMotion } from './PublicMotion';
import { businessConfig } from '@/config/business';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/services', label: 'SERVICES' },
    { href: '/gallery', label: 'OUR WORK' },
    { href: '/about', label: 'ABOUT' },
    { href: '/contact', label: 'CONTACT' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 border-b ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-[#D9DEE2]'
          : 'bg-white border-[#D9DEE2]'
      }`}
    >
      <PublicMotion />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 min-h-[4.75rem] sm:min-h-[5.25rem]">
          {/* Logo Left */}
          <Link
            href="/"
            className="flex items-center group py-1 focus:outline-none focus:ring-2 focus:ring-[#123E61] focus:ring-offset-2 rounded"
            aria-label={`${businessConfig.legalName} Homepage`}
          >
            <Logo />
          </Link>

          {/* Desktop Navigation Center */}
          <nav
            className="hidden md:flex items-center space-x-7 lg:space-x-9"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-[11px] lg:text-xs font-bold uppercase tracking-[0.18em] transition-colors py-2 relative ${
                    isActive
                      ? 'text-[#123E61] font-extrabold'
                      : 'text-[#30323A] hover:text-[#123E61]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#123E61]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA & Mobile Toggle */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center justify-center px-5 lg:px-6 py-3 bg-[#123E61] hover:bg-[#0C2B44] text-white text-xs font-bold tracking-[0.16em] uppercase transition-all duration-200 shadow-sm border border-transparent hover:border-[#123E61] active:translate-y-px"
            >
              Get a Quote
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 text-[#123E61] hover:bg-neutral-100 rounded focus:outline-none focus:ring-2 focus:ring-[#123E61]"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="square" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="square" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          className="md:hidden border-t border-[#D9DEE2] bg-white px-6 py-6 space-y-4 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200"
          id="mobileNavMenu"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-bold uppercase tracking-[0.18em] text-[#30323A] hover:text-[#123E61] py-2 border-b border-neutral-100 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center py-3.5 bg-[#123E61] text-white text-xs font-bold tracking-[0.16em] uppercase transition-colors shadow-sm mt-3"
          >
            Get a Quote
          </Link>
        </div>
      )}
    </header>
  );
}

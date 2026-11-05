'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { PublicMotion } from './PublicMotion';
import { businessConfig } from '@/config/business';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [areasMenuOpen, setAreasMenuOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let previousY = Math.max(0, window.scrollY);
    const handleScroll = () => {
      const currentY = Math.max(0, window.scrollY);
      setIsScrolled(currentY > 20);
      if (currentY <= 20 || currentY < previousY) setNavHidden(false);
      else if (currentY > 90 && currentY > previousY) setNavHidden(true);
      previousY = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/services', label: 'SERVICES' },
    { href: '/gallery', label: 'OUR WORK' },
    { href: '/areas-we-serve', label: 'AREAS WE SERVE' },
    { href: '/about', label: 'ABOUT' },
    { href: '/contact', label: 'CONTACT' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 border-b focus-within:translate-y-0 motion-reduce:transition-none ${navHidden && !mobileMenuOpen && !servicesMenuOpen && !areasMenuOpen ? '-translate-y-full' : 'translate-y-0'} ${
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
              if (link.label === 'AREAS WE SERVE') {
                return (
                  <div key={link.label} className="relative" onMouseLeave={() => setAreasMenuOpen(false)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setAreasMenuOpen(false); }} onKeyDown={event => { if (event.key === 'Escape') setAreasMenuOpen(false); }}>
                    <button type="button" onClick={() => setAreasMenuOpen(open => !open)} onMouseEnter={() => { setAreasMenuOpen(true); setServicesMenuOpen(false); }} aria-expanded={areasMenuOpen} aria-controls="desktop-areas-menu" className={`flex items-center gap-1 py-2 text-[11px] font-bold uppercase tracking-[0.18em] lg:text-xs ${pathname.startsWith('/areas-we-serve') ? 'text-[#123E61] underline underline-offset-8' : 'text-[#30323A] hover:text-[#123E61]'}`}>
                      AREAS WE SERVE <span aria-hidden="true">⌄</span>
                    </button>
                    {areasMenuOpen && <div id="desktop-areas-menu" className="absolute left-0 top-full z-50 min-w-56 border border-[#D9DEE2] bg-white p-2 shadow-lg">
                      <Link href="/areas-we-serve" onClick={() => setAreasMenuOpen(false)} className="block px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#123E61] hover:bg-[#F4F7F9]">View All Service Areas</Link>
                      <Link href="/areas-we-serve/alberton" onClick={() => setAreasMenuOpen(false)} className="block px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#123E61] hover:bg-[#F4F7F9]">Alberton</Link>
                      <Link href="/areas-we-serve/albertsdal" onClick={() => setAreasMenuOpen(false)} className="block px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#123E61] hover:bg-[#F4F7F9]">Albertsdal</Link>
                    </div>}
                  </div>
                );
              }
              if (link.label === 'SERVICES') {
                return (
                  <div key={link.label} className="relative" onMouseLeave={() => setServicesMenuOpen(false)}>
                    <button
                      type="button"
                      onClick={() => setServicesMenuOpen((open) => !open)}
                      onMouseEnter={() => setServicesMenuOpen(true)}
                      aria-expanded={servicesMenuOpen}
                      aria-haspopup="true"
                      className={`flex items-center gap-1 text-[11px] lg:text-xs font-bold uppercase tracking-[0.18em] transition-colors py-2 relative ${pathname.startsWith('/services') ? 'text-[#123E61] font-extrabold' : 'text-[#30323A] hover:text-[#123E61]'}`}
                    >
                      SERVICES <span aria-hidden="true" className="text-[10px]">⌄</span>
                      {pathname.startsWith('/services') && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#123E61]" />}
                    </button>
                    {servicesMenuOpen && (
                      <div className="absolute left-0 top-full z-50 max-h-[calc(100vh-6rem)] min-w-72 overflow-y-auto border border-[#D9DEE2] bg-white p-2 shadow-lg" role="menu">
                        <Link href="/services" onClick={() => setServicesMenuOpen(false)} className="block px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#123E61] hover:bg-[#F4F7F9]" role="menuitem">View All Services</Link>
                        <Link href="/services/electrical" onClick={() => setServicesMenuOpen(false)} className="block px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#123E61] hover:bg-[#F4F7F9]" role="menuitem">Electrical Installations &amp; COC</Link>
                        <Link href="/services/painting" onClick={() => setServicesMenuOpen(false)} className="block px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#123E61] hover:bg-[#F4F7F9]" role="menuitem">Painting &amp; Roof Coatings</Link>
                        <Link href="/services/carpentry" onClick={() => setServicesMenuOpen(false)} className="block px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#123E61] hover:bg-[#F4F7F9]" role="menuitem">Carpentry &amp; Cupboards</Link>
                        <Link href="/services/plumbing" onClick={() => setServicesMenuOpen(false)} className="block px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#123E61] hover:bg-[#F4F7F9]" role="menuitem">Plumbing &amp; Geysers</Link>
                        {Object.entries({ palisades: 'Palisades & Carports', paving: 'Paving', maintenance: 'Property Maintenance', 'glass-works': 'Glass & Glazing', flooring: 'Flooring', 'gutters-fascia': 'Gutters & Fascias', 'aluminium-windows-doors': 'Aluminium Windows & Doors' }).map(([slug, label]) => <Link key={slug} href={`/services/${slug}`} onClick={() => setServicesMenuOpen(false)} className="block px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#123E61] hover:bg-[#F4F7F9]" role="menuitem">{label}</Link>)}
                      </div>
                    )}
                  </div>
                );
              }
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
          {navLinks.map((link) => link.label === 'SERVICES' ? (
            <div key={link.label} className="border-b border-neutral-100 pb-2">
              <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#30323A] hover:text-[#123E61]">View All Services</Link>
              <Link href="/services/electrical" onClick={() => setMobileMenuOpen(false)} className="block py-2 pl-4 text-[11px] font-bold uppercase tracking-wider text-[#19547E] hover:text-[#123E61]">Electrical Installations &amp; COC</Link>
              <Link href="/services/painting" onClick={() => setMobileMenuOpen(false)} className="block py-2 pl-4 text-[11px] font-bold uppercase tracking-wider text-[#19547E] hover:text-[#123E61]">Painting &amp; Roof Coatings</Link>
              <Link href="/services/carpentry" onClick={() => setMobileMenuOpen(false)} className="block py-2 pl-4 text-[11px] font-bold uppercase tracking-wider text-[#19547E] hover:text-[#123E61]">Carpentry &amp; Cupboards</Link>
              <Link href="/services/plumbing" onClick={() => setMobileMenuOpen(false)} className="block py-2 pl-4 text-[11px] font-bold uppercase tracking-wider text-[#19547E] hover:text-[#123E61]">Plumbing &amp; Geysers</Link>
              {Object.entries({ palisades: 'Palisades & Carports', paving: 'Paving', maintenance: 'Property Maintenance', 'glass-works': 'Glass & Glazing', flooring: 'Flooring', 'gutters-fascia': 'Gutters & Fascias', 'aluminium-windows-doors': 'Aluminium Windows & Doors' }).map(([slug, label]) => <Link key={slug} href={`/services/${slug}`} onClick={() => setMobileMenuOpen(false)} className="block py-2 pl-4 text-[11px] font-bold uppercase tracking-wider text-[#19547E] hover:text-[#123E61]">{label}</Link>)}
            </div>
          ) : link.label === 'AREAS WE SERVE' ? (
            <div key={link.label} className="border-b border-neutral-100 pb-2">
              <button type="button" onClick={() => setAreasMenuOpen(open => !open)} aria-expanded={areasMenuOpen} aria-controls="mobile-areas-menu" className="flex w-full items-center justify-between py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#123E61]">Areas We Serve <span aria-hidden="true">⌄</span></button>
              {areasMenuOpen && <div id="mobile-areas-menu">
                <Link href="/areas-we-serve" onClick={() => setMobileMenuOpen(false)} className="block py-2 pl-4 text-[11px] font-bold uppercase tracking-wider text-[#19547E]">View All Service Areas</Link>
                <Link href="/areas-we-serve/alberton" onClick={() => setMobileMenuOpen(false)} className="block py-2 pl-4 text-[11px] font-bold uppercase tracking-wider text-[#19547E]">Alberton</Link>
                <Link href="/areas-we-serve/albertsdal" onClick={() => setMobileMenuOpen(false)} className="block py-2 pl-4 text-[11px] font-bold uppercase tracking-wider text-[#19547E]">Albertsdal</Link>
              </div>}
            </div>
          ) : (
            <Link key={link.label} href={link.href} onClick={() => setMobileMenuOpen(false)} className="block text-xs font-bold uppercase tracking-[0.18em] text-[#30323A] hover:text-[#123E61] py-2 border-b border-neutral-100 transition-colors">{link.label}</Link>
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

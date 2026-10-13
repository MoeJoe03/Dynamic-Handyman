import React from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { LiveWorkShowcase } from '@/components/LiveWorkShowcase';
import { Hero } from '@/components/Hero';
import { ServiceAccordion } from '@/components/ServiceAccordion';
import { ProjectGallery } from '@/components/ProjectGallery';
import { AboutSection } from '@/components/AboutSection';
import { ServiceAreaSection } from '@/components/ServiceAreaSection';
import { ReviewsSection } from '@/components/ReviewsSection';
import { QuoteForm } from '@/components/QuoteForm';
import { Footer } from '@/components/Footer';
import { getPublicHomeImages } from '@/lib/home-images/queries';

export const revalidate = 60;

export const metadata: Metadata = {
  description: 'Dynamic Handyman provides reliable handyman services, home repairs and renovations in Alberton and nearby suburbs. Request a quote for electrical, plumbing, painting and more.',
  openGraph: {
    title: 'Handyman Services in Alberton | Dynamic Handyman',
    description: 'Dynamic Handyman provides reliable handyman services, home repairs and renovations in Alberton and nearby suburbs. Request a quote today.',
    type: 'website',
    locale: 'en_ZA',
    url: 'https://dynamichandyman.co.za/',
    siteName: 'Dynamic Handyman (PTY) LTD',
    images: [{ url: '/dynamic-handyman-home-og.png', width: 1730, height: 909, alt: 'Dynamic Handyman handyman services in Alberton with a bathroom project image' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Handyman Services in Alberton | Dynamic Handyman',
    description: 'Dynamic Handyman provides reliable handyman services, home repairs and renovations in Alberton and nearby suburbs. Request a quote today.',
    images: ['/dynamic-handyman-home-og.png'],
  },
  alternates: { canonical: 'https://dynamichandyman.co.za/' },
};

export default async function HomePage() {
  const homeImages = await getPublicHomeImages();
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      {/* 04 — HEADER */}
      <Header />

      <main className="flex-grow">
        {/* 06 & 07 — HERO WITH SERVICE IMAGE CAROUSEL */}
        <section className="relative bg-white pt-5 sm:pt-6 pb-16 lg:pb-24" id="hero">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Visual Editorial Craft Strip */}
            <LiveWorkShowcase homeImages={homeImages} />

            {/* Confident Architectural Statement Panel */}
            <Hero />
          </div>
        </section>

        {/* 09 — SERVICES ACCORDION */}
        <ServiceAccordion homeImages={homeImages} />

        {/* 11 & 12 — PROJECT GALLERY & GALLERY CTA */}
        <ProjectGallery homeImages={homeImages} />

        {/* 13 — ABOUT US */}
        <AboutSection homeImages={homeImages} />

        <ServiceAreaSection />

        {/* 15 — CUSTOMER REVIEWS (PINNED NOTES & POLAROIDS) */}
        <ReviewsSection homeImages={homeImages} />

        {/* 18 — CONTACT ESTIMATE REQUISITION */}
        <section id="contact" className="bg-white border-t border-[#D9DEE2]">
          <QuoteForm serviceArea="Alberton and surrounding areas" />
        </section>
      </main>

      {/* 20 — FOOTER */}
      <Footer serviceArea="Alberton and surrounding areas" />
    </div>
  );
}

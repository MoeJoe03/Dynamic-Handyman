import React from 'react';
import { Header } from '@/components/Header';
import { LiveWorkShowcase } from '@/components/LiveWorkShowcase';
import { Hero } from '@/components/Hero';
import { ServiceAccordion } from '@/components/ServiceAccordion';
import { ProjectGallery } from '@/components/ProjectGallery';
import { AboutSection } from '@/components/AboutSection';
import { ReviewsSection } from '@/components/ReviewsSection';
import { QuoteForm } from '@/components/QuoteForm';
import { Footer } from '@/components/Footer';
import { getPublicHomeImages } from '@/lib/home-images/queries';

export const revalidate = 60;

export default async function HomePage() {
  const homeImages = await getPublicHomeImages();
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      {/* 04 — HEADER */}
      <Header />

      <main className="flex-grow">
        {/* 06 & 07 — HERO WITH LIVE TRADE SHOWCASE */}
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

        {/* 15 — CUSTOMER REVIEWS (PINNED NOTES & POLAROIDS) */}
        <ReviewsSection homeImages={homeImages} />

        {/* 18 — CONTACT ESTIMATE REQUISITION */}
        <section id="contact" className="bg-white border-t border-[#D9DEE2]">
          <QuoteForm />
        </section>
      </main>

      {/* 20 — FOOTER */}
      <Footer />
    </div>
  );
}

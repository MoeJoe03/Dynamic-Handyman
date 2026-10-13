'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { QuoteForm } from '@/components/QuoteForm';
import { galleryConfig, getCategoryLabel } from '@/config/gallery.config';
import type { GalleryImageView } from '@/lib/gallery/types';

const collageAspects = [
  'aspect-[3/4]',      // Portrait distribution board
  'aspect-[4/3]',      // Architectural exterior painting
  'aspect-[9/13]',     // Tall floor-to-ceiling joinery
  'aspect-[1/1]',      // Square luxury bathroom
  'aspect-[16/11]',    // Steel cantilever carport
  'aspect-[3/4]',      // Tall commercial office alterations
  'aspect-[5/4]',      // Paved driveway
  'aspect-[1/1]',      // Deck woodwork
  'aspect-[4/5]',      // DB inverter system
];

export function GalleryContent({ images, error }: { images: GalleryImageView[]; error: string | null }) {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredProjects =
    activeFilter === 'all'
      ? images
      : images.filter((image) => image.category === activeFilter);

  const galleryFilters = [{ key: 'all', label: 'All Projects' }, ...galleryConfig.categories.map((category) => ({ key: category.value, label: category.filterLabel }))];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* HEADER */}
      <Header />

      <main className="flex-grow">
        {/* HERO SECTION FOR GALLERY */}
        <section className="relative bg-white pt-6 pb-8 sm:pb-12 border-b border-[#D9DEE2]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative min-h-[380px] sm:min-h-[440px] lg:min-h-[500px] overflow-hidden border border-[#0C2B44] bg-[#073355] shadow-xl">
              <Image
                src="/dynamic-handyman-our-work-hero.svg"
                alt="Architectural blueprint illustration of completed building and renovation work"
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#062B49]/95 via-[#062B49]/85 to-[#062B49]/15" />
              <div className="relative z-10 flex min-h-[380px] sm:min-h-[440px] lg:min-h-[500px] items-center px-6 py-10 sm:px-10 lg:px-14">
            <div className="max-w-4xl">
              {/* Technical Eyebrow */}
              <div className="inline-flex items-center space-x-2 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-widest text-slate-300 mb-5">
                <span className="w-2 h-2 rounded-full bg-sky-400 shrink-0" />
                <span>(02 — PROJECT PORTFOLIO • ALBERTON &amp; JOHANNESBURG)</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-[1.02] uppercase text-white mb-5">
                Our Work<br />
                <span className="block text-xl sm:text-3xl lg:text-4xl mt-2 text-slate-300">
                  Property Maintenance, Repairs &amp; Renovations in{' '}
                  <span className="text-sky-200">Johannesburg</span>
                </span>
              </h1>

              {/* Sub-heading */}
              <p className="text-slate-200 text-sm sm:text-base lg:text-lg leading-relaxed font-normal max-w-3xl">
                Explore completed projects by Dynamic Handyman, from electrical and plumbing work to painting, carpentry and property renovations in Alberton, Johannesburg, and surrounding areas.
              </p>
            </div>
              </div>
            </div>
          </div>
        </section>

        {/* GALLERY GRID SECTION */}
        <section className="py-10 sm:py-16 bg-[#F8F9F9] border-b border-[#D9DEE2]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filter Pill Row - Sticky on Mobile & Desktop, All Filters Visible */}
            <div className="sticky top-[4.75rem] sm:top-[5.25rem] z-40 bg-[#F8F9F9]/95 backdrop-blur-md py-3 sm:py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 border-b border-[#D9DEE2]/80 mb-8 sm:mb-12 shadow-sm">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:gap-2.5" role="group" aria-label="Filter projects by service">
                {galleryFilters.map((filter) => {
                  const isActive = activeFilter === filter.key;
                  return (
                    <button
                      key={filter.key}
                      type="button"
                      onClick={() => setActiveFilter(filter.key)}
                      aria-pressed={isActive}
                      className={`shrink-0 whitespace-nowrap px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-[#123E61] text-white shadow-sm ring-1 ring-[#123E61]'
                          : 'bg-white hover:bg-slate-200 text-slate-700 font-semibold border border-[#D9DEE2]'
                      }`}
                    >
                      {filter.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {error && (
              <p className="mb-8 border border-[#D9DEE2] bg-white px-6 py-5 text-center text-sm text-slate-600" role="status">
                {error}
              </p>
            )}

            {/* Gallery Collage Flow (4-Column Editorial Masonry / Tighter Fit) */}
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-3.5 sm:gap-4 mb-16 space-y-3.5 sm:space-y-4 [column-fill:_balance]">
              {filteredProjects.map((project, idx) => {
                const aspectClass = collageAspects[idx % collageAspects.length];

                return (
                  <div
                    key={project.id}
                    className="break-inside-avoid group relative rounded-none overflow-hidden bg-neutral-900 shadow-sm border border-[#D9DEE2]/60 transition-all duration-300 hover:shadow-lg"
                  >
                    <div className={`relative w-full rounded-none ${aspectClass}`}>
                      <Image
                        src={project.imageUrl}
                        alt={project.alt_text || `${getCategoryLabel(project.category)} project`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-95 group-hover:opacity-100"
                        referrerPolicy="no-referrer"
                      />

                      {/* Gradient Overlay and Title */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent flex items-end justify-between p-4 sm:p-5">
                        <div>
                          <h3 className="text-white font-extrabold text-sm sm:text-base uppercase tracking-tight leading-snug">
                            {getCategoryLabel(project.category)}
                          </h3>
                          <p className="text-[11px] sm:text-xs text-slate-300 font-medium mt-1 leading-snug line-clamp-2">
                            {project.alt_text || 'Dynamic Handyman project'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {!error && filteredProjects.length === 0 && (
              <p className="mb-16 border border-dashed border-[#D9DEE2] bg-white px-6 py-12 text-center text-sm text-slate-600">
                No gallery projects are listed in this category yet. Check back as new work is added.
              </p>
            )}

            {/* Gallery CTA Banner */}
            <div className="relative rounded-2xl overflow-hidden bg-[#123E61] text-white border border-[#0C2B44] shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                {/* Left Content */}
                <div className="lg:col-span-8 p-7 sm:p-10 lg:p-14 z-10">
                  <div className="flex items-center space-x-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-slate-300 mb-3">
                    <span>HAVE A SIMILAR PROJECT IN MIND?</span>
                    <span className="w-8 h-[1px] bg-slate-300" />
                  </div>

                  <h3 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight uppercase leading-tight mb-4">
                    Let&apos;s bring <span className="text-sky-300">your vision to life</span>
                  </h3>

                  <p className="text-slate-200 text-xs sm:text-sm max-w-2xl font-normal leading-relaxed mb-6">
                    Whether you need certified compliance, interior carpentry cupboards, protective roof coatings, or bespoke carports, we deliver turnarounds on time with zero subcontractor friction.
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      href="/contact"
                      className="inline-flex items-center space-x-3 px-7 sm:px-8 py-3.5 sm:py-4 bg-white text-[#123E61] hover:bg-neutral-100 text-xs font-bold tracking-widest uppercase rounded-full transition-all duration-200 shadow-sm"
                    >
                      <span>Get a Free Project Quote</span>
                      <span className="text-sm font-bold">→</span>
                    </Link>
                    <Link
                      href="/services"
                      className="inline-flex items-center space-x-2 px-6 py-3.5 border border-white/40 text-white hover:bg-white/10 text-xs font-bold tracking-widest uppercase rounded-full transition-all duration-200"
                    >
                      <span>Explore All Services</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>

                {/* Right Visual Graphic */}
                <div className="lg:col-span-4 h-56 sm:h-64 lg:h-full relative overflow-hidden bg-[#0C2B44]">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlToBl-T_N0crEe1z9CiGxVnnpaGVcBexGXKDm19s998PWYLgWGLs2edAN_JiH6UqsuTje_KgrQa0EhZtwfJxePgY-MZ-t8ge5T_L9gF-Fd8NQF5qdNNNYMwJf9rjRPRTA8IqskdQfkRDC42zexfhUhXXuNK9PHOPETVb4iRnTsVD4zB2Gg1r2qDAT7bvDdEO_dpbXyC3-aaeIb7-jLKZUj-FuHyVdo69xs9j1Jv5NrdnmZ7OFAKGNGg"
                    alt="High craftsmanship handover"
                    fill
                    className="object-cover opacity-35 mix-blend-luminosity"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#123E61] via-transparent to-transparent hidden lg:block" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DIRECT RFQ REQUISITION FORM */}
        <section id="contact" className="bg-white">
          <QuoteForm />
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

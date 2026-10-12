'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { projectsData } from '../data/projects';
import { getHomeImage, type HomeImageOverrides } from '@/config/home-images';

export function ProjectGallery({ homeImages }: { homeImages: HomeImageOverrides }) {
  const featuredProjects = projectsData.slice(0, 6);

  return (
    <section className="py-20 lg:py-28 bg-[#F8F9F9] border-t border-[#D9DEE2]" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Gallery Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10 pb-8 border-b border-[#D9DEE2]/70">
          <div className="lg:col-span-7">
            <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">
              <span>OUR WORK</span>
              <span className="w-8 h-[2px] bg-[#123E61]" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-[#30323A] leading-tight">
              Recent Handyman and Renovation Projects <span className="text-[#123E61]">in Alberton and Gauteng</span>
            </h2>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mt-2 font-mono">
              Quality Work You Can See
            </p>
          </div>

          <div className="lg:col-span-5 lg:border-l-2 lg:border-[#123E61] lg:pl-8">
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Take a look at some of our recent projects. From certified electrical overhauls and master joinery to exterior architectural coatings and custom steel carports, every project is completed with uncompromising craftsmanship and precision.
            </p>
          </div>
        </div>

        {/* 6 Project Cards Grid (Clean visual cards with no pop-up dialogs) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-14 lg:mb-16">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-neutral-900 shadow-sm border border-[#D9DEE2]/60"
            >
              <Image
                src={getHomeImage(homeImages, `featured-project-${index + 1}`).imageUrl}
                alt={getHomeImage(homeImages, `featured-project-${index + 1}`).altText}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />

              {/* Gradient Overlay and Title */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex items-end justify-between p-6 sm:p-7">
                <div>
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-sky-300 block mb-1">
                    {project.location}
                  </span>
                  <h3 className="text-white font-extrabold text-base sm:text-lg lg:text-xl uppercase tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-medium mt-1">
                    {project.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery CTA Banner */}
        <div className="relative rounded-2xl overflow-hidden bg-[#123E61] text-white border border-[#0C2B44] shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 p-7 sm:p-10 lg:p-14 z-10">
              <div className="flex items-center space-x-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-slate-300 mb-3">
                <span>LIKE WHAT YOU SEE?</span>
                <span className="w-8 h-[1px] bg-slate-300" />
              </div>

              <h3 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight uppercase leading-tight mb-4">
                Let&apos;s bring <span className="text-sky-300">your vision to life</span>
              </h3>

              <p className="text-slate-200 text-xs sm:text-sm max-w-2xl font-normal leading-relaxed mb-6">
                Whether it&apos;s an electrical compliance certification, custom built-in cupboards, exterior painting, or a bespoke carport, we&apos;re here to help. Get in touch today for a free quote.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center space-x-3 px-7 sm:px-8 py-3.5 sm:py-4 bg-white text-[#123E61] hover:bg-neutral-100 text-xs font-bold tracking-widest uppercase rounded-full transition-all duration-200 shadow-sm"
                >
                  <span>Get a Free Quote</span>
                  <span className="text-sm font-bold">→</span>
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center space-x-2 px-6 py-3.5 border border-white/40 text-white hover:bg-white/10 text-xs font-bold tracking-widest uppercase rounded-full transition-all duration-200"
                >
                  <span>View Services</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Right Visual Graphic / Image overlay */}
            <div className="lg:col-span-4 h-56 sm:h-64 lg:h-full relative overflow-hidden bg-[#0C2B44]">
              <Image
                src={getHomeImage(homeImages, 'projects-cta').imageUrl}
                alt={getHomeImage(homeImages, 'projects-cta').altText}
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
  );
}

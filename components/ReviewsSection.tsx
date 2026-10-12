'use client';

import React from 'react';
import Image from 'next/image';
import { reviewsData, aggregateReviewSummary, ReviewItem } from '../data/reviews';
import { ScrewHead } from './ScrewHead';
import { getHomeImage, type HomeImageOverrides } from '@/config/home-images';

export function ReviewsSection({ homeImages }: { homeImages: HomeImageOverrides }) {
  const renderStars = (rating: number = 5) => {
    return (
      <div className="flex items-center space-x-1 text-amber-400 text-xs mt-1" aria-label={`${rating} out of 5 stars`}>
        {[...Array(rating)].map((_, i) => (
          <span key={i} className="text-amber-400 text-sm">★</span>
        ))}
      </div>
    );
  };

  const renderReviewCard = (review: ReviewItem) => {
    return (
      <div
        key={review.id}
        className={`relative bg-[#f8f9fa] text-[#30323A] p-6 sm:p-7 rounded-sm shadow-xl border border-slate-200/90 ${review.rotation} hover:rotate-0 transition-all duration-300 group`}
      >
        {/* Architectural Screw Anchor (Screw head holding card with gentle rotation animation on hover) */}
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10 transition-transform duration-500 ease-out group-hover:rotate-[3deg] group-hover:scale-105">
          <ScrewHead rotation={review.screwRotation} size={26} />
        </div>

        {/* Card Header Without Profile Photo */}
        <div className="flex items-start justify-between gap-3 mb-3 pt-1">
          <div>
            <h4 className="text-base font-extrabold text-[#123E61] uppercase tracking-tight leading-tight">
              {review.name}
            </h4>
          </div>
          {renderStars(review.rating)}
        </div>

        {/* Review Quotation */}
        <p className="text-sm text-slate-700 leading-relaxed italic font-normal">
          &ldquo;{review.quote}&rdquo;
        </p>
      </div>
    );
  };

  return (
    <section
      className="relative w-full bg-[#092237] text-white overflow-hidden border-t border-[#D9DEE2] py-16 lg:py-24 selection:bg-sky-400 selection:text-[#0C2B44]"
      id="reviews"
    >
      {/* Blueprint Grid Ambient Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#123E61]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="flex items-center space-x-2 text-[11px] font-mono font-bold uppercase tracking-widest text-sky-300 mb-3">
            <span>REAL PEOPLE. REAL WORK.</span>
            <span className="w-8 h-[2px] bg-sky-400" />
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white leading-tight">
            Trusted by Homeowners <span className="text-sky-400">Across Alberton and Gauteng</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-3">
            From full house revamps and Wendyhouse roof rebuilds to bathroom fitments and furniture assembly, our customers trust us to get the job done right.
          </p>
        </div>

        {/* Screwed Notes & Polaroid Collage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Column 1: Ria Coetzee, Polaroid Photo & Johan de Swardt */}
          <div className="lg:col-span-4 space-y-8">
            {/* Review 1: Ria Coetzee */}
            {renderReviewCard(reviewsData[0])}

            {/* Polaroid 1: Bathroom Renovation with Tape */}
            <div className="relative bg-white p-3.5 pb-6 rounded-sm shadow-xl border border-slate-200/90 rotate-2 hover:rotate-0 transition-transform duration-300 max-w-xs mx-auto group">
              {/* Semi-translucent masking tape strip */}
              <div
                className="absolute -top-2.5 left-1/3 -translate-x-2 w-14 h-5 bg-amber-100/80 border border-amber-200/70 shadow-sm backdrop-blur-[0.5px] -rotate-6 z-10 pointer-events-none"
                style={{
                  clipPath: 'polygon(0% 5%, 98% 0%, 100% 95%, 2% 100%)',
                }}
              />
              <div className="relative aspect-square overflow-hidden bg-neutral-100">
                <Image
                  src={getHomeImage(homeImages, 'reviews-photo').imageUrl}
                  alt={getHomeImage(homeImages, 'reviews-photo').altText}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-[11px] font-sans text-center text-slate-500 mt-3 italic">
                Quality work. Every time.
              </p>
            </div>

            {/* Review 6: Johan de Swardt */}
            {renderReviewCard(reviewsData[5])}
          </div>

          {/* Column 2: Ashley Kleynhans, Mariaan Pretorius & Melissa Edwards */}
          <div className="lg:col-span-4 space-y-8">
            {/* Review 2: Ashley Kleynhans */}
            {renderReviewCard(reviewsData[1])}

            {/* Review 3: Mariaan Pretorius */}
            {renderReviewCard(reviewsData[2])}

            {/* Review 7: Melissa Edwards */}
            {renderReviewCard(reviewsData[6])}
          </div>

          {/* Column 3: Tracy Maistry, Petrus van Heerden & Overall Rating Card */}
          <div className="lg:col-span-4 space-y-8">
            {/* Review 4: Tracy Maistry */}
            {renderReviewCard(reviewsData[3])}

            {/* Review 5: Petrus van Heerden */}
            {renderReviewCard(reviewsData[4])}

            {/* Overall Rating Feature Card (Bolted Industrial Plate with 4 Corner Screws) */}
            <div className="relative bg-[#071c2c] text-white p-7 sm:p-8 rounded-xl shadow-2xl border-2 border-sky-400/40 rotate-1 hover:rotate-0 transition-transform duration-300">
              {/* 4 Corner Screws */}
              <div className="absolute top-2.5 left-2.5 z-10">
                <ScrewHead rotation={45} size={18} />
              </div>
              <div className="absolute top-2.5 right-2.5 z-10">
                <ScrewHead rotation={-30} size={18} />
              </div>
              <div className="absolute bottom-2.5 left-2.5 z-10">
                <ScrewHead rotation={15} size={18} />
              </div>
              <div className="absolute bottom-2.5 right-2.5 z-10">
                <ScrewHead rotation={75} size={18} />
              </div>

              <div className="text-center pt-1">
                <span className="text-[11px] font-mono tracking-widest text-sky-300 uppercase font-bold block mb-1">
                  {aggregateReviewSummary.title}
                </span>
                <div className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight my-2">
                  {aggregateReviewSummary.score}
                </div>
                <div className="flex items-center justify-center space-x-1.5 text-amber-400 text-lg sm:text-xl mb-2">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
                <p className="text-[11px] font-mono text-slate-300 tracking-wider uppercase mb-6">
                  {aggregateReviewSummary.countLabel}
                </p>
                <a
                  href={aggregateReviewSummary.googleReviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 w-full py-3 px-6 rounded-full border border-sky-400/60 bg-sky-500/10 hover:bg-sky-500/20 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <span>{aggregateReviewSummary.actionLabel}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

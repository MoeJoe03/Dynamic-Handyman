'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import { getHomeImage, showcasePanels, type HomeImageOverrides } from '@/config/home-images';

export function LiveWorkShowcase({ homeImages }: { homeImages: HomeImageOverrides }) {
  const [isPaused, setIsPaused] = useState(false);

  // Concatenate panels for a seamless infinite marquee effect on wider screens
  const tickerPanels = [...showcasePanels, ...showcasePanels];

  return (
    <div className="w-full mb-8 sm:mb-10 overflow-hidden" data-purpose="hero-imagery-strip">
      {/* Ticker Header Control Bar */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#D9DEE2]/70 text-[11px] font-mono tracking-widest text-slate-500 uppercase">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-[#30323A]">LIVE TRADE SHOWCASE</span>
          <span className="hidden sm:inline text-slate-400">
            {`// ${isPaused ? 'PAUSED' : 'AUTOPLAY ACTIVE'}`}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="px-2.5 py-1 text-[10px] font-bold border border-[#D9DEE2] bg-white hover:bg-neutral-50 text-[#30323A] transition-colors cursor-pointer"
          >
            {isPaused ? 'RESUME ▶' : 'PAUSE ❚❚'}
          </button>
          <span className="hidden md:inline text-slate-400 text-[10px]">HOVER TO INSPECT</span>
        </div>
      </div>

      {/* Marquee Container */}
      <div
        className="relative w-full overflow-hidden bg-neutral-100 rounded-sm"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className={`flex gap-3 sm:gap-4 w-max ${
            isPaused ? '' : 'animate-marquee'
          }`}
          style={{
            animationDuration: '38s',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {tickerPanels.map((panel, idx) => (
            <div
              key={`${panel.ref}-${idx}`}
              className="w-56 sm:w-72 md:w-80 h-64 sm:h-80 md:h-[390px] shrink-0 rounded-sm overflow-hidden relative group bg-neutral-200 border border-[#D9DEE2]/60"
            >
              <Image
                src={getHomeImage(homeImages, panel.key).imageUrl}
                alt={getHomeImage(homeImages, panel.key).altText}
                fill
                sizes="(max-width: 640px) 224px, (max-width: 768px) 288px, 320px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex flex-col justify-end p-4 sm:p-5">
                <span className="text-[10px] font-mono tracking-widest uppercase text-sky-300 font-semibold mb-1">
                  {panel.ref}
                </span>
                <h4 className="text-white font-bold text-xs sm:text-sm uppercase tracking-wide leading-snug">
                  {panel.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

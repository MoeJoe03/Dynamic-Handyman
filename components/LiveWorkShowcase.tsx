'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ShowcasePanel {
  ref: string;
  category: string;
  title: string;
  imageUrl: string;
  alt: string;
}

const panels: ShowcasePanel[] = [
  {
    ref: '01 / FINISHING',
    category: 'Painting & Protective Coatings',
    title: 'Painting & Protective Coatings',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlToBl-T_N0crEe1z9CiGxVnnpaGVcBexGXKDm19s998PWYLgWGLs2edAN_JiH6UqsuTje_KgrQa0EhZtwfJxePgY-MZ-t8ge5T_L9gF-Fd8NQF5qdNNNYMwJf9rjRPRTA8IqskdQfkRDC42zexfhUhXXuNK9PHOPETVb4iRnTsVD4zB2Gg1r2qDAT7bvDdEO_dpbXyC3-aaeIb7-jLKZUj-FuHyVdo69xs9j1Jv5NrdnmZ7OFAKGNGg',
    alt: 'Interior and Exterior Painting Workmanship'
  },
  {
    ref: '02 / CARPENTRY',
    category: 'Custom Joinery & Ceilings',
    title: 'Custom Joinery & Ceilings',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9RdtOlpdexj9r3xKW75WlHCMirVh1webhKQEr1NLXh3f0RlUj0TIkgVgPVAtVUWM_lZT1Vx9nNRr25lLByQj9IpmqHagTzb2fzbeJVw-Js_MjVj-lsyLdU7PbeBz-jNVjvIzwnh_Utghii4kGmiUNVgLJFt287GjilYNKF9slmMYL9RjwcttnfT71jqXC1gNjXBpT-c-RgxOUnTqouI1ogTpbo2--2sOcpFyju5h-7nUPqb6nqulJjQ',
    alt: 'Carpentry and Cabinetry Workmanship'
  },
  {
    ref: '03 / ELECTRICAL',
    category: 'Certified Compliance & DB Boards',
    title: 'Certified Compliance & DB Boards',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlAncPdCi5h4looGaNK6i0RNxit4Z-G83zVvVfDeYyynUQLgv-wWr6Pu5mEuSPpkO5T7CnxMZxFOJVgqmjPjs_a2Z2RAv9LjXgnXdGAXlGzqGoa1Y_M-X-B_YbEfQnmx88Y-aBCFdLfuAR_dOEHNstFr_ncJFuMTqD57noyGGeYv50u5bNYBYuOhqK2Cd5fZ-1qWp4pEy50ozkDZ47azkP3Jw4Fhn3jrW8ElV86G13d2LYULs3Vzzc7g',
    alt: 'Certified Electrical DB Board Installations'
  },
  {
    ref: '04 / STRUCTURAL',
    category: 'Alterations & Office Snags',
    title: 'Alterations & Office Snags',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoAhZZMUpgtzUlw2rH5D24DlgUltO0jio6axjNlyuj1ar5ae7qYIyQCfcYv-QYwuUJRcbfNHGTTPLZr1jU3c12rQAe-zZNS_bTKj2jBzpqPpfeOfAfFWRFwaBO3WvDiZbhWEqJ2ps9idODDcRsTx1_CZsQTqOz1-7dxz_hlQ7y4JCC_xmgdBvBCdFIzVD0sFlaa7YvWXbutFnX8yzrz00CACU-kVH2BHKAifudggIdC-wqhcSgbjZo-A',
    alt: 'Commercial Alterations and Structural Snagging'
  },
  {
    ref: '05 / GLAZING',
    category: 'Aluminium Windows & Glass',
    title: 'Aluminium Windows & Glass',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-R9slRj8pHriM1qJRCenS2nTSqmSNIFOVWRtT0xQc1oAi428N7wPN2Shqed0pKdQqO_CPoHvu6CwulsjUHfLlX9rBQpqJOh0PAZV6QTxsLqCsDeFg17xH-jPETXzG170dLWk9Vhdt4_QLfWu0PDviYFc0K3SqLug6DHJeD2VzNy3Os0J7qL1ALpCJRWksmLqLIu2kUx-DglPvB9dRvVxegx7SawZWXz5_wdQeosiCVMp8BLMLp1NMEw',
    alt: 'Aluminium Windows and Modern Glazing'
  },
  {
    ref: '06 / PAVING & ROOFS',
    category: 'Engineered Paving & Upgrades',
    title: 'Engineered Paving & Upgrades',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhn1sUA6cb-u7_UcSjwVtj8mYU_9j9n2KM-whcFNotHerF1_AL4BDn6l5hxIcs7BnakIhhjbw-rjNRkdaigAzx8BCN0nldDNdOLdJDM8-HkAMDMkgyYgXK9E2UZ-FbxS3vGj3n9DAcq0vRFFpMC5-JovMRR_Y7C9oFUrPv0BuQf2FPXmvyW1ZDyoNaWWPG4nx0iT75PQIPYG6D_WhOp1dYapgfiYYyFYaOqAiTGkKC3w4iw6ZqKl7diw',
    alt: 'Exterior Paving and Structural Boundary Upgrades'
  }
];

export function LiveWorkShowcase() {
  const [isPaused, setIsPaused] = useState(false);

  // Concatenate panels for a seamless infinite marquee effect on wider screens
  const tickerPanels = [...panels, ...panels];

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
                src={panel.imageUrl}
                alt={panel.alt}
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

import Image from 'next/image';

import { getHomeImage, showcasePanels, type HomeImageOverrides } from '@/config/home-images';

export function LiveWorkShowcase({ homeImages }: { homeImages: HomeImageOverrides }) {
  // Concatenate panels for a seamless infinite marquee effect on wider screens
  const tickerPanels = [...showcasePanels, ...showcasePanels];

  return (
    <div className="w-full mb-8 sm:mb-10 overflow-hidden" data-purpose="hero-imagery-strip">
      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden bg-neutral-100 rounded-sm">
        <div
          className="flex gap-3 sm:gap-4 w-max animate-marquee hero-marquee"
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

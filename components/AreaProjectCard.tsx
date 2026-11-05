'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

type Photo = { imageUrl: string; altText: string };
export function AreaProjectCard({ title, location, description, photos }: { title: string; location: string; description: string; photos: Photo[] }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (photos.length < 2) return;
    const timer = window.setInterval(() => setIndex(current => (current + 1) % photos.length), 1500);
    return () => window.clearInterval(timer);
  }, [photos.length]);
  return <article className="overflow-hidden rounded-lg border border-[#D9DEE2] bg-[#F4F7F9]">
    <div className="relative aspect-[4/3]">
      {photos.map((photo, i) => <Image key={photo.imageUrl} src={photo.imageUrl} alt={photo.altText} fill sizes="(max-width: 639px) 100vw, 50vw" aria-hidden={i !== index} className={`object-cover transition-opacity duration-500 ${i === index ? 'opacity-100' : 'opacity-0'}`} />)}
    </div>
    <div className="p-6">
      <p className="text-xs font-bold uppercase tracking-wide text-[#19547E]">{location}</p>
      <h3 className="mt-3 text-lg font-bold text-[#123E61]">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-700">{description}</p>
    </div>
  </article>;
}

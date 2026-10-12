'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './ReviewProjectPhotos.module.css';

type ProjectPhoto = { imageUrl: string; altText: string };
type PhotoReview = { name: string; quote: string; rating: number };
type Phase = 'idle' | 'entering' | 'peeling' | 'placing';

const ENTRANCE_DURATION = 1100;
const PHOTO_DISPLAY_DURATION = 3000;

export function ReviewProjectPhotos({ photos, review }: { photos: ProjectPhoto[]; review: PhotoReview }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const entranceStarted = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('idle');
  const [entranceComplete, setEntranceComplete] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const count = photos.length;

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(preference.matches);
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateMotion();
    updateVisibility();
    preference.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateVisibility);
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
      if (entry.isIntersecting && !entranceStarted.current) {
        entranceStarted.current = true;
        if (preference.matches) {
          setEntranceComplete(true);
        } else {
          setPhase('entering');
        }
      }
    }, { threshold: 0.25 });
    if (frameRef.current) observer.observe(frameRef.current);
    return () => {
      observer.disconnect();
      preference.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (count < 2 || !entranceComplete || phase !== 'idle' || !inView || !pageVisible || reducedMotion) return;
    const timer = window.setTimeout(() => setPhase('peeling'), PHOTO_DISPLAY_DURATION);
    return () => window.clearTimeout(timer);
  }, [count, activeIndex, phase, entranceComplete, inView, pageVisible, reducedMotion]);

  useEffect(() => {
    if (phase === 'idle' || !count) return;
    const timer = window.setTimeout(() => {
      if (phase === 'peeling') {
        setActiveIndex((index) => (index + 1) % count);
        setPhase('placing');
      } else {
        setPhase('idle');
        if (phase === 'entering') setEntranceComplete(true);
      }
    }, reducedMotion ? 0 : phase === 'entering' ? ENTRANCE_DURATION : phase === 'peeling' ? 680 : 650);
    return () => window.clearTimeout(timer);
  }, [phase, count, reducedMotion]);

  if (!count) return null;
  const current = photos[activeIndex % count];
  const next = photos[(activeIndex + 1) % count];

  return (
    <div
      ref={frameRef}
      className="relative mx-auto max-w-xs"
      aria-label="Review project photos"
      aria-roledescription="carousel"
    >
      <div className={styles.stage}>
        <figure className={`${styles.card} ${phase === 'idle' ? '' : styles[phase]}`} data-photo-phase={phase}>
          <span className={styles.tape} aria-hidden="true" />
          <div className="relative aspect-square overflow-hidden bg-neutral-100">
            {count > 1 && inView && (
              <Image
                src={next.imageUrl}
                alt=""
                aria-hidden="true"
                fill
                sizes="292px"
                loading="eager"
                className="object-cover opacity-0"
                referrerPolicy="no-referrer"
              />
            )}
            <Image
              key={current.imageUrl}
              src={current.imageUrl}
              alt={current.altText}
              fill
              sizes="(max-width: 360px) 82vw, 292px"
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <figcaption className="mt-4 font-sans text-slate-700">
            <span className="block text-sm font-extrabold uppercase tracking-tight text-[#123E61]">{review.name}</span>
            <span className="mt-1 block text-sm tracking-wide text-amber-500" aria-label={`${review.rating} out of 5 stars`}>
              {'★'.repeat(review.rating)}
            </span>
            <span className="mt-2 block text-xs leading-relaxed italic">&ldquo;{review.quote}&rdquo;</span>
          </figcaption>
        </figure>
      </div>
      {count > 1 && (
        <div className="mt-5 text-center text-xs text-slate-300">
          <span className="tabular-nums">Photo {activeIndex % count + 1} of {count}</span>
        </div>
      )}
    </div>
  );
}

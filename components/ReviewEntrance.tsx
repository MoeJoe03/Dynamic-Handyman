'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import styles from './ReviewEntrance.module.css';

export function ReviewEntrance({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'visible' | 'pending' | 'entering' | 'complete'>('visible');

  useEffect(() => {
    const element = elementRef.current;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!element || preference.matches || !('IntersectionObserver' in window)) return;

    setState('pending');
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setState('entering');
      observer.disconnect();
    }, { threshold: 0.05, rootMargin: '0px 0px -24px 0px' });
    observer.observe(element);

    const stopMotion = () => {
      if (!preference.matches) return;
      observer.disconnect();
      setState('complete');
    };
    preference.addEventListener('change', stopMotion);
    return () => {
      observer.disconnect();
      preference.removeEventListener('change', stopMotion);
    };
  }, []);

  return (
    <div
      ref={elementRef}
      className={styles.entrance}
      style={{ '--review-entry-delay': `${delay}ms` } as CSSProperties}
      data-review-entrance={state}
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget) setState('complete');
      }}
      onFocusCapture={() => setState('complete')}
    >
      {children}
    </div>
  );
}

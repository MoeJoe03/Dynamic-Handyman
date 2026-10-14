'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import styles from './ReviewEntrance.module.css';

export function ReviewEntrance({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'visible' | 'pending' | 'entering' | 'complete'>('visible');

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !('IntersectionObserver' in window)) return;

    setState('pending');
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setState('entering');
      observer.disconnect();
    }, { threshold: 0.05, rootMargin: '0px 0px -24px 0px' });
    observer.observe(element);

    return () => {
      observer.disconnect();
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

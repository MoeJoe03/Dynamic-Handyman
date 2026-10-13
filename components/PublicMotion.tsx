'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/** Progressive enhancement: content stays visible without JavaScript. */
export function PublicMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let previousTime = 0;
    let layers: { image: HTMLImageElement; container: HTMLElement; offset: number; translate: string; scale: string }[] = [];

    const update = (time: number) => {
      frame = 0;
      const blend = 1 - Math.exp(-Math.min(time - previousTime, 64) / 100);
      previousTime = time;
      let moving = false;
      for (const layer of layers) {
        const bounds = layer.container.getBoundingClientRect();
        if (bounds.bottom < 0 || bounds.top > window.innerHeight) continue;
        const limit = Math.min(bounds.height * 0.035, window.innerWidth < 640 ? 10 : 22);
        const progress = (window.innerHeight / 2 - bounds.top - bounds.height / 2) / ((window.innerHeight + bounds.height) / 2);
        const target = Math.max(-1, Math.min(1, progress)) * limit;
        layer.offset += (target - layer.offset) * blend;
        layer.image.style.translate = `0 ${layer.offset.toFixed(2)}px`;
        if (Math.abs(target - layer.offset) > 0.1) moving = true;
      }
      if (moving) frame = requestAnimationFrame(update);
    };
    const schedule = () => {
      if (!frame && layers.length) {
        previousTime = performance.now() - 16;
        frame = requestAnimationFrame(update);
      }
    };
    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      layers.forEach(({ image, translate, scale }) => {
        image.style.translate = translate;
        image.style.scale = scale;
      });
      layers = [];
    };
    const setup = () => {
      reset();
      if (preference.matches) return;
      document.querySelectorAll<HTMLImageElement>('main img').forEach((image) => {
        const container = image.parentElement;
        if (!container || image.closest('#reviews') || container.offsetHeight < 180 || getComputedStyle(container).overflow !== 'hidden') return;
        layers.push({ image, container, offset: 0, translate: image.style.translate, scale: image.style.scale });
        // Overscan keeps the image edges covered throughout the small vertical movement.
        image.style.scale = '1.09';
      });
      schedule();
    };
    setup();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', setup);
    preference.addEventListener('change', setup);
    return () => {
      reset();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', setup);
      preference.removeEventListener('change', setup);
    };
  }, [pathname]);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const animations = new Set<Animation>();
    let observer: IntersectionObserver | undefined;
    let frame = 0;
    document.body.dataset.publicMotion = '';

    const start = () => {
      observer?.disconnect();
      cancelAnimationFrame(frame);
      animations.forEach((animation) => animation.cancel());
      animations.clear();
      if (preference.matches || !('IntersectionObserver' in window)) return;

      frame = requestAnimationFrame(() => {
        observer = new IntersectionObserver((entries) => {
          let stagger = 0;
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            observer?.unobserve(entry.target);
            const animation = entry.target.animate([
              { opacity: 0.65, transform: 'translateY(12px)' },
              { opacity: 1, transform: 'translateY(0)' },
            ], {
              duration: 520,
              delay: Math.min(stagger++ * 55, 165),
              fill: 'backwards',
              easing: 'cubic-bezier(.22, 1, .36, 1)',
            });
            animations.add(animation);
            animation.onfinish = () => animations.delete(animation);
          });
        }, { threshold: 0.12 });

        document.querySelectorAll('main h2, main h3, main figure').forEach((element) => {
          // Reviews already have their own screw/tape entrance choreography.
          if (!element.closest('#reviews, [aria-hidden="true"]')) observer?.observe(element);
        });
      });
    };

    start();
    preference.addEventListener('change', start);
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
      preference.removeEventListener('change', start);
      delete document.body.dataset.publicMotion;
    };
  }, [pathname]);

  return null;
}

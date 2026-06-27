import { useLayoutEffect, type RefObject } from 'react';
import {
  drawSvgPaths,
  gsap,
  marqueeLoop,
  prefersReducedMotion,
  registerGsapFoundation,
  ScrollTrigger,
} from '@/lib/gsap-foundation';

export function useImpactGsap(pageRef: RefObject<HTMLDivElement | null>, deps: unknown[] = []) {
  useLayoutEffect(() => {
    if (!pageRef.current) return;

    registerGsapFoundation();
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.set('[data-impact-word]', { yPercent: 110, rotate: 2 });

      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
      intro
        .add(drawSvgPaths('[data-impact-line]', { dash: 760, duration: 0.95, stagger: 0.05 }))
        .to('[data-impact-word]', { yPercent: 0, rotate: 0, duration: 0.82, stagger: 0.07 }, '-=0.35')
        .from('[data-impact-copy], [data-impact-nav]', { autoAlpha: 0, y: 20, duration: 0.58, stagger: 0.06 }, '-=0.25');

      marqueeLoop('[data-impact-marquee]', { duration: 46 });

      gsap.to('[data-impact-line]', {
        strokeDashoffset: -42,
        duration: 9,
        repeat: -1,
        ease: 'none',
      });

      gsap.utils.toArray<HTMLElement>('[data-impact-panel]').forEach((panel, index) => {
        gsap.from(panel, {
          y: 36,
          rotate: index % 2 === 0 ? -1.2 : 1.2,
          duration: 0.74,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: panel,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      gsap.to('[data-impact-float]', {
        y: (index) => (index % 2 === 0 ? -20 : 18),
        rotate: (index) => (index % 2 === 0 ? -1.2 : 1.2),
        ease: 'none',
        scrollTrigger: {
          trigger: pageRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      gsap.delayedCall(0.2, () => ScrollTrigger.refresh());
    }, pageRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

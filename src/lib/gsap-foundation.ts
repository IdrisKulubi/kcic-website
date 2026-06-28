import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export { gsap, ScrollTrigger };

export function registerGsapFoundation() {
  if (typeof window === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);
}

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function drawSvgPaths(
  selector: gsap.TweenTarget,
  options: {
    dash?: number;
    duration?: number;
    stagger?: number;
    ease?: string;
  } = {}
) {
  const { dash = 420, duration = 1.1, stagger = 0.08, ease = 'power4.out' } = options;

  gsap.set(selector, { strokeDasharray: dash, strokeDashoffset: dash });
  return gsap.to(selector, {
    strokeDashoffset: 0,
    duration,
    stagger,
    ease,
  });
}

export function pulseNodes(
  selector: gsap.TweenTarget,
  options: {
    scale?: number;
    duration?: number;
    stagger?: number;
  } = {}
) {
  const { scale = 1.18, duration = 0.9, stagger = 0.16 } = options;

  return gsap.to(selector, {
    scale,
    yoyo: true,
    repeat: -1,
    duration,
    stagger,
    ease: 'power2.inOut',
    transformOrigin: '50% 50%',
  });
}

export function posterReveal(
  selector: gsap.TweenTarget,
  options: {
    y?: number;
    rotate?: number;
    duration?: number;
    stagger?: number;
  } = {}
) {
  const { y = 34, rotate = -1.5, duration = 0.75, stagger = 0.08 } = options;

  return gsap.from(selector, {
    autoAlpha: 0,
    y,
    rotate,
    duration,
    stagger,
    ease: 'power4.out',
  });
}

export function marqueeLoop(
  selector: gsap.TweenTarget,
  options: {
    xPercent?: number;
    duration?: number;
  } = {}
) {
  const { xPercent = -50, duration = 18 } = options;

  return gsap.to(selector, {
    xPercent,
    duration,
    repeat: -1,
    ease: 'none',
  });
}

export function scrollScrubObjects(
  selector: gsap.TweenTarget,
  trigger: gsap.DOMTarget,
  options: {
    y?: (index: number) => number;
    rotate?: (index: number) => number;
    start?: string;
    end?: string;
  } = {}
) {
  const {
    y = (index) => (index % 2 === 0 ? -28 : 24),
    rotate = (index) => (index % 2 === 0 ? -1.5 : 1.5),
    start = 'top top',
    end = 'bottom top',
  } = options;

  return gsap.to(selector, {
    y,
    rotate,
    ease: 'none',
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub: true,
    },
  });
}

export function scrollPosterReveal(
  selector: gsap.TweenTarget,
  options: {
    trigger?: gsap.DOMTarget;
    start?: string;
    y?: number;
    rotate?: number;
    stagger?: number;
  } = {}
) {
  const { trigger = selector as gsap.DOMTarget, start = 'top 86%', y = 32, rotate = -1, stagger = 0.06 } = options;

  return gsap.from(selector, {
    autoAlpha: 0,
    y,
    rotate,
    stagger,
    duration: 0.72,
    ease: 'power4.out',
    scrollTrigger: {
      trigger,
      start,
    },
  });
}

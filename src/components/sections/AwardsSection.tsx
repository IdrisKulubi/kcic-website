"use client";

import React, { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { colors, typography, effects } from "@/lib/design-system";
import Image from "next/image";
import { BLUR_DATA_URL } from "@/lib/image-utils";

interface AwardItem {
  title: string;
  subtitle?: string;
  image: string; // public path
}

// Default data — replace image paths with your real award images in /public/images/awards
const DEFAULT_AWARDS: AwardItem[] = [
  {
    title: "SME Enabler of the Year 2024/2025",
    subtitle: "KEPSA",
    image: "/images/awards/kepsa.jpg",
  },
  {
    title: "Circular Economy Financier of the Year",
    subtitle: "CE Conference",
    image: "/images/awards/financier.jpg",
  },
  {
    title: "Green Economy Champion of the Year",
    subtitle: "ASSEK",
    image: "/images/awards/assek.jpg",
  },
];

// Lightweight "balloons" layer using CSS + GSAP (no Three.js dependency)
function BalloonsLayer() {
  const layerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!layerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const balloons = gsap.utils.toArray<HTMLDivElement>(layerRef.current!.querySelectorAll("[data-balloon]"));

      balloons.forEach((b) => {
        const dur = gsap.utils.random(12, 22);

        gsap.fromTo(
          b,
          // start near the bottom
          { y: () => gsap.utils.random(0, 120), rotate: gsap.utils.random(-8, 8), opacity: gsap.utils.random(0.35, 0.7) },
          {
            // travel well past the top of the section
            y: () => -window.innerHeight - gsap.utils.random(160, 320),
            x: `+=${gsap.utils.random(-40, 40)}`,
            duration: dur,
            ease: "sine.inOut",
            repeat: -1,
            repeatRefresh: true,
            delay: gsap.utils.random(0, 1.2),
          }
        );
      });

      // Subtle parallax with scroll
      const node = layerRef.current!;
      const triggerEl = node.closest("section");
      if (triggerEl) {
        gsap.to(node, {
          y: -120,
          ease: "none",
          scrollTrigger: {
            trigger: triggerEl,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, layerRef);

    return () => ctx.revert();
  }, []);

  const balloons = useMemo(() => {
    // Pre-generate random positions/colors to avoid hydration mismatch
    return Array.from({ length: 28 }).map((_, i) => {
      const left = Math.round(Math.random() * 100);
      const size = Math.round(gsap.utils.random(36, 96));
      const hue = gsap.utils.random(85, 195); // green→cyan hues
      const alpha = gsap.utils.random(0.25, 0.55);
      return { id: i, left, size, hue, alpha };
    });
  }, []);

  return (
    <div
      ref={layerRef}
  className="absolute inset-0 z-800 pointer-events-none select-none overflow-hidden opacity-70 mix-blend-screen"
      aria-hidden
    >
      {balloons.map((b) => (
        <div
          key={b.id}
          data-balloon
          className="absolute"
          style={{
            left: `${b.left}%`,
            bottom: "-10%",
            width: `${b.size}px`,
            height: `${Math.round(b.size * 1.25)}px`,
            filter: "blur(1px)",
          }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: `radial-gradient(70% 65% at 30% 30%, hsla(${b.hue}, 80%, 65%, ${b.alpha}) 0%, hsla(${b.hue}, 80%, 50%, ${b.alpha * 1.1}) 45%, transparent 90%)`,
              boxShadow: `0 16px 40px hsla(${b.hue}, 80%, 55%, ${b.alpha * 0.45})`,
            }}
          />
          <div
            className="mx-auto mt-0.5"
            style={{
              width: 2,
              height: Math.round(b.size * 0.9),
              background: `linear-gradient(to bottom, hsla(${b.hue}, 50%, 40%, ${b.alpha * 0.5}), transparent)`,
            }}
          />
        </div>
      ))}
    </div>
  );
}

// Confetti canvas overlay that triggers when the section scrolls into view
function ConfettiLayer({
  containerRef,
  durationMs = 4500,
  showOnce = true,
}: {
  containerRef: React.RefObject<HTMLElement | null>;
  durationMs?: number;
  showOnce?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const triggeredRef = useRef(false);
  const activeRef = useRef(false);

  const resize = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const rect = container.getBoundingClientRect();
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (showOnce && triggeredRef.current) return;
            triggeredRef.current = true;
            startConfetti();
          }
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(container);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startConfetti = () => {
    if (activeRef.current) return;
    activeRef.current = true;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    type P = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      w: number;
      h: number;
      r: number;
      vr: number;
      color: string;
      life: number;
      ttl: number;
    };

    const palette = ["#7FD134", "#00AEEF", "#FFD166", "#FF6B6B", "#FFFFFF"];

    const particles: P[] = [];
    const emitCount = 220;

    for (let i = 0; i < emitCount; i++) {
      const angle = (-Math.PI / 2) + (Math.random() * Math.PI) / 2 - Math.PI / 4;
      const speed = 6 + Math.random() * 7;
      particles.push({
        x: Math.random() * width,
        y: height + 8,
        vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 2,
        vy: Math.sin(angle) * speed - 6,
        w: 6 + Math.random() * 6,
        h: 8 + Math.random() * 10,
        r: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.5,
        color: palette[Math.floor(Math.random() * palette.length)],
        life: 0,
        ttl: durationMs + 600 + Math.random() * 600,
      });
    }

    const gravity = 0.25;
    const drag = 0.0025;
    const start = performance.now();

    const frame = (now: number) => {
      const elapsed = now - start;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.life += 16;
        p.vy += gravity;
        p.vx += Math.sin((p.life + p.x) * 0.003) * 0.08; // wind wiggle
        p.vx *= 1 - drag;
        p.vy *= 1 - drag;
        p.x += p.vx;
        p.y += p.vy;
        p.r += p.vr;

        const alpha = Math.max(0, 1 - Math.max(0, p.life - durationMs) / 700);
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.r);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });

      if (elapsed < durationMs + 900) {
        rafRef.current = requestAnimationFrame(frame);
      } else {
        activeRef.current = false;
        ctx.clearRect(0, 0, width, height);
      }
    };

    rafRef.current = requestAnimationFrame(frame);
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
  className="absolute inset-0 z-999 pointer-events-none"
      aria-hidden
    />
  );
}

export default function AwardsSection({ awards = DEFAULT_AWARDS }: { awards?: AwardItem[] }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Title reveal
      const title = sectionRef.current!.querySelector("[data-awards-title]");
      if (title) {
        gsap.fromTo(
          title,
          { opacity: 0, y: 30, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current!,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // Cards stagger
      const cards = gsap.utils.toArray<HTMLElement>('[data-award-card]');
      gsap.set(cards, { opacity: 0, y: 34, rotateX: -6 });
      ScrollTrigger.batch(cards, {
        start: "top 90%",
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, rotateX: 0, duration: 0.8, ease: "power3.out", stagger: 0.12 }),
        onEnterBack: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, rotateX: 0, duration: 0.6, ease: "power2.out", stagger: 0.08 }),
        onLeaveBack: (batch) => gsap.to(batch, { opacity: 0, y: 24, rotateX: -4, duration: 0.3, ease: "power1.out" }),
      });

      // Subtle parallax on grid
      if (gridRef.current) {
        gsap.to(gridRef.current, {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current!,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} aria-labelledby="awards-heading" className="relative isolate py-24 sm:py-32">
      {/* Atmospheric gradient base */}
      <div
        className="absolute inset-0 -z-10"
        aria-hidden
        style={{
          background:
            `radial-gradient(60% 50% at 20% 40%, ${colors.primary.green[50]} 0%, transparent 60%),` +
            `radial-gradient(60% 50% at 80% 60%, ${colors.primary.cyan[50]} 0%, transparent 60%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 sm:mb-20" data-awards-title>
          <h2
            id="awards-heading"
            className="font-bold tracking-tight inline-block"
            style={{
              fontFamily: typography.fonts.heading,
              fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
              background: colors.gradients.primary,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Awards & Recognition
          </h2>
          <div className="mt-3 text-gray-600" style={{ fontFamily: typography.fonts.body }}>
            Celebrating milestones from our ecosystem partners and industry bodies
          </div>
        </div>

        {/* Awards grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 relative">
          {awards.map((award, i) => (
            <article
              key={i}
              data-award-card
              className="group relative overflow-hidden rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-xl transition-shadow"
              style={{ backdropFilter: `blur(6px)` }}
            >
              {/* Glow border on hover */}
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ boxShadow: effects.shadows.glow.mixed }}
              />

              <div className="relative h-[220px] sm:h-[260px] md:h-[300px] overflow-hidden">
                <Image
                  src={award.image}
                  alt={award.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold" style={{ fontFamily: typography.fonts.heading }}>
                  {award.title}
                </h3>
                {award.subtitle && (
                  <p className="mt-1 text-sm text-gray-600" style={{ fontFamily: typography.fonts.body }}>
                    {award.subtitle}
                  </p>
                )}
              </div>

              {/* Tilt effect on hover via CSS vars updated by pointer */}
              <div
                className="absolute inset-0"
                onMouseMove={(e) => {
                  const el = e.currentTarget.parentElement as HTMLElement;
                  const r = el.getBoundingClientRect();
                  const rx = ((e.clientY - r.top) / r.height - 0.5) * -6; // rotateX
                  const ry = ((e.clientX - r.left) / r.width - 0.5) * 8; // rotateY
                  el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget.parentElement as HTMLElement;
                  el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
                }}
              />
            </article>
          ))}
        </div>
      </div>

      {/* Floating balloons layer (now above cards) */}
      <BalloonsLayer />

      {/* Confetti burst on entering the section */}
      <ConfettiLayer containerRef={sectionRef} durationMs={4800} showOnce />
    </section>
  );
}
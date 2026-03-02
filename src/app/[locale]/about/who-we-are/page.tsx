'use client';

import { useLayoutEffect, useRef } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import {
  Compass,
  Handshake,
  LightbulbFilament,
  Leaf,
  ShieldCheck,
  Sparkle,
  Target,
  UsersThree,
  ArrowRight,
} from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAccessibilityClasses } from '@/hooks/use-accessibility-classes';

/* ─── Data ─────────────────────────────────────────────────── */

const stats = [
  { target: 450, prefix: '', suffix: '+', label: 'SMEs supported', color: 'green' as const },
  { target: 25, prefix: '$', suffix: 'M+', label: 'Investment mobilized', color: 'blue' as const },
  { target: 2500, prefix: '', suffix: '+', label: 'Green jobs created', color: 'dark' as const },
  { target: 12, prefix: '', suffix: '+', label: 'Years of impact', color: 'gray' as const },
];

const values = [
  { title: 'People-centric', description: 'We prioritize the well-being of employees and stakeholders', Icon: UsersThree },
  { title: 'Inclusivity', description: 'We leave no one behind', Icon: Handshake },
  { title: 'Professionalism', description: 'We are committed to excellence', Icon: ShieldCheck },
  { title: 'Integrity', description: 'We walk the talk and keep our word', Icon: Compass },
  { title: 'Innovation', description: 'We foster creativity and forward-thinking', Icon: LightbulbFilament },
  { title: 'Collaboration', description: 'We believe we are stronger together', Icon: Sparkle },
];

const impactParticles = [
  { top: '12%', left: '8%', size: 6, color: 'bg-[#80c738]/45', x: 22, y: -12, duration: 6.8 },
  { top: '20%', left: '22%', size: 10, color: 'bg-[#00addd]/40', x: -18, y: 14, duration: 8.4 },
  { top: '15%', left: '45%', size: 8, color: 'bg-white/30', x: 16, y: 10, duration: 7.1 },
  { top: '24%', left: '68%', size: 7, color: 'bg-[#80c738]/35', x: -20, y: -10, duration: 7.9 },
  { top: '10%', left: '86%', size: 9, color: 'bg-[#00addd]/35', x: 20, y: 12, duration: 8.2 },
  { top: '62%', left: '13%', size: 8, color: 'bg-[#00addd]/28', x: 18, y: -14, duration: 9.1 },
  { top: '72%', left: '31%', size: 6, color: 'bg-white/25', x: -16, y: 11, duration: 6.5 },
  { top: '70%', left: '53%', size: 10, color: 'bg-[#80c738]/30', x: 22, y: -16, duration: 9.8 },
  { top: '64%', left: '76%', size: 7, color: 'bg-[#00addd]/30', x: -14, y: 15, duration: 7.4 },
  { top: '78%', left: '90%', size: 6, color: 'bg-[#80c738]/40', x: 12, y: -8, duration: 6.9 }
];

const timeline = [
  {
    year: '2012',
    label: 'Founded',
    description: 'Launched as the first World Bank infoDev Climate Innovation Centre globally, setting the blueprint for locally-led climate entrepreneurship.',
  },
  {
    year: '2015',
    label: 'Institutionalized',
    description: 'Registered as a company limited by guarantee — cementing long-term governance and independent growth.',
  },
  {
    year: '2016',
    label: 'Scaled',
    description: 'New DANIDA funding phase enabled rapid expansion of incubation, acceleration, and finance programmes across Kenya.',
  },
  {
    year: 'Today',
    label: 'Leading',
    description: 'A fully independent hub and East Africa\'s foremost climate innovation centre, supporting 450+ ventures and counting.',
  },
];

/* ─── Page ──────────────────────────────────────────────────── */

export default function WhoWeArePage() {
  const { shouldDisableAnimations } = useAccessibilityClasses();
  const impactRef = useRef<HTMLElement | null>(null);
  const splitRef = useRef<HTMLElement | null>(null);
  const storyRef = useRef<HTMLElement | null>(null);
  const bannerRef = useRef<HTMLElement | null>(null);
  const valuesRef = useRef<HTMLElement | null>(null);

  const formatCounterValue = (value: number, prefix: string, suffix: string) =>
    `${prefix}${Math.round(value).toLocaleString()}${suffix}`;

  useLayoutEffect(() => {
    if (shouldDisableAnimations()) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Section-level reveal for visual rhythm between large blocks.
      gsap.utils.toArray<HTMLElement>('[data-gsap-section]').forEach((section) => {
        gsap.fromTo(
          section,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 78%',
              once: true,
              toggleActions: 'play none none none'
            }
          }
        );
      });

      if (impactRef.current) {
        const counterElements = impactRef.current.querySelectorAll<HTMLElement>('[data-gsap-counter]');
        counterElements.forEach((counterElement, index) => {
          const target = Number(counterElement.dataset.target ?? '0');
          const prefix = counterElement.dataset.prefix ?? '';
          const suffix = counterElement.dataset.suffix ?? '';
          const counterObject = { value: 0 };

          gsap.to(counterObject, {
            value: target,
            duration: 1.8,
            delay: 0.25 + index * 0.08,
            ease: 'power3.out',
            onUpdate: () => {
              counterElement.textContent = formatCounterValue(counterObject.value, prefix, suffix);
            },
            onComplete: () => {
              counterElement.textContent = formatCounterValue(target, prefix, suffix);
            },
            scrollTrigger: {
              trigger: impactRef.current,
              start: 'top 75%',
              once: true
            }
          });
        });

        const particles = impactRef.current.querySelectorAll<HTMLElement>('[data-gsap-particle]');
        particles.forEach((particle, index) => {
          const x = Number(particle.dataset.x ?? '15');
          const y = Number(particle.dataset.y ?? '-10');
          const duration = Number(particle.dataset.duration ?? '7');

          gsap.to(particle, {
            x,
            y,
            duration,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.12
          });

          gsap.to(particle, {
            opacity: 0.18,
            duration: duration / 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
          });
        });

        gsap.fromTo(
          impactRef.current.querySelectorAll('[data-gsap-stat]'),
          { autoAlpha: 0, y: 36, scale: 0.95 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: impactRef.current,
              start: 'top 75%',
              once: true
            }
          }
        );
      }

      if (splitRef.current) {
        const leftPanel = splitRef.current.querySelector('[data-gsap-split="left"]');
        const rightPanel = splitRef.current.querySelector('[data-gsap-split="right"]');

        if (leftPanel) {
          gsap.fromTo(
            leftPanel,
            { autoAlpha: 0, x: -80 },
            {
              autoAlpha: 1,
              x: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: splitRef.current,
                start: 'top 75%',
                once: true
              }
            }
          );
        }

        if (rightPanel) {
          gsap.fromTo(
            rightPanel,
            { autoAlpha: 0, x: 80 },
            {
              autoAlpha: 1,
              x: 0,
              duration: 0.8,
              delay: 0.08,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: splitRef.current,
                start: 'top 75%',
                once: true
              }
            }
          );
        }
      }

      if (storyRef.current) {
        gsap.fromTo(
          storyRef.current.querySelectorAll('[data-gsap-timeline]'),
          { autoAlpha: 0, x: 28 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.14,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: storyRef.current,
              start: 'top 72%',
              once: true
            }
          }
        );
      }

      if (bannerRef.current) {
        gsap.fromTo(
          bannerRef.current.querySelectorAll('[data-gsap-chip]'),
          { autoAlpha: 0, y: 18, scale: 0.9 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            stagger: 0.08,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: bannerRef.current,
              start: 'top 78%',
              once: true
            }
          }
        );
      }

      if (valuesRef.current) {
        gsap.fromTo(
          valuesRef.current.querySelectorAll('[data-gsap-value]'),
          { autoAlpha: 0, y: 30, scale: 0.94 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: valuesRef.current,
              start: 'top 74%',
              once: true
            }
          }
        );

        const valuesBg = valuesRef.current.querySelector('[data-gsap-parallax]');
        if (valuesBg) {
          gsap.to(valuesBg, {
            yPercent: -10,
            ease: 'none',
            scrollTrigger: {
              trigger: valuesRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6
            }
          });
        }
      }

      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, [shouldDisableAnimations]);

  return (
    <PageLayout
      title="Who we are"
      subtitle="Empowering Climate Innovation in Kenya"
      description="Kenya Climate Innovation Centre (KCIC) is a leading climate innovation hub fostering sustainable development through technology, entrepreneurship, and strategic partnerships."
      breadcrumb={[
        { label: 'About Us', href: '/about' },
        { label: 'Who we are' },
      ]}
      headerBackgroundImage="/images/africa.jpg"
      headerOverlayClassName="bg-linear-to-r from-[#111827]/75 via-[#111827]/55 to-[#00addd]/35"
      headerTitleClassName="text-white"
      headerSubtitleClassName="text-white"
      headerDescriptionClassName="max-w-2xl"
      headerBreadcrumbClassName="text-white/85"
    >

      {/* ── 1. IMPACT NUMBERS ── solid dark + color accents ───── */}
      <section ref={impactRef} data-gsap-section className="bg-[#111827]">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            {impactParticles.map((particle, index) => (
              <span
                key={`${particle.top}-${particle.left}-${index}`}
                data-gsap-particle
                data-x={particle.x}
                data-y={particle.y}
                data-duration={particle.duration}
                className={`absolute rounded-full blur-[1px] ${particle.color}`}
                style={{
                  top: particle.top,
                  left: particle.left,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  opacity: 0.42
                }}
              />
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#80c738]"
          >
            Impact at a glance
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            viewport={{ once: true }}
            className="mb-12 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl"
          >
            Over a decade of measurable climate impact.
          </motion.h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={`${s.prefix}${s.target}${s.suffix}`}
                data-gsap-stat
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                viewport={{ once: true }}
                className={`rounded-2xl p-6 md:p-8 ${
                  s.color === 'green'
                    ? 'bg-[#80c738]'
                    : s.color === 'blue'
                      ? 'bg-[#00addd]'
                      : s.color === 'dark'
                        ? 'bg-white/10 border border-white/10'
                        : 'bg-[#8b8d90]'
                }`}
              >
                <p className={`text-4xl font-bold tracking-tight md:text-5xl ${
                  s.color === 'dark' ? 'text-white' : 'text-white'
                }`}>
                  <span
                    data-gsap-counter
                    data-target={s.target}
                    data-prefix={s.prefix}
                    data-suffix={s.suffix}
                  >
                    {formatCounterValue(0, s.prefix, s.suffix)}
                  </span>
                </p>
                <p className={`mt-2 text-sm font-medium ${
                  s.color === 'dark' ? 'text-white/70' : 'text-white/85'
                }`}>
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. MISSION + VISION ── solid brand color split ──────── */}
      <section ref={splitRef} data-gsap-section className="grid md:grid-cols-2">
        {/* Mission — KCIC Green */}
        <motion.div
          data-gsap-split="left"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-[#80c738] px-8 py-16 md:px-14 md:py-20"
        >
          {/* decorative circle */}
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10" />
          <div className="absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-white/10" />

          <div className="relative">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
              <Target className="h-7 w-7 text-white" weight="fill" />
            </div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-white/70">
              Our Mission
            </p>
            <h2 className="text-3xl font-bold leading-snug text-white md:text-4xl">
              We catalyze climate entrepreneurship.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/85">
              By nurturing bold ideas into market-ready ventures, we deliver measurable environmental and economic impact across Kenya and East Africa.
            </p>
          </div>
        </motion.div>

        {/* Vision — KCIC Blue */}
        <motion.div
          data-gsap-split="right"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-[#00addd] px-8 py-16 md:px-14 md:py-20"
        >
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10" />
          <div className="absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-white/10" />

          <div className="relative">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
              <Compass className="h-7 w-7 text-white" weight="fill" />
            </div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-white/70">
              Our Vision
            </p>
            <h2 className="text-3xl font-bold leading-snug text-white md:text-4xl">
              Sustainable enterprises. Climate-resilient communities.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/85">
              A future where every Kenyan community thrives through innovation, clean technology, and climate-smart economic growth.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── 3. OUR STORY ── dark left panel + timeline ─────────── */}
      <section ref={storyRef} data-gsap-section className="grid md:grid-cols-[420px_1fr]">
        {/* Left: dark label panel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col justify-between bg-[#111827] px-8 py-16 md:px-12 md:py-20"
        >
          <div>
            <Leaf className="h-10 w-10 text-[#80c738]" weight="fill" />
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-[#80c738]">
              Our Story
            </p>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-white md:text-5xl">
              12 years of<br />
              <span className="text-[#80c738]">climate</span>{' '}
              <span className="text-[#00addd]">impact.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/70">
              From a World Bank pilot to Kenya&apos;s most recognised climate innovation hub — our journey is one of bold bets, deep partnerships, and lasting change.
            </p>
          </div>

          <div className="mt-10 flex items-center gap-2 text-sm font-semibold text-[#80c738]">
            <ArrowRight className="h-4 w-4" weight="bold" />
            <span>Read our annual reports</span>
          </div>
        </motion.div>

        {/* Right: timeline */}
        <div className="bg-white px-8 py-16 md:px-14 md:py-20">
          <div className="relative border-l-2 border-[#80c738]/30 pl-8 space-y-10">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                data-gsap-timeline
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* dot */}
                <span className="absolute -left-[2.65rem] top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#80c738]">
                  <span className="h-2 w-2 rounded-full bg-white" />
                </span>

                <div className="flex items-baseline gap-4">
                  <span className="text-2xl font-bold text-[#80c738]">{item.year}</span>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8b8d90]">
                    {item.label}
                  </span>
                </div>
                <p className="mt-2 text-base leading-relaxed text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. BRAND BANNER ── full-bleed green ─────────────────── */}
      <section ref={bannerRef} data-gsap-section className="bg-[#80c738] px-4 py-14 text-center md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-white/70">
            Kenya Climate Innovation Centre
          </p>
          <p className="mx-auto max-w-3xl text-2xl font-bold leading-snug text-white md:text-4xl">
            &ldquo;We combine entrepreneurship, technology, and strategic partnerships to turn climate challenges into lasting opportunity.&rdquo;
          </p>
       
        </motion.div>
      </section>

      {/* ── 5. VALUES ── full-bleed nature image + overlay ──────── */}
      <section ref={valuesRef} data-gsap-section className="relative isolate overflow-hidden py-20 md:py-28">
        {/* background image */}
        <div
          data-gsap-parallax
          className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/sectors/nature.jpg')" }}
        />
        {/* layered overlay: deep dark + brand green tint so image reads but is clearly branded */}
        <div className="absolute inset-0 -z-10 bg-linear-to-br from-[#111827]/90 via-[#111827]/75 to-[#80c738]/40" />
        {/* subtle noise texture via a fine grid of dots */}
        <div className="absolute inset-0 -z-10 opacity-[0.04] bg-[radial-gradient(circle,#fff_1px,transparent_1px)] bg-size-[20px_20px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true }}
            className="mb-14 flex flex-col items-center text-center"
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#80c738]">
              What drives us
            </p>
            <h2 className="text-4xl font-bold text-white md:text-5xl">Our Values</h2>
            <p className="mt-4 max-w-xl text-base text-white/60">
              Six principles that guide every decision, every partnership, and every innovation we champion.
            </p>
          </motion.div>

          {/* value cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {values.map(({ title, description, Icon }, i) => {
              const palette =
                i % 3 === 0
                  ? {
                      bg: 'bg-[#80c738]',
                      border: 'border-[#80c738]',
                      iconBg: 'bg-white/20',
                      iconColor: 'text-white',
                      text: 'text-white',
                      sub: 'text-white/80',
                    }
                  : i % 3 === 1
                    ? {
                        bg: 'bg-[#00addd]',
                        border: 'border-[#00addd]',
                        iconBg: 'bg-white/20',
                        iconColor: 'text-white',
                        text: 'text-white',
                        sub: 'text-white/80',
                      }
                    : {
                        bg: 'bg-white/10 backdrop-blur-sm',
                        border: 'border border-white/20',
                        iconBg: 'bg-[#80c738]/25',
                        iconColor: 'text-[#80c738]',
                        text: 'text-white',
                        sub: 'text-white/60',
                      };

              return (
                <motion.div
                  key={title}
                  data-gsap-value
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  viewport={{ once: true }}
                  className={`group rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${palette.bg} ${palette.border}`}
                >
                  <div className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl ${palette.iconBg} ${palette.iconColor}`}>
                    <Icon className="h-5 w-5" weight="fill" />
                  </div>
                  <h3 className={`text-xl font-bold tracking-tight ${palette.text}`}>{title}</h3>
                  <p className={`mt-2 text-sm leading-relaxed ${palette.sub}`}>{description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

    </PageLayout>
  );
}

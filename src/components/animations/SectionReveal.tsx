"use client";

import { useRef, useLayoutEffect, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motionUtils } from "@/lib/animations";

interface SectionRevealProps {
    children: ReactNode;
    className?: string;
    /** Animation direction: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale' */
    direction?: "up" | "down" | "left" | "right" | "fade" | "scale";
    /** Delay before animation starts (seconds) */
    delay?: number;
    /** Animation duration (seconds) */
    duration?: number;
    /** Distance to travel (pixels) */
    distance?: number;
    /** Scroll trigger start position */
    start?: string;
    /** Stagger children animations */
    stagger?: boolean;
    /** Stagger delay between children (seconds) */
    staggerDelay?: number;
    /** Enable parallax effect */
    parallax?: boolean;
    /** Parallax speed multiplier */
    parallaxSpeed?: number;
    /** Custom ID for the section */
    id?: string;
}

/**
 * SectionReveal - A reusable wrapper that applies GSAP scroll-triggered animations
 * Respects prefers-reduced-motion and adapts to device performance
 */
export function SectionReveal({
    children,
    className = "",
    direction = "up",
    delay = 0,
    duration = 0.8,
    distance = 60,
    start = "top 80%",
    stagger = false,
    staggerDelay = 0.1,
    parallax = false,
    parallaxSpeed = 0.3,
    id,
}: SectionRevealProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        // Respect reduced motion preferences
        if (motionUtils.prefersReducedMotion()) {
            if (sectionRef.current) {
                sectionRef.current.style.opacity = "1";
            }
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const section = sectionRef.current;
            const content = contentRef.current;
            if (!section || !content) return;

            // Calculate initial transform based on direction
            const getInitialProps = () => {
                switch (direction) {
                    case "up":
                        return { y: distance, opacity: 0 };
                    case "down":
                        return { y: -distance, opacity: 0 };
                    case "left":
                        return { x: -distance, opacity: 0 };
                    case "right":
                        return { x: distance, opacity: 0 };
                    case "scale":
                        return { scale: 0.9, opacity: 0 };
                    case "fade":
                    default:
                        return { opacity: 0 };
                }
            };

            const getFinalProps = () => {
                switch (direction) {
                    case "up":
                    case "down":
                        return { y: 0, opacity: 1 };
                    case "left":
                    case "right":
                        return { x: 0, opacity: 1 };
                    case "scale":
                        return { scale: 1, opacity: 1 };
                    case "fade":
                    default:
                        return { opacity: 1 };
                }
            };

            // Main reveal animation
            if (stagger) {
                // Animate children with stagger
                const children = content.children;
                gsap.fromTo(
                    children,
                    getInitialProps(),
                    {
                        ...getFinalProps(),
                        duration,
                        delay,
                        stagger: staggerDelay,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: section,
                            start,
                            toggleActions: "play none none none",
                            once: true,
                        },
                    }
                );
            } else {
                // Animate entire section
                gsap.fromTo(
                    content,
                    getInitialProps(),
                    {
                        ...getFinalProps(),
                        duration,
                        delay,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: section,
                            start,
                            toggleActions: "play none none none",
                            once: true,
                        },
                    }
                );
            }

            // Parallax effect
            if (parallax) {
                gsap.to(content, {
                    y: () => -window.innerHeight * parallaxSpeed,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1,
                    },
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, [direction, delay, duration, distance, start, stagger, staggerDelay, parallax, parallaxSpeed]);

    return (
        <div ref={sectionRef} id={id} className={className}>
            <div ref={contentRef}>{children}</div>
        </div>
    );
}

/**
 * ScrollProgress - A thin progress bar at the top of the viewport
 */
export function ScrollProgress() {
    const progressRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (motionUtils.prefersReducedMotion()) return;

        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            gsap.to(progressRef.current, {
                scaleX: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: document.documentElement,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.3,
                },
            });
        });

        return () => ctx.revert();
    }, []);

    if (motionUtils.prefersReducedMotion()) return null;

    return (
        <div
            ref={progressRef}
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-climate-green via-climate-blue to-climate-green z-[100] origin-left"
            style={{ transform: "scaleX(0)" }}
            aria-hidden="true"
        />
    );
}

/**
 * TextReveal - Animates text character by character or word by word
 */
interface TextRevealProps {
    children: string;
    className?: string;
    type?: "char" | "word";
    duration?: number;
    stagger?: number;
}

export function TextReveal({
    children,
    className = "",
    type = "word",
    duration = 0.5,
    stagger = 0.02,
}: TextRevealProps) {
    const containerRef = useRef<HTMLSpanElement>(null);

    useLayoutEffect(() => {
        if (motionUtils.prefersReducedMotion()) return;

        gsap.registerPlugin(ScrollTrigger);

        const container = containerRef.current;
        if (!container) return;

        const ctx = gsap.context(() => {
            const elements = container.querySelectorAll(".reveal-item");

            gsap.fromTo(
                elements,
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration,
                    stagger,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: container,
                        start: "top 85%",
                        toggleActions: "play none none none",
                        once: true,
                    },
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, [duration, stagger]);

    const items = type === "char" ? children.split("") : children.split(" ");

    return (
        <span ref={containerRef} className={className}>
            {items.map((item, index) => (
                <span
                    key={index}
                    className="reveal-item inline-block"
                    style={{ opacity: motionUtils.prefersReducedMotion() ? 1 : 0 }}
                >
                    {item}
                    {type === "word" && index < items.length - 1 ? "\u00A0" : ""}
                </span>
            ))}
        </span>
    );
}

/**
 * CountUp - Animates a number from 0 to target value
 */
interface CountUpProps {
    target: number;
    duration?: number;
    prefix?: string;
    suffix?: string;
    className?: string;
    decimals?: number;
}

export function CountUp({
    target,
    duration = 2,
    prefix = "",
    suffix = "",
    className = "",
    decimals = 0,
}: CountUpProps) {
    const numberRef = useRef<HTMLSpanElement>(null);
    const hasAnimated = useRef(false);

    useLayoutEffect(() => {
        if (motionUtils.prefersReducedMotion() || hasAnimated.current) {
            if (numberRef.current) {
                numberRef.current.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
            }
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const obj = { value: 0 };

            gsap.to(obj, {
                value: target,
                duration,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: numberRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none",
                    once: true,
                    onEnter: () => {
                        hasAnimated.current = true;
                    },
                },
                onUpdate: () => {
                    if (numberRef.current) {
                        numberRef.current.textContent = `${prefix}${obj.value.toFixed(decimals)}${suffix}`;
                    }
                },
            });
        });

        return () => ctx.revert();
    }, [target, duration, prefix, suffix, decimals]);

    return (
        <span ref={numberRef} className={className}>
            {motionUtils.prefersReducedMotion() ? `${prefix}${target.toFixed(decimals)}${suffix}` : `${prefix}0${suffix}`}
        </span>
    );
}

/**
 * ParallaxImage - Image with parallax scroll effect
 */
interface ParallaxImageProps {
    src: string;
    alt: string;
    className?: string;
    speed?: number;
}

export function ParallaxImage({
    src,
    alt,
    className = "",
    speed = 0.2,
}: ParallaxImageProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    useLayoutEffect(() => {
        if (motionUtils.prefersReducedMotion()) return;

        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            gsap.to(imageRef.current, {
                y: () => -100 * speed,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, [speed]);

    return (
        <div ref={containerRef} className={`overflow-hidden ${className}`}>
            <img
                ref={imageRef}
                src={src}
                alt={alt}
                className="w-full h-auto will-change-transform"
                style={{ transform: "translateY(10%)" }}
            />
        </div>
    );
}

/**
 * StaggeredList - Animate list items with stagger
 */
interface StaggeredListProps {
    children: ReactNode[];
    className?: string;
    itemClassName?: string;
    stagger?: number;
    direction?: "up" | "left" | "right";
}

export function StaggeredList({
    children,
    className = "",
    itemClassName = "",
    stagger = 0.1,
    direction = "up",
}: StaggeredListProps) {
    const listRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (motionUtils.prefersReducedMotion()) return;

        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const items = listRef.current?.querySelectorAll(".stagger-item");
            if (!items) return;

            const getInitial = () => {
                switch (direction) {
                    case "up":
                        return { y: 40, opacity: 0 };
                    case "left":
                        return { x: -40, opacity: 0 };
                    case "right":
                        return { x: 40, opacity: 0 };
                    default:
                        return { y: 40, opacity: 0 };
                }
            };

            gsap.fromTo(
                items,
                getInitial(),
                {
                    y: 0,
                    x: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: listRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none",
                        once: true,
                    },
                }
            );
        }, listRef);

        return () => ctx.revert();
    }, [stagger, direction]);

    return (
        <div ref={listRef} className={className}>
            {children.map((child, index) => (
                <div
                    key={index}
                    className={`stagger-item ${itemClassName}`}
                    style={{ opacity: motionUtils.prefersReducedMotion() ? 1 : 0 }}
                >
                    {child}
                </div>
            ))}
        </div>
    );
}

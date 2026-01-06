/**
 * GSAP Animation Utilities
 * Enhanced scroll-linked animations for the KCIC landing page
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motionUtils } from "./animations";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * Create a smooth reveal animation for any element
 */
export function createRevealAnimation(
    element: Element | null,
    options: {
        direction?: "up" | "down" | "left" | "right";
        distance?: number;
        duration?: number;
        delay?: number;
        start?: string;
    } = {}
) {
    if (!element || motionUtils.prefersReducedMotion()) return;

    const {
        direction = "up",
        distance = 50,
        duration = 0.8,
        delay = 0,
        start = "top 80%",
    } = options;

    const getFromProps = () => {
        switch (direction) {
            case "up":
                return { y: distance, opacity: 0 };
            case "down":
                return { y: -distance, opacity: 0 };
            case "left":
                return { x: -distance, opacity: 0 };
            case "right":
                return { x: distance, opacity: 0 };
        }
    };

    return gsap.fromTo(
        element,
        getFromProps(),
        {
            y: 0,
            x: 0,
            opacity: 1,
            duration,
            delay,
            ease: "power3.out",
            scrollTrigger: {
                trigger: element,
                start,
                toggleActions: "play none none none",
                once: true,
            },
        }
    );
}

/**
 * Create staggered reveal for multiple elements
 */
export function createStaggeredReveal(
    elements: Element[] | NodeListOf<Element> | null,
    options: {
        direction?: "up" | "down" | "left" | "right";
        distance?: number;
        duration?: number;
        stagger?: number;
        start?: string;
    } = {}
) {
    if (!elements || motionUtils.prefersReducedMotion()) return;

    const {
        direction = "up",
        distance = 40,
        duration = 0.6,
        stagger = 0.1,
        start = "top 80%",
    } = options;

    const getFromProps = () => {
        switch (direction) {
            case "up":
                return { y: distance, opacity: 0 };
            case "down":
                return { y: -distance, opacity: 0 };
            case "left":
                return { x: -distance, opacity: 0 };
            case "right":
                return { x: distance, opacity: 0 };
        }
    };

    return gsap.fromTo(
        elements,
        getFromProps(),
        {
            y: 0,
            x: 0,
            opacity: 1,
            duration,
            stagger,
            ease: "power2.out",
            scrollTrigger: {
                trigger: elements[0] || elements,
                start,
                toggleActions: "play none none none",
                once: true,
            },
        }
    );
}

/**
 * Create a parallax scrolling effect
 */
export function createParallax(
    element: Element | null,
    options: {
        speed?: number;
        direction?: "vertical" | "horizontal";
    } = {}
) {
    if (!element || motionUtils.prefersReducedMotion()) return;

    const { speed = 0.3, direction = "vertical" } = options;

    const prop = direction === "vertical" ? "y" : "x";
    const movement = window.innerHeight * speed;

    return gsap.to(element, {
        [prop]: -movement,
        ease: "none",
        scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
        },
    });
}

/**
 * Create a count-up animation for numbers
 */
export function createCountUp(
    element: Element | null,
    targetValue: number,
    options: {
        duration?: number;
        prefix?: string;
        suffix?: string;
        decimals?: number;
        start?: string;
    } = {}
) {
    if (!element || motionUtils.prefersReducedMotion()) {
        if (element) {
            element.textContent = `${options.prefix || ""}${targetValue}${options.suffix || ""}`;
        }
        return;
    }

    const {
        duration = 2,
        prefix = "",
        suffix = "",
        decimals = 0,
        start = "top 80%",
    } = options;

    const obj = { value: 0 };

    return gsap.to(obj, {
        value: targetValue,
        duration,
        ease: "power2.out",
        scrollTrigger: {
            trigger: element,
            start,
            toggleActions: "play none none none",
            once: true,
        },
        onUpdate: () => {
            element.textContent = `${prefix}${obj.value.toFixed(decimals)}${suffix}`;
        },
    });
}

/**
 * Create a text split and reveal animation
 */
export function createTextReveal(
    element: Element | null,
    options: {
        type?: "char" | "word" | "line";
        duration?: number;
        stagger?: number;
        start?: string;
    } = {}
) {
    if (!element || motionUtils.prefersReducedMotion()) return;

    const { type = "word", duration = 0.5, stagger = 0.02, start = "top 85%" } = options;

    const text = element.textContent || "";
    let items: string[];

    switch (type) {
        case "char":
            items = text.split("");
            break;
        case "word":
            items = text.split(" ");
            break;
        case "line":
            items = text.split("\n");
            break;
    }

    // Replace content with animated spans
    element.innerHTML = items
        .map(
            (item, i) =>
                `<span class="reveal-item inline-block" style="opacity:0">${item}${type === "word" && i < items.length - 1 ? "&nbsp;" : ""
                }</span>`
        )
        .join("");

    const spans = element.querySelectorAll(".reveal-item");

    return gsap.fromTo(
        spans,
        { y: 20, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration,
            stagger,
            ease: "power2.out",
            scrollTrigger: {
                trigger: element,
                start,
                toggleActions: "play none none none",
                once: true,
            },
        }
    );
}

/**
 * Create a scale-in animation with rotation
 */
export function createScaleRotate(
    element: Element | null,
    options: {
        scale?: number;
        rotation?: number;
        duration?: number;
        start?: string;
    } = {}
) {
    if (!element || motionUtils.prefersReducedMotion()) return;

    const { scale = 0.8, rotation = 5, duration = 0.8, start = "top 80%" } = options;

    return gsap.fromTo(
        element,
        { scale, rotation, opacity: 0 },
        {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: element,
                start,
                toggleActions: "play none none none",
                once: true,
            },
        }
    );
}

/**
 * Create a clip-path reveal animation
 */
export function createClipReveal(
    element: Element | null,
    options: {
        direction?: "left" | "right" | "top" | "bottom" | "center";
        duration?: number;
        start?: string;
    } = {}
) {
    if (!element || motionUtils.prefersReducedMotion()) return;

    const { direction = "left", duration = 1, start = "top 80%" } = options;

    const getClipPath = () => {
        switch (direction) {
            case "left":
                return { from: "inset(0 100% 0 0)", to: "inset(0 0% 0 0)" };
            case "right":
                return { from: "inset(0 0 0 100%)", to: "inset(0 0 0 0%)" };
            case "top":
                return { from: "inset(0 0 100% 0)", to: "inset(0 0 0% 0)" };
            case "bottom":
                return { from: "inset(100% 0 0 0)", to: "inset(0% 0 0 0)" };
            case "center":
                return { from: "inset(50% 50% 50% 50%)", to: "inset(0% 0% 0% 0%)" };
        }
    };

    const clipPaths = getClipPath();

    return gsap.fromTo(
        element,
        { clipPath: clipPaths.from },
        {
            clipPath: clipPaths.to,
            duration,
            ease: "power3.out",
            scrollTrigger: {
                trigger: element,
                start,
                toggleActions: "play none none none",
                once: true,
            },
        }
    );
}

/**
 * Create a magnetic hover effect for buttons
 */
export function createMagneticEffect(button: HTMLElement | null) {
    if (!button || motionUtils.prefersReducedMotion()) return;

    const strength = 0.3;

    const handleMouseMove = (e: MouseEvent) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(button, {
            x: x * strength,
            y: y * strength,
            duration: 0.3,
            ease: "power2.out",
        });
    };

    const handleMouseLeave = () => {
        gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)",
        });
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    // Return cleanup function
    return () => {
        button.removeEventListener("mousemove", handleMouseMove);
        button.removeEventListener("mouseleave", handleMouseLeave);
    };
}

/**
 * Create a timeline-drawing animation
 */
export function createTimelineDrawing(
    line: Element | null,
    options: {
        duration?: number;
        start?: string;
        end?: string;
    } = {}
) {
    if (!line || motionUtils.prefersReducedMotion()) return;

    const { duration = 2, start = "top 80%", end = "bottom 60%" } = options;

    return gsap.fromTo(
        line,
        { scaleY: 0, transformOrigin: "top center" },
        {
            scaleY: 1,
            duration,
            ease: "none",
            scrollTrigger: {
                trigger: line,
                start,
                end,
                scrub: 1,
            },
        }
    );
}

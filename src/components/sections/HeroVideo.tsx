"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Pause, Play } from "@phosphor-icons/react";
import { colors, typography } from "@/lib/design-system";
import { useAccessibilityClasses } from "@/hooks/use-accessibility-classes";

interface HeroVideoProps {
  data: {
    title: string;
    description: string;
    ctaButtons: Array<{
      text: string;
      href: string;
      variant: "primary" | "secondary";
    }>;
  };
  videoSrc?: string;
  posterImage?: string;
}

export function HeroVideo({ 
  data, 
  videoSrc = "/video/hero-video.mp4",
  posterImage = "/images/news/slide1.jpg"
}: HeroVideoProps) {
  const { getMotionSafeClasses, shouldDisableAnimations } = useAccessibilityClasses();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => setIsLoaded(true);
    video.addEventListener("canplay", handleCanPlay);

    // Attempt autoplay
    if (isPlaying && !shouldDisableAnimations()) {
      video.play().catch(() => {
        // Autoplay blocked, that's okay
        setIsPlaying(false);
      });
    }

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, [shouldDisableAnimations, isPlaying]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        {/* Video Element */}
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            filter: "brightness(0.7) saturate(1.1)",
          }}
          autoPlay
          muted
          loop
          playsInline
          poster={posterImage}
          preload="auto"
        >
          <source src={videoSrc} type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          Your browser does not support the video tag.
        </video>

        {/* Poster/Fallback Image (shown while video loads) */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            isLoaded ? "opacity-0" : "opacity-100"
          }`}
          style={{
            backgroundImage: `url(${posterImage})`,
          }}
        />

        {/* Multi-layer Gradient Overlays for depth and text readability */}
        {/* Primary dark overlay */}
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Radial gradient for cinematic vignette effect */}
        <div 
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.6) 100%)",
          }}
        />
        
        {/* Bottom gradient for content area */}
        <div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 40%, transparent 60%)",
          }}
        />

        {/* Top gradient for navbar area */}
        <div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 25%)",
          }}
        />

        {/* Subtle color tint for brand consistency */}
        <div 
          className="absolute inset-0 mix-blend-soft-light opacity-30"
          style={{
            background: `linear-gradient(135deg, ${colors.primary.green.DEFAULT}20 0%, transparent 50%, ${colors.primary.blue.DEFAULT}20 100%)`,
          }}
        />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {/* Floating particles effect */}
        {!shouldDisableAnimations() && (
          <>
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/10 rounded-full animate-pulse" style={{ animationDuration: "3s" }} />
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/20 rounded-full animate-pulse" style={{ animationDuration: "4s", animationDelay: "1s" }} />
            <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-white/15 rounded-full animate-pulse" style={{ animationDuration: "5s", animationDelay: "2s" }} />
          </>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-6xl text-center">
          {/* Badge/Label */}
          <div 
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${getMotionSafeClasses("animate-in fade-in slide-in-from-bottom-4 duration-700")}`}
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <span 
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: colors.primary.green.DEFAULT }}
            />
            <span 
              className="text-sm font-medium tracking-wide"
              style={{ color: "rgba(255,255,255,0.9)" }}
            >
              Kenya Climate Innovation Center
            </span>
          </div>

          {/* Main Title */}
          <h1
            className={`font-bold mb-6 ${getMotionSafeClasses("animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150")}`}
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontFamily: typography.fonts.heading,
              lineHeight: typography.lineHeights.tight,
              letterSpacing: typography.letterSpacing.tight,
              color: "#FFFFFF",
              textShadow: "0 4px 30px rgba(0,0,0,0.4)",
            }}
          >
            {data.title}
          </h1>

          {/* Subtitle/Description */}
          <h2
            className={`mx-auto max-w-3xl font-semibold mb-10 ${getMotionSafeClasses("animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300")}`}
            style={{
              fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
              fontFamily: typography.fonts.heading,
              lineHeight: typography.lineHeights.relaxed,
              letterSpacing: typography.letterSpacing.normal,
              color: colors.primary.green.DEFAULT,
              textShadow: "0 2px 15px rgba(0,0,0,0.3)",
            }}
          >
            {data.description}
          </h2>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${getMotionSafeClasses("animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500")}`}
          >
            {data.ctaButtons.map((button) => (
              <Button
                key={button.text}
                size="lg"
                className={
                  button.variant === "primary"
                    ? "group px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 border-none hover:scale-105 hover:shadow-2xl"
                    : "group px-8 py-4 text-lg font-semibold rounded-full bg-white/10 backdrop-blur-sm border-2 transition-all duration-300 hover:bg-white/20 hover:scale-105"
                }
                style={
                  button.variant === "primary"
                    ? {
                        backgroundColor: colors.primary.green.DEFAULT,
                        color: "#FFFFFF",
                        fontFamily: typography.fonts.body,
                        boxShadow: `0 10px 40px ${colors.primary.green.DEFAULT}40`,
                      }
                    : {
                        borderColor: "rgba(255,255,255,0.4)",
                        color: "#FFFFFF",
                        fontFamily: typography.fonts.body,
                      }
                }
                asChild
              >
                <a href={button.href} className="flex items-center justify-center space-x-2 min-w-[200px]">
                  <span>{button.text}</span>
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Video Controls */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
        {/* Play/Pause Button */}
        <button
          aria-label={isPlaying ? "Pause video" : "Play video"}
          onClick={togglePlay}
          className="inline-flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm p-3 transition-all duration-300 hover:scale-110"
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" weight="fill" />
          ) : (
            <Play className="h-4 w-4" weight="fill" />
          )}
        </button>

        
      </div>

      {/* Scroll Indicator */}
      <div 
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 ${getMotionSafeClasses("animate-bounce")}`}
        style={{ animationDuration: "2s" }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/60 text-xs font-medium tracking-widest uppercase">Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <div 
              className={`w-1 h-2 rounded-full bg-white/60 ${getMotionSafeClasses("animate-pulse")}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { useAccessibilityClasses } from "@/hooks/use-accessibility-classes";
import { cn } from "@/lib/utils";
import { JSX } from "react/jsx-runtime";


interface AccessibilityWrapperProps {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  type?: "heading" | "body" | "interactive" | "form" | "container";
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  preserveAnimations?: boolean;
  [key: string]: unknown;
}

/**
 * A wrapper component that applies accessibility enhancements to its children
 * This component automatically applies font scaling, contrast, and motion preferences
 */
export function AccessibilityWrapper({
  children,
  as: Component = "div",
  className,
  type = "container",
  headingLevel = 1,
  preserveAnimations = false,
  ...props
}: AccessibilityWrapperProps) {
  const {
    getHeadingClasses,
    getBodyTextClasses,
    getInteractiveClasses,
    getFormClasses,
    getContainerClasses,
    shouldDisableAnimations,
  } = useAccessibilityClasses();

  // Get appropriate classes based on type
  const getTypeClasses = () => {
    switch (type) {
      case "heading":
        return getHeadingClasses(headingLevel);
      case "body":
        return getBodyTextClasses();
      case "interactive":
        return getInteractiveClasses();
      case "form":
        return getFormClasses();
      case "container":
      default:
        return getContainerClasses();
    }
  };

  // Handle animation classes
  const processClassName = (originalClassName?: string) => {
    if (!originalClassName) return getTypeClasses();

    if (!preserveAnimations && shouldDisableAnimations()) {
      // Remove animation classes if animations should be disabled
      const animationClassPatterns = [
        /animate-\w+/g,
        /transition-\w+/g,
        /duration-\w+/g,
        /ease-\w+/g,
        /hover:scale-\w+/g,
        /hover:translate-\w+/g,
        /hover:rotate-\w+/g,
      ];

      let processedClassName = originalClassName;
      animationClassPatterns.forEach((pattern) => {
        processedClassName = processedClassName.replace(pattern, "");
      });

      return cn(getTypeClasses(), processedClassName);
    }

    return cn(getTypeClasses(), originalClassName);
  };

  const finalClassName = processClassName(className);

  // Type assertion to fix TypeScript issue with dynamic components
  const DynamicComponent = Component as React.ElementType;

  return (
    <DynamicComponent className={finalClassName} {...props}>
      {children}
    </DynamicComponent>
  );
}

/**
 * Specific wrapper components for common use cases
 */

export function AccessibleHeading({
  level = 1,
  children,
  className,
  ...props
}: {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}) {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <AccessibilityWrapper
      as={HeadingTag}
      type="heading"
      headingLevel={level}
      className={className}
      {...props}
    >
      {children}
    </AccessibilityWrapper>
  );
}

export function AccessibleText({
  children,
  className,
  as = "p",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  [key: string]: unknown;
}) {
  return (
    <AccessibilityWrapper as={as} type="body" className={className} {...props}>
      {children}
    </AccessibilityWrapper>
  );
}

export function AccessibleButton({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}) {
  return (
    <AccessibilityWrapper
      as="button"
      type="interactive"
      className={className}
      {...props}
    >
      {children}
    </AccessibilityWrapper>
  );
}

export function AccessibleLink({
  children,
  className,
  href,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
  [key: string]: unknown;
}) {
  return (
    <AccessibilityWrapper
      as="a"
      type="interactive"
      className={className}
      href={href}
      {...props}
    >
      {children}
    </AccessibilityWrapper>
  );
}

export function AccessibleContainer({
  children,
  className,
  as = "div",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  [key: string]: unknown;
}) {
  return (
    <AccessibilityWrapper
      as={as}
      type="container"
      className={className}
      {...props}
    >
      {children}
    </AccessibilityWrapper>
  );
}

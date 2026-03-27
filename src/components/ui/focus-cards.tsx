"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

type FocusCardItem = {
  key: string;
  content: React.ReactNode;
  className?: string;
};

interface FocusCardsProps {
  items: FocusCardItem[];
  className?: string;
  gridClassName?: string;
}

export function FocusCards({
  items,
  className,
  gridClassName,
}: FocusCardsProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6",
        gridClassName,
        className
      )}
    >
      {items.map((item, index) => (
        <div
          key={item.key}
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
          className={cn(
            "transition-all duration-300 ease-out",
            hovered !== null && hovered !== index && "scale-[0.992] opacity-80"
          )}
        >
          <div
            className={cn(
              "h-full transition-transform duration-300 ease-out",
              hovered === index && "md:-translate-y-1",
              item.className
            )}
          >
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
}

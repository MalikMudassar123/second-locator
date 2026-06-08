"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  stagger?: number;
  /** when set, staggers immediate children matching this selector */
  childSelector?: string;
}

/** Declarative wrapper around useScrollReveal for the standard
 *  opacity:0->1, y:80->0, duration:1.2, power3.out reveal. */
export default function Reveal({
  children,
  className,
  y,
  delay,
  stagger,
  childSelector,
}: RevealProps) {
  const ref = useScrollReveal<HTMLDivElement>({ y, delay, stagger, childSelector });
  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}

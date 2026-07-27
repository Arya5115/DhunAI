import { useEffect, useRef } from "react";
import { useGsap } from "../lib/gsap";

/**
 * Fades + slides in matching elements inside the returned ref whenever `deps` change
 * (typically when async data finishes loading). Respects prefers-reduced-motion.
 */
export function useCardReveal<T extends HTMLElement>(selector: string, deps: unknown[]) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const { gsap } = useGsap();
    const targets = containerRef.current.querySelectorAll(selector);
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        opacity: 0,
        y: 24,
        stagger: 0.08,
        duration: 0.5,
        ease: "power2.out"
      });
    });

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return containerRef;
}

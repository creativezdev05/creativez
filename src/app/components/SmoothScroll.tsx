'use client';

import { createContext, useContext, useEffect, useRef, RefObject, ReactNode } from 'react';
import Lenis from 'lenis';

const LenisContext = createContext<RefObject<Lenis | null> | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    let instance: Lenis | null = null;
    let frame = 0;
    let cancelled = false;

    const start = () => {
      if (cancelled) return;
      instance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });
      lenisRef.current = instance;

      const raf = (time: number) => {
        instance?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    };

    const idleId = window.requestIdleCallback?.(start, { timeout: 2000 });
    const timerId = idleId === undefined ? window.setTimeout(start, 1200) : undefined;

    return () => {
      cancelled = true;
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timerId !== undefined) window.clearTimeout(timerId);
      cancelAnimationFrame(frame);
      instance?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>;
}
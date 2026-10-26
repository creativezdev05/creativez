'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

function useCountUp(target: number, start: boolean, decimals: number, duration = 1600) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    let frame: number;
    let startTime: number | null = null;

    const tick = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setValue(Number((progress * target).toFixed(decimals)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, target, decimals, duration]);

  return value;
}

export type StatCounterProps = {
  target: number;
  decimals?: number;
  suffix?: string;
  label?: string;
  delay?: number;
  duration?: number;
  /** Compact number for inline copy. The block layout is used in the About stats row. */
  variant?: 'block' | 'inline';
  className?: string;
};

export default function StatCounter({
  target,
  decimals = 0,
  suffix = '',
  label,
  delay = 0,
  duration = 1600,
  variant = 'block',
  className,
}: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const value = useCountUp(target, isInView, decimals, duration);
  const display = `${value.toFixed(decimals)}${suffix}`;

  if (variant === 'inline') {
    return (
      <span ref={ref} className={className}>
        {display}
      </span>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.1, transition: { duration: 0.3 }, cursor: 'pointer' }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={className ?? 'flex flex-col items-start gap-2'}
    >
      <span ref={ref} className="text-5xl font-semibold text-heading md:text-6xl">
        {display}
      </span>
      {label ? <p className="capitalize text-body">{label}</p> : null}
    </motion.div>
  );
}

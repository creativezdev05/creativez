'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface Stat {
  target: number;
  decimals: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { target: 8, decimals: 0, suffix: 'K+', label: 'Brands designed' },
  { target: 48, decimals: 0, suffix: '%', label: 'Conversion Rate' },
  { target: 5.8, decimals: 1, suffix: 'K+', label: 'projects delivered' },
  { target: 180, decimals: 0, suffix: '+', label: 'measurable results' },
];

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

function StatCounter({ target, decimals, suffix, label, delay }: Stat & { delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const value = useCountUp(target, isInView, decimals);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col items-start gap-2"
    >
      <div className="text-5xl font-semibold text-heading md:text-6xl">
        {value.toFixed(decimals)}
        {suffix}
      </div>
      <p className="capitalize text-body">{label}</p>
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="About" className="px-6 py-24 md:py-32">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-16 md:gap-24">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[0.25fr_1fr] md:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-linear-to-r from-primary-light to-primary-dark opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-linear-to-r from-primary-light to-primary-dark" />
            </span>
            <span className="text-lg font-medium text-heading">Introduction</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-left text-2xl leading-relaxed font-medium text-heading md:text-3xl lg:text-4xl"
          >
            We&apos;re a creative agency driven by design, strategy, and storytelling. Our
            mission is to help brands stand out through bold ideas, thoughtful design, and
            impactful digital experiences.
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 gap-10 md:flex md:flex-row md:justify-between">
          {stats.map((stat, index) => (
            <StatCounter
              key={stat.label}
              target={stat.target}
              decimals={stat.decimals}
              suffix={stat.suffix}
              label={stat.label}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

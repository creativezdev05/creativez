'use client';

import { motion } from 'framer-motion';
import StatCounter from './StatCounter';
import TypedText from './TypedText';

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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className=""
          >
            {/* We&apos;re a creative agency driven by design, strategy, and storytelling. Our
            mission is to help brands stand out through bold ideas, thoughtful design, and
            impactful digital experiences. */}
            <TypedText textStr={`We're a creative agency driven by design, strategy, and storytelling. Our mission is to help brands stand out through bold ideas, thoughtful design, and impactful digital experiences.`}/>
          </motion.div>
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

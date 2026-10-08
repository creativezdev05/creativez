'use client';

import { motion } from 'framer-motion';
import { Sparkle } from 'lucide-react';

const brandWords = ['Strategic Branding', 'Digital Marketing', 'Print Design', 'UIUX Design'];

const statsWords = [
  'Years of experience',
  'Satisfaction service',
  'Over 200 Customers',
  'Strategic Branding',
  'Senior Designer',
];

function MarqueeRow({
  items,
  direction,
  className,
  rotation,
}: {
  items: string[];
  direction: 'left' | 'right';
  className: string;
  rotation: string;
}) {
  const track = [...items, ...items];

  return (
    <div
      className={`relative flex h-[90px] w-[110%] -translate-x-[5%] items-center overflow-hidden md:h-[100px] ${rotation} ${className}`}
    >
      <div
        className={`flex flex-none items-center gap-16 whitespace-nowrap ${
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
        }`}
      >
        {track.map((word, index) => (
          <div key={`${word}-${index}`} className="flex items-center gap-16">
            <span className="text-xl font-semibold text-[#FAFAFA] md:text-2xl">{word}</span>
            <Sparkle className="h-4 w-4 flex-none text-[#FAFAFA]/70" />
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-base to-transparent md:w-48" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-base to-transparent md:w-48" />
    </div>
  );
}

export default function Services() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid"
      >
        <MarqueeRow
          items={brandWords}
          direction="left"
          rotation="-rotate-3"
          className="col-start-1 row-start-1 bg-gradient-to-br from-[#7d64c5] to-[#5a4b99]"
        />
        <MarqueeRow
          items={statsWords}
          direction="right"
          rotation="rotate-3"
          className="col-start-1 row-start-1 bg-black-gradient"
        />
      </motion.div>
    </section>
  );
}

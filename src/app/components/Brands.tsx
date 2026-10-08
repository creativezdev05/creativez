'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const logoSrc =
  'https://cdn.prod.website-files.com/6597ccea909e42269476248f/68f981769f9a7153b33c4ce6_Logo.svg';

const row = Array.from({ length: 8 }, (_, index) => index);
const track = [...row, ...row];

const rows = [
  { direction: 'left' as const },
  { direction: 'right' as const },
  { direction: 'left' as const },
  { direction: 'right' as const },
];

function LogoRow({ direction }: { direction: 'left' | 'right' }) {
  return (
    <div className="flex w-full overflow-hidden">
      <div
        className={`flex flex-none items-center gap-7 ${
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
        }`}
      >
        {track.map((a,index) => (
          <div
            key={`acv-logo-${index}`}
            className="flex h-20 w-32 flex-none items-center justify-center rounded-[1.875rem] bg-[#FAFAFA] px-6 py-4"
          >
            <Image src={`/images/brands/${index + 1}.svg`} alt="Brand partner logo" width={90} height={36} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Brands() {
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[0.25fr_1fr] md:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-linear-to-r from-[#7d64c5] to-[#5a4b99] opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-linear-to-r from-[#7d64c5] to-[#5a4b99]" />
            </span>
            <span className="text-lg font-medium text-heading">Brand Partners</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-left text-2xl leading-relaxed font-medium text-heading md:text-3xl lg:text-4xl"
          >
            We partner with innovative brands to create meaningful and enduring creative
            experiences.
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 flex flex-col gap-7"
        >
          {rows.map((r, index) => (
            <LogoRow key={index} direction={r.direction} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

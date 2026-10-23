'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import TypedText from './TypedText';

const logoIds = Array.from({ length: 44 }, (_, index) => index + 1).filter(
  (id) => id !== 21 && id !== 22,
);

const ROW_COUNT = 4;
const logoRows = Array.from({ length: ROW_COUNT }, (_, rowIndex) =>
  logoIds.filter((_, i) => i % ROW_COUNT === rowIndex),
);

const rows = logoRows.map((ids, index) => ({
  ids,
  direction: index % 2 === 0 ? ('left' as const) : ('right' as const),
}));

function LogoRow({ ids, direction }: { ids: number[]; direction: 'left' | 'right' }) {
  const track = [...ids, ...ids];

  return (
    <div className="flex w-full overflow-hidden">
      <div
        className={`flex flex-none items-center gap-7 ${
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
        }`}
      >
        {track.map((id, index) => (
          <div
            key={`acv-logo-${id}-${index}`}
            className="flex h-20 w-32 flex-none items-center justify-center rounded-[1.875rem] bg-surface px-6 py-4"
          >
            <Image src={`/images/brands/${id}.svg`} alt="Brand partner logo" width={90} height={36} />
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
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-linear-to-r from-primary-light to-primary-dark opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-linear-to-r from-primary-light to-primary-dark" />
            </span>
            <span className="text-lg font-medium text-heading">Technologies</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className=""
          >
            <TypedText textStr={`We partner with ambitious brands to build innovative digital experiences, leveraging modern web technologies, powerful frameworks, and cross-platform mobile solutions to deliver scalable, high-performance products.`}/>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 flex flex-col gap-7"
        >
          {rows.map((r, index) => (
            <LogoRow key={index} ids={r.ids} direction={r.direction} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

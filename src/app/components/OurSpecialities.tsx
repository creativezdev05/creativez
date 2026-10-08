'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Check, LayoutGrid } from 'lucide-react';

interface Capsule {
  label: string;
  className: string;
}

const capsules: Capsule[] = [
  {
    label: 'Long Term',
    className:
      'bottom-[2%] right-[6%] rotate-[-6deg] md:right-[5.5%] md:bottom-[15%] md:rotate-[-14.469deg]',
  },
  {
    label: 'Collaboration',
    className:
      'bottom-[16%] left-[4%] rotate-[5deg] md:bottom-[15%] md:left-[3.8%] md:rotate-[13.754deg]',
  },
  {
    label: 'Personalization',
    className: 'bottom-[30%] right-[8%] rotate-[-4deg] md:right-[32%] md:bottom-[10%] md:rotate-0',
  },
  {
    label: 'Customer Support',
    className:
      'bottom-[44%] left-[2%] rotate-[6deg] md:right-[3%] md:left-auto md:bottom-[38%] md:rotate-[15.794deg]',
  },
  {
    label: 'Customer Support',
    className:
      'bottom-[58%] right-[4%] rotate-[-5deg] md:right-[19%] md:bottom-[27.5%] md:rotate-[-10.14deg]',
  },
  {
    label: 'Passion',
    className:
      'bottom-[72%] left-[8%] rotate-[4deg] md:bottom-[27%] md:left-[20%] md:rotate-[15deg]',
  },
  {
    label: 'Collaboration',
    className:
      'bottom-[86%] right-[2%] rotate-[-6deg] md:bottom-[40%] md:left-[4%] md:right-auto md:rotate-[-28deg]',
  },
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

function StatCounter({
  target,
  decimals = 0,
  prefix = '',
  suffix = '',
  className,
}: {
  target: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const value = useCountUp(target, isInView, decimals);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function OurSpecialities() {
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-16">
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
            <span className="text-lg font-medium text-heading">Our Specialities</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-left text-2xl leading-relaxed font-medium text-heading md:text-3xl lg:text-4xl"
          >
            We specialize in the art of transforming vision into visual identity. With expertise
            in branding, digital design, and creative direction, we design experiences that
            captivate audiences.
          </motion.h2>
        </div>

        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.65fr]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative flex min-h-[460px] flex-col justify-between gap-10 overflow-hidden rounded-[2.5rem] bg-[#FAFAFA] p-8 md:flex-row md:items-center md:p-14"
            >
              <Image
                src="https://cdn.prod.website-files.com/6597ccea909e42269476248f/68e3a85f9ef6b3ffe52e3d2e_Vector%202%20(1).webp"
                alt=""
                aria-hidden
                width={639}
                height={460}
                className="pointer-events-none absolute top-0 right-0 h-full w-full max-w-[639px] object-cover opacity-80"
              />

              <div className="relative z-10 flex h-full flex-col justify-between gap-10">
                <p className="max-w-xs text-base text-[#3d4048]/70">
                  Discover the beauty of nature in every moment. Embrace the tranquility that
                  surrounds you.
                </p>
                <div className="flex flex-col gap-2">
                  <StatCounter
                    target={150}
                    suffix="%"
                    className="text-5xl font-semibold text-[#3d4048] md:text-6xl"
                  />
                  <h4 className="text-xl font-semibold text-[#3d4048]">
                    Average Traffic Increase
                  </h4>
                </div>
              </div>

              <div className="relative z-10 hidden h-44 w-44 flex-none md:block">
                <Image
                  src="https://cdn.prod.website-files.com/6597ccea909e42269476248f/68e9caf79947d9e2d1e4af82_Group%2022.svg"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative flex flex-col justify-between gap-10 overflow-hidden rounded-[2.5rem] bg-linear-to-br from-[#7d64c5] to-[#5a4b99] p-8 md:p-14"
            >
              <Image
                src="https://cdn.prod.website-files.com/6597ccea909e42269476248f/68e3a90e84b81b16ec5dc613_Vector%203%20(2).webp"
                alt=""
                aria-hidden
                width={284}
                height={200}
                className="pointer-events-none absolute top-0 left-0 w-full max-w-[284px] object-cover"
              />

              <div className="relative z-10 flex flex-col gap-2">
                <StatCounter
                  target={885}
                  prefix="$"
                  suffix="M"
                  className="text-5xl font-semibold text-[#FAFAFA] md:text-6xl"
                />
                <h5 className="text-xl font-semibold text-[#FAFAFA]">Revenue Generated</h5>
              </div>

              <p className="relative z-10 text-base text-[#FAFAFA]/80">
                Explore the wonders of the world. Let your curiosity guide you on new adventures.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-between gap-10 rounded-[2.5rem] bg-linear-to-br from-[#7d64c5] to-[#5a4b99] p-8 md:p-14"
            >
              <div className="flex flex-col gap-2">
                <StatCounter
                  target={8}
                  suffix="K+"
                  className="text-5xl font-semibold text-[#FAFAFA] md:text-6xl"
                />
                <h6 className="text-xl font-semibold text-[#FAFAFA]">
                  Enhanced Brand Visibility
                </h6>
              </div>
              <p className="text-base text-[#FAFAFA]/80">
                Experience the joy of life through simple pleasures. Find happiness in the little
                things.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative min-h-[560px] overflow-hidden rounded-[2.5rem] border border-border-dark bg-black-gradient p-8 md:min-h-[420px] md:p-10"
            >
              <Image
                src="https://cdn.prod.website-files.com/6597ccea909e42269476248f/68e399b640e762380712f5ed_Group%2053.webp"
                alt=""
                aria-hidden
                fill
                className="pointer-events-none absolute inset-0 -z-10 object-cover opacity-60"
              />

              <div className="relative z-10 flex items-center gap-3 rounded-full bg-[#FAFAFA]/10 px-5 py-3 backdrop-blur-sm">
                <LayoutGrid className="h-5 w-5 text-[#FAFAFA]" />
                <p className="text-sm text-[#FAFAFA]">A variety of features</p>
              </div>

              <div className="absolute inset-x-0 top-[22%] h-px bg-linear-to-r from-[#b6bece] to-[#FAFAFA] opacity-80" />

              <div className="relative h-full min-h-[460px] md:min-h-[320px]">
                {capsules.map((capsule, index) => (
                  <motion.div
                    key={`${capsule.label}-${index}`}
                    initial={{ opacity: 0, y: -260, scale: 0.6 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{
                      duration: 0.9,
                      delay: 0.15 + index * 0.08,
                      type: 'spring',
                      bounce: 0.45,
                    }}
                    className={`absolute flex items-center gap-1 rounded-full bg-[#6958cc] px-3 py-2 md:gap-1.5 md:px-4 md:py-2.5 ${capsule.className}`}
                  >
                    <Check className="h-3 w-3 flex-none text-[#FAFAFA] md:h-3.5 md:w-3.5" />
                    <span className="text-xs whitespace-nowrap text-[#FAFAFA] md:text-sm">
                      {capsule.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

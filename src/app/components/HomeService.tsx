'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Service } from '@/lib/types/service';

const decorativeImageOne =
  'https://cdn.prod.website-files.com/6597ccea909e42269476248f/68e4d0917c62d5759df1a160_Rectangle%207%20(2).webp';
const decorativeImageTwo =
  'https://cdn.prod.website-files.com/6597ccea909e42269476248f/68e4d201bbc864ae1c7d37bd_Rectangle%208%20(5).webp';

interface HomeServiceProps {
  services: Service[];
}

export default function HomeService({ services }: HomeServiceProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const featuredServices = services.slice(0, 4);

  return (
    <section
      id="Service"
      className="bg-[linear-gradient(223deg,#1b1a21_66.8%,#5a4b99)] px-6 py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1500px]">
        {featuredServices.map((service, index) => (
          <motion.div
            key={service.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            className={`group relative flex cursor-pointer items-center justify-between py-10 md:py-14 ${
              index < featuredServices.length - 1 ? 'border-b border-[#FAFAFA]/50' : ''
            }`}
          >
            <Link
              href={`/services/${service.slug}`}
              aria-label={service.title}
              className="absolute inset-0 z-10"
            />

            <h3 className="text-3xl font-semibold text-[#FAFAFA] transition-colors group-hover:text-[#A1A1AA] md:text-5xl">
              {service.title}
            </h3>

            <ArrowUpRight className="h-6 w-6 flex-none text-[#FAFAFA] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 md:h-8 md:w-8" />

            <div className="pointer-events-none absolute top-1/2 right-[12%] hidden -translate-y-1/2 md:block">
              <motion.div
                initial={false}
                animate={
                  activeIndex === index
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.85 }
                }
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="relative h-44 w-52"
              >
                <Image
                  src={decorativeImageTwo}
                  alt=""
                  width={162}
                  height={162}
                  className="absolute top-8 left-0 -rotate-[8.8deg] rounded-[20px] object-cover"
                />
                <Image
                  src={decorativeImageOne}
                  alt=""
                  width={176}
                  height={169}
                  className="absolute top-0 left-10 -rotate-[8.8deg] rounded-[20px] object-cover"
                />
                <Image
                  src={service.thumbnail}
                  alt={service.title}
                  width={196}
                  height={190}
                  className="absolute -top-4 right-0 h-[190px] w-[196px] rounded-[20px] object-cover shadow-xl"
                />
              </motion.div>
            </div>
          </motion.div>
        ))}

        <div className="mt-14 flex justify-center md:mt-20">
          <Link
            href="/services"
            className="inline-flex items-center gap-3 rounded-full bg-gradient-to-br from-[#7d64c5] to-[#5a4b99] px-7 py-3.5 text-sm font-semibold text-[#FAFAFA] transition-colors hover:bg-[#433b7b] hover:bg-none"
          >
            View more services
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

interface Achievement {
  multiplier: string;
  title: string;
  description: string;
  year: string;
}

const achievements: Achievement[] = [
  {
    multiplier: '4X',
    title: 'Creative Excellence Award',
    description: 'Four consecutive wins celebrating bold design, boundary-pushing concepts, and visual storytelling.',
    year: '2022',
  },
  {
    multiplier: '1X',
    title: 'Branding Innovation Award',
    description: 'Honored for building identity systems that resonate, scale, and define modern brands.',
    year: '2024',
  },
  {
    multiplier: '1X',
    title: 'Design Trailblazer Award',
    description: 'Recognized for pioneering fresh visual solutions and shaping next-generation design standards.',
    year: '2026',
  },
];

export default function Achievements() {
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-12">
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
            <span className="text-lg font-medium text-heading">Achievements</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-left text-2xl leading-relaxed font-medium text-heading md:text-3xl lg:text-4xl"
          >
            We&apos;re honored to be recognized by industry leaders for our creativity and
            innovation.
          </motion.h2>
        </div>

        <div className="flex flex-col gap-5">
          {achievements.map((item, index) => (
            <motion.div
              key={`${item.title}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-start gap-6 rounded-[1.875rem] bg-surface p-8 md:flex-row md:items-center md:gap-10 md:p-10"
            >
              <div className="flex h-16 w-16 flex-none items-center justify-center rounded-2xl bg-linear-to-br from-primary-light to-primary-dark">
                <Award className="h-8 w-8 text-[#FAFAFA]" />
              </div>

              <span className="bg-linear-to-r from-primary-light to-primary-dark bg-clip-text text-3xl font-semibold text-transparent md:w-28 md:flex-none">
                {item.multiplier}
              </span>

              <div className="flex flex-1 flex-col gap-2">
                <h6 className="text-xl font-semibold text-[#3d4048]">{item.title}</h6>
                <p className=" text-[#57576b]">{item.description}</p>
              </div>

              <span className="text-xl font-semibold text-[#3d4048] md:flex-none">
                {item.year}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

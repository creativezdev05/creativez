'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Camera, X, Quote } from 'lucide-react';

interface CeoMember {
  name: string;
  role: string;
  image: string;
  alt: string;
  quote: string;
  bio: string;
}

interface TeamMember {
  name: string;
  role: string;
  image: string;
  alt: string;
}

const ceoData: CeoMember = {
  name: 'Brooklyn Simmons',
  role: 'Chief Executive Officer',
  image:
    'https://cdn.prod.website-files.com/6597ccea909e42269476248f/6908709073f66bd3b01c5c89_5aee66678438f96b24e31240e79530b7_Professional%20Man%20in%20Suit%201.webp',
  alt: 'Smiling professional man in a navy blazer and light blue shirt with arms crossed.',
  quote:
    'Innovation and design excellence drive everything we build. Our mission is to transform bold ideas into seamless digital experiences.',
  bio: 'With over 15 years of industry leadership, Brooklyn guides our vision and strategy, fostering a culture of innovation, creativity, and relentless pursuit of excellence.',
};

const team: TeamMember[] = [
  {
    name: 'Ralph Edwards',
    role: 'Creative Designer',
    image:
      'https://cdn.prod.website-files.com/6597ccea909e42269476248f/69087090b8d9b34022650f62_ca0f0703d6125a630d82fa8ce49b1704_Professional%20Portrait%20of%20a%20Man%201.webp',
    alt: 'Smiling man with dark hair and beard wearing a gray suit and orange tie, arms crossed.',
  },
  {
    name: 'Darlene Robertson',
    role: 'Creative Designer',
    image:
      'https://cdn.prod.website-files.com/6597ccea909e42269476248f/69087090861671e286693551_f27632988777d7a099e8456a60aafb76_Professional%20Portrait%201.webp',
    alt: 'Confident young man in a black suit with arms crossed, facing forward.',
  },
  {
    name: 'Eleanor Pena',
    role: 'Lead Developer',
    image:
      'https://cdn.prod.website-files.com/6597ccea909e42269476248f/6908709073f66bd3b01c5c89_5aee66678438f96b24e31240e79530b7_Professional%20Man%20in%20Suit%201.webp',
    alt: 'Professional team member portrait.',
  },
];

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group flex flex-col"
    >
      <div className="relative aspect-3/4 w-full overflow-hidden rounded-[2.5rem] bg-[#6958cc]">
        <Image src={member.image} alt={member.alt} fill className="object-cover" />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />

        <div className="absolute inset-x-0 bottom-8 flex items-center justify-center gap-3.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <a
            href="https://x.com/"
            target="_blank"
            rel="noreferrer"
            aria-label={`${member.name} on X`}
            className="flex h-13 w-13 items-center justify-center rounded-[0.6875rem] bg-[#FAFAFA] text-heading transition-transform hover:scale-105"
          >
            <X className="h-5 w-5" />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            aria-label={`${member.name} on Instagram`}
            className="flex h-13 w-13 items-center justify-center rounded-[0.6875rem] bg-[#FAFAFA] text-heading transition-transform hover:scale-105"
          >
            <Camera className="h-5 w-5" />
          </a>
        </div>
      </div>

      <div className="mt-5 flex flex-col items-center gap-1.5 text-center">
        <span className="text-xl font-bold text-heading">{member.name}</span>
        <span className="text-base text-body">{member.role}</span>
      </div>
    </motion.div>
  );
}

export default function Teams() {
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-[1500px]">
        {/* Section Header */}
        {/* <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center text-5xl font-semibold text-heading md:text-7xl"
        >
          Meet Our Team
        </motion.h2> */}

        {/* CEO Feature Section (Image Left, Content Right) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-24 grid grid-cols-1 items-center gap-10 rounded-[3rem] bg-gray-50/50 p-6 md:grid-cols-12 md:p-12 lg:gap-16"
        >
          {/* Left Column: CEO Image */}
          <div className="relative aspect-3/4 w-full overflow-hidden rounded-[2.5rem] bg-[#6958cc] md:col-span-5 lg:col-span-5">
            <Image
              src={ceoData.image}
              alt={ceoData.alt}
              fill
              className="object-cover"
              priority
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 flex items-center gap-3">
              <a
                href="https://x.com/"
                target="_blank"
                rel="noreferrer"
                aria-label={`${ceoData.name} on X`}
                className="flex h-12 w-12 items-center justify-center rounded-[0.6875rem] bg-[#FAFAFA] text-heading transition-transform hover:scale-105"
              >
                <X className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label={`${ceoData.name} on Instagram`}
                className="flex h-12 w-12 items-center justify-center rounded-[0.6875rem] bg-[#FAFAFA] text-heading transition-transform hover:scale-105"
              >
                <Camera className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Right Column: Title & Description */}
          <div className="flex flex-col justify-center space-y-6 md:col-span-7 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-1.5 text-sm font-medium text-[#6958cc] w-fit">
              <Quote className="h-4 w-4" />
              <span>Leadership Insight</span>
            </div>

            <h3 className="text-3xl font-bold text-heading md:text-5xl">
              What Our CEO Says
            </h3>

            <blockquote className="border-l-4 border-[#6958cc] pl-4 text-xl font-medium italic text-heading md:text-2xl">
              &ldquo;{ceoData.quote}&rdquo;
            </blockquote>

            <p className="text-lg text-body leading-relaxed">
              {ceoData.bio}
            </p>

            <div className="pt-2">
              <h4 className="text-2xl font-bold text-heading">{ceoData.name}</h4>
              <p className="text-base text-body font-medium">{ceoData.role}</p>
            </div>
          </div>
        </motion.div>

        {/* Rest of Team Grid */}
        {/* <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {team.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </div> */}
      </div>
    </section>
  );
}
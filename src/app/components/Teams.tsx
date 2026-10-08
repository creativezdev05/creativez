'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Camera, X } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  alt: string;
}

const team: TeamMember[] = [
  {
    name: 'Brooklyn Simmons',
    role: 'Creative Designer',
    image:
      'https://cdn.prod.website-files.com/6597ccea909e42269476248f/6908709073f66bd3b01c5c89_5aee66678438f96b24e31240e79530b7_Professional%20Man%20in%20Suit%201.webp',
    alt: 'Smiling professional man in a navy blazer and light blue shirt with arms crossed.',
  },
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
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center text-5xl font-semibold text-heading md:text-7xl"
        >
          Meet Our Team
        </motion.h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {team.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

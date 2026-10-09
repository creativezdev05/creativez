'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Quote } from 'lucide-react';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      'Working with Creativez Solution was a game changer. They transformed our vision into a stunning digital experience that elevated our brand presence overnight.',
    name: 'Luna Mars',
    role: 'CEO',
    avatar:
      'https://cdn.prod.website-files.com/6597ccea909e42269476248f/68e51940d340b6d600c57a94_66c42679a0a118c60d5ea03c_Client%20Photo%205.webp',
    image: '/images/testimonials/laptop.png',
  },
  {
    quote:
      'The strategy and design precision from Creativez Solution exceeded our expectations. Their work directly helped us build deeper trust and engagement with our target audience.',
    name: 'Jane Cooper',
    role: 'Marketer',
    avatar:
      'https://cdn.prod.website-files.com/6597ccea909e42269476248f/68e5e86d3dec1117ca4859d7_Ellipse%203%20(2).webp',
    image: '/images/testimonials/mob.png',
  },
  {
    quote:
      'Creativez Solution didn’t just execute a project they truly partnered with us. Every detail and asset delivered reflected our story and values perfectly.',
    name: 'Robert Fox',
    role: 'Marketer',
    avatar:
      'https://cdn.prod.website-files.com/6597ccea909e42269476248f/68e5e86d9de0717533e33f4c_Ellipse%203%20(1).webp',
    image: '/images/work/3.png',
  },
];

const track = [...testimonials, ...testimonials];

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <div className="flex w-full min-h-130 flex-col gap-10 rounded-[2.5rem] border border-[#434247] bg-surface/9 p-8 backdrop-blur-[1.5px] md:min-h-150 md:flex-row md:items-stretch md:justify-between md:gap-14 md:p-10">
      <div className="flex w-full max-w-[480px] flex-col justify-between gap-10">
        <div className="flex flex-col gap-4">
          <Quote className="h-7 w-7 flex-none fill-primary-light text-primary-light" />
          <p className="text-xl font-semibold text-[#FAFAFA] md:text-2xl">{item.quote}</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14 flex-none overflow-hidden rounded-full">
            <Image src={item.avatar} alt={item.name} fill className="object-cover" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-lg font-semibold text-[#FAFAFA]">{item.name}</span>
            <span className="text-sm text-[#A1A1AA] capitalize">{item.role}</span>
          </div>
        </div>
      </div>

      {/* Updated Image Container */}
      <div className="relative hidden w-full max-w-112.5 flex-none overflow-hidden rounded-[1.25rem] md:block md:self-stretch">
        <Image src={item.image} alt="" fill className="object-cover object-center" />
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="Testimonial" className="px-6 py-20 md:py-28">
      <div className="relative mx-auto max-w-[1500px] overflow-hidden rounded-[2.5rem] bg-dark-background pt-28 md:rounded-[4.375rem]">
        <Image
          src="https://cdn.prod.website-files.com/6597ccea909e42269476248f/68e9c9b71a0a43eaeb11857b_18de58b31fa04da29c18beac43a7bb64_Mask%20group%20(17).svg"
          alt=""
          aria-hidden
          fill
          className="pointer-events-none absolute inset-0 z-0 object-cover opacity-10"
        />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ textIndent: '-22rem' }}
          transition={{ duration: 0.6 }}
          className="relative z-20 mb-14 text-center text-5xl font-semibold text-[#FAFAFA] md:text-7xl"
        >
          Testimonial
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative z-10 h-[1145px] overflow-hidden px-6 md:px-14"
        >
          <div className="animate-marquee-vertical flex flex-col gap-8 hover:[animation-play-state:paused]">
            {track.map((item, index) => (
              <TestimonialCard key={`${item.name}-${index}`} item={item} />
            ))}
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[325px] bg-gradient-to-b from-transparent to-dark-background" />
        </motion.div>
      </div>
    </section>
  );
}
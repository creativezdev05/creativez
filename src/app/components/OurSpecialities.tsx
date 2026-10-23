'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import TypedText from './TypedText';
import { TechIcon } from './techIcons';

interface PlatformGroup {
  title: string;
  description: string;
  platforms: string[];
  theme: 'gradient' | 'dark';
}

const platformGroups: PlatformGroup[] = [
  {
    title: 'E-Commerce & CMS Platforms',
    description:
      'We build, customize, and scale online stores and websites on the platforms businesses trust most.',
    platforms: [
      'Shopify',
      'WooCommerce',
      'WordPress',
      'Wix',
      'Webflow',
      'BigCommerce',
      'Squarespace',
      'Magento',
      'PrestaShop',
    ],
    theme: 'gradient',
  },
  {
    title: 'Mobile Game Platforms',
    description:
      'We design and ship mobile games built in Unity and published across the leading app stores.',
    platforms: ['Unity', 'Google Play', 'App Store', 'AppGallery'],
    theme: 'dark',
  },
];

function PlatformPanel({ group, groupIndex }: { group: PlatformGroup; groupIndex: number }) {
  const isGradient = group.theme === 'gradient';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: groupIndex * 0.1 }}
      className={`relative flex flex-col gap-10 overflow-hidden rounded-[2.5rem] p-8 md:p-12 ${
        isGradient
          ? 'bg-linear-to-br from-primary-light to-primary-dark'
          : 'border border-border-dark bg-black-gradient'
      }`}
    >
      {!isGradient && (
        <Image
          src="https://cdn.prod.website-files.com/6597ccea909e42269476248f/68e399b640e762380712f5ed_Group%2053.webp"
          alt=""
          aria-hidden
          fill
          className="pointer-events-none absolute inset-0 -z-10 object-cover opacity-60"
        />
      )}
      <span
        aria-hidden
        className={`pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full blur-3xl ${
          isGradient ? 'bg-white/20' : 'bg-primary-light/20'
        }`}
      />

      <div className="relative z-10 flex flex-col gap-2">
        <h3 className="text-2xl font-semibold text-[#FAFAFA] md:text-3xl">{group.title}</h3>
        <p className="max-w-md text-base text-[#FAFAFA]/75">{group.description}</p>
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {group.platforms.map((platform, index) => {
          const featured = index === 0;
          return (
            <motion.div
              key={platform}
              initial={{ opacity: 0, y: 16, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.15 + index * 0.06 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-6 backdrop-blur-sm transition-colors hover:border-white/35 hover:bg-white/20 hover:shadow-glow ${
                featured ? 'col-span-2 sm:col-span-1' : ''
              }`}
            >
              <TechIcon
                name={platform}
                className={`flex-none text-[#FAFAFA] ${featured ? 'h-10 w-10' : 'h-8 w-8'}`}
              />
              <span
                className={`text-center font-medium text-[#FAFAFA] ${
                  featured ? 'text-base' : 'text-sm'
                }`}
              >
                {platform}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
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
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-linear-to-r from-primary-light to-primary-dark opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-linear-to-r from-primary-light to-primary-dark" />
            </span>
            <span className="text-lg font-medium text-heading">Our Specialities</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.10, transition: { duration: 0.3 }, cursor: 'pointer', }}
          >

            <TypedText textStr={`We specialize in the art of transforming vision into visual identity. From custom e-commerce storefronts to immersive game experiences, we build and customize across every major platform.`}/>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_1fr]">
          {platformGroups.map((group, groupIndex) => (
            <PlatformPanel key={group.title} group={group} groupIndex={groupIndex} />
          ))}
        </div>
      </div>
    </section>
  );
}

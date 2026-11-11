'use client';

import { motion } from 'framer-motion';
import TypedText from './TypedText';
import ServiceCardsCarousel, { type PlatformGroup } from './ServiceCardsCarousel';

const platformGroups: PlatformGroup[] = [
  {
    title: 'Game Development',
    description:
      'We build and ship mobile games in Unity with production-ready architecture, clean C# patterns, and store-ready builds. From multiplayer to live services, we follow best practices so every release stays maintainable and version-controlled.',
    platforms: ['Unity', 'C#', 'VS Code',
                'Photon', '3ds Max', 'Maya',
                'Substance Painter', 'Unreal Engine',
                'OpenAI API', 'GitHub', 'Play Store',
                'App Store', 'AppGallery'],
    theme: 'dark',
    image: '/images/services/game-development.webp',
    imageAlt: 'Game development workspace with a racing game on a laptop and phone',
    video: '/images/services/game-dev-edited.mp4',
  },
  {
    title: '3D Modeling  & animations',
    description:
      'We design player and user first interfaces with clear flows, consistent systems, and polished 2D/3D visuals that feel native on mobile and web. Design stays structured and handoff-ready so engineering can implement without guesswork.',
    platforms: [
      'Figma',
      'Photoshop',
      'Adobe Illustrator',
      'Framer',
      'Blender',
      
    ],
    theme: 'gradient',
    image: '/images/services/3d.webp',
    imageAlt: '3D character modeling workspace with a sculpted creature on screen',
    video: '/images/services/3d-motion-edited.mp4',
  },
  {
    title: 'Web Apps & AI Automation',
    description:
      'We build custom web applications across modern stacks and connect them to AI-powered automation workflows that cut manual work. Commerce, backends, and automations are versioned and reviewed so shipping stays reliable as you scale.',
    platforms: [
      'MERN',
      'MEAN',
      'MEVN',
      'MENN',
      'PHP',
      'Laravel',
      'MySQL',
      'PostgreSQL',
      'Shopify',
      'WooCommerce',
      'Make',
      'n8n',
      'Zapier',
      'LangChain',
    ],
    theme: 'dark',
    image: '/images/services/website-development.webp',
    imageAlt: 'Responsive website shown on a laptop and a phone',
    video: '/images/services/web-app-edited-loop.mp4',
  },
];

export default function OurSpecialities() {
  return (
    <section className="px-6 py-10 md:py-14">
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
            whileHover={{ scale: 1.1, transition: { duration: 0.3 }, cursor: 'pointer' }}
          >
            <TypedText textStr={`We specialize in mobile game development, UI/UX that players and users actually enjoy, and custom web apps powered by AI automation all built with best practices and version controlled workflows.`} />
          </motion.div>
        </div>

        <ServiceCardsCarousel groups={platformGroups} />
      </div>
    </section>
  );
}

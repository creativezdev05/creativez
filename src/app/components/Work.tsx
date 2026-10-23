'use client';

import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { TechIcon } from './techIcons';

interface Stat {
  label: string;
  value: string;
}

interface TechStack {
  technologies: string[];
  tools: string[];
}

interface WorkItem {
  number: string;
  title: string;
  description: string;
  image: string;
  overlayImage: string;
  services: string[];
  techStack: TechStack;
  stats: Stat[];
}

const works: WorkItem[] = [
  {
    number: '01',
    title: 'Interactive Game Experiences',
    description:
      'Designing and engineering engaging mobile and cross-platform games, combining gameplay systems, immersive environments, and polished interactive experiences.',
    image: '/images/work/1.png',
    overlayImage:
      'https://cdn.prod.website-files.com/6597ccea909e42269476248f/68e4a2925d514ce9fea6d828_Mask%20group%20(7).webp',
    services: [
      'Mobile Game Experiences',
      'Gameplay Systems & Mechanics',
      '3D Environments & Game Engineering',
    ],
    techStack: {
      technologies: [
        'Unity',
        'C#',
        'Unreal Engine',
        'C++',
        'Blender',
      ],
      tools: [
        'Visual Studio',
        'VS Code',
        'GitHub',
        'Firebase',
        'Photoshop',
      ],
    },
    stats: [
      { label: 'Gameplay Systems', value: 'Custom' },
      { label: 'Target Platforms', value: 'Multi-Platform' },
    ],
  },
  {
    number: '02',
    title: 'UI/UX & Product Design',
    description:
      'Transforming ideas into intuitive digital experiences through user research, interface design, interactive prototyping, and scalable design systems.',
    image: '/images/work/home-service-ui-ux.png',
    overlayImage:
      'https://cdn.prod.website-files.com/6597ccea909e42269476248f/68e9fb9272cdd440a88de8dc_Mask%20group%20(22).webp',
    services: [
      'User Experience & Journey Design',
      'Web & Mobile App Interfaces',
      'Prototyping & Design Systems',
    ],
    techStack: {
      technologies: [
        'Figma',
        'FigJam',
        'Adobe Photoshop',
        'Adobe Illustrator',
        'Framer',
      ],
      tools: [
        'Figma Dev Mode',
        'FigJam',
        'Zeplin',
        'Notion',
        'Loom',
      ],
    },
    stats: [
      { label: 'Design Approach', value: 'User-First' },
      { label: 'Product Focus', value: 'Experience-Led' },
    ],
  },
  {
    number: '03',
    title: 'Custom Web Applications',
    description:
      'Building scalable web platforms and tailored business applications that streamline workflows, connect systems, and turn complex requirements into practical digital solutions.',
    image: '/images/work/web-apps.png',
    overlayImage:
      'https://cdn.prod.website-files.com/6597ccea909e42269476248f/68e9fb5bb8f8413ddf5a760a_Mask%20group%20(21).webp',
    services: [
      'Custom Web Platforms & Dashboards',
      'Full-Stack Application Development',
      'API & Third-Party Integrations',
    ],
    techStack: {
      technologies: [
        'React',
        'Next.js',
        'Node.js',
        'Express.js',
        'PHP',
        'Laravel',
        'TypeScript',
      ],
      tools: [
        'VS Code',
        'MySQL',
        'PostgreSQL',
        'Supabase',
        'Vercel',
        'Render',
        'GitHub',
        'Postman',
      ],
    },
    stats: [
      { label: 'Architecture', value: 'Scalable' },
      { label: 'Integration', value: 'End-to-End' },
    ],
  },
  {
    number: '04',
    title: 'AI & Intelligent Solutions',
    description:
      'Creating AI-powered solutions with large language models, prompt engineering, and intelligent automation to improve workflows and unlock new product capabilities.',
    image: '/images/work/cgi.png',
    overlayImage:
      'https://cdn.prod.website-files.com/6597ccea909e42269476248f/68e9fb9272cdd440a88de8dc_Mask%20group%20(22).webp',
    services: [
      'LLM Integration & AI Applications',
      'Prompt Engineering & Optimization',
      'AI Agents & Workflow Automation',
    ],
    techStack: {
      technologies: [
        'Python',
        'OpenAI API',
        'Anthropic API',
        'LangChain',
        'Hugging Face',
        'LlamaIndex',
      ],
      tools: [
        'VS Code',
        'Jupyter Notebook',
        'n8n',
        'Postman',
        'Supabase',
        'Pinecone',
      ],
    },
    stats: [
      { label: 'AI Integration', value: 'LLM-Powered' },
      { label: 'Business Focus', value: 'Automation' },
    ],
  },
  {
    number: '05',
    title: 'Mobile App Experiences',
    description:
      'Developing feature-rich mobile applications with intuitive interfaces, reliable performance, and seamless integrations for real-world business needs.',
    image: '/images/work/aug-realities.png',
    overlayImage:
      'https://cdn.prod.website-files.com/6597ccea909e42269476248f/68e4a2925d514ce9fea6d828_Mask%20group%20(7).webp',
    services: [
      'iOS & Android Applications',
      'Cross-Platform Development',
      'Backend & API Connectivity',
    ],
    techStack: {
      technologies: [
        'React Native',
        'Flutter',
        'Dart',
        'Kotlin',
        'Swift',
      ],
      tools: [
        'Expo',
        'Android Studio',
        'Xcode',
        'Firebase',
        'Supabase',
        'VS Code',
      ],
    },
    stats: [
      { label: 'Platforms', value: 'iOS & Android' },
      { label: 'Development', value: 'End-to-End' },
    ],
  },
];

function WorkCard({
  item,
  index,
  total,
  cardRef,
  nextCardRef,
}: {
  item: WorkItem;
  index: number;
  total: number;
  cardRef: { current: HTMLDivElement | null };
  nextCardRef: { current: HTMLDivElement | null };
}) {
  const isLast = index === total - 1;

  // Each later card sits a little further down than the one before it, so
  // once a card recedes it stays peeking out above whichever card is
  // currently active — like a fanned deck, not a single pinned spot all
  // cards share.
  const topOffset = 20 + index * 18;

  // Track the NEXT card's own slide-in instead of this card's frozen sticky
  // rect: progress 0 is the next card's top sitting at the bottom of the
  // viewport (not visible yet), progress 1 is its top reaching the very top
  // (fully slid into place). That's a smooth, continuous read of "how far
  // the next card has slid up" — so this card fades/tilts/recedes in sync
  // with that slide instead of snapping late.
  const { scrollYProgress } = useScroll({
    target: isLast ? cardRef : nextCardRef,
    offset: ['start end', 'start start'],
  });

  // Tilt-back recede: hinge at the BOTTOM edge (origin-bottom below), so the
  // bottom stays anchored right where the next card is covering it while
  // the top rotates back and away into the distance — the top edge
  // perspective-shrinks (narrower/smaller) while the bottom stays full
  // width, reading as receding into depth rather than sliding anywhere.
  const scale = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.94]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, isLast ? 0 : 38]);
  const cardOpacity = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.55]);
  const filter = useTransform(scrollYProgress, [0, 1], [
    'brightness(1)',
    isLast ? 'brightness(1)' : 'brightness(0.75)',
  ]);

  return (
    // The spacer is a little shorter than a full viewport. The reveal
    // transition itself still takes one viewport of scroll either way, so
    // shrinking the spacer below 100vh pulls the next card's reveal window
    // slightly earlier — just enough overlap to bridge consecutive cards
    // without three transitions running at once (that's what a much shorter
    // spacer caused before).
    // z-index lives on this wrapper, not just the sticky child inside it:
    // that makes each card's stacking order unambiguous at the top level,
    // instead of depending on exactly which ancestor the shared `perspective`
    // happens to establish a stacking context on.
    <div ref={cardRef} className="relative" style={{ height: '85vh', zIndex: 10 + index }}>
      <motion.div
        className="sticky origin-bottom"
        style={{
          top: topOffset,
          transformPerspective: 1000,
          scale,
          rotateX,
          opacity: cardOpacity,
          filter,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative min-h-140 overflow-hidden rounded-[2.5rem] bg-black-gradient p-6 md:min-h-170 md:rounded-[4.375rem] md:p-14"
        >
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-transparent via-transparent to-dark/70" />
        <Image
          src={item.overlayImage}
          alt=""
          aria-hidden
          fill
          className="pointer-events-none absolute inset-0 -z-10 w-full object-cover opacity-40 blur-3xl"
        />

        <button
          type="button"
          aria-label={`View ${item.title} project`}
          className="absolute top-6 right-6 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-[#262626] bg-nav-item text-[#FAFAFA] transition-transform hover:scale-105 md:top-10 md:right-10"
        >
          <ArrowUpRight className="h-5 w-5" />
        </button>

        <div className="relative z-10 grid grid-cols-1 gap-6 lg:grid-cols-[0.35fr_0.75fr_0.35fr] lg:gap-8">
          <div className="flex flex-col justify-between gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-2.5">
                <span className="h-3 w-3 rounded-full bg-gradient-to-r from-primary-light to-primary-dark" />
                <span className="text-sm font-semibold text-[#A1A1AA]">{item.number}</span>
              </div>
              <h3 className="text-shimmer text-left text-2xl font-semibold text-[#FAFAFA] md:text-3xl">
                {item.title}
              </h3>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base text-[#A1A1AA]"
            >
              {item.description}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative h-90 overflow-hidden rounded-[1.25rem] sm:h-110 md:h-140 lg:h-160"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="rounded-[1.25rem] object-contain"
            />
          </motion.div>

          <div className="flex flex-col justify-between gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col gap-4"
            >
              <span className="text-sm font-semibold text-[#FAFAFA] capitalize">
                Services Provided
              </span>
              <div className="flex flex-wrap gap-2.5">
                {item.services.map((service) => (
                  <span
                    key={service}
                    className="rounded-full border border-[#FAFAFA]/30 bg-surface/8 px-3 py-1.5 text-sm text-[#FAFAFA]"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex flex-col gap-4"
            >
              <span className="text-sm font-semibold text-[#FAFAFA] capitalize">
                Tech Stack
              </span>
              <div className="flex flex-wrap gap-2.5">
                {[...item.techStack.technologies, ...item.techStack.tools].map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="flex items-center gap-1.5 rounded-full border border-[#FAFAFA]/30 bg-surface/8 px-3 py-1.5 text-sm text-[#FAFAFA]"
                  >
                    <TechIcon name={tech} className="h-4 w-4" />
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-row gap-10 lg:flex-col lg:gap-8"
            >
              {item.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-2">
                  <span className="text-sm whitespace-nowrap text-[#A1A1AA]">{stat.label}</span>
                  <span className="text-xl font-semibold text-[#FAFAFA]">{stat.value}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function Work() {
  // Stable ref containers, one per card, created once. Each card writes its
  // own and reads its NEXT sibling's, so the exit animation can be driven by
  // how far the following card has physically slid into place.
  const [cardRefs] = useState(() => works.map(() => ({ current: null as HTMLDivElement | null })));

  return (
    <section id="Work" className="relative px-6 py-20 md:py-28">
      <div className="mx-auto max-w-[1500px]">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-shimmer-dark mb-16 text-center text-5xl font-semibold text-heading md:text-7xl"
        >
          Recent Works
        </motion.h2>

        <div className="relative flex flex-col gap-3">
          {works.map((item, index) => (
            <WorkCard
              key={item.number}
              item={item}
              index={index}
              total={works.length}
              cardRef={cardRefs[index]}
              nextCardRef={cardRefs[index + 1] ?? cardRefs[index]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

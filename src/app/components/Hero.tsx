'use client';

import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import StatCounter from './StatCounter';
import {
  ArrowRight,
  Play,
  Star,
  Users,
  Pause,
  Gamepad2,
  AppWindow,
  Smartphone,
  Workflow,
  Bot,
  PenTool,
  Box,
  Clapperboard,
  type LucideIcon,
} from 'lucide-react';

type ShapeItem = {
  name: string;
  icon: LucideIcon;
  iconClass: string;
  size: string;
  top: string;
  spread: number;
  max: string;
  delay: string;
  duration: string;
  opacity: string;
};

type ShapeOrigin = {
  x: number;
  y: number;
  w: number;
};

const travelEase = [0.45, 0.05, 0.25, 1] as const;

const shapeTravel = {
  x: { duration: 2.8, ease: travelEase },
  y: { duration: 2.8, ease: travelEase },
  scale: { duration: 2.8, ease: travelEase },
  rotate: { duration: 0, ease: 'linear' as const },
};

function HeroShape({
  shape,
  side,
  origin,
  skip,
}: {
  shape: ShapeItem;
  side: 'left' | 'right';
  origin: ShapeOrigin | null;
  skip: boolean;
}) {
  const Icon = shape.icon;
  const style = {
    top: shape.top,
    '--shape-spread': shape.spread,
    '--shape-max': shape.max,
    '--shape-delay': shape.delay,
    '--shape-duration': shape.duration,
  } as CSSProperties;

  const className = `intro-shape intro-shape--${side} pointer-events-auto absolute flex flex-col items-center justify-center text-white ${shape.size} ${shape.opacity} ${skip ? 'is-settled' : ''}`;

  const content = (
    <span className={`intro-shape-drift intro-shape-drift--${side} flex flex-col items-center justify-center gap-1.5`}>
      <Icon className={`h-5 w-5 shrink-0 xl:h-6 xl:w-6 ${shape.iconClass}`} aria-hidden />
      <span className="sr-only max-w-[6.5rem] text-center text-[25px] font-semibold leading-tight xl:not-sr-only xl:block">
        {shape.name}
      </span>
    </span>
  );

  if (skip || !origin) {
    return (
      <h5 data-shape={shape.name} className={className} style={style}>
        {content}
      </h5>
    );
  }

  const finalX = side === 'left' ? -origin.w / 2 : origin.w / 2;

  return (
    <motion.h5
      data-shape={shape.name}
      className={className}
      style={style}
      initial={{ x: origin.x, y: origin.y, rotate: 0, scale: 0.4 }}
      animate={{ x: finalX, y: 0, rotate: side === 'left' ? 720 : -720, scale: 1 }}
      transition={shapeTravel}
      whileHover={{
        scale: 1.2,
        transition: { duration: 0.35, ease: 'easeOut' },
      }}
    >
      {content}
    </motion.h5>
  );
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const watermarkY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPause, setShowPause] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const [origins, setOrigins] = useState<Record<string, ShapeOrigin> | null>(null);
  const [skipShapeTravel, setSkipShapeTravel] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(true);
    setShowPause(true);

    // Clear any previous timeout if triggered repeatedly
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }

    // Hide pause button after 1 second (1000ms)
    pauseTimeoutRef.current = setTimeout(() => {
      setShowPause(false);
    }, 2000);
    // Timeout gives React a tick to mount the video element before triggering play
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 0);
  };

  const handlePauseClick = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    setIsPlaying(false);
    setShowPause(false);
  };

  const handleVideoEnded = () => {
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    setIsPlaying(false);
    setShowPause(false);
  };

  const shapeSize = 'h-28 w-28 xl:h-40 xl:w-40 2xl:h-50 2xl:w-50';

  const leftShapes: ShapeItem[] = [
    { name: 'Mobile Games', icon: Gamepad2, iconClass: 'text-amber-300', size: shapeSize, top: '-8%', spread: 0.2, max: '19rem', delay: '0s', duration: '6s', opacity: 'opacity-100' },
    { name: 'Web Apps', icon: AppWindow, iconClass: 'text-sky-300', size: shapeSize, top: '20%', spread: 0.55, max: '28rem', delay: '1.2s', duration: '7.5s', opacity: 'opacity-100' },
    { name: 'Mobile Apps', icon: Smartphone, iconClass: 'text-emerald-300', size: shapeSize, top: '50%', spread: 0.55, max: '28rem', delay: '0.6s', duration: '8s', opacity: 'opacity-100' },
    { name: 'AI Automation', icon: Workflow, iconClass: 'text-violet-300', size: shapeSize, top: '75%', spread: 0.2, max: '19rem', delay: '2s', duration: '5.5s', opacity: 'opacity-100' },
  ];

  const rightShapes: ShapeItem[] = [
    { name: 'Agentic AI', icon: Bot, iconClass: 'text-rose-300', size: shapeSize, top: '-8%', spread: 0.2, max: '19rem', delay: '0.8s', duration: '7s', opacity: 'opacity-100' },
    { name: 'UI/UX', icon: PenTool, iconClass: 'text-pink-300', size: shapeSize, top: '20%', spread: 0.55, max: '28rem', delay: '1.8s', duration: '6.5s', opacity: 'opacity-100' },
    { name: '3D Designs', icon: Box, iconClass: 'text-cyan-300', size: shapeSize, top: '50%', spread: 0.55, max: '28rem', delay: '0.3s', duration: '8.5s', opacity: 'opacity-100' },
    { name: 'Motion Graphics', icon: Clapperboard, iconClass: 'text-orange-300', size: shapeSize, top: '75%', spread: 0.2, max: '19rem', delay: '1.5s', duration: '5.8s', opacity: 'opacity-100' },
  ];

  useLayoutEffect(() => {
    const root = introRef.current;
    if (!root) return;

    const nodes = [...root.querySelectorAll<HTMLElement>('[data-shape]')];
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || nodes.length < 8 || nodes[0].offsetWidth === 0) {
      setSkipShapeTravel(true);
      return;
    }

    const parent = root.getBoundingClientRect();
    const centerX = parent.left + parent.width / 2;
    const centerY = parent.top + parent.height / 2;
    const next: Record<string, ShapeOrigin> = {};

    nodes.forEach((node) => {
      const name = node.dataset.shape;
      const rect = node.getBoundingClientRect();
      if (!name || rect.width === 0) return;
      next[name] = {
        x: centerX - (rect.left + rect.width / 2),
        y: centerY - (rect.top + rect.height / 2),
        w: rect.width,
      };
    });

    if (Object.keys(next).length === 8) setOrigins(next);
    else setSkipShapeTravel(true);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-6 pt-40 pb-24 md:pt-48 md:pb-32"
    >
      <div ref={introRef} className="relative w-full">
        {/* Left decorative shapes */}
        <div
          className={`pointer-events-none absolute inset-0 z-20 hidden lg:block ${origins || skipShapeTravel ? '' : 'invisible'}`}
        >
          {leftShapes.map((shape) => (
            <HeroShape
              key={shape.name}
              shape={shape}
              side="left"
              origin={origins?.[shape.name] ?? null}
              skip={skipShapeTravel}
            />
          ))}
        </div>

        {/* Right decorative shapes */}
        <div
          className={`pointer-events-none absolute inset-0 z-20 hidden lg:block ${origins || skipShapeTravel ? '' : 'invisible'}`}
        >
          {rightShapes.map((shape) => (
            <HeroShape
              key={shape.name}
              shape={shape}
              side="right"
              origin={origins?.[shape.name] ?? null}
              skip={skipShapeTravel}
            />
          ))}
        </div>

      <div className="intro_layers relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
      <motion.h1
          {...fadeUp}
          // transition={{ duration: 0.6, delay: 0.1 }}
          whileHover={{ 
              scale: 1.2,
            }}
          transition={{ type: "spring", stiffness: 400, damping: 70,  duration: 0.6, delay: 0.1 }}
          className="text-shimmer text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl"
        >
          Creativez Solutions
        </motion.h1>
        <motion.div
          {...fadeUp}
          // transition={{ duration: 0.6 }}
          whileHover={{ 
              scale: 1.2,
            }}
          transition={{ type: "spring", stiffness: 400, damping: 70,  duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <div className="flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2">
            <span className="text-sm font-semibold text-black">5.0</span>
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          </div>

          <div className="flex items-center -space-x-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-8 w-8 rounded-full border-2 border-base bg-gradient-to-br from-primary-light to-primary-dark"
              />
            ))}
          </div>

          <div className="flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-body">
            <Users className="h-4 w-4" />
            <span>
              <StatCounter
                target={100}
                decimals={0}
                suffix="+"
                variant="inline"
                className="bg-gradient-to-r from-primary-light to-primary-dark bg-clip-text font-semibold text-transparent"
              />{' '}
              satisfied clients
            </span>
          </div>
        </motion.div>

        <motion.h4
          {...fadeUp}
          // transition={{ duration: 0.6, delay: 0.1 }}
          whileHover={{ 
              scale: 1.2,
            }}
          transition={{ type: "spring", stiffness: 400, damping: 70,  duration: 0.6, delay: 0.1 }}
          className="text-shimmer "
        >
          Elevate Your Tech & Design
        </motion.h4>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl text-white leading-relaxed text-body md:text-lg"
        >
          Accelerate business growth and bring your digital vision to life with reliable, scalable on-demand solutions that deliver immersive mobile games, dynamic motion graphics, robust web apps, and intuitive UI/UX design tailored for success.
        </motion.p>

        <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.3 }}>
          <a
            href="#Email"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-br from-primary-light to-primary-dark px-7 py-4 text-sm font-semibold text-[#FAFAFA] transition-colors hover:bg-dark hover:bg-none"
          >
            Get started
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            <span className="absolute inset-0 -z-10 rounded-full opacity-0 shadow-[0_0_48px_rgba(195,84,229,0.45)] transition-opacity duration-300 group-hover:opacity-100" />
          </a>
        </motion.div>
      </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="relative z-10 mx-auto mt-24 max-w-[1500px] px-2"
      >
        <motion.div
          aria-hidden
          style={{ y: watermarkY }}
          className="pointer-events-none absolute inset-x-0 -top-6 z-0 flex select-none justify-center overflow-hidden sm:-top-10 md:-top-16"
        >
          <span className="font-heading text-[clamp(2.25rem,9vw,7.5rem)] leading-none font-bold tracking-tight whitespace-nowrap text-border-light">
            Creativez
          </span>
        </motion.div>

        <div className="relative z-10 rounded-[2.5rem] bg-linear-to-br from-dark-background to-primary-dark p-3">
          <svg
            aria-hidden
            viewBox="0 0 240 56"
            className="pointer-events-none absolute top-0 left-1/2 z-10 hidden h-14 w-60 -translate-x-1/2 md:block"
          >
            <defs>
              <linearGradient id="hero-border-blend" x1="0" y1="0" x2="240" y2="56" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#023b73" />
                <stop offset="100%" stopColor="#014083" />
              </linearGradient>
            </defs>
            <path
              fill="url(#hero-border-blend)"
              d="M0 0C40 0 48 0 70 14C92 28 100 48 120 52C140 48 148 28 170 14C192 0 200 0 240 0Z"
            />
          </svg>

          <div className="pointer-events-none absolute -top-10 left-1/2 z-20 hidden h-32 w-32 -translate-x-1/2 items-center justify-center rounded-full bg-white shadow-[0_8px_24px_rgba(0,0,0,0.18)] md:flex">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              className="relative h-28 w-28 overflow-hidden rounded-full"
            >
              <Image
                src="https://cdn.prod.website-files.com/6597ccea909e42269476248f/68e3119334626e3842772a7b_Group%2035.webp"
                alt=""
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          <div className="relative flex h-80 items-center justify-center overflow-hidden rounded-[2rem] md:h-125">
           {isPlaying ? (
              <>
                <video
                  ref={videoRef}
                  src="/images/hero/final_combined_output.mp4"
                  onEnded={handleVideoEnded}
                  playsInline
                  className="h-full w-full object-cover"
                />
                {showPause && (
                  <button
                    type="button"
                    onClick={handlePauseClick}
                    aria-label="Pause showreel"
                    className="absolute z-20 flex h-16 w-16 items-center justify-center rounded-full bg-white text-dark-background shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-all hover:scale-105 focus:outline-none"
                  >
                    <Pause className="h-6 w-6 fill-current" />
                  </button>
                )}
              </>
            ) : (
              <>
                <Image
                  src="/images/hero/banner.png"
                  alt="Designer working at a desk with a colorful gradient screen"
                  fill
                  priority
                  className="object-cover"
                />

                <button
                  type="button"
                  onClick={handlePlayClick}
                  aria-label="Play showreel"
                  className="relative z-20 flex h-16 w-16 items-center justify-center rounded-full bg-white text-dark-background shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-transform hover:scale-105 focus:outline-none"
                >
                  <Play className="ml-0.5 h-6 w-6 fill-current" />
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

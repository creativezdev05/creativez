'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Play, Star, Users, Pause } from 'lucide-react';

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
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handlePlayClick = () => {
    setIsPlaying(true);
    // Timeout gives React a tick to mount the video element before triggering play
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 0);
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };
  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-6 pt-40 pb-24 md:pt-48 md:pb-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mx-auto flex w-full max-w-[1500px] justify-between"
      >
        <div className="h-full w-px bg-border" />
        <div className="h-full w-px bg-border" />
        <div className="h-full w-px bg-border" />
        <div className="h-full w-px bg-border" />
      </div>

      <div className="intro_layers relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-9 text-center">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6 }}
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
                className="h-8 w-8 rounded-full border-2 border-base bg-gradient-to-br from-[#7d64c5] to-[#5a4b99]"
              />
            ))}
          </div>

          <div className="flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-body">
            <Users className="h-4 w-4" />
            <span>
              <span className="bg-gradient-to-r from-[#7d64c5] to-[#5a4b99] bg-clip-text font-semibold text-transparent">
                1,000+{' '}
              </span>
              satisfied clients
            </span>
          </div>
        </motion.div>

        <motion.h1
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl"
        >
          Scale your brand with unlimited design
        </motion.h1>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl text-base leading-relaxed text-body md:text-lg"
        >
          Unlock endless creative possibilities and keep your brand growing with
          on-demand, high-quality design solutions tailored to your vision.
        </motion.p>

        <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.3 }}>
          <a
            href="#Email"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-br from-[#7d64c5] to-[#5a4b99] px-7 py-4 text-sm font-semibold text-[#FAFAFA] transition-colors hover:bg-[#433b7b] hover:bg-none"
          >
            Get started
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            <span className="absolute inset-0 -z-10 rounded-full opacity-0 shadow-[0_0_48px_rgba(195,84,229,0.45)] transition-opacity duration-300 group-hover:opacity-100" />
          </a>
        </motion.div>
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

        <div className="relative z-10 rounded-[2.5rem] bg-linear-to-br from-[#1b1a21] to-[#5a4b99] p-3">
          <Image
            src="https://cdn.prod.website-files.com/6597ccea909e42269476248f/68e3670d695bceafcafb82b6_ee7f5d47945ea67f4340bae30affb453_Vector%201.svg"
            alt=""
            aria-hidden
            width={282}
            height={160}
            className="pointer-events-none absolute -top-2 left-1/2 hidden h-auto w-45 -translate-x-1/2 md:block"
          />

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
            /* Video replaces image when playing */
            <video
              ref={videoRef}
              src="/images/hero/banner.mp4" /* Replace with your video source path */
              onEnded={handleVideoEnded}
              playsInline
              className="h-full w-full object-cover"
            />
          ) : (
            /* Image + Play Button when video is idle/finished */
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
                className="relative z-20 flex h-16 w-16 items-center justify-center rounded-full bg-[#FAFAFA] text-heading transition-transform hover:scale-105 focus:outline-none"
              >
                <Play style={{ cursor: 'pointer' }} className="h-6 w-6 fill-current" />
              </button>
            </>
          )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

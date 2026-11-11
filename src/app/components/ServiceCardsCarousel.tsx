'use client';

import { motion, useMotionValue, useMotionValueEvent, useTransform, type MotionValue } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type RefObject } from 'react';
import { TechIcon } from './techIcons';

/**
 * Autoplaying 3D carousel. One clock drives the whole loop:
 * hold the front card, flip it to the video, flip back to the content,
 * then slide the next card forward. Side cards turn in perspective with the
 * video playing behind a compact set of icons.
 */
const CARD_SECONDS = 4;
const LOOP_SECONDS = CARD_SECONDS * 3;
const PERSPECTIVE = 1500;
const CARD_W = 400;
const CARD_H_INITIAL = 640;
const CARD_EXTRA = 88;
const SIDE_ROTATE = 28;
const SIDE_SCALE = 0.84;
const FOCUS_SCALE = 1.05;
const FOCUS_Z = 90;
const SIDE_Z = -150;
const CUE_SPACE = 64;

const SHOW_END = 0.1;
const FLIP_TO_END = 0.26;
const VIDEO_END = 0.62;
const FLIP_BACK_END = 0.78;

export interface PlatformGroup {
  title: string;
  description: string;
  platforms: string[];
  theme: 'gradient' | 'dark';
  image: string;
  imageAlt: string;
  video: string;
}

interface Scene {
  active: number;
  flips: [number, number, number];
  opens: [number, number, number];
}

const faceStyle: CSSProperties = {
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
};

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function lerp(from: number, to: number, amount: number) {
  return from + (to - from) * amount;
}

function smootherstep(value: number) {
  const t = clamp01(value);
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function restingOpens(center: number): [number, number, number] {
  return [center === 0 ? 0 : 1, center === 1 ? 0 : 1, center === 2 ? 0 : 1];
}

function sceneAt(progress: number): Scene {
  const p = ((progress % 1) + 1) % 1;
  const span = 1 / 3;
  const index = Math.floor(p / span) % 3;
  const local = (p - index * span) / span;
  const next = (index + 1) % 3;
  const third = (index + 2) % 3;
  const flips: [number, number, number] = [0, 0, 0];
  const opens = restingOpens(index);
  let active = index;

  if (local >= SHOW_END && local < FLIP_TO_END) {
    flips[index] = smootherstep((local - SHOW_END) / (FLIP_TO_END - SHOW_END)) * 180;
  } else if (local >= FLIP_TO_END && local < VIDEO_END) {
    flips[index] = 180;
  } else if (local >= VIDEO_END && local < FLIP_BACK_END) {
    const back = smootherstep((local - VIDEO_END) / (FLIP_BACK_END - VIDEO_END));
    flips[index] = (1 - back) * 180;
  } else if (local >= FLIP_BACK_END) {
    const slideT = (local - FLIP_BACK_END) / (1 - FLIP_BACK_END);
    const spread = smootherstep(clamp01(slideT / 0.5));
    const move = smootherstep(clamp01((slideT - 0.14) / 0.86));
    active = index + move;
    opens[index] = spread;
    opens[next] = 1 - smootherstep(clamp01((slideT - 0.22) / 0.78));
    opens[third] = 1;
  }

  return { active, flips, opens };
}

function wrappedOffset(index: number, active: number) {
  let offset = index - active;
  offset %= 3;
  if (offset > 1.5) offset -= 3;
  if (offset < -1.5) offset += 3;
  return offset;
}

function slotOpacity(offset: number) {
  const distance = Math.abs(offset);
  if (distance <= 1.05) return 1;
  return 1 - clamp01((distance - 1.05) / 0.22);
}

function slotScale(offset: number) {
  const depth = clamp01(Math.abs(offset));
  const extra = Math.max(0, Math.abs(offset) - 1);
  return lerp(FOCUS_SCALE, SIDE_SCALE, depth) * (1 - extra * 0.08);
}

function slotZ(offset: number) {
  const depth = clamp01(Math.abs(offset));
  const extra = Math.max(0, Math.abs(offset) - 1);
  return lerp(FOCUS_Z, SIDE_Z, depth) - extra * 90;
}

function slotRotateY(offset: number) {
  const clamped = Math.max(-1, Math.min(1, offset));
  return clamped * SIDE_ROTATE;
}

function useAutoProgress(targetRef: RefObject<HTMLElement | null>) {
  const progress = useMotionValue(0);
  const playback = useMotionValue(0);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    let frame = 0;
    let last = performance.now();
    let elapsed = 0;
    let seen = false;

    const tick = (now: number) => {
      const dt = Math.min(40, now - last);
      last = now;
      elapsed += dt;
      const ramp = smootherstep(Math.min(1, elapsed / 800));
      const running = seen && !document.hidden;
      playback.set(running ? 1 : 0);
      if (running) {
        progress.set((progress.get() + (dt / 1000) * ramp / LOOP_SECONDS) % 1);
      }
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        seen = entry.isIntersecting;
      },
      { threshold: 0.35 },
    );
    if (targetRef.current) observer.observe(targetRef.current);

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [playback, progress, targetRef]);

  return { progress, playback };
}

function layoutFor(width: number, height: number, cardH: number) {
  const availH = Math.max(240, height - CUE_SPACE - 80);
  const mobile = width < 760;
  const depthBoost = PERSPECTIVE / (PERSPECTIVE - FOCUS_Z);
  const heightFit = availH / (cardH * FOCUS_SCALE * depthBoost);
  const widthBudget = mobile ? width * 0.48 : Math.min(width * 0.3, 420);
  const widthFit = widthBudget / CARD_W;
  const fit = Math.min(mobile ? 0.92 : 1.05, Math.max(0.42, Math.min(heightFit, widthFit)));
  const shrink = PERSPECTIVE / (PERSPECTIVE - SIDE_Z);
  const centerHalf = (CARD_W * fit * FOCUS_SCALE * depthBoost) / 2;
  const sideHalf = (CARD_W * fit * SIDE_SCALE * Math.cos((SIDE_ROTATE * Math.PI) / 180)) / 2;
  const spacing = (centerHalf * (mobile ? 0.62 : 0.92) + sideHalf * (mobile ? 0.45 : 0.78)) / (SIDE_SCALE * fit * shrink);
  return { fit, spacing };
}

function PlatformPanel({
  group,
  groupIndex = 0,
  animated = false,
  dense = false,
  className = '',
}: {
  group: PlatformGroup;
  groupIndex?: number;
  animated?: boolean;
  dense?: boolean;
  className?: string;
}) {
  const isGradient = group.theme === 'gradient';

  return (
    <motion.div
      initial={animated ? { opacity: 0, y: 20 } : false}
      whileInView={animated ? { opacity: 1, y: 0 } : undefined}
      viewport={animated ? { once: true } : undefined}
      transition={animated ? { duration: 0.6, delay: groupIndex * 0.1 } : undefined}
      className={`relative flex flex-col overflow-hidden rounded-[2.5rem] ${
        dense ? 'justify-between gap-5 p-5 md:p-6' : 'gap-10 p-8 md:p-10'
      } ${
        isGradient
          ? 'bg-linear-to-br from-primary-light to-primary-dark'
          : 'border border-border-dark bg-black-gradient'
      } ${className}`}
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
        className={`pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full ${
          dense ? '' : 'blur-3xl'
        } ${isGradient ? 'bg-white/20' : 'bg-primary-light/20'}`}
        style={
          dense
            ? {
                background: isGradient
                  ? 'radial-gradient(circle, rgba(255,255,255,0.28), transparent 68%)'
                  : 'radial-gradient(circle, rgba(12,185,249,0.28), transparent 68%)',
              }
            : undefined
        }
      />

      <div className="relative z-10">
        <h3 className={`font-semibold text-[#FAFAFA] ${dense ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'}`}>
          {group.title}
        </h3>
      </div>

      <div className={`relative z-10 grid ${dense ? 'grid-cols-3 gap-2' : animated ? 'grid-cols-2 gap-3 sm:grid-cols-3' : 'grid-cols-3 gap-3'}`}>
        {group.platforms.map((platform, index) => {
          const featured = index === 0;
          return (
            <motion.div
              key={platform}
              initial={animated ? { opacity: 0, y: 16, scale: 0.92 } : false}
              whileInView={animated ? { opacity: 1, y: 0, scale: 1 } : undefined}
              viewport={animated ? { once: true, margin: '-50px' } : undefined}
              transition={animated ? { duration: 0.5, delay: 0.15 + index * 0.06 } : undefined}
              whileHover={animated ? { y: -4, transition: { duration: 0.2 } } : undefined}
              className={`flex flex-col items-center justify-center rounded-2xl border border-white/15 transition-colors hover:border-white/35 hover:bg-white/20 hover:shadow-glow ${
                dense ? 'gap-2 bg-white/15 px-2 py-2.5' : 'gap-3 bg-white/10 px-3 py-5 backdrop-blur-sm'
              } ${animated && featured ? 'col-span-2 sm:col-span-1' : ''}`}
            >
              <TechIcon
                name={platform}
                className={`flex-none text-[#FAFAFA] ${
                  dense ? (featured ? 'h-7 w-7' : 'h-6 w-6') : featured ? 'h-10 w-10' : 'h-8 w-8'
                }`}
              />
              <span className={`text-center font-medium text-[#FAFAFA] ${dense ? 'text-xs' : 'text-sm'}`}>
                {platform}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

function shouldPlayVideo(progress: number, index: number) {
  const scene = sceneAt(progress);
  if (scene.flips[index] > 8) return true;
  return scene.opens[index] > 0.42;
}

function CardVideo({
  group,
  fit,
  index,
  progress,
  playback,
}: {
  group: PlatformGroup;
  fit: MotionValue<number>;
  index: number;
  progress: MotionValue<number>;
  playback: MotionValue<number>;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const depthBoost = PERSPECTIVE / (PERSPECTIVE - FOCUS_Z);
  const raster = useTransform(fit, (value) => Math.max(1, value * FOCUS_SCALE * depthBoost));
  const size = useTransform(raster, (scale) => `${scale * 100}%`);
  const counterScale = useTransform(raster, (scale) => 1 / scale);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !group.video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.preload = 'none';

    const reveal = () => {
      if (video.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) setReady(true);
    };
    let starting = false;
    let near = false;
    const sync = () => {
      const play = near && playback.get() > 0.5 && shouldPlayVideo(progress.get(), index);
      if (play) video.preload = 'auto';
      if (play) {
        if (video.paused && !starting) {
          starting = true;
          video.play().then(() => {
            starting = false;
            reveal();
          }).catch(() => {
            starting = false;
          });
        }
      } else {
        starting = false;
        if (!video.paused) video.pause();
      }
    };

    video.addEventListener('canplaythrough', reveal);
    const unsubscribe = progress.on('change', sync);
    const unsubPlayback = playback.on('change', sync);
    const observer = new IntersectionObserver(([entry]) => {
      near = entry.isIntersecting;
      sync();
    }, { rootMargin: '240px' });
    observer.observe(video);

    return () => {
      observer.disconnect();
      unsubscribe();
      unsubPlayback();
      video.removeEventListener('canplaythrough', reveal);
      video.pause();
    };
  }, [group.video, index, playback, progress]);

  if (!group.video || failed) {
    return (
      <Image src={group.image} alt={group.imageAlt} fill sizes="900px" className="object-cover" />
    );
  }

  return (
    <motion.div
      className="absolute top-0 left-0"
      style={{ width: size, height: size, scale: counterScale, transformOrigin: '0 0' }}
    >
      <video
        ref={videoRef}
        src={group.video}
        poster={group.image}
        muted
        loop
        playsInline
        preload="none"
        onError={() => setFailed(true)}
        className="absolute inset-0 h-full w-full max-w-none object-cover"
      />
      <Image
        src={group.image}
        alt=""
        fill
        sizes="900px"
        className={`z-10 object-cover transition-opacity duration-300 ${ready ? 'opacity-0' : 'opacity-100'}`}
      />
    </motion.div>
  );
}

function SideBlend({
  group,
  fit,
  index,
  progress,
  playback,
}: {
  group: PlatformGroup;
  fit: MotionValue<number>;
  index: number;
  progress: MotionValue<number>;
  playback: MotionValue<number>;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[2.5rem] bg-[#022D49] shadow-[0_24px_50px_rgba(0,0,0,0.45)]">
      <CardVideo group={group} fit={fit} index={index} progress={progress} playback={playback} />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/10 via-black/25 to-[#021826]/78" />
      <div className="relative z-10 flex h-full flex-col justify-between gap-3 p-4">
        <h3 className="w-fit max-w-full rounded-full bg-black/50 px-3 py-1 text-sm font-semibold text-white backdrop-blur-sm">
          {group.title}
        </h3>
        <div className="grid grid-cols-4 gap-1.5">
          {group.platforms.map((platform) => (
            <div
              key={platform}
              className="flex flex-col items-center justify-center gap-1 rounded-xl border border-white/25 bg-black/45 px-1 py-1.5 backdrop-blur-[2px]"
            >
              <TechIcon name={platform} className="h-[18px] w-[18px] flex-none text-white" />
              <span className="w-full truncate text-center text-[10px] leading-3 font-medium text-white">{platform}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SpecialtyCard({
  group,
  index,
  progress,
  playback,
  spacing,
  fit,
  cardHeight,
}: {
  group: PlatformGroup;
  index: number;
  progress: MotionValue<number>;
  playback: MotionValue<number>;
  spacing: MotionValue<number>;
  fit: MotionValue<number>;
  cardHeight: MotionValue<number>;
}) {
  const x = useTransform([progress, spacing], (values: number[]) => {
    const scene = sceneAt(values[0]);
    return -CARD_W / 2 + wrappedOffset(index, scene.active) * values[1];
  });
  const y = useMotionValue(-CARD_H_INITIAL / 2);
  useLayoutEffect(() => {
    const sync = (height: number) => y.set(-height / 2);
    sync(cardHeight.get());
    return cardHeight.on('change', sync);
  }, [cardHeight, y]);
  const z = useTransform(progress, (p) => slotZ(wrappedOffset(index, sceneAt(p).active)));
  const scale = useTransform([progress, fit], (values: number[]) => {
    return slotScale(wrappedOffset(index, sceneAt(values[0]).active)) * values[1];
  });
  const rotateY = useTransform(progress, (p) => slotRotateY(wrappedOffset(index, sceneAt(p).active)));
  const opacity = useTransform(progress, (p) => slotOpacity(wrappedOffset(index, sceneAt(p).active)));
  const zIndex = useTransform(progress, (p) => {
    return Math.round(40 - Math.abs(wrappedOffset(index, sceneAt(p).active)) * 12);
  });
  const flip = useTransform(progress, (p) => sceneAt(p).flips[index]);
  const openAmount = useTransform(progress, (p) => sceneAt(p).opens[index]);
  const closedAmount = useTransform(openAmount, (open) => 1 - open);

  return (
    <motion.div
      className="absolute top-1/2 left-1/2"
      style={{
        width: CARD_W,
        height: cardHeight,
        x,
        y,
        z,
        scale,
        rotateY,
        opacity,
        zIndex,
        transformStyle: 'preserve-3d',
        transformOrigin: 'center center',
        willChange: 'transform',
      }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ rotateY: flip, opacity: closedAmount, transformStyle: 'preserve-3d' }}
      >
        <div className="absolute inset-0 overflow-hidden rounded-[2.5rem] shadow-[0_24px_60px_rgba(0,0,0,0.38)]" style={faceStyle}>
          <PlatformPanel group={group} dense className="h-full" />
        </div>
        <div
          className="absolute inset-0 overflow-hidden rounded-[2.5rem] bg-[#022D49] shadow-[0_24px_60px_rgba(0,0,0,0.38)]"
          style={{ ...faceStyle, transform: 'rotateY(180deg)' }}
        >
          <CardVideo group={group} fit={fit} index={index} progress={progress} playback={playback} />
        </div>
      </motion.div>
      <motion.div aria-hidden className="absolute inset-0" style={{ opacity: openAmount }}>
        <SideBlend group={group} fit={fit} index={index} progress={progress} playback={playback} />
      </motion.div>
    </motion.div>
  );
}

function cueFill(progress: number, index: number) {
  const span = 1 / 3;
  const wrapped = ((progress % 1) + 1) % 1;
  const current = Math.floor(wrapped / span) % 3;
  if (current !== index) return current > index ? 1 : 0;
  return (wrapped - current * span) / span;
}

function AutoCue({ progress }: { progress: MotionValue<number> }) {
  const [step, setStep] = useState(0);
  const bar0 = useTransform(progress, (p) => cueFill(p, 0));
  const bar1 = useTransform(progress, (p) => cueFill(p, 1));
  const bar2 = useTransform(progress, (p) => cueFill(p, 2));
  const bars = [bar0, bar1, bar2];

  useMotionValueEvent(progress, 'change', (p) => {
    const span = 1 / 3;
    const wrapped = ((p % 1) + 1) % 1;
    const next = Math.floor(wrapped / span) % 3;
    setStep((prev) => (prev === next ? prev : next));
  });

  useLayoutEffect(() => {
    const span = 1 / 3;
    const wrapped = ((progress.get() % 1) + 1) % 1;
    setStep(Math.floor(wrapped / span) % 3);
  }, [progress]);

  return (
    <div aria-hidden className="pointer-events-none absolute bottom-4 left-1/2 z-40 -translate-x-1/2">
      <div className="flex items-center gap-3 rounded-full border border-white/15 bg-black/45 px-4 py-2 backdrop-blur-sm">
        <span className="text-xs font-medium tracking-[0.16em] text-[#FAFAFA]">{step + 1}/3</span>
        <span className="flex items-center gap-1.5">
          {bars.map((bar, index) => (
            <span key={index} className="relative h-1 w-8 overflow-hidden rounded-full bg-white/20">
              <motion.span className="absolute inset-y-0 left-0 w-full origin-left bg-[#FAFAFA]" style={{ scaleX: bar }} />
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}

function MotionCarousel({ groups }: { groups: PlatformGroup[] }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const frontRefs = useRef<Array<HTMLDivElement | null>>([]);
  const cardHeight = useMotionValue(CARD_H_INITIAL);
  const spacing = useMotionValue(280);
  const fit = useMotionValue(0.86);
  const { progress, playback } = useAutoProgress(viewportRef);
  const [placed, setPlaced] = useState(false);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const apply = () => {
      const max = frontRefs.current.reduce((tallest, el) => Math.max(tallest, el?.scrollHeight ?? 0), 0);
      const contentH = max > 0 ? max : Math.max(CARD_H_INITIAL - CARD_EXTRA, cardHeight.get() - CARD_EXTRA);
      const nextH = contentH + CARD_EXTRA;
      if (Math.abs(cardHeight.get() - nextH) > 2) cardHeight.set(nextH);

      const width = viewport.clientWidth || window.innerWidth;
      const height = viewport.clientHeight || window.innerHeight;
      if (width < 10 || height < 10) return;
      const next = layoutFor(width, height, nextH);
      spacing.set(next.spacing);
      fit.set(next.fit);
    };

    apply();
    setPlaced(true);
    const observer = new ResizeObserver(apply);
    observer.observe(viewport);
    frontRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    window.addEventListener('resize', apply);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', apply);
    };
  }, [cardHeight, fit, spacing]);

  return (
    <div
      ref={viewportRef}
      className="service-carousel-motion relative w-full"
      style={{ height: 'clamp(640px, 82svh, 900px)', visibility: placed ? 'visible' : 'hidden' }}
    >
      <div
        inert
        aria-hidden
        className="pointer-events-none invisible absolute top-0 left-0 -z-10"
        style={{ width: CARD_W }}
      >
        {groups.map((group, index) => (
          <div
            key={group.title}
            ref={(node) => {
              frontRefs.current[index] = node;
            }}
            style={{ width: CARD_W }}
          >
            <PlatformPanel group={group} dense />
          </div>
        ))}
      </div>

      <div
        className="absolute inset-x-0"
        style={{
          top: 50,
          bottom: CUE_SPACE,
          perspective: PERSPECTIVE,
          perspectiveOrigin: '50% 46%',
        }}
      >
        <div
          className="pointer-events-none absolute bottom-[6%] left-1/2 h-16 w-[46%] -translate-x-1/2 rounded-[100%] bg-black/50 blur-2xl"
          aria-hidden
        />
        <div className="absolute inset-0" style={{ transform: 'rotateX(8deg)', transformStyle: 'preserve-3d' }}>
          {groups.map((group, index) => (
            <SpecialtyCard
              key={group.title}
              group={group}
              index={index}
              progress={progress}
              playback={playback}
              spacing={spacing}
              fit={fit}
              cardHeight={cardHeight}
            />
          ))}
        </div>
      </div>

      <AutoCue progress={progress} />
    </div>
  );
}

function StaticGrid({ groups, reserved = false }: { groups: PlatformGroup[]; reserved?: boolean }) {
  return (
    <div
      className={
        reserved
          ? 'service-carousel-static grid-cols-1 gap-8 lg:grid-cols-3'
          : 'grid grid-cols-1 gap-8 lg:grid-cols-3'
      }
    >
      {groups.map((group, groupIndex) => (
        <PlatformPanel key={group.title} group={group} groupIndex={groupIndex} animated />
      ))}
    </div>
  );
}

export default function ServiceCardsCarousel({ groups }: { groups: PlatformGroup[] }) {
  if (groups.length !== 3) {
    return <StaticGrid groups={groups} />;
  }

  return (
    <div
      className="relative w-screen max-w-[100vw] overflow-x-clip"
      style={{ marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)' }}
      aria-label="Specialty services"
      role="region"
    >
      <StaticGrid groups={groups} reserved />
      <MotionCarousel groups={groups} />
    </div>
  );
}

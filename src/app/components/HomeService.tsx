'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, CodeXml, Cpu, Gamepad2, Monitor, type LucideIcon } from 'lucide-react';
import type { Service } from '@/lib/types/service';
import { techIcons } from './techIcons';

interface HomeServiceProps {
  services: Service[];
}

function pad(value: number) {
  return String(value).padStart(2, '0');
}

function splitTitle(title: string) {
  const words = title.trim().split(/\s+/);
  if (words.length < 2) return { lead: title, accent: '' };
  return { lead: words[0], accent: words.slice(1).join(' ') };
}

function kickerFor(service: Service) {
  const title = service.title.toLowerCase();
  if (title.includes('game')) return 'Interactive Worlds';
  if (title.includes('ui') || title.includes('ux')) return 'Product Experiences';
  if (title.includes('web')) return 'Digital Platforms';
  if (title.includes('ai') || title.includes('content')) return 'Intelligent Creation';
  return service.detail?.tags?.[0] || 'Featured';
}

function iconFor(title: string): LucideIcon {
  const value = title.toLowerCase();
  if (value.includes('game')) return Gamepad2;
  if (value.includes('ui') || value.includes('ux') || value.includes('design')) return Monitor;
  if (value.includes('web') || value.includes('site')) return CodeXml;
  if (value.includes('ai') || value.includes('content')) return Cpu;
  return Monitor;
}

function imageFor(service: Service) {
  if (service.featureThumbnail) return service.featureThumbnail;
  if (service.thumbnail) return service.thumbnail;
  return '/images/services/default.png';
}

function TagGlyph({ name }: { name: string }) {
  const Icon = techIcons[name];
  if (Icon) return <Icon className="h-3.5 w-3.5" color="currentColor" aria-hidden />;
  if (/2d|3d/i.test(name)) return <Gamepad2 className="h-3.5 w-3.5" aria-hidden />;
  return null;
}

const fadeEase = 'ease-[cubic-bezier(0.22,1,0.36,1)]';

function ServiceCopy({ service, indexLabel }: { service: Service; indexLabel: string }) {
  const { lead, accent } = splitTitle(service.title);
  const tags = service.detail?.tags?.slice(0, 3) ?? [];

  return (
    <>
      <p className="text-xs font-semibold tracking-[0.28em] text-[#3ecbff] uppercase md:text-sm">
        {indexLabel}
        <span className="mx-3 text-[#3ecbff]/70">—</span>
        {kickerFor(service)}
      </p>

      <Link href={`/services/${service.slug}`} className="mt-5 block max-w-full font-heading">
        <span className="block text-[clamp(2.8rem,4.6vw,5rem)] leading-[0.92] font-bold tracking-[-0.04em] text-white uppercase">
          {lead}
        </span>
        {accent && (
          <span className="mt-1 block text-[clamp(2.8rem,4.6vw,5rem)] leading-[0.92] font-bold tracking-[-0.04em] text-[#3ecbff] uppercase">
            {accent}
          </span>
        )}
      </Link>

      {service.description && (
        <p className="mt-6 max-w-md text-base leading-relaxed font-medium text-white/75 md:text-lg">
          {service.description}
        </p>
      )}

      {tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 shadow-[inset_0_0_0_1px_rgba(62,203,255,0.08)]"
            >
              <TagGlyph name={tag} />
              {tag}
            </span>
          ))}
        </div>
      )}
    </>
  );
}

export default function HomeService({ services }: HomeServiceProps) {
  const featured = services.slice(0, 4);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (featured.length < 2 || paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % featured.length);
    }, 12000);

    return () => window.clearInterval(id);
  }, [featured.length, paused, active]);

  if (featured.length === 0) return null;

  const safeActive = Math.min(active, featured.length - 1);
  const totalLabel = pad(featured.length);

  return (
    <section
      id="Service"
      className="relative overflow-hidden bg-[#031422] px-6 py-16 text-white md:py-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_40%,rgba(12,185,249,0.22),transparent_46%),radial-gradient(ellipse_at_15%_90%,rgba(1,82,188,0.35),transparent_42%)]" />
      <div className="pointer-events-none absolute top-0 right-[18%] h-full w-px bg-linear-to-b from-transparent via-[#0cb9f9]/50 to-transparent" />
      <div className="pointer-events-none absolute top-16 right-[8%] h-40 w-40 rounded-full bg-[#0cb9f9]/20 blur-3xl" />

      <div className="relative mx-auto max-w-[1500px]">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="h-0.5 w-10 bg-[#3ecbff]" />
            <h2 className="text-sm font-semibold tracking-[0.28em] text-[#f4f8ff]! uppercase md:text-base">
              Featured Services
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <p className="font-heading text-sm font-semibold tracking-[0.18em] md:text-base">
              <span className="inline-grid overflow-hidden">
                {featured.map((item, index) => (
                  <span
                    key={item.slug}
                    className={`col-start-1 row-start-1 text-white transition-[opacity,transform] duration-500 ${fadeEase} ${
                      index === safeActive ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
                    }`}
                    aria-hidden={index !== safeActive}
                  >
                    {pad(index + 1)}
                  </span>
                ))}
              </span>
              <span className="text-white/35"> / {totalLabel}</span>
            </p>
            <div className="flex items-center gap-2">
              {featured.map((item, index) => (
                <button
                  key={item.slug}
                  type="button"
                  aria-label={`Show ${item.title}`}
                  onClick={() => setActive(index)}
                  className={`h-2.5 rounded-full transition-all duration-500 ${fadeEase} ${
                    index === safeActive ? 'w-6 bg-[#3ecbff]' : 'w-2.5 bg-white/25 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 grid items-center gap-10 lg:mt-16 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-10">
          <div className="grid">
            {featured.map((item, index) => {
              const selected = index === safeActive;
              return (
                <div
                  key={item.slug}
                  inert={!selected}
                  aria-hidden={!selected}
                  className={`col-start-1 row-start-1 transition-[opacity,transform] duration-700 ${fadeEase} ${
                    selected ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
                  }`}
                >
                  <ServiceCopy service={item} indexLabel={pad(index + 1)} />
                </div>
              );
            })}
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute -inset-6 rounded-[40px] bg-[radial-gradient(circle_at_55%_45%,rgba(62,203,255,0.28),transparent_62%)]" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] shadow-[0_30px_80px_rgba(0,0,0,0.45)] ring-1 ring-white/10">
              {featured.map((item, index) => {
                const selected = index === safeActive;
                return (
                  <div
                    key={item.slug}
                    inert={!selected}
                    aria-hidden={!selected}
                    className={`absolute inset-0 transition-[opacity,transform] duration-700 ${fadeEase} ${
                      selected ? 'scale-100 opacity-100' : 'pointer-events-none scale-[1.035] opacity-0'
                    }`}
                  >
                    <Link href={`/services/${item.slug}`} className="relative block h-full">
                      <Image
                        src={imageFor(item)}
                        alt={item.title}
                        fill
                        sizes="(min-width: 1024px) 52vw, 100vw"
                        priority={index === 0}
                        className="object-cover"
                      />
                    </Link>
                  </div>
                );
              })}
              <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-[#031422]/35 via-transparent to-transparent lg:from-[#031422]/10" />
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 md:mt-16">
          <div
            className="flex items-stretch gap-1 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] lg:justify-between [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label="Choose a featured service"
          >
            {featured.map((item, index) => {
              const Icon = iconFor(item.title);
              const selected = index === safeActive;
              return (
                <div key={item.slug} className="flex min-w-max flex-1 items-center">
                  {index > 0 && <span className="mx-1 hidden h-8 w-px bg-white/12 lg:block" />}
                  <button
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActive(index)}
                    className={`flex flex-1 items-center justify-center gap-3 px-5 py-3.5 text-sm font-semibold transition-all duration-500 ${fadeEase} md:text-base ${
                      selected
                        ? 'rounded-2xl border border-[#3ecbff]/90 bg-[#3ecbff]/8 text-[#f4f8ff]! shadow-[0_0_28px_rgba(62,203,255,0.25)]'
                        : 'text-[#d5e4f2]! hover:text-white'
                    }`}
                  >
                    <Icon className="h-5 w-5 text-[#3ecbff]" />
                    {item.title}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-10 flex justify-center md:mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-3 rounded-full bg-linear-to-br from-primary-light to-primary-dark px-7 py-3.5 text-sm font-semibold text-[#FAFAFA] transition-colors hover:bg-dark hover:bg-none"
          >
            View more services
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

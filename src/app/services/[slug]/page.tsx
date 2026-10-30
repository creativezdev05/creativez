import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Check, Sparkles, Send, ShieldCheck, Zap } from 'lucide-react';
import DotGridBackground from '@/app/components/DotGridBackground';
import Footer from '@/app/components/Footer';
import Navbar from '@/app/components/Navbar';
import ServiceQuoteForm from '@/app/components/ServiceQuoteForm';
import { getServiceBySlug, getServices } from '@/lib/services';
import CurtainBackground from '@/app/components/CurtainBackground';

export const revalidate = 60;

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: `${service.title} — creativez`,
    description: service.detail.heading,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const { detail } = service;

  return (
    <main className="relative min-h-screen text-slate-900 antialiased selection:bg-indigo-500 selection:text-white">
      {/* Background canvas */}
      <CurtainBackground />
      <Navbar />

      <div className="relative mx-auto max-w-[1500px] px-4 pt-32 pb-20 space-y-12 md:pt-40 md:space-y-16">
        
        {/* HERO SECTION CONTAINER */}
        <section className="relative overflow-hidden  p-6 md:p-10">
          <div className="relative aspect-[16/7] w-full overflow-hidden rounded-2xl border border-slate-100 shadow-inner">
            <Image
              src={detail.heroImage}
              alt={service.title}
              fill
              priority
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
          </div>

          <div className="mt-8 flex flex-col gap-6">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-100 md:text-5xl lg:text-6xl">
              {detail.heading}
            </h1>

            {detail.tags.length > 0 && (
              <div className="flex flex-wrap gap-2.5 pt-2">
                {detail.tags.map((tag) => (
                  <span
                  key={tag}
                  role="button"
                  tabIndex={0}
                  className="inline-flex cursor-pointer items-center rounded-full border border-indigo-100 bg-indigo-50/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-700 shadow-sm transition-all duration-200 hover:border-indigo-300 hover:bg-indigo-100 hover:shadow hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  {tag}
                </span>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* WHAT'S INCLUDED CONTAINER */}
        {detail.whatIncludes.length > 0 && (
          <section className="relative rounded-2xl border border-slate-200/80 bg-[#BED9F6]/80 p-8 shadow-xl shadow-indigo-900/5 backdrop-blur-md md:p-10">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                <Sparkles className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                What&apos;s included
              </h2>
            </div>

            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {detail.whatIncludes.map((item) => (
                <li
                  key={item}
                  className="group flex items-start gap-3.5 rounded-2xl border border-slate-100 bg-slate-50/60 p-4 transition-all duration-200 hover:border-indigo-200 hover:bg-white hover:shadow-md"
                >
                  <div className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-indigo-600 text-white shadow-sm transition-transform group-hover:scale-110">
                    <Check className="h-4 w-4 stroke-[3]" />
                  </div>
                  <span className="text-base font-medium leading-relaxed text-slate-700 group-hover:text-slate-900">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* PACKAGES CONTAINER */}
        {detail.packages.length > 0 && (
          <section className="relative rounded-2xl border border-slate-200/80 bg-[#BED9F6]/80 p-8 shadow-xl shadow-indigo-900/5 backdrop-blur-md md:p-10">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                <Zap className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                Selectable Packages
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {detail.packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-gradient-to-b from-slate-50/80 to-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg"
                >
                  <div className="space-y-4">
                    <div className="border-b border-slate-200/80 pb-4">
                      <h3 className="text-xl font-bold text-slate-900">{pkg.name}</h3>
                      {pkg.price && (
                        <p className="mt-2 text-2xl font-extrabold text-indigo-600">{pkg.price}</p>
                      )}
                    </div>
                    
                    <ul className="space-y-3 pt-2">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-sm font-medium text-slate-600">
                          <Check className="mt-0.5 h-4 w-4 flex-none text-indigo-600 stroke-[3]" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* REDESIGNED FORM SECTION */}
        <section className="relative overflow-hidden rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-8 shadow-2xl shadow-indigo-950/30 md:p-14">
          {/* Decorative Glowing Orbs */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-300 backdrop-blur-md">
              <Send className="h-3.5 w-3.5 text-indigo-400" />
              Let&apos;s Build Together
            </span>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white md:text-5xl">
              Get Your Custom Quotation
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
              Tell us about your requirements for <span className="font-semibold text-indigo-300">{service.title}</span>, and our team will get back to you within 24 hours with a personalized proposal.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400" /> No commitment required
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-amber-400" /> Fast response time
              </span>
            </div>
          </div>

          {/* Form Wrapper Container with clear contrast */}
          <div className="relative z-10 mx-auto mt-10 w-full">
            <ServiceQuoteForm serviceSlug={service.slug} serviceTitle={service.title} />
          </div>
        </section>

      </div>

      <Footer />
    </main>
  );
}
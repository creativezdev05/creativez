import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Check } from 'lucide-react';
import DotGridBackground from '@/app/components/DotGridBackground';
import Footer from '@/app/components/Footer';
import Navbar from '@/app/components/Navbar';
import ServiceQuoteForm from '@/app/components/ServiceQuoteForm';
import { getServiceBySlug, getServices } from '@/lib/services';

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
    <main className="relative min-h-screen">
      <DotGridBackground dotColor="#6366f1" className="fixed inset-0 -z-10" />
      <Navbar />

      <section className="relative px-6 pt-40 pb-16 md:pt-48">
        <div className="mx-auto max-w-5xl">
          <div className="relative aspect-[16/7] w-full overflow-hidden rounded-[2.5rem]">
            <Image
              src={detail.heroImage}
              alt={service.title}
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="mt-10 flex flex-col gap-6">
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-heading md:text-6xl">
              {detail.heading}
            </h1>

            {detail.tags.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {detail.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#6958cc]/30 bg-[#6958cc]/10 px-4 py-2 text-sm font-medium text-[#5a4b99]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {detail.whatIncludes.length > 0 && (
        <section className="px-6 py-12">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-semibold text-heading md:text-3xl">What&apos;s included</h2>
            <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {detail.whatIncludes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base text-body">
                  <Check className="mt-0.5 h-5 w-5 flex-none text-[#6958cc]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {detail.packages.length > 0 && (
        <section className="px-6 py-12">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-semibold text-heading md:text-3xl">Packages</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              {detail.packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className="flex flex-col gap-4 rounded-[2rem] border border-[#6958cc]/15 bg-[#FAFAFA]/40 p-7"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-heading">{pkg.name}</h3>
                    {pkg.price && (
                      <p className="mt-1 text-lg font-medium text-[#5a4b99]">{pkg.price}</p>
                    )}
                  </div>
                  <ul className="flex flex-col gap-2">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-body">
                        <Check className="mt-0.5 h-4 w-4 flex-none text-[#6958cc]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-heading md:text-5xl">
            Get a quotation
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-body md:text-lg">
            Tell us about your project and we&apos;ll get back to you with a customized quote for{' '}
            {service.title}.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-2xl px-2">
          <ServiceQuoteForm serviceSlug={service.slug} serviceTitle={service.title} />
        </div>
      </section>

      <Footer />
    </main>
  );
}

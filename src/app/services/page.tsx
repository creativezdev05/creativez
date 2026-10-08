import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import DotGridBackground from '@/app/components/DotGridBackground';
import Footer from '@/app/components/Footer';
import Navbar from '@/app/components/Navbar';
import { getServices } from '@/lib/services';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Our Services — creativez',
  description: 'Explore everything creativez can design, build and grow for your brand.',
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <main className="relative min-h-screen">
      <DotGridBackground dotColor="#6366f1" className="fixed inset-0 -z-10" />
      <Navbar />

      <section className="relative px-6 pt-40 pb-16 md:pt-48">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-heading md:text-6xl">
            Our Services
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-body md:text-lg">
            Everything we design, build and grow for your brand — pick a service to see what&apos;s
            included.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group flex flex-col overflow-hidden rounded-[2rem] border border-[#6958cc]/15 bg-[#FAFAFA]/40 transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={service.thumbnail}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <h2 className="text-xl font-semibold text-heading">{service.title}</h2>
                <p className="flex-1 text-sm leading-relaxed text-body">{service.description}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#5a4b99]">
                  View detail
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import CurtainBackground from '@/app/components/CurtainBackground';
import Footer from '@/app/components/Footer';
import Navbar from '@/app/components/Navbar';

export const metadata: Metadata = {
  title: 'Terms of Use — Creativez Solutions',
  description: 'The terms that apply when you use the Creativez Solutions website and services.',
};

const sections = [
  {
    title: 'Using this website',
    body: [
      'This website is provided by Creativez Solutions for information about our design, strategy, and digital work. By browsing the site, submitting a form, or subscribing to the newsletter, you agree to these terms.',
      'You may use the site for lawful purposes only. Do not attempt to disrupt the site, access areas you are not authorized to use, or submit content that is unlawful, misleading, or harmful.',
    ],
  },
  {
    title: 'Services and proposals',
    body: [
      'Descriptions of services, timelines, and pricing on this website are general information. A project starts only after we confirm scope, fees, and terms in a separate agreement.',
      'Submitting a contact form or quote request does not create a client relationship or obligate either party to proceed.',
    ],
  },
  {
    title: 'Intellectual property',
    body: [
      'The text, visuals, logos, and other materials on this site belong to Creativez Solutions or our licensors. You may view them for personal reference. You may not copy, republish, or use them commercially without our written permission.',
      'Work we create for a client is governed by the agreement for that project, including who owns the final deliverables.',
    ],
  },
  {
    title: 'Newsletter',
    body: [
      'If you subscribe, we will send occasional updates about our work. You can unsubscribe at any time. We handle subscription details as described in our privacy policy.',
    ],
  },
  {
    title: 'Disclaimer',
    body: [
      'The site is provided as available. We work to keep information accurate, but we do not guarantee that every page is complete, current, or free of errors. To the extent allowed by law, Creativez Solutions is not liable for losses that result from using the site or relying on its content.',
      'Links to other websites are provided for convenience. We are not responsible for the content or practices of those sites.',
    ],
  },
  {
    title: 'Changes',
    body: [
      'We may update these terms as the site or our services change. The date at the top of this page shows when they were last revised. Continuing to use the site after an update means you accept the revised terms.',
    ],
  },
];

export default function TermsOfUsePage() {
  return (
    <main className="relative min-h-screen">
      <CurtainBackground />
      <Navbar />

      <section className="relative px-6 pt-40 pb-24 md:pt-48 md:pb-32">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-medium tracking-wide text-primary-light">Last updated November 11, 2026</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-heading md:text-6xl">
            Terms of Use
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/80">
            These terms cover your use of the Creativez Solutions website. They do not replace a
            project agreement we sign with you for design or development work.
          </p>

          <div className="mt-12 flex flex-col gap-10">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-xl font-semibold tracking-tight text-heading md:text-2xl">{section.title}</h2>
                <div className="mt-3 flex flex-col gap-3">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-relaxed text-white/75 md:text-[17px]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            <div>
              <h2 className="text-xl font-semibold tracking-tight text-heading md:text-2xl">Contact</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/75 md:text-[17px]">
                Questions about these terms can be sent through our{' '}
                <Link href="/contact" className="text-primary-light underline underline-offset-4">
                  contact page
                </Link>
                . How we handle personal information is described in our{' '}
                <Link href="/privacy-policy" className="text-primary-light underline underline-offset-4">
                  privacy policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import CurtainBackground from '@/app/components/CurtainBackground';
import Footer from '@/app/components/Footer';
import Navbar from '@/app/components/Navbar';

export const metadata: Metadata = {
  title: 'Privacy Policy — Creativez Solutions',
  description: 'How Creativez Solutions collects, uses, and protects information you share with us.',
};

const sections = [
  {
    title: 'Information we collect',
    body: [
      'When you use our website, we may collect information you choose to send us, including your name, email address, and the details of a project inquiry or newsletter signup.',
      'We also collect limited technical data such as browser type, device, pages visited, and referring URLs. This is gathered through cookies and similar tools, including Google Analytics, so we can understand how the site is used.',
    ],
  },
  {
    title: 'How we use information',
    body: [
      'We use this information to reply to inquiries, send the newsletter you requested, improve the website, and understand which services people are interested in.',
      'We do not sell your personal information. We share it only with service providers who help us operate the site and email, or when we are required to do so by law.',
    ],
  },
  {
    title: 'Cookies',
    body: [
      'Cookies are small files stored on your device. We use them to remember basic preferences and to measure site traffic. You can block or delete cookies in your browser settings. Some parts of the site may work differently if you do.',
    ],
  },
  {
    title: 'How long we keep it',
    body: [
      'We keep contact and newsletter details for as long as we need them to respond to you, send updates you asked for, or meet a legal requirement. You can ask us to remove your newsletter subscription or inquiry details at any time.',
    ],
  },
  {
    title: 'Your choices',
    body: [
      'You can unsubscribe from the newsletter using the link in any message we send, or by contacting us. You may also ask what information we hold about you and request a correction or deletion, subject to any records we must keep.',
    ],
  },
  {
    title: 'Updates',
    body: [
      'We may update this policy when our practices change. The date at the top of this page shows when it was last revised. Continued use of the site after an update means you accept the revised policy.',
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="relative min-h-screen">
      <CurtainBackground />
      <Navbar />

      <section className="relative px-6 pt-40 pb-24 md:pt-48 md:pb-32">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-medium tracking-wide text-primary-light">Last updated November 11, 2026</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-heading md:text-6xl">
            Privacy Policy
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/80">
            Creativez Solutions respects your privacy. This page explains what we collect when you
            visit our website, submit a form, or subscribe to our newsletter, and how that
            information is used.
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
                Questions about this policy can be sent through our{' '}
                <Link href="/contact" className="text-primary-light underline underline-offset-4">
                  contact page
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

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Send } from 'lucide-react';
import { sendGAEvent } from '@next/third-parties/google';

interface FooterColumn {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}

const columns: FooterColumn[] = [
  {
    title: 'Menus',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About Us', href: '#About' },
      { label: 'Projects', href: '#Projects' },
      { label: 'Service', href: '#Service' },
      { label: 'Contact', href: '#Service' },
    ],
  },
  // {
  //   title: 'Template',
  //   links: [
  //     { label: 'Style Guide', href: '#' },
  //     { label: 'License', href: '#' },
  //     { label: 'Changelog', href: '#' },
  //     { label: 'Password', href: '#' },
  //     { label: '404', href: '#' },
  //   ],
  // },
  {
    title: 'Social Media',
    links: [
      { label: 'Facebook', href: 'https://www.facebook.com/', external: true },
      { label: 'Instagram', href: 'https://www.instagram.com/', external: true },
      { label: 'Linkedin', href: 'https://www.linkedin.com/company/creativez-design/?viewAsMember=true', external: true },
      { label: 'Pinterest', href: 'https://www.pinterest.com/', external: true },
      { label: 'Twitter', href: 'https://x.com/', external: true },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [error, setError] = useState('');

  return (
    <footer id="footer" className="relative overflow-hidden px-6 py-6">
      <div className="relative mx-auto max-w-[1500px] overflow-hidden rounded-[2.5rem] bg-[radial-gradient(circle_at_50%_26%,_#1b1a21,_#1b1a21_66%,_#5a4b99_102%)] pt-20 md:rounded-[4.375rem]">
        <Image
          src="/images/pixgro-wordmark-footer.png"
          alt=""
          aria-hidden
          width={1288}
          height={260}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 mx-auto w-[96%] object-contain opacity-80"
        />

        <div className="relative z-10 px-6 md:px-14">
          <div className="flex flex-col gap-16">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.75fr_0.65fr]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:gap-20"
              >
                {columns.map((column) => (
                  <div key={column.title} className="flex flex-col gap-6">
                    <span className="text-sm font-bold tracking-wide text-[#FAFAFA] uppercase">
                      {column.title}
                    </span>
                    <div className="flex flex-col gap-4">
                      {column.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target={link.external ? '_blank' : undefined}
                          rel={link.external ? 'noreferrer' : undefined}
                          className="text-base font-medium text-[#FAFAFA] transition-colors hover:text-[#7d64c5]"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="rounded-[2.5rem] bg-gradient-to-br from-[#FAFAFA]/20 to-[#FAFAFA]/5 p-px"
              >
                <div className="flex h-full flex-col justify-between gap-8 rounded-[2.5rem] bg-[#444649]/60 p-7 backdrop-blur-[1.5px] md:p-9">
                  <div className="flex flex-col gap-1">
                    <span className="text-base text-[#FAFAFA]">Subscribe to Our</span>
                    <h2 className="text-left text-3xl font-semibold text-[#FAFAFA] md:text-4xl">
                      Newsletter
                    </h2>
                  </div>

                  <form
                    onSubmit={async (event) => {
                      event.preventDefault();
                      setError('');
                      setStatus('loading');
                      try {
                        const response = await fetch('/api/newsletter', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ email }),
                        });
                        const data = await response.json();
                        if (!response.ok) {
                          throw new Error(data?.error || 'Something went wrong. Please try again.');
                        }
                        if (response.ok && data.alreadySubscribed) {
                          setStatus('error');
                          setError('This email is already subscribed.');
                          return;
                        }
                        sendGAEvent('event', 'newsletter_form_submit', {
                          form_name: 'newsletter',
                        });
                        setStatus('idle');
                        setSubmitted(true);
                        setEmail('');
                      } catch (err) {
                        setStatus('error');
                        setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
                      }
                    }}
                    className="flex w-full items-center gap-3"
                  >
                    <input
                      type="email"
                      required
                      maxLength={256}
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="Your email here..."
                      disabled={status === 'loading'}
                      className="w-full rounded-full border border-transparent bg-[#FAFAFA]/9 px-5 py-3.5 text-sm text-[#FAFAFA] placeholder-[#c4c4c4] backdrop-blur-[1.5px] outline-none transition-colors hover:border-[#6958cc] focus:border-[#c4c4c480] disabled:opacity-60"
                    />
                    <button
                      type="submit"
                      aria-label="Subscribe"
                      disabled={status === 'loading'}
                      className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-linear-to-br from-[#7d64c5] to-[#5a4b99] text-[#FAFAFA] transition-colors hover:bg-[#433b7b] hover:bg-none disabled:opacity-60"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </form>

                  {status === 'error' && error && (
                    <p className="text-sm text-red-400">{error}</p>
                  )}

                  {submitted && status !== 'error' && (
                    <p className="text-sm text-green-400">
                      Thank you! Your submission has been received!
                    </p>
                  )}

                  <p className="mt-2 text-base text-[#FAFAFA]/80 italic">
                    &ldquo;Your monthly dose of creativity, delivered straight to your
                    inbox.&rdquo;
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="flex flex-col items-center justify-center gap-1 py-10 text-center md:flex-row md:gap-2">
              <p className="text-sm text-[#FAFAFA]">
                © 2026 Designed by{' '}
                <a
                  href="https://webflow.com/templates/designers/olynex-agency"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#6958cc] underline"
                >
                  Creativez Solutions
                </a>
              </p>
              
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

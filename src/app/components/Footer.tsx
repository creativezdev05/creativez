'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowUp, Send } from 'lucide-react';
import { sendGAEvent } from '@next/third-parties/google';
import { useLenis } from './SmoothScroll';

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM3.558 20.452h3.56V9h-3.56v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const menuLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '#About' },
  { label: 'Projects', href: '#Projects' },
  { label: 'Service', href: '#Service' },
  { label: 'Contact', href: '#Service' },
];

const socialLinks = [
  { label: 'Linkedin', href: 'https://www.linkedin.com/company/creativez-design/?viewAsMember=true', Icon: LinkedinIcon },
  { label: 'Twitter', href: 'https://x.com/', Icon: TwitterIcon },
];

const listVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [error, setError] = useState('');
  const lenisRef = useLenis();

  const scrollToTop = () => {
    const lenis = lenisRef?.current;
    if (lenis) lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="relative overflow-hidden px-6 py-6">
      <div className="relative mx-auto max-w-[1500px] overflow-hidden rounded-[2.5rem] bg-[radial-gradient(circle_at_50%_26%,_var(--color-dark-background),_var(--color-dark-background)_66%,_var(--color-primary-dark)_102%)] pt-20 md:rounded-[4.375rem]">
        <Image
          src="/images/pixgro-wordmark-footer.png"
          alt=""
          aria-hidden
          width={1288}
          height={260}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 mx-auto w-[96%] object-contain opacity-80"
        />

        <div className="relative z-10 px-6 md:px-14">
          <div className="flex flex-col gap-14">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={listVariants}
                className="flex flex-col justify-between gap-10"
              >
                <motion.div variants={itemVariants} className="flex flex-col gap-4">
                  <Image
                    src="/images/logo/logo.png"
                    alt="Creativez Solutions"
                    width={150}
                    height={150}
                    className="h-10 w-auto self-start object-contain"
                  />
                  <p className="max-w-sm text-base text-[#FAFAFA]/70">
                    Crafting bold digital experiences through design, strategy, and motion.
                  </p>
                </motion.div>

                <motion.nav variants={listVariants} className="flex flex-wrap gap-x-8 gap-y-3">
                  {menuLinks.map((link) => (
                    <motion.a
                      key={link.label}
                      variants={itemVariants}
                      href={link.href}
                      whileHover={{ y: -2 }}
                      className="group relative text-base font-medium text-[#FAFAFA] transition-colors hover:text-primary-light"
                    >
                      {link.label}
                      <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary-light transition-all duration-300 group-hover:w-full" />
                    </motion.a>
                  ))}
                </motion.nav>

                <motion.div variants={listVariants} className="flex items-center gap-3">
                  {socialLinks.map(({ label, href, Icon }) => (
                    <motion.a
                      key={label}
                      variants={itemVariants}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      whileHover={{ y: -3, scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-[#FAFAFA]/15 bg-surface/5 text-[#FAFAFA] transition-colors hover:border-primary-light/60 hover:bg-primary-light/15 hover:text-primary-light"
                    >
                      <Icon className="h-4 w-4" />
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ y: -4 }}
                className="rounded-[2.5rem] bg-gradient-to-br from-surface/20 to-surface/5 p-px"
              >
                <div className="flex h-full flex-col justify-between gap-8 rounded-[2.5rem] bg-footer-card/60 p-7 backdrop-blur-[1.5px] md:p-9">
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
                      className="w-full rounded-full border border-transparent bg-surface/9 px-5 py-3.5 text-sm text-[#FAFAFA] placeholder-[#c4c4c4] backdrop-blur-[1.5px] outline-none transition-colors hover:border-primary focus:border-[#c4c4c480] disabled:opacity-60"
                    />
                    <motion.button
                      type="submit"
                      aria-label="Subscribe"
                      disabled={status === 'loading'}
                      whileHover={{ scale: 1.08, rotate: 8 }}
                      whileTap={{ scale: 0.92 }}
                      className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-linear-to-br from-primary-light to-primary-dark text-[#FAFAFA] transition-colors hover:bg-dark hover:bg-none disabled:opacity-60"
                    >
                      <Send className="h-4 w-4" />
                    </motion.button>
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

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-px w-full origin-left bg-linear-to-r from-transparent via-surface/20 to-transparent"
            />

            <div className="flex flex-col items-center justify-between gap-4 pb-6 text-center md:flex-row">
              <p className="text-sm text-[#FAFAFA]">
                © 2026 Designed by{' '}
                <a
                  href="https://webflow.com/templates/designers/olynex-agency"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary underline"
                >
                  Creativez Solutions
                </a>
              </p>

              <motion.button
                type="button"
                onClick={scrollToTop}
                aria-label="Back to top"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.92 }}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#FAFAFA]/15 bg-surface/5 text-[#FAFAFA] transition-colors hover:border-primary-light/60 hover:bg-primary-light/15 hover:text-primary-light"
              >
                <ArrowUp className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Sparkles, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLenis } from './SmoothScroll';

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'Services', href: '#Service' },
  { label: 'About', href: '#About' },
  { label: 'Work', href: '#Work' },
  { label: 'Testimonial', href: '#Testimonial' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState('Home');
  const lenisRef = useLenis();
  const pathname = usePathname();
  const isHome = pathname === '/';

  const scrollToSection = (href: string) => {
    const lenis = lenisRef?.current;
    if (href === '#') {
      if (lenis) lenis.scrollTo(0, { duration: 1.2 });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.querySelector(href);
    if (!target) return;
    if (lenis) {
      lenis.scrollTo(target as HTMLElement, { offset: -96, duration: 1.2 });
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Coming back from another page with a target section (e.g. /#About):
  // wait for layout/Lenis to settle, then scroll to it.
  useEffect(() => {
    if (!isHome) return;
    const hash = window.location.hash;
    if (!hash) return;
    const match = navLinks.find((l) => l.href === hash);
    const timer = setTimeout(() => {
      scrollToSection(hash);
      if (match) setActive(match.label);
    }, 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHome]);

  const linkHref = (href: string) => {
    if (isHome) return href;
    return href === '#' ? '/' : `/${href}`;
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: { label: string; href: string }) => {
    setActive(link.label);
    setIsOpen(false);
    if (isHome) {
      e.preventDefault();
      scrollToSection(link.href);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="fixed inset-x-0 top-0 z-50 border-b border-[#262626] bg-nav/80 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-4">
        <a
          href={linkHref('#')}
          onClick={(e) => {
            setActive('Home');
            setIsOpen(false);
            if (isHome) {
              e.preventDefault();
              scrollToSection('#');
            }
          }}
          className="flex items-center gap-2"
        >

          <span className="text-lg font-semibold text-[#FAFAFA]">
            <Image src="/images/logo/logo.png" alt="Logo" width={150} height={150} />
          </span>
        </a>

        <nav className="hidden items-center gap-8 rounded-full border border-[#262626] px-6 py-2 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={linkHref(link.href)}
              onClick={(e) => handleNavClick(e, link)}
              className={`group relative py-1 text-sm font-medium transition-colors ${
                active === link.label ? 'text-[#FAFAFA]' : 'text-[#A1A1AA] hover:text-[#FAFAFA]'
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-primary-light to-primary-dark transition-transform duration-300 ${
                  active === link.label ? 'scale-x-100' : 'group-hover:scale-x-100'
                }`}
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden rounded-full bg-gradient-to-br from-primary-light to-primary-dark px-5 py-2.5 text-sm font-semibold text-[#FAFAFA] transition-colors hover:bg-dark hover:bg-none md:inline-flex"
          >
            Get In Touch
          </Link>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#262626] text-[#FAFAFA] md:hidden"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-[#262626] md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={linkHref(link.href)}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    active === link.label
                      ? 'bg-nav-item text-[#FAFAFA]'
                      : 'text-[#A1A1AA] hover:bg-nav-item hover:text-[#FAFAFA]'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="mt-2 rounded-full bg-gradient-to-br from-primary-light to-primary-dark px-5 py-2.5 text-center text-sm font-semibold text-[#FAFAFA]"
              >
                Get In Touch
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

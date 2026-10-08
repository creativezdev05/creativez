'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { sendGAEvent } from '@next/third-parties/google';

interface ServiceQuoteFormProps {
  serviceSlug: string;
  serviceTitle: string;
}

export default function ServiceQuoteForm({ serviceSlug, serviceTitle }: ServiceQuoteFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [customInstructions, setCustomInstructions] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setStatus('loading');
    try {
      const response = await fetch('/api/service-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceSlug,
          serviceType: serviceTitle,
          name,
          email,
          customInstructions,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || 'Something went wrong. Please try again.');
      }
      sendGAEvent('event', 'service_quote_form_submit', {
        form_name: 'service_quote',
        service_slug: serviceSlug,
        service_title: serviceTitle,
      });
      setStatus('idle');
      setSubmitted(true);
      setName('');
      setEmail('');
      setCustomInstructions('');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mx-auto w-full max-w-2xl rounded-[2.5rem] bg-gradient-to-br from-[#FAFAFA]/20 to-[#FAFAFA]/5 p-px"
    >
      <div className="rounded-[2.5rem] bg-[#171618]/80 p-7 backdrop-blur-[1.5px] md:p-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="serviceType" className="text-sm font-medium text-[#FAFAFA]">
              Service
            </label>
            <input
              id="serviceType"
              type="text"
              value={serviceTitle}
              readOnly
              disabled
              className="w-full rounded-2xl border border-transparent bg-[#FAFAFA]/9 px-5 py-3.5 text-sm text-[#FAFAFA] opacity-80 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-[#FAFAFA]">
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                maxLength={150}
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your name"
                disabled={status === 'loading'}
                className="w-full rounded-2xl border border-transparent bg-[#FAFAFA]/9 px-5 py-3.5 text-sm text-[#FAFAFA] placeholder-[#c4c4c4] outline-none transition-colors hover:border-[#6958cc] focus:border-[#c4c4c480] disabled:opacity-60"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-[#FAFAFA]">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                maxLength={256}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                disabled={status === 'loading'}
                className="w-full rounded-2xl border border-transparent bg-[#FAFAFA]/9 px-5 py-3.5 text-sm text-[#FAFAFA] placeholder-[#c4c4c4] outline-none transition-colors hover:border-[#6958cc] focus:border-[#c4c4c480] disabled:opacity-60"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="customInstructions" className="text-sm font-medium text-[#FAFAFA]">
              Customized Instructions
            </label>
            <textarea
              id="customInstructions"
              required
              maxLength={5000}
              rows={6}
              value={customInstructions}
              onChange={(event) => setCustomInstructions(event.target.value)}
              placeholder="Tell us about your project and what you need..."
              disabled={status === 'loading'}
              className="px-10 w-full resize-none rounded-2xl border border-transparent bg-[#FAFAFA]/9 px-5 py-3.5 text-sm text-[#FAFAFA] placeholder-[#c4c4c4] outline-none transition-colors hover:border-[#6958cc] focus:border-[#c4c4c480] disabled:opacity-60"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="mt-2 inline-flex items-center justify-center gap-3 self-start rounded-full bg-gradient-to-br from-[#7d64c5] to-[#5a4b99] px-7 py-3.5 text-sm font-semibold text-[#FAFAFA] transition-colors hover:bg-[#433b7b] hover:bg-none disabled:opacity-60"
          >
            {status === 'loading' ? 'Sending...' : 'Request a quotation'}
            <Send className="h-4 w-4" />
          </button>

          {status === 'error' && error && <p className="text-sm text-red-400">{error}</p>}

          {submitted && status !== 'error' && (
            <p className="text-sm text-green-400">
              Thank you! We&apos;ll get back to you with a quotation soon.
            </p>
          )}
        </form>
      </div>
    </motion.div>
  );
}

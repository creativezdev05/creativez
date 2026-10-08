'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setStatus('loading');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || 'Something went wrong. Please try again.');
      }
      setStatus('idle');
      setSubmitted(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
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
            <label htmlFor="subject" className="text-sm font-medium text-[#FAFAFA]">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              required
              maxLength={200}
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              placeholder="What's this about?"
              disabled={status === 'loading'}
              className="w-full rounded-2xl border border-transparent bg-[#FAFAFA]/9 px-5 py-3.5 text-sm text-[#FAFAFA] placeholder-[#c4c4c4] outline-none transition-colors hover:border-[#6958cc] focus:border-[#c4c4c480] disabled:opacity-60"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-medium text-[#FAFAFA]">
              Write to us
            </label>
            <textarea
              id="message"
              required
              maxLength={5000}
              rows={6}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Tell us about your project..."
              disabled={status === 'loading'}
              className="w-full resize-none rounded-2xl border border-transparent bg-[#FAFAFA]/9 px-5 py-3.5 text-sm text-[#FAFAFA] placeholder-[#c4c4c4] outline-none transition-colors hover:border-[#6958cc] focus:border-[#c4c4c480] disabled:opacity-60"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="mt-2 inline-flex items-center justify-center gap-3 self-start rounded-full bg-gradient-to-br from-[#7d64c5] to-[#5a4b99] px-7 py-3.5 text-sm font-semibold text-[#FAFAFA] transition-colors hover:bg-[#433b7b] hover:bg-none disabled:opacity-60"
          >
            {status === 'loading' ? 'Sending...' : 'Send message'}
            <Send className="h-4 w-4" />
          </button>

          {status === 'error' && error && <p className="text-sm text-red-400">{error}</p>}

          {submitted && status !== 'error' && (
            <p className="text-sm text-green-400">
              Thank you! Your message has been received — we&apos;ll get back to you soon.
            </p>
          )}
        </form>
      </div>
    </motion.div>
  );
}

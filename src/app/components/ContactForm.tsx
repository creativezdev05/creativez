'use client';

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

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
    <div className="w-full bg-transparent">
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5">
        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium text-[#FAFAFA]">
              Name <span className="text-primary-light">*</span>
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
              className="w-full rounded-lg border-none bg-surface/10 px-5 py-3.5 text-sm text-[#FAFAFA] placeholder-[#c4c4c4] outline-none transition-opacity focus:bg-surface/20 disabled:opacity-60"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-[#FAFAFA]">
              Email <span className="text-primary-light">*</span>
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
              className="w-full rounded-lg border-none bg-surface/10 px-5 py-3.5 text-sm text-[#FAFAFA] placeholder-[#c4c4c4] outline-none transition-opacity focus:bg-surface/20 disabled:opacity-60"
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-2">
          <label htmlFor="subject" className="text-sm font-medium text-[#FAFAFA]">
            Subject <span className="text-primary-light">*</span>
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
            className="w-full rounded-lg border-none bg-surface/10 px-5 py-3.5 text-sm text-[#FAFAFA] placeholder-[#c4c4c4] outline-none transition-opacity focus:bg-surface/20 disabled:opacity-60"
          />
        </div>

        <div className="flex w-full flex-col gap-2">
          <label htmlFor="message" className="text-sm font-medium text-[#FAFAFA]">
            Write to us <span className="text-primary-light">*</span>
          </label>
          <textarea
            id="message"
            required
            maxLength={5000}
            rows={5}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Tell us about your project..."
            disabled={status === 'loading'}
            className="w-full resize-none rounded-lg border-none bg-surface/10 px-5 py-3.5 text-sm text-[#FAFAFA] placeholder-[#c4c4c4] outline-none transition-opacity focus:bg-surface/20 disabled:opacity-60"
          />
        </div>

        <div className="flex justify-center pt-2">
          <button
            type="submit"
            disabled={status === 'loading'}
            className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-br from-primary-light to-primary-dark px-7 py-3.5 text-sm font-semibold text-[#FAFAFA] transition-colors hover:bg-dark hover:bg-none disabled:opacity-60 cursor-pointer"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-[#FAFAFA]" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <span>Send message</span>
                <Send className="h-4 w-4" />
              </>
            )}
          </button>
        </div>

        {status === 'error' && error && (
          <div className="flex w-full items-center gap-3 rounded-lg bg-red-500/10 p-4 text-sm text-red-400">
            <AlertCircle className="h-5 w-5 flex-none text-red-400" />
            <p>{error}</p>
          </div>
        )}

        {submitted && status !== 'error' && (
          <div className="flex w-full items-start gap-3 rounded-lg bg-emerald-500/10 p-4 text-sm text-emerald-300">
            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-400" />
            <div>
              <p className="font-semibold text-emerald-200">Message Sent Successfully!</p>
              <p className="mt-0.5 text-xs text-emerald-300/80">
                Thank you! Your message has been received — we&apos;ll get back to you soon.
              </p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

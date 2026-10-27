'use client';

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
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
    <div className="w-full bg-transparent">
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5">
        {/* Service Type (Readonly) */}
        <div className="flex w-full flex-col gap-2">
          <label htmlFor="serviceType" className="text-sm font-medium text-[#FAFAFA]">
            Service
          </label>
          <input
            id="serviceType"
            type="text"
            value={serviceTitle}
            readOnly
            disabled
            className="w-full rounded-lg border-none bg-surface/10 px-5 py-3.5 text-sm text-[#FAFAFA] opacity-80 outline-none cursor-not-allowed"
          />
        </div>

        {/* Name and Email */}
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

        {/* Custom Instructions */}
        <div className="flex w-full flex-col gap-2">
          <label htmlFor="customInstructions" className="text-sm font-medium text-[#FAFAFA]">
            Customized Instructions <span className="text-primary-light">*</span>
          </label>
          <textarea
            id="customInstructions"
            required
            maxLength={5000}
            rows={5}
            value={customInstructions}
            onChange={(event) => setCustomInstructions(event.target.value)}
            placeholder="Tell us about your project and what you need..."
            disabled={status === 'loading'}
            className="w-full resize-none rounded-lg border-none bg-surface/10 px-5 py-3.5 text-sm text-[#FAFAFA] placeholder-[#c4c4c4] outline-none transition-opacity focus:bg-surface/20 disabled:opacity-60"
          />
        </div>

        {/* Submit Button Centered */}
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
                <span>Request a quotation</span>
                <Send className="h-4 w-4" />
              </>
            )}
          </button>
        </div>

        {/* Error Alert Box */}
        {status === 'error' && error && (
          <div className="flex w-full items-center gap-3 rounded-lg bg-red-500/10 p-4 text-sm text-red-400">
            <AlertCircle className="h-5 w-5 flex-none text-red-400" />
            <p>{error}</p>
          </div>
        )}

        {/* Success Alert Box */}
        {submitted && status !== 'error' && (
          <div className="flex w-full items-start gap-3 rounded-lg bg-emerald-500/10 p-4 text-sm text-emerald-300">
            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-400" />
            <div>
              <p className="font-semibold text-emerald-200">Request Sent Successfully!</p>
              <p className="mt-0.5 text-xs text-emerald-300/80">
                Thank you! We&apos;ll get back to you with a quotation soon.
              </p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
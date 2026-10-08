import type { Metadata } from 'next';
import { Inter, Syne } from 'next/font/google';
import './globals.css';
import SmoothScroll from './components/SmoothScroll';
import { GoogleAnalytics } from '@next/third-parties/google';


const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-syne',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Creativez Solutions',
  description: 'Scale your brand with unlimited design.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <body className="antialiased">
        <SmoothScroll>{children}</SmoothScroll>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? ''} />
      </body>
    </html>
  );
}
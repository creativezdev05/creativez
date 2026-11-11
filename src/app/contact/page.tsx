import type { Metadata } from 'next';
import ContactForm from '../components/ContactForm';
import CurtainBackground from '../components/CurtainBackground';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export const metadata: Metadata = {
  title: 'Get In Touch — Pixgro',
  description: 'Reach out to Pixgro and let us know about your project.',
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen">
      {/* <DotGridBackground dotColor="#6366f1" className="fixed inset-0 -z-10" /> */}
      <CurtainBackground />
      <Navbar />

      <section className="relative px-4 pt-32 pb-20 md:px-6 md:pt-40 md:pb-28">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-8 shadow-2xl shadow-indigo-950/30 md:p-14">
          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-5xl">
              Get In Touch
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
              Have a project in mind or just want to say hello? Fill out the form
              below and our team will get back to you shortly.
            </p>
          </div>

          <div className="relative z-10 mx-auto mt-10 w-full">
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

import type { Metadata } from 'next';
import ContactForm from '../components/ContactForm';
import DotGridBackground from '../components/DotGridBackground';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export const metadata: Metadata = {
  title: 'Get In Touch — Pixgro',
  description: 'Reach out to Pixgro and let us know about your project.',
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen">
      <DotGridBackground dotColor="#6366f1" className="fixed inset-0 -z-10" />
      <Navbar />

      <section className="relative overflow-hidden px-6 pt-40 pb-24 md:pt-48 md:pb-32">
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-heading md:text-6xl">
            Get In Touch
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-body md:text-lg">
            Have a project in mind or just want to say hello? Fill out the form
            below and our team will get back to you shortly.
          </p>
        </div>

        <div className="relative z-10 mx-auto mt-16 max-w-2xl px-2">
          <ContactForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}

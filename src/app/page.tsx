import dynamic from "next/dynamic";
import CurtainBackground from "./components/CurtainBackground";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import { getServices } from "@/lib/services";
import { getFaqs } from "@/lib/faqs";

const HomeService = dynamic(() => import("./components/HomeService"));
const About = dynamic(() => import("./components/About"));
const Services = dynamic(() => import("./components/Services"));
const Work = dynamic(() => import("./components/Work"));
const OurSpecialities = dynamic(() => import("./components/OurSpecialities"));
const Testimonials = dynamic(() => import("./components/Testimonials"));
const Achievements = dynamic(() => import("./components/Achievements"));
const Brands = dynamic(() => import("./components/Brands"));
const Teams = dynamic(() => import("./components/Teams"));
const Faq = dynamic(() => import("./components/Faq"));
const Footer = dynamic(() => import("./components/Footer"));

export const revalidate = 60;

export default async function Home() {
  const services = await getServices();
  const faqs = await getFaqs();

  return (
    <main className="relative min-h-screen">
      <CurtainBackground />
      <Navbar />
      <Hero />
      <HomeService services={services} />
      <About />
      <Services />
      <Work />
      <OurSpecialities />
      <Testimonials />
      <Achievements />
      {/* <Pricing  /> */}
      <Brands />
      <Teams />
      <Faq faqs={faqs} />
      <Footer />
      {/* Component sections will be imported here as you build them */}
    </main>
  );
}

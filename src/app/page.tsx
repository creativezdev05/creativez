import About from "./components/About";
import Achievements from "./components/Achievements";
import Brands from "./components/Brands";
import DotGridBackground from "./components/DotGridBackground";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import HomeService from "./components/HomeService";
import Navbar from "./components/Navbar";
import OurSpecialities from "./components/OurSpecialities";
import Pricing from "./components/Pricing";
import Services from "./components/Services";
import Teams from "./components/Teams";
import Testimonials from "./components/Testimonials";
import Work from "./components/Work";
import { getServices } from "@/lib/services";
import { getFaqs } from "@/lib/faqs";

export const revalidate = 60;

export default async function Home() {
  const services = await getServices();
  const faqs = await getFaqs();

  return (
    <main className="relative min-h-screen">
      <DotGridBackground
        dotColor="#0786db"
        className="fixed inset-0 -z-10"
      />
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
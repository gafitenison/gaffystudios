import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroAgency from "@/components/sections/HeroAgency";
import Marquee from "@/components/sections/Marquee";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import WorkGrid from "@/components/sections/WorkGrid";
import Clients from "@/components/sections/Clients";
import ContactCTA from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <main className="bg-[#080808] min-h-screen">
      <Navbar />
      <HeroAgency />
      <Marquee />
      <About />
      <Services />
      <WorkGrid />
      <Clients />
      <ContactCTA />
      <Footer />
    </main>
  );
}

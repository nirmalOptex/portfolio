import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/sections/hero";
import { AboutSection } from "@/sections/about";
import { ServicesSection } from "@/sections/services";
import { PortfolioSection } from "@/sections/portfolio";
import { TestimonialsSection } from "@/sections/testimonials";
import { CallToActionSection } from "@/sections/cta";
import { ContactSection } from "@/sections/contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full overflow-hidden">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <TestimonialsSection />
        <CallToActionSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

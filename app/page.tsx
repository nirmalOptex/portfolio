import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { HeroSection } from "@/sections/hero";
import { AboutSection } from "@/sections/about";
import { ExperienceSection } from "@/sections/experience";
import { ServicesSection } from "@/sections/services";
import { PortfolioSection } from "@/sections/portfolio";
import { CallToActionSection } from "@/sections/cta";
import { ContactSection } from "@/sections/contact";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-xl focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground focus:shadow-lg focus:outline-none focus:ring-3 focus:ring-ring/50"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar />
      <main id="main" className="flex-1 w-full overflow-hidden">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ServicesSection />
        <PortfolioSection />
        <CallToActionSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

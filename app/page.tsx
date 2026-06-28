import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/sections/hero";
import { AboutSection } from "@/sections/about";
import { ServicesSection } from "@/sections/services";
import { PortfolioSection } from "@/sections/portfolio";
import { TestimonialsSection } from "@/sections/testimonials";
import { CallToActionSection } from "@/sections/cta";
import { ContactSection } from "@/sections/contact";
import { fetchHomepageData, mapHomepageData } from "@/lib/api";

export default async function Home() {
  const rawData = await fetchHomepageData();
  const data = rawData ? mapHomepageData(rawData) : null;

  return (
    <>
      <Navbar links={data?.navigation} />
      <main className="flex-1 w-full overflow-hidden">
        <HeroSection content={data?.sections?.hero} socialLinks={data?.socialLinks} />
        <AboutSection content={data?.sections?.about} skills={data?.skills} />
        <ServicesSection content={data?.sections?.services} services={data?.services} />
        <PortfolioSection content={data?.sections?.portfolio} projects={data?.projects} />
        <TestimonialsSection content={data?.sections?.testimonials} testimonials={data?.testimonials} />
        <CallToActionSection content={data?.sections?.cta} />
        <ContactSection content={data?.sections?.contact} socialLinks={data?.socialLinks} />
      </main>
      <Footer links={data?.navigation} socialLinks={data?.socialLinks} />
    </>
  );
}

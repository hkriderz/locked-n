import { HeroSection } from "@/components/sections/HeroSection";
import { FacilityHighlights } from "@/components/sections/FacilityHighlights";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CTASection } from "@/components/sections/CTASection";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";

export default function Home() {
  return (
    <>
      <LocalBusinessSchema />
      <HeroSection />
      <FacilityHighlights />
      <ServicesPreview />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}

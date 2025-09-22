import { Metadata } from "next";
import { MissionSection } from "@/components/sections/MissionSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { FacilityGallery } from "@/components/sections/FacilityGallery";
import { ValuesSection } from "@/components/sections/ValuesSection";

export const metadata: Metadata = {
  title: "About Locked N - Premium Sports Facility & Training Academy",
  description: "Learn about Locked N's mission to provide state-of-the-art sports facilities, professional training, and competitive tournaments for athletes of all levels.",
  keywords: "about locked n, sports facility mission, training academy, company background",
};

export default function About() {
  return (
    <>
      <MissionSection />
      <ValuesSection />
      <FacilityGallery />
      <TeamSection />
    </>
  );
}





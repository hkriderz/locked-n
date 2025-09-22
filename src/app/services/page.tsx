import { Metadata } from "next";
import { DetailedServices } from "@/components/DetailedServices";
import { PricingPreview } from "@/components/PricingPreview";
import { ServiceFAQ } from "@/components/ServiceFAQ";

export const metadata: Metadata = {
  title: "Services - Locked N Sports Facility",
  description: "Comprehensive sports services including gym rentals, training programs, youth academy, and tournaments. Professional coaching and state-of-the-art equipment.",
  keywords: "sports services, gym rental, training programs, youth academy, tournaments, professional coaching",
};

export default function Services() {
  return (
    <>
      <DetailedServices />
      <PricingPreview />
      <ServiceFAQ />
    </>
  );
}





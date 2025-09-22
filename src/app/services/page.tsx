import { Metadata } from "next";
import { DetailedServices } from "@/components/DetailedServices";
import { PricingPreview } from "@/components/PricingPreview";
import { ServiceFAQ } from "@/components/ServiceFAQ";

export const metadata: Metadata = {
  title: "Services - Locked N Sports Facility",
  description: "Court rentals, Dr. Dish training, private coaching, and volleyball rentals. State-of-the-art basketball and volleyball facilities with professional equipment.",
  keywords: "court rentals, Dr. Dish training, private coaching, volleyball rentals, basketball training, sports facility",
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






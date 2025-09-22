import { Metadata } from "next";
import { PricingTables } from "@/components/PricingTables";
import { PricingComparison } from "@/components/PricingComparison";
import { PricingFAQ } from "@/components/PricingFAQ";

export const metadata: Metadata = {
  title: "Pricing - Locked N Sports Facility",
  description: "Transparent pricing for court rentals, Dr. Dish training, private coaching, and volleyball sessions. 13 booking options with clear pricing.",
  keywords: "pricing, court rental prices, Dr. Dish training costs, private coaching fees, volleyball rental prices, sports facility pricing",
};

export default function Pricing() {
  return (
    <>
      <PricingTables />
      <PricingComparison />
      <PricingFAQ />
    </>
  );
}






import { Metadata } from "next";
import { PricingTables } from "@/components/PricingTables";
import { PricingComparison } from "@/components/PricingComparison";
import { PricingFAQ } from "@/components/PricingFAQ";

export const metadata: Metadata = {
  title: "Pricing - Locked N Sports Facility",
  description: "Transparent pricing for gym rentals, training programs, youth academy, and tournaments. Flexible packages and group discounts available.",
  keywords: "pricing, gym rental prices, training costs, youth academy fees, tournament entry fees",
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





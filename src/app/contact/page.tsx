import { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { ContactInfo } from "@/components/ContactInfo";
import { MapSection } from "@/components/MapSection";

export const metadata: Metadata = {
  title: "Contact Us - Locked N Sports Facility",
  description: "Get in touch with Locked N for bookings, questions, or facility tours. Call (555) 123-4567 or visit us at 123 Sports Ave.",
  keywords: "contact locked n, sports facility contact, booking information, facility location",
};

export default function Contact() {
  return (
    <>
      <ContactInfo />
      <ContactForm />
      <MapSection />
    </>
  );
}




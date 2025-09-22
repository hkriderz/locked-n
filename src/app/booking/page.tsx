import { Metadata } from "next";
import { BookingForm } from "@/components/BookingForm";
import { BookingSteps } from "@/components/BookingSteps";
import { BookingFAQ } from "@/components/BookingFAQ";

export const metadata: Metadata = {
  title: "Book Now - Locked N Sports Facility",
  description: "Book your training session, gym rental, or tournament at Locked N. Easy online booking with flexible scheduling and instant confirmation.",
  keywords: "book now, online booking, gym rental booking, training session booking, sports facility booking",
};

export default function Booking() {
  return (
    <>
      <BookingSteps />
      <BookingForm />
      <BookingFAQ />
    </>
  );
}




import { Metadata } from "next";
import { BookingForm } from "@/components/BookingForm";
import { BookingSteps } from "@/components/BookingSteps";
import { BookingFAQ } from "@/components/BookingFAQ";

export const metadata: Metadata = {
  title: "Book Now - Locked N Sports Facility",
  description: "Book court rentals, Dr. Dish training, private coaching, and volleyball sessions. Easy online booking with 13 available options for basketball and volleyball.",
  keywords: "book now, court rental booking, Dr. Dish training booking, private coaching booking, volleyball rental booking, sports facility booking",
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






"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { ChevronDown, ChevronUp, Calculator, CreditCard, Gift } from "lucide-react";

const faqs = [
  {
    question: "Are there any hidden fees?",
    answer: "No, our pricing is completely transparent. The price you see is the price you pay. All equipment, court access, and basic services are included in the listed prices."
  },
  {
    question: "How do I book a session?",
    answer: "All sessions are by appointment only. You can book online 24/7 through our booking system, or contact us at 909-287-1268 to schedule your session."
  },
  {
    question: "What's included with Dr. Dish training?",
    answer: "Dr. Dish CT+ sessions include access to state-of-the-art shooting machines, real-time feedback technology, and all necessary training equipment. Sessions can accommodate up to 4 shooters."
  },
  {
    question: "Can I rent just the court without equipment?",
    answer: "Yes! We offer court-only rentals for basketball and volleyball. All court equipment (balls, nets, etc.) is included with your rental at no extra cost."
  },
  {
    question: "What's the difference between practice and game rentals?",
    answer: "Practice rentals are 1-2 hours for training and skill development. Game rentals are 2.5 hours for extended play sessions and competitive games."
  },
  {
    question: "Is private training with Coach Chris available?",
    answer: "Yes! Coach Chris offers one-on-one private training sessions for $225/hour. These include personalized coaching, skill development, and progress tracking."
  },
  {
    question: "Do you offer group discounts?",
    answer: "We offer competitive pricing for groups and teams. Contact us at 909-287-1268 or info@lockedninc.com to discuss group rates and special packages."
  },
  {
    question: "What's your cancellation policy?",
    answer: "We require 24-hour notice for cancellations. Same-day cancellations may be subject to a 50% charge. Rescheduling is free with proper notice."
  }
];

export function PricingFAQ() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Pricing Questions?
          </h2>
          <p className="text-xl text-gray-600">
            Find answers to common questions about our services, booking process, and pricing options.
          </p>
        </motion.div>

        <div className="space-y-4 mb-16">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-50 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-100 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-4"
                >
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Pricing Tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="bg-gray-50 rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Calculator className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Book Online
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Choose from 13 available options and book your session online anytime.
            </p>
            <a href="/booking" className="text-primary font-semibold hover:underline">
              Book Now
            </a>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <CreditCard className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Contact Us
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Have questions? Call us at 909-287-1268 or email info@lockedninc.com.
            </p>
            <a href="/contact" className="text-primary font-semibold hover:underline">
              Contact Now
            </a>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Gift className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Our Services
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Explore our 13 booking options including court rentals, Dr. Dish training, and private coaching.
            </p>
            <a href="/services" className="text-primary font-semibold hover:underline">
              View Services
            </a>
          </div>
        </motion.div>

        {/* Contact for Custom Pricing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 text-center"
        >
          <div className="bg-primary text-white rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Book?
            </h3>
            <p className="text-lg opacity-90 mb-6">
              Choose from 13 available booking options. All sessions are by appointment only. 
              Book online anytime or contact us for assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:909-287-1268"
                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Call 909-287-1268
              </a>
              <a
                href="mailto:info@lockedninc.com"
                className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
              >
                Email Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}






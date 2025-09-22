"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What equipment is included with gym rentals?",
    answer: "All basic training equipment is included with gym rentals, including shooting machines, safety gear, targets, and training aids. Specialized equipment may be available for an additional fee."
  },
  {
    question: "Do I need to bring my own safety equipment?",
    answer: "No, all necessary safety equipment is provided and included in your rental or training session. This includes protective gear, safety glasses, and any other required equipment."
  },
  {
    question: "How far in advance should I book?",
    answer: "We recommend booking at least 24-48 hours in advance to ensure availability. However, we often have same-day availability for individual sessions. Group bookings should be made at least one week in advance."
  },
  {
    question: "What is your cancellation policy?",
    answer: "We offer flexible cancellation with full refunds for cancellations made 24 hours in advance. Same-day cancellations may incur a 50% fee. No-shows will be charged the full session fee."
  },
  {
    question: "Are there age restrictions for the facility?",
    answer: "Children under 12 must be accompanied by an adult. Our youth academy programs are designed for ages 8-18. Adult supervision is required for all minors using the facility."
  },
  {
    question: "Do you offer group discounts?",
    answer: "Yes! Groups of 10 or more receive a 20% discount on rentals and training sessions. We also offer special rates for team bookings and corporate events."
  },
  {
    question: "What should I wear to training sessions?",
    answer: "Comfortable athletic clothing and closed-toe shoes are required. We recommend bringing a water bottle and any personal training accessories you prefer to use."
  },
  {
    question: "How do I become a member?",
    answer: "Membership options are available with significant savings for regular users. Contact us to discuss membership packages that best fit your training needs and schedule."
  }
];

export function ServiceFAQ() {
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
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Find answers to common questions about our services, pricing, and policies.
          </p>
        </motion.div>

        <div className="space-y-4">
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

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-primary text-white rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">
              Still Have Questions?
            </h3>
            <p className="text-lg opacity-90 mb-6">
              Our team is here to help! Contact us for personalized assistance 
              and to learn more about our services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:(555)123-4567"
                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Call (555) 123-4567
              </a>
              <a
                href="mailto:info@lockedn.com"
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







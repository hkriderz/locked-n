"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { ChevronDown, ChevronUp, Calculator, CreditCard, Gift } from "lucide-react";

const faqs = [
  {
    question: "Are there any hidden fees?",
    answer: "No, our pricing is completely transparent. The price you see is the price you pay. All equipment, safety gear, and basic services are included in the listed prices."
  },
  {
    question: "Do you offer payment plans?",
    answer: "Yes, we offer flexible payment plans for monthly packages. You can split your payment into 2-3 installments. Contact us to discuss payment plan options."
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer: "Absolutely! You can upgrade or downgrade your plan at any time. Changes will be prorated based on your current billing cycle and the new plan pricing."
  },
  {
    question: "What discounts are available?",
    answer: "We offer several discounts: 20% off for groups of 10+, 15% off for students with valid ID, 20% off for military personnel, and 10% off for seniors (65+)."
  },
  {
    question: "Is there a cancellation fee?",
    answer: "No cancellation fees for monthly plans. You can cancel anytime with 30 days notice. For prepaid packages, unused sessions are refunded at the daily rate."
  },
  {
    question: "Do you offer family packages?",
    answer: "Yes! We have special family packages that provide significant savings for families with multiple members. Contact us for custom family pricing."
  },
  {
    question: "What's included in the equipment rental?",
    answer: "All basic training equipment is included: shooting machines, targets, safety gear, and training aids. Specialized equipment may be available for an additional fee."
  },
  {
    question: "Can I pause my membership?",
    answer: "Yes, you can pause your membership for up to 3 months per year. This is perfect for vacations, injuries, or other temporary situations."
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
            Find answers to common questions about our pricing, discounts, and payment options.
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
              Price Calculator
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Calculate the cost of your training based on frequency and duration.
            </p>
            <button className="text-primary font-semibold hover:underline">
              Calculate Now
            </button>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <CreditCard className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Payment Options
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Learn about our flexible payment methods and installment plans.
            </p>
            <button className="text-primary font-semibold hover:underline">
              View Options
            </button>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Gift className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Special Offers
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Check out our current promotions and limited-time offers.
            </p>
            <button className="text-primary font-semibold hover:underline">
              View Offers
            </button>
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
              Need Custom Pricing?
            </h3>
            <p className="text-lg opacity-90 mb-6">
              We offer custom pricing for corporate groups, large teams, and special events. 
              Contact us to discuss your specific needs and get a personalized quote.
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





"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { ChevronDown, ChevronUp, Phone, Mail, Clock } from "lucide-react";

const faqs = [
  {
    question: "How far in advance can I book?",
    answer: "You can book up to 30 days in advance. We recommend booking at least 24-48 hours ahead to ensure availability, especially for popular time slots."
  },
  {
    question: "What is your cancellation policy?",
    answer: "We offer flexible cancellation with full refunds for cancellations made 24 hours in advance. Same-day cancellations may incur a 50% fee. No-shows will be charged the full session fee."
  },
  {
    question: "Can I reschedule my booking?",
    answer: "Yes, you can reschedule your booking up to 24 hours before your scheduled time. Simply contact us or use the reschedule option in your confirmation email."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), debit cards, and PayPal. All payments are processed securely through our encrypted payment system."
  },
  {
    question: "Do you offer group discounts?",
    answer: "Yes! Groups of 10 or more receive a 20% discount on rentals and training sessions. Contact us for custom pricing for larger groups or corporate events."
  },
  {
    question: "What if I'm running late?",
    answer: "Please contact us as soon as possible if you're running late. We'll do our best to accommodate you, but late arrivals may result in reduced session time."
  },
  {
    question: "Can I book multiple sessions at once?",
    answer: "Yes, you can book multiple sessions during the checkout process. We also offer package deals for regular users with additional savings."
  },
  {
    question: "What should I bring to my session?",
    answer: "Please bring comfortable athletic clothing, closed-toe shoes, and a water bottle. All necessary equipment and safety gear will be provided."
  }
];

export function BookingFAQ() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Booking Questions?
          </h2>
          <p className="text-xl text-gray-600">
            Find answers to common questions about our booking process and policies.
          </p>
        </motion.div>

        <div className="space-y-4 mb-16">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-sm"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
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

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-white rounded-2xl p-8 shadow-lg"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need More Help?
            </h3>
            <p className="text-gray-600">
              Our support team is here to help with any questions or concerns.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Call Us</h4>
              <p className="text-gray-600 text-sm mb-3">Speak with our team directly</p>
              <a
                href="tel:(555)123-4567"
                className="text-primary font-semibold hover:underline"
              >
                (555) 123-4567
              </a>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Email Us</h4>
              <p className="text-gray-600 text-sm mb-3">Get help via email</p>
              <a
                href="mailto:info@lockedn.com"
                className="text-primary font-semibold hover:underline"
              >
                info@lockedn.com
              </a>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Live Chat</h4>
              <p className="text-gray-600 text-sm mb-3">Chat with us online</p>
              <button className="text-primary font-semibold hover:underline">
                Start Chat
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}







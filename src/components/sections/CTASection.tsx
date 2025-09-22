"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Phone, Mail, Calendar } from "lucide-react";

export function CTASection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-primary to-primary/80 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Experience Excellence?
          </h2>
          <p className="text-xl lg:text-2xl opacity-90 max-w-3xl mx-auto">
            Join hundreds of satisfied clients who have elevated their game at Locked N. 
            Book your session today and discover what makes us different.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - CTA Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h3 className="text-3xl font-bold">
                Book Your Session Today
              </h3>
              <p className="text-lg opacity-90 leading-relaxed">
                Whether you're looking for gym rentals, training programs, or tournament participation, 
                we have the perfect solution for your needs. Our flexible scheduling and professional 
                staff make it easy to get started.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Calendar className="h-4 w-4" />
                </div>
                <span className="text-lg">Easy Online Booking</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Phone className="h-4 w-4" />
                </div>
                <span className="text-lg">24/7 Support Available</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="text-lg">Instant Confirmation</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-4">
                <Link href="/booking">
                  Book Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary">
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Right Side - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8"
          >
            <h4 className="text-2xl font-bold mb-6">Get In Touch</h4>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 mt-1" />
                <div>
                  <div className="font-semibold">Phone</div>
                  <div className="opacity-90">(555) 123-4567</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 mt-1" />
                <div>
                  <div className="font-semibold">Email</div>
                  <div className="opacity-90">info@lockedn.com</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Calendar className="h-6 w-6 mt-1" />
                <div>
                  <div className="font-semibold">Hours</div>
                  <div className="opacity-90">
                    <div>Mon-Fri: 6AM-10PM</div>
                    <div>Sat-Sun: 8AM-8PM</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/20">
              <p className="text-sm opacity-80">
                New to Locked N? We offer special introductory rates for first-time visitors. 
                Contact us to learn more about our welcome packages.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h4 className="text-xl font-bold mb-2">
              Limited Time Offer
            </h4>
            <p className="opacity-90 mb-4">
              Get 20% off your first booking when you sign up for our newsletter
            </p>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/booking?promo=welcome20">
                Claim Your Discount
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}





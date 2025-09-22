"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Play } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center bg-no-repeat opacity-20"></div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
              >
                Premier Basketball
                <span className="block text-[#F37C07]">Training and</span>
                <span className="block">Shooting Lab</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-gray-300 max-w-2xl"
              >
                Welcome to Locked 'N Shooting Facility! We offer a top-notch Basketball Shooting Lab equipped with state-of-the-art Dr. Dish C+ shooting machines. Our services also include Basketball and Volleyball gym rentals, as well as private training sessions.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-lg text-white font-semibold italic"
              >
                Stay focused, stay dedicated, stay Locked 'N!
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" asChild className="text-lg px-8 py-4">
                <Link href="/booking">
                  Book Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" asChild className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-gray-900">
                <Link href="/services">
                  <Play className="mr-2 h-5 w-5" />
                  Learn More
                </Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-3 gap-8 pt-8"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-[#F37C07]">$45</div>
                <div className="text-sm text-gray-300">Starting Price/Hour</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#F37C07]">2</div>
                <div className="text-sm text-gray-300">Dr. Dish C+ Machines</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#F37C07]">Pro</div>
                <div className="text-sm text-gray-300">Grade Equipment</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Image/Video */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-video bg-gray-800 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto">
                    <Play className="h-8 w-8 text-primary-foreground ml-1" />
                  </div>
                  <p className="text-gray-300">Watch Our Facility Tour</p>
                </div>
              </div>
            </div>
            
            {/* Floating Cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="absolute -bottom-6 -left-6 bg-white text-gray-900 p-4 rounded-lg shadow-lg"
            >
              <div className="text-sm font-semibold">Dr. Dish C+</div>
              <div className="text-xs text-gray-600">Shooting Machines</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="absolute -top-6 -right-6 bg-[#F37C07] text-white p-4 rounded-lg shadow-lg"
            >
              <div className="text-sm font-semibold">GYFTED</div>
              <div className="text-xs opacity-90">Powered</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}





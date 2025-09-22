"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin, Navigation, Clock, Car } from "lucide-react";

export function MapSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Find Us
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Visit our training facility located in Rancho Cucamonga, CA. 
            All sessions are by appointment only - book online anytime.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square bg-gray-200 rounded-2xl overflow-hidden shadow-lg">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="text-center text-gray-500">
                  <MapPin className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-lg font-semibold">Interactive Map</p>
                  <p className="text-sm">Google Maps Integration</p>
                </div>
              </div>
            </div>
            
            {/* Map Overlay Info */}
            <div className="absolute top-4 left-4 bg-white rounded-lg p-4 shadow-lg">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 bg-primary rounded-full mr-2"></div>
                <span className="font-semibold text-gray-900">Locked N</span>
              </div>
              <p className="text-sm text-gray-600">10838 Bellcourt</p>
              <p className="text-sm text-gray-600">Rancho Cucamonga, CA 91730</p>
            </div>
          </motion.div>

          {/* Location Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Location Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-primary mr-3 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-900">Address</div>
                    <div className="text-gray-600">
                      10838 Bellcourt<br />
                      Rancho Cucamonga, CA 91730
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-primary mr-3 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-900">Hours</div>
                    <div className="text-gray-600">
                      Appointment Only<br />
                      <a href="/booking" className="text-primary hover:underline">Book online anytime</a>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Car className="h-6 w-6 text-primary mr-3 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-900">Parking</div>
                    <div className="text-gray-600">
                      Free parking available on-site<br />
                      Easy access from major roads
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Directions */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Getting Here
              </h4>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Navigation className="h-5 w-5 text-primary mr-3 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900">From I-10 Freeway</div>
                    <div className="text-sm text-gray-600">
                      Exit at Archibald Ave, head north to Bellcourt
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Navigation className="h-5 w-5 text-primary mr-3 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900">From I-15 Freeway</div>
                    <div className="text-sm text-gray-600">
                      Exit at Foothill Blvd, head west to Bellcourt
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Navigation className="h-5 w-5 text-primary mr-3 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900">From Ontario Airport</div>
                    <div className="text-sm text-gray-600">
                      Take I-10 west to Archibald Ave, approximately 15 minutes
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://maps.google.com/maps?q=10838+Bellcourt+Rancho+Cucamonga+CA+91730"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-primary text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-primary/90 transition-colors"
              >
                Get Directions
              </a>
              <a
                href="tel:909-287-1268"
                className="flex-1 border border-primary text-primary px-6 py-3 rounded-lg font-semibold text-center hover:bg-primary hover:text-white transition-colors"
              >
                Call 909-287-1268
              </a>
            </div>
          </motion.div>
        </div>

        {/* Nearby Amenities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 bg-gray-50 rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Nearby Amenities
            </h3>
            <p className="text-gray-600">
              Conveniently located in Rancho Cucamonga with easy access to dining and shopping
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🍽️</div>
              <h4 className="font-semibold text-gray-900 mb-1">Dining</h4>
              <p className="text-sm text-gray-600">Multiple restaurants and fast food options nearby</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🏪</div>
              <h4 className="font-semibold text-gray-900 mb-1">Shopping</h4>
              <p className="text-sm text-gray-600">Victoria Gardens and other shopping centers close by</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">✈️</div>
              <h4 className="font-semibold text-gray-900 mb-1">Airport Access</h4>
              <p className="text-sm text-gray-600">15 minutes from Ontario International Airport</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}







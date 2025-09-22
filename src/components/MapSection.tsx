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
            Visit our state-of-the-art facility located in the heart of the city. 
            Easy access with plenty of parking available.
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
              <p className="text-sm text-gray-600">123 Sports Ave</p>
              <p className="text-sm text-gray-600">City, State 12345</p>
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
                      123 Sports Ave<br />
                      City, State 12345
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-primary mr-3 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-900">Hours</div>
                    <div className="text-gray-600">
                      Monday - Friday: 6:00 AM - 10:00 PM<br />
                      Saturday - Sunday: 8:00 AM - 8:00 PM
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Car className="h-6 w-6 text-primary mr-3 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-900">Parking</div>
                    <div className="text-gray-600">
                      Free parking available on-site<br />
                      Accessible parking spaces provided
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
                    <div className="font-medium text-gray-900">From Downtown</div>
                    <div className="text-sm text-gray-600">
                      Take Main Street north for 2 miles, turn right on Sports Ave
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Navigation className="h-5 w-5 text-primary mr-3 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900">From Highway 101</div>
                    <div className="text-sm text-gray-600">
                      Exit at Sports Avenue, facility is 0.5 miles on the left
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Navigation className="h-5 w-5 text-primary mr-3 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900">Public Transit</div>
                    <div className="text-sm text-gray-600">
                      Bus routes 15 and 23 stop within 2 blocks of our facility
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-primary text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-primary/90 transition-colors"
              >
                Get Directions
              </a>
              <a
                href="tel:(555)123-4567"
                className="flex-1 border border-primary text-primary px-6 py-3 rounded-lg font-semibold text-center hover:bg-primary hover:text-white transition-colors"
              >
                Call for Directions
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
              Conveniently located near restaurants, hotels, and other services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🍽️</div>
              <h4 className="font-semibold text-gray-900 mb-1">Restaurants</h4>
              <p className="text-sm text-gray-600">Multiple dining options within walking distance</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🏨</div>
              <h4 className="font-semibold text-gray-900 mb-1">Hotels</h4>
              <p className="text-sm text-gray-600">Several hotels nearby for out-of-town visitors</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🛍️</div>
              <h4 className="font-semibold text-gray-900 mb-1">Shopping</h4>
              <p className="text-sm text-gray-600">Shopping centers and stores close by</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}




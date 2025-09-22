"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Target, Users, Trophy, Shield } from "lucide-react";

const missionPoints = [
  {
    icon: Target,
    title: "Excellence in Training",
    description: "We provide cutting-edge equipment and professional coaching to help athletes reach their full potential.",
  },
  {
    icon: Users,
    title: "Community Building",
    description: "Creating a supportive environment where athletes of all levels can learn, grow, and compete together.",
  },
  {
    icon: Trophy,
    title: "Competitive Spirit",
    description: "Hosting tournaments and leagues that challenge athletes and celebrate their achievements.",
  },
  {
    icon: Shield,
    title: "Safety First",
    description: "Maintaining the highest safety standards and equipment maintenance for peace of mind.",
  },
];

export function MissionSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            About Locked N
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Founded with a passion for excellence in sports training, Locked N has become 
            the premier destination for athletes seeking state-of-the-art facilities, 
            professional coaching, and competitive opportunities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-gray-900">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              At Locked N, we believe that every athlete deserves access to world-class 
              training facilities and professional guidance. Our mission is to provide 
              an environment where passion meets performance, where beginners become 
              champions, and where the love of sport thrives.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We're committed to fostering a community that celebrates achievement, 
              supports growth, and creates lasting memories through the power of sport. 
              Whether you're training for competition or pursuing personal fitness goals, 
              Locked N is your partner in excellence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="aspect-square bg-gray-200 rounded-2xl flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-6xl mb-4">🏆</div>
                <p className="text-lg">Facility Photos</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mission Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {missionPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {point.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {point.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}




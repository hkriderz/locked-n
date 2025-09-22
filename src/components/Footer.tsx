import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";

const navigation = {
  main: [
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Pricing", href: "/pricing" },
    { name: "Booking", href: "/booking" },
    { name: "Contact", href: "/contact" },
  ],
  services: [
    { name: "Court Rentals", href: "/services#court-rentals" },
    { name: "Dr. Dish Training", href: "/services#dish-training" },
    { name: "Private Training", href: "/services#private-training" },
    { name: "Volleyball Rentals", href: "/services#volleyball" },
    { name: "Game Rentals", href: "/services#game-rentals" },
  ],
  support: [
    { name: "Client Portal", href: "/portal" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact Support", href: "/contact" },
  ],
  social: [
    {
      name: "Facebook",
      href: "https://facebook.com/lockedn",
      icon: Facebook,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/LOCKEDN_LAB760/",
      icon: Instagram,
    },
  ],
};

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <div className="h-20 w-auto relative">
                <Image
                  src="/images/locked-n-logo.png"
                  alt="Locked 'N Logo"
                  width={240}
                  height={80}
                  className="object-contain"
                />
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Training Location</h4>
                <div className="space-y-1">
                  <div className="flex items-center text-gray-300">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>10838 Bellcourt</span>
                  </div>
                  <div className="flex items-center text-gray-300 ml-6">
                    <span>Rancho Cucamonga, CA 91730</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Phone className="h-4 w-4 mr-2" />
                    <a href="tel:909-287-1268" className="hover:text-white transition-colors">909-287-1268</a>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Corporate Headquarters</h4>
                <div className="space-y-1">
                  <div className="flex items-center text-gray-300">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>555 Anton Blvd, Suite #200</span>
                  </div>
                  <div className="flex items-center text-gray-300 ml-6">
                    <span>Costa Mesa, CA 92626</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center text-gray-300">
                <Clock className="h-4 w-4 mr-2" />
                <Link href="/booking" className="hover:text-white transition-colors">
                  Appointment/Booking Only
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Social */}
          <div className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 mb-6">
              {navigation.support.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4 mb-4">
              {navigation.social.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.name}
                    variant="ghost"
                    size="icon"
                    asChild
                    className="text-gray-300 hover:text-white hover:bg-gray-800"
                  >
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow us on ${item.name}`}
                    >
                      <Icon className="h-6 w-6" />
                    </a>
                  </Button>
                );
              })}
            </div>
            
            <h3 className="text-lg font-semibold mb-3">Mail</h3>
            <div className="flex items-center text-gray-300">
              <Mail className="h-4 w-4 mr-2" />
              <a href="mailto:info@lockedninc.com" className="hover:text-white transition-colors">info@lockedninc.com</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © {new Date().getFullYear()} Locked N. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/privacy"
                className="text-gray-300 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-300 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}




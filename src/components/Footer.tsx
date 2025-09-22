import Link from "next/link";
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
    { name: "Gym Rentals", href: "/services#gym-rentals" },
    { name: "Training Programs", href: "/services#training" },
    { name: "Youth Academy", href: "/services#academy" },
    { name: "Tournaments", href: "/services#tournaments" },
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
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 bg-[#F37C07] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">L'N</span>
              </div>
              <span className="ml-3 text-2xl font-bold">Locked 'N</span>
            </div>
            <p className="text-gray-300 mb-4">
              Premier Basketball Training and Shooting Lab equipped with state-of-the-art Dr. Dish C+ shooting machines. 
              Basketball and Volleyball gym rentals, plus private training sessions. Locked N Powered by Gyfted.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-gray-300">
                <MapPin className="h-4 w-4 mr-2" />
                <span>123 Sports Ave, City, State 12345</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="h-4 w-4 mr-2" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="h-4 w-4 mr-2" />
                <span>info@lockedn.com</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Clock className="h-4 w-4 mr-2" />
                <span>Mon-Fri: 6AM-10PM, Sat-Sun: 8AM-8PM</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
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
          <div>
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
          <div>
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
            <div className="flex space-x-4">
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




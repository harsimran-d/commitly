"use client";

import Google from "@/icons/Google";
import X from "@/icons/X";
import { Globe, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer id="footer" className="bg-neutral-900 pb-8 pt-16 text-neutral-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Company Info */}
          <div className="col-span-1">
            <h3 className="mb-4 text-xl font-bold text-white">AAAS</h3>
            <p className="mb-4">
              Your personal accountability partner for achieving goals and
              maintaining consistency.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="transition-colors duration-300 hover:text-white"
              >
                <X />
              </a>
              <a
                href="#"
                className="transition-colors duration-300 hover:text-white"
              >
                <Google />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="mb-4 font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              {[
                "Home",
                "Features",
                "How It Works",
                "Pricing",
                "Testimonials",
                "FAQ",
                "Integrations",
              ].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/\s+/g, "")}`}
                    className="transition-colors duration-300 hover:text-white"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-1">
            <h4 className="mb-4 font-semibold text-white">Legal</h4>
            <ul className="space-y-2">
              {["Privacy Policy", "Terms of Service", "Contact Us", "Blog"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="transition-colors duration-300 hover:text-white"
                    >
                      {item}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h4 className="mb-4 font-semibold text-white">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-1">
                <MapPin />
                <span>support@aaas.com</span>
              </li>
              <li className="flex items-center gap-1">
                <Globe />
                <span>Available 24/7</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} AAAS. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Trusted by professionals worldwide to achieve their goals through
            accountability.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

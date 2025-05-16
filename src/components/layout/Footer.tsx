"use client";

import Link from "next/link";
import { MapPin, Mail, Phone, Clock, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-[#820000]/90 to-[#820000]/80 backdrop-blur-md text-white py-12 overflow-hidden">
      {/* Glassmorphism decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-[#fdeecd]/20 blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-64 h-64 rounded-full bg-[#fdeecd]/20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-[#fdeecd]/10 blur-3xl"></div>
      </div>
      
      {/* Content container with glass effect */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="backdrop-blur-sm bg-[#820000]/20 rounded-2xl border border-[#fdeecd]/10 p-6 md:p-10 shadow-xl mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo and Info */}
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="relative w-10 h-10">
                  <svg
                    viewBox="0 0 60 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                  >
                    <circle
                      cx="30"
                      cy="30"
                      r="28"
                      fill="#fdeecd"
                      stroke="#820000"
                      strokeWidth="2"
                    />
                    <path
                      d="M20 30L28 38L40 22"
                      stroke="#820000"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="ml-3 text-lg font-medium tracking-wide">Easy drive hub</h3>
              </div>
              
              <p className="text-sm leading-relaxed text-white/80">
                We provide comprehensive vehicle history reports to help you make informed decisions 
                when purchasing used vehicles.
              </p>
              
              <div className="flex space-x-3">
                <a href="#" className="hover:bg-[#fdeecd]/10 p-2 rounded-full transition-all duration-300 text-[#fdeecd]/80 hover:text-[#fdeecd]">
                  <Facebook size={16} />
                </a>
                <a href="#" className="hover:bg-[#fdeecd]/10 p-2 rounded-full transition-all duration-300 text-[#fdeecd]/80 hover:text-[#fdeecd]">
                  <Twitter size={16} />
                </a>
                <a href="#" className="hover:bg-[#fdeecd]/10 p-2 rounded-full transition-all duration-300 text-[#fdeecd]/80 hover:text-[#fdeecd]">
                  <Instagram size={16} />
                </a>
                <a href="#" className="hover:bg-[#fdeecd]/10 p-2 rounded-full transition-all duration-300 text-[#fdeecd]/80 hover:text-[#fdeecd]">
                  <Linkedin size={16} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-base font-medium">Services</h3>
              <div className="border-t border-[#fdeecd]/10 pt-2">
                <ul className="space-y-2">
                  {['Car', 'Bike', 'Truck', 'Van'].map((item) => (
                    <li key={item}>
                      <Link
                        href={`/services/${item.toLowerCase()}-history-report`}
                        className="text-white/70 hover:text-[#fdeecd] transition-colors text-sm flex items-center"
                      >
                        <span className="mr-2 text-xs text-[#fdeecd]/80">›</span>
                        {item} History Report
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Company Links */}
            <div className="space-y-4">
              <h3 className="text-base font-medium">Company</h3>
              <div className="border-t border-[#fdeecd]/10 pt-2">
                <ul className="space-y-2">
                  {['About Us', 'Contact Us'].map((item) => (
                    <li key={item}>
                      <Link
                        href={`/${item.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '')}`}
                        className="text-white/70 hover:text-[#fdeecd] transition-colors text-sm flex items-center"
                      >
                        <span className="mr-2 text-xs text-[#fdeecd]/80">›</span>
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-base font-medium">Get In Touch</h3>
              <div className="border-t border-white/10 pt-2">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <MapPin className="h-4 w-4 mr-3 mt-0.5 text-[#fdeecd]" />
                    <span className="text-white/70 text-sm">17102 wellinghoff court, Richmond TX 77407</span>
                  </li>
                  <li className="flex items-center">
                    <Mail className="h-4 w-4 mr-3 text-[#fdeecd]" />
                    <a
                      href="mailto:info@autoprofilechecker.com"
                      className="text-white/70 hover:text-white text-sm transition-colors"
                    >
                      info@easydrivehub.com
                    </a>
                  </li>
                  <li className="flex items-center">
                    <Phone className="h-4 w-4 mr-3 text-[#fdeecd]" />
                    <a
                      href="tel:+12345678901"
                      className="text-white/70 hover:text-white text-sm transition-colors"
                    >
                      +1 (806) 702 0700
                    </a>
                  </li>
                  <li className="flex items-center">
                    <Clock className="h-4 w-4 mr-3 text-[#fdeecd]" />
                    <span className="text-white/70 text-sm">Mon - Fri: 9:00AM - 5:00PM</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="backdrop-blur-sm bg-[#820000]/30 rounded-xl border border-[#fdeecd]/10 p-6 shadow-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-1">
              <h4 className="text-base font-medium">Subscribe to Our Newsletter</h4>
            </div>
            <div className="md:col-span-2">
              <form className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Your Email Address" 
                  className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-[#fdeecd]/20 focus:outline-none focus:ring-2 focus:ring-[#fdeecd]/30 text-white placeholder-white/50"
                />
                <button 
                  type="submit" 
                  className="px-4 py-2 rounded-lg bg-[#fdeecd] hover:bg-[#fdeecd]/90 border border-[#fdeecd]/20 font-medium transition-all duration-300 text-[#820000]"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#fdeecd]/10 pt-4 flex flex-col md:flex-row justify-between items-center text-xs">
          <p className="text-center md:text-left mb-4 md:mb-0 text-white/60">
            Copyright © {new Date().getFullYear()} <Link href="/" className="hover:text-[#fdeecd] text-white/80">Easy drive hub</Link>, All Rights Reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/terms" className="text-white/60 hover:text-[#fdeecd] transition-colors">Terms</Link>
            <Link href="/privacy" className="text-white/60 hover:text-[#fdeecd] transition-colors">Privacy</Link>
            <Link href="/sitemap" className="text-white/60 hover:text-[#fdeecd] transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
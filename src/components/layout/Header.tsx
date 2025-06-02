"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Menu, X, ChevronRight, Mail, Phone } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`${
        scrolled 
          ? "py-3 backdrop-blur-md bg-[#F9F6EE]/95 shadow-md" 
          : "py-5 backdrop-blur-sm bg-transparent"
      } fixed w-full top-0 z-50 transition-all duration-300`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center z-10">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-[#fdeecd] to-[#fdeecd]/60 backdrop-blur-sm rounded-full shadow-md border border-white/20"></div>
              <Image
                src="/images/logo.png"
                fill
                alt="Easy Drive Hub Logo"
                className="object-contain"
                sizes="(max-width: 700px) 64px, 80px"
              />
            </div>
          </Link>

          <nav className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2">
            <div className={`backdrop-blur-md ${
              scrolled ? 'bg-[#fdeecd]/80' : 'bg-[#820000]/20'
            } rounded-full py-2 px-8 flex items-center space-x-10 shadow-md border ${
              scrolled ? 'border-[#820000]/10' : 'border-white/20'
            }`}>
              <NavLink scrolled={scrolled} href="/">Home</NavLink>
              <NavLink scrolled={scrolled} href="/about">About</NavLink>              
              
              <DropdownMenu>
                <DropdownMenuTrigger className={`group flex items-center gap-1 ${
                  scrolled ? 'text-[#820000]' : 'text-white'
                } font-medium transition-colors`}>
                  Services
                  <ChevronRight className={`h-4 w-4 transition-transform group-data-[state=open]:rotate-90 ${
                    scrolled ? 'text-[#820000]' : 'text-white'
                  }`} />
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="center" 
                  className="rounded-xl backdrop-blur-lg bg-[#F9F6EE]/90 border border-white/30 shadow-xl p-1 mt-1"
                >
                  <DropdownItem href="/services/car-history-report">Car History</DropdownItem>
                  <DropdownItem href="/services/truck-history-report">Truck History</DropdownItem>
                  <DropdownItem href="/services/van-history-report">Van History</DropdownItem>
                  <DropdownItem href="/services/bike-history-report">Bike History</DropdownItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <NavLink scrolled={scrolled} href="/contact">Contact</NavLink>
            </div>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center gap-4">
              <Link 
                href="/contact" 
                className={`group relative overflow-hidden backdrop-blur-md ${
                  scrolled ? 'bg-[#820000]' : 'bg-white/20'
                } ${
                  scrolled ? 'text-[#F9F6EE]' : 'text-white'
                } transition-all px-6 py-2 rounded-full text-sm font-medium shadow-md border ${
                  scrolled ? 'border-[#820000]/50' : 'border-white/30'
                } hover:shadow-lg`}
              >
                <span className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Us
                </span>
              </Link>
            </div>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button className={`lg:hidden relative z-20 w-12 h-12 backdrop-blur-md ${
                  scrolled ? 'bg-[#820000]/90' : 'bg-white/30'
                } rounded-full flex items-center justify-center ${
                  scrolled ? 'text-[#F9F6EE]' : 'text-white'
                } shadow-md hover:bg-[#820000] transition-colors border ${
                  scrolled ? 'border-[#820000]/50' : 'border-white/30'
                }`}>
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              
              <SheetContent 
                side="right" 
                className="w-[300px] backdrop-blur-xl bg-gradient-to-br from-[#F9F6EE] to-[#F9F6EE]/90 border-l border-white/30 p-0"
              >
                <div className="flex flex-col h-full">
                  <div className="p-6 flex justify-between items-center border-b border-[#820000]/10">
                    <div className="relative w-14 h-14">
                      <Image
                        src="/images/logo2.png"
                        fill
                        alt="Easy Drive Hub Logo"
                        className="object-contain"
                      />
                    </div>
                  </div>
                  
                  <nav className="flex flex-col p-6 space-y-6">
                    <div className="space-y-4">
                      <MobileLink href="/" onClick={() => setIsOpen(false)}>Home</MobileLink>
                      <MobileLink href="/about" onClick={() => setIsOpen(false)}>About</MobileLink>
                      <MobileLink href="/contact" onClick={() => setIsOpen(false)}>Contact</MobileLink>
                    </div>
                    
                    <div className="backdrop-blur-sm bg-[#fdeecd]/30 rounded-xl p-4 space-y-3 border border-white/20">
                      <p className="text-sm font-bold text-[#820000]">Services</p>
                      <div className="space-y-3">
                        <MobileServiceLink href="/services/car-history-report" onClick={() => setIsOpen(false)}>
                          Car History
                        </MobileServiceLink>
                        <MobileServiceLink href="/services/truck-history-report" onClick={() => setIsOpen(false)}>
                          Truck History
                        </MobileServiceLink>
                        <MobileServiceLink href="/services/van-history-report" onClick={() => setIsOpen(false)}>
                          Van History
                        </MobileServiceLink>
                        <MobileServiceLink href="/services/bike-history-report" onClick={() => setIsOpen(false)}>
                          Bike History
                        </MobileServiceLink>
                      </div>
                    </div>
                  </nav>
                  
                  <div className="mt-auto p-6 border-t border-[#820000]/10">
                    <p className="text-xs uppercase font-bold text-[#820000]/70 mb-3">Contact</p>
                    <a href="mailto:info@easydrivehub.com" className="flex items-center text-sm text-[#820000] mb-3">
                      <Mail className="h-5 w-5 mr-2 text-[#820000]/70" />
                      info@easydrivehub.com
                    </a>
                    <a href="tel:+1234567890" className="flex items-center text-sm text-[#820000]">
                      <Phone className="h-5 w-5 mr-2 text-[#820000]/70" />
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

const NavLink = ({ scrolled, href, children }) => (
  <Link
    href={href}
    className={`relative font-medium text-sm transition-colors
      after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 
      after:w-0 after:h-[2px] after:transition-all hover:after:w-full ${
        scrolled 
          ? 'text-[#820000] after:bg-[#820000] hover:text-[#820000]/90' 
          : 'text-white after:bg-white hover:text-white/90'
      }`}
  >
    {children}
  </Link>
);

const DropdownItem = ({ href, children }) => (
  <DropdownMenuItem className="focus:bg-[#fdeecd]/50 rounded-lg">
    <Link href={href} className="w-full text-[#820000] text-sm py-2 px-3 flex items-center">
      <div className="w-1 h-1 rounded-full bg-[#820000] mr-2"></div>
      {children}
    </Link>
  </DropdownMenuItem>
);

const MobileLink = ({ href, onClick, children }) => (
  <Link
    href={href}
    onClick={onClick}
    className="text-[#820000] text-lg font-medium p-3 hover:bg-[#820000]/10 rounded-lg transition-colors"
  >
    {children}
  </Link>
);

const MobileServiceLink = ({ href, onClick, children }) => (
  <Link
    href={href}
    onClick={onClick}
    className="text-[#820000]/80 text-base flex items-center hover:bg-[#820000]/10 rounded-lg p-3 transition-colors"
  >
    <ChevronRight className="h-4 w-4 mr-2 text-[#820000]/60" />
    {children}
  </Link>
);
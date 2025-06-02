"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } }
};

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', vin: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(0);

  useEffect(() => {
    if (redirectCountdown > 0) {
      const timer = setTimeout(() => {
        if (redirectCountdown === 1) {
          router.push('/services/car-history-report');
        } else {
          setRedirectCountdown(redirectCountdown - 1);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [redirectCountdown, router]);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'Homepage Contact',
          data: formData
        })
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', vin: '', message: '' });
        setRedirectCountdown(3);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <section className="relative bg-gradient-to-br from-[#820000] to-[#600000] text-white pt-32 pb-24 md:py-40 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/car-interior.jpg"
            alt="Background pattern"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeIn} className="text-center lg:text-left">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Your Free VIN Check Is Just<br className="hidden lg:block" /> A Click Away
              </h1>
              <p className="text-xl mb-10 text-[#fdeecd] max-w-2xl mx-auto lg:mx-0">
                Instant, reliable vehicle history reports powered by industry-leading data sources.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <Button
                  size="xl"
                  className="bg-[#fdeecd] hover:bg-[#f0e0b0] text-[#820000] font-bold shadow-2xl hover:shadow-3xl transition-all"
                  asChild
                >
                  <Link href="#service-packages">View Packages</Link>
                </Button>
                <Button
                  size="xl"
                  variant="outline"
                  className="border-3 border-[#fdeecd] text-white hover:bg-[#820000]/30 hover:border-[#fdeecd]/90 backdrop-blur-sm"
                  asChild
                >
                  <Link href="/about">How It Works</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="hidden lg:block relative h-[560px] rounded-[2rem] overflow-hidden shadow-2xl group">
              <div className="absolute inset-0 bg-gradient-to-t from-[#820000]/40 to-transparent z-10" />
              <Image
                src="/images/mechanic-checking.jpg"
                alt="Car inspection"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-28 bg-[#F9F6EE]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <span className="text-[#820000] font-bold tracking-wider uppercase text-xs mb-6 inline-block">
              Why Choose Us
            </span>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-gray-900">
              Automotive Intelligence<br className="hidden md:block" /> Redefined
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: 'M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2zM9 10h6M9 14h6M9 18h5',
                title: "Full History Reports",
                text: "Comprehensive vehicle background analysis"
              },
              {
                icon: 'M12 2v4m0 12v4M4.93 18.36l2.83-2.83M16.24 7.76l2.83-2.83M2 12h4m12 0h4M4.93 5.64l2.83 2.83M16.24 16.24l2.83 2.83',
                title: "Instant Verification",
                text: "Real-time data validation system"
              },
              {
                icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12h6M12 9v6',
                title: "Multi-Source Data",
                text: "Aggregated from 20+ trusted databases"
              },
              {
                icon: 'M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-8-3a1 1 0 0 0-1 1v4a1 1 0 0 0 2 0v-4a1 1 0 0 0-1-1zm-1 8a1 1 0 1 0 2 0 1 1 0 0 0-2 0z',
                title: "Expert Support",
                text: "24/7 professional consultation"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="h-full bg-white p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border-2 border-transparent hover:border-[#820000]/20">
                  <div className="w-16 h-16 bg-[#820000]/10 rounded-2xl flex items-center justify-center mb-8">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-8 h-8 text-[#820000]"
                    >
                      <path d={feature.icon} />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-[#820000] text-white">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
          >
            {[
              { number: "25M+", label: "VIN Checks Processed" },
              { number: "98%", label: "Customer Satisfaction" },
              { number: "4.9/5", label: "Average Rating" },
              { number: "24/7", label: "Support Availability" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="p-6 sm:p-8 md:p-10 bg-white/5 rounded-xl md:rounded-3xl backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="text-4xl sm:text-5xl md:text-6xl font-black mb-2 sm:mb-4 text-[#fdeecd]">
                  {stat.number}
                </div>
                <p className="text-base sm:text-lg md:text-xl font-medium text-[#fdeecd]/90">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-24 bg-white/10 rounded-3xl p-10  border border-white/50 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#fdeecd]/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#820000]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h3>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">Join thousands of satisfied customers who make confident vehicle decisions with our reports.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote: "The comprehensive report saved me from buying a car with hidden flood damage. Worth every penny!",
              author: "Michael R.",
              role: "First-time Buyer"
            },
            {
              quote: "As a dealership, we rely on these reports daily. The API access and bulk processing features are game changers.",
              author: "Sarah Johnson",
              role: "Auto Dealership Owner"
            },
            {
              quote: "The mobile-friendly interface made it easy to check a vehicle's history right at the seller's location.",
              author: "David Chen",
              role: "Private Collector"
            }
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white/80 p-6 rounded-2xl shadow-lg border border-gray-100"
            >
              <div className="mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="inline-block w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
              <div>
                <p className="font-bold text-gray-900">{testimonial.author}</p>
                <p className="text-sm text-[#820000]">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <section className="py-28 bg-[#F9F6EE]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16"
          >
            <div className="space-y-12">
              <div>
                <span className="text-[#820000] font-bold tracking-wider uppercase text-xs mb-6 inline-block">
                  Contact Us
                </span>
                <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
                  Start Your Vehicle<br className="hidden md:block" /> Journey Today
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl">
                  Connect with our automotive experts for personalized assistance and comprehensive vehicle insights.
                </p>
              </div>

              <div className="space-y-8">
                {[
                  {
                    icon: 'M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z',
                    title: "Email Support",
                    content: "info@easydrivehub.com"
                  },
                  {
                    icon: 'M22 12A10.002 10.002 0 0 0 12 2v0M12 2a10.002 10.002 0 0 0-9.899 11.553v0M12 2a10.002 10.002 0 0 1 9.899 11.553v0M2 12h20',
                    title: "Live Chat",
                    content: "Available 24/7"
                  },
                  {
                    icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12h6M12 9v6',
                    title: "Knowledge Base",
                    content: "500+ Help Articles"
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-6">
                    <div className="w-14 h-14 bg-[#820000]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-7 h-7 text-[#820000]"
                      >
                        <path d={feature.icon} />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-lg text-gray-600">{feature.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[2rem] shadow-2xl p-14 border-2 border-[#820000]/10">
              <h3 className="text-4xl font-bold mb-12 text-gray-900">
                Get Instant Vehicle Report
              </h3>
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-6 py-5 border-2 border-gray-200 rounded-xl focus:border-[#820000] focus:ring-4 focus:ring-[#820000]/20 text-lg"
                    placeholder="Full Name"
                    required
                  />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-6 py-5 border-2 border-gray-200 rounded-xl focus:border-[#820000] focus:ring-4 focus:ring-[#820000]/20 text-lg"
                    placeholder="Email Address"
                    required
                  />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-6 py-5 border-2 border-gray-200 rounded-xl focus:border-[#820000] focus:ring-4 focus:ring-[#820000]/20 text-lg"
                    placeholder="Phone Number"
                    required
                  />
                  <input
                    type="text"
                    value={formData.vin}
                    onChange={(e) => setFormData({ ...formData, vin: e.target.value })}
                    className="w-full px-6 py-5 border-2 border-gray-200 rounded-xl focus:border-[#820000] focus:ring-4 focus:ring-[#820000]/20 text-lg"
                    placeholder="Vehicle VIN"
                    required
                  />
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-6 py-5 border-2 border-gray-200 rounded-xl focus:border-[#820000] focus:ring-4 focus:ring-[#820000]/20 text-lg"
                    placeholder="Special Requirements"
                    required
                  ></textarea>
                </div>
                <Button
                  className="w-full bg-[#820000] hover:bg-[#6a0000] h-16 text-xl font-bold rounded-xl shadow-xl transition-all relative"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="inline-block"
                    >
                      ⏳
                    </motion.span>
                  ) : (
                    'Request Full Report'
                  )}
                </Button>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center p-4 bg-green-100 text-green-700 rounded-xl"
                  >
                    Message sent successfully! <br /> 
                    Redirecting in {redirectCountdown} seconds...
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}
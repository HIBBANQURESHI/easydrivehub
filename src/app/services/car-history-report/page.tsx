"use client";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function CarHistoryReportPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#820000] to-[#600000] text-[#fdeecd] py-28 md:py-40 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/car-interior.jpg"
            alt="Background pattern"
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "center" }}
            priority
          />
        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="container-custom relative z-10 text-center"
        >
          <motion.h1 variants={fadeIn} className="text-5xl md:text-6xl font-bold mb-4">
            Car History Report
          </motion.h1>
          <motion.p variants={fadeIn} className="text-xl md:text-2xl text-[#fdeecd]/90 max-w-3xl mx-auto">
            Unlock the Past And Explore Your Ride's Story With Our History Report Services
          </motion.p>
        </motion.div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-28 bg-[#F9F6EE]">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.span variants={fadeIn} className="text-[#820000] font-semibold tracking-wide mb-4 block">
              CHOOSE A PACKAGE
            </motion.span>
            <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Discover Our Competitive Pricing
            </motion.h2>
            <motion.p variants={fadeIn} className="text-lg text-gray-600 max-w-3xl mx-auto">
              Tailored packages with transparent pricing for every need
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Startup Package",
                price: "$49.99",
                features: ["Vehicle Overview", "Market Value", "Accident Records", "Salvage Records", "Specifications", "Sales Listing", "6 to 12 business hours"],
                popular: false
              },
              {
                title: "Promotional Package",
                price: "$74.99",
                features: ["Vehicle Overview", "Market Value", "Impounds", "Open Recalls", "Expired Warranties", "Specifications", "4 to 8 business hours"],
                popular: true
              },
              {
                title: "Premium Package",
                price: "$99.99",
                features: ["Full Overview", "Theft Records", "Title Records", "Market Value", "Accident Records", "Salvage Records", "Impounds", "Open Recalls", "3 to 6 business hours"],
                popular: false
              }
            ].map((pkg, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -10 }}
                className="relative"
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#820000] text-[#fdeecd] px-6 py-2 rounded-full text-sm font-bold z-20">
                    Most Popular
                  </div>
                )}
                <Card className={`h-full rounded-2xl shadow-xl hover:shadow-2xl transition-all ${pkg.popular ? 'border-2 border-[#820000]' : 'border-[#fdeecd]'
                  }`}>
                  <CardHeader className="pb-4">
                    <CardTitle className={`text-2xl text-center ${pkg.popular ? 'text-[#820000]' : 'text-gray-900'}`}>
                      {pkg.title}
                    </CardTitle>
                    <div className="text-center mt-4">
                      <span className="text-4xl font-bold">{pkg.price}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="py-6">
                    <ul className="space-y-4">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-center">
                          <Check className="h-5 w-5 text-[#820000] mr-3" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="px-10 pb-10">
                    <Button
                      asChild
                      className={`w-full py-6 text-lg rounded-xl ${pkg.popular
                          ? 'bg-[#820000] hover:bg-[#6a0000] text-[#fdeecd]'
                          : 'bg-[#fdeecd] text-[#820000] hover:bg-[#fdeecd]/90'
                        }`}
                    >
                      <Link href={`/payment?vehicle=car&package=${pkg.title.toLowerCase().replace(' ', '-')}`}>
                        Get Report
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.span variants={fadeIn} className="text-[#820000] font-semibold tracking-wide mb-4 block">
              WHY CHOOSE US
            </motion.span>
            <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Comprehensive Vehicle Insights
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
                title: "Comprehensive Data",
                text: "Full vehicle history including accidents, titles, and ownership"
              },
              {
                icon: 'M12 6v6l4 2',
                title: "Instant Reports",
                text: "Get detailed reports in minutes, not days"
              },
              {
                icon: 'M22 11.08V12a10 10 0 1 1-5.93-9.14',
                title: "Reliable Information",
                text: "Verified data from trusted sources"
              },
              {
                icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
                title: "Risk Analysis",
                text: "Identify potential issues before purchase"
              },
              {
                icon: 'M9 9l6 6m0-6l-6 6',
                title: "Fraud Prevention",
                text: "Protect yourself from scams and misrepresentation"
              },
              {
                icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2',
                title: "Expert Support",
                text: "24/7 access to automotive experts"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -5 }}
                className="bg-[#F9F6EE] p-8 rounded-2xl hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 bg-[#820000] rounded-lg flex items-center justify-center mb-6">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fdeecd"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                  >
                    <path d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center"
          >
            <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl font-bold mb-6 text-[#820000]">
              Ready for Full Transparency?
            </motion.h2>
            <motion.p variants={fadeIn} className="text-xl text-[#820000]/90 mb-8 max-w-3xl mx-auto">
              Get instant access to your vehicle's complete history report
            </motion.p>
            <motion.div variants={fadeIn}>
              <Button
                asChild
                className="bg-[#fdeecd] text-[#820000] hover:bg-[#fdeecd]/90 px-12 py-7 text-lg font-semibold"
              >
                <Link href="#pricing">View All Packages</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}
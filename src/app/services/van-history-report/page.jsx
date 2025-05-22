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

export default function VanHistoryReportPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#820000] to-[#600000] text-[#fdeecd] py-28 md:py-40 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/van-bg.jpg"
            alt="Van background"
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
          className="container mx-auto px-4 relative z-10 text-center"
        >
          <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl font-bold mb-4">
            Van History Reports
          </motion.h1>
          <motion.p variants={fadeIn} className="text-xl md:text-2xl text-[#fdeecd]/90 max-w-3xl mx-auto">
            Complete Commercial & Personal Van Analysis for Informed Decisions
          </motion.p>
        </motion.div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 md:py-28 bg-[#F9F6EE]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.span variants={fadeIn} className="text-[#820000] font-semibold tracking-wide mb-4 block">
              VAN REPORT PACKAGES
            </motion.span>
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Transparent Pricing for Van Owners
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Basic Van",
                price: "54.99",
                features: ["Vehicle Overview", "Accident History", "Odometer Check", "Title Records", "Cargo Space History", "6 to 12 business hours"],
                popular: false
              },
              {
                title: "Commercial Pro",
                price: "72.99",
                features: ["Full History Report", "Commercial Use Verification", "Engine Analysis", "Maintenance Records", "Weight Capacity Check", "Recalls", "4 to 8 business hours"],
                popular: true
              },
              {
                title: "Fleet Package",
                price: "114.99",
                features: ["Unlimited Reports", "Fleet Management Tools", "Bulk Processing", "API Access", "Priority Support", "Custom Load Analysis", "3 to 6 business hours"],
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
                <Card className={`h-full rounded-2xl shadow-lg hover:shadow-xl transition-all ${pkg.popular ? 'border-2 border-[#820000]' : 'border-[#fdeecd]'
                  }`}>
                  <CardHeader className="pb-2 px-6 pt-8">
                    <CardTitle className={`text-2xl text-center ${pkg.popular ? 'text-[#820000]' : 'text-gray-900'}`}>
                      {pkg.title}
                    </CardTitle>
                    <div className="text-center mt-4">
                      <span className="text-4xl font-bold">${pkg.price}</span>
                      <span className="text-sm text-gray-600 block mt-2">per report</span>
                    </div>
                  </CardHeader>
                  <CardContent className="py-4 px-6">
                    <ul className="space-y-4">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <Check className="h-5 w-5 text-[#820000] mr-3 flex-shrink-0 mt-1" />
                          <span className="text-gray-700 text-base">{feature}</span>
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
                      <Link href={`/payment?vehicle=van&package=${pkg.title.toLowerCase().replace(' ', '-')}`}>
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
        <div className="max-w-7xl mx-auto px-4">
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
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Specialized Van Insights
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
                title: "Cargo Area Analysis",
                text: "Detailed inspection of load space condition and capacity verification"
              },
              {
                icon: 'M12 6v6l4 2',
                title: "Commercial Use History",
                text: "Verify previous commercial usage and maintenance schedules"
              },
              {
                icon: 'M22 11.08V12a10 10 0 1 1-5.93-9.14',
                title: "Durability Report",
                text: "Assessment of long-term wear patterns and structural integrity"
              },
              {
                icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
                title: "Safety Inspection",
                text: "Comprehensive check of safety features and recall history"
              },
              {
                icon: 'M9 9l6 6m0-6l-6 6',
                title: "Ownership Verification",
                text: "Confirm legitimate ownership and registration history"
              },
              {
                icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2',
                title: "24/7 Fleet Support",
                text: "Dedicated support team for commercial van operators"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -5 }}
                className="bg-[#F9F6EE] p-8 rounded-2xl hover:shadow-lg transition-all border border-[#fdeecd]"
              >
                <div className="w-14 h-14 bg-[#820000] rounded-xl flex items-center justify-center mb-6">
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
                <p className="text-gray-600 text-base leading-relaxed">{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center"
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-6 text-[#820000]">
              Ready for Complete Van Transparency?
            </motion.h2>
            <motion.p variants={fadeIn} className="text-lg text-[#820000]/90 mb-8 max-w-3xl mx-auto">
              Access professional van history reports trusted by businesses and individuals nationwide
            </motion.p>
            <motion.div variants={fadeIn}>
              <Button
                asChild
                className="bg-[#820000] text-[#fdeecd] hover:bg-[#6a0000] px-10 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
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
"use client";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
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

export default function AboutPage() {
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
            About Us
          </motion.h1>
          <motion.p variants={fadeIn} className="text-xl md:text-2xl text-[#fdeecd]/90 max-w-2xl mx-auto">
            Empowering Smart Vehicle Decisions Through Transparency
          </motion.p>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-28 bg-[#F9F6EE]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="space-y-8"
            >
              <motion.div variants={fadeIn}>
                <span className="inline-block text-[#820000] font-semibold tracking-wide mb-4">WHO WE ARE</span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-[#2a2a2a]">
                  Creating Preferred Reports With <span className="text-[#820000]">Reliable Information</span>
                </h2>
              </motion.div>
              <motion.p variants={fadeIn} className="text-lg text-gray-600">
                When you're looking for a pre-owned car, it's important to arm yourself with accurate data. 
                Auto Profile Check delivers comprehensive vehicle history reports instantly at transparent prices.
              </motion.p>
              <motion.p variants={fadeIn} className="text-lg text-gray-600">
                Founded on the principle of automotive transparency, our mission is to empower every used car buyer 
                with crystal-clear vehicle insights and peace of mind.
              </motion.p>
              <motion.div variants={fadeIn}>
                <Button size="lg" asChild className="bg-[#820000] hover:bg-[#6a0000] px-8 py-6 text-lg text-[#fdeecd]">
                  <Link href="/contact">Contact Our Experts</Link>
                </Button>
              </motion.div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow"
            >
              <Image
                src="/images/car-mechanic.jpg"
                alt="Car inspection"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-500"
                style={{ objectPosition: "center" }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#820000]/95 backdrop-blur-md">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "25+", label: "Service Points" },
              { number: "350+", label: "Experts Team" },
              { number: "1.5K+", label: "Happy Clients" },
              { number: "5K+", label: "Reports Generated" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="p-6 bg-[#fdeecd]/5 rounded-xl backdrop-blur-sm border border-[#fdeecd]/10 hover:border-[#fdeecd]/20 transition-all"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2 text-[#fdeecd]">{stat.number}</div>
                <p className="text-[#fdeecd]/90 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Working Hours Section */}
      <section className="py-20 md:py-28 bg-[#F9F6EE]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/images/mechanic-checking.jpg"
                alt="Mechanic working"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-500"
                style={{ objectPosition: "center" }}
              />
            </motion.div>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="space-y-8"
            >
              <motion.div variants={fadeIn} className="bg-[#820000] text-[#fdeecd] p-10 rounded-2xl shadow-2xl">
                <h3 className="text-3xl font-bold mb-8">Working Hours</h3>
                <ul className="space-y-6">
                  {[
                    { day: "Monday - Friday", hours: "8:00 AM - 5:00 PM" },
                    { day: "Saturday", hours: "9:00 AM - 2:00 PM" },
                    { day: "Sunday", hours: "Closed" }
                  ].map((schedule, index) => (
                    <motion.li 
                      key={index}
                      variants={fadeIn}
                      className="flex justify-between items-center py-4 px-6 bg-[#fdeecd]/5 rounded-xl hover:bg-[#fdeecd]/10 transition-colors"
                    >
                      <span className="font-medium">{schedule.day}</span>
                      <span className={schedule.day === "Sunday" ? "text-[#fdeecd]/70" : "text-[#fdeecd]"}>
                        {schedule.hours}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-[#F9F6EE] text-[#820000] ">
        <div className="container-custom text-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="max-w-3xl mx-auto space-y-8"
          >
            <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl font-bold">
              Ready for Full Transparency?
            </motion.h2>
            <motion.p variants={fadeIn} className="text-xl text-[#820000]/90">
              Join thousands of smart buyers making informed vehicle decisions daily
            </motion.p>
            <motion.div variants={fadeIn}>
              <Button size="lg" className="bg-[#fdeecd] text-[#820000] hover:bg-[#fdeecd]/90 px-10 py-7 text-lg font-semibold">
                Get Started Now
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}
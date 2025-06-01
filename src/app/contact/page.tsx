"use client";
import { useState } from 'react';
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Clock, Phone } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    vin: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'Contact Page',
          data: formData
        })
      });
      
      if (response.ok) {
        setSuccess(true);
        setFormData({
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          vin: '',
          message: ''
        });
        setTimeout(() => setSuccess(false), 3000);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
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
            Contact Us
          </motion.h1>
          <motion.p variants={fadeIn} className="text-xl md:text-2xl text-[#fdeecd]/90 max-w-2xl mx-auto">
            Let's Start a Conversation About Your Vehicle Needs
          </motion.p>
        </motion.div>
      </section>

      <section className="py-20 md:py-28 bg-[#F9F6EE]">
        <div className="container-custom">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-14"
          >
            <motion.div variants={fadeIn} className="bg-white rounded-2xl shadow-2xl p-10">
              <h3 className="text-3xl font-bold text-[#2a2a2a] mb-8">Send Your Inquiry</h3>
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      placeholder="First Name"
                      className="w-full px-5 py-4 border-2 border-[#fdeecd] rounded-xl focus:ring-2 focus:ring-[#820000] focus:border-transparent bg-transparent"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      placeholder="Last Name"
                      className="w-full px-5 py-4 border-2 border-[#fdeecd] rounded-xl focus:ring-2 focus:ring-[#820000] focus:border-transparent bg-transparent"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="Phone Number"
                      className="w-full px-5 py-4 border-2 border-[#fdeecd] rounded-xl focus:ring-2 focus:ring-[#820000] focus:border-transparent bg-transparent"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="Email Address"
                      className="w-full px-5 py-4 border-2 border-[#fdeecd] rounded-xl focus:ring-2 focus:ring-[#820000] focus:border-transparent bg-transparent"
                      required
                    />
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    value={formData.vin}
                    onChange={(e) => setFormData({...formData, vin: e.target.value})}
                    placeholder="VIN Number"
                    className="w-full px-5 py-4 border-2 border-[#fdeecd] rounded-xl focus:ring-2 focus:ring-[#820000] focus:border-transparent bg-transparent"
                  />
                </div>
                <div>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Your Message"
                    className="w-full px-5 py-4 border-2 border-[#fdeecd] rounded-xl focus:ring-2 focus:ring-[#820000] focus:border-transparent bg-transparent"
                    required
                  />
                </div>
                <Button 
                  className="w-full bg-[#820000] hover:bg-[#6a0000] text-[#fdeecd] py-7 text-lg font-semibold relative" 
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
                    'Send Message'
                  )}
                </Button>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center p-4 bg-green-100 text-green-700 rounded-xl"
                  >
                    Message sent successfully!
                  </motion.div>
                )}
              </form>
            </motion.div>

            <motion.div variants={fadeIn} className="space-y-8">
              <div className="bg-[#820000] text-[#fdeecd] p-10 rounded-2xl shadow-2xl">
                <h3 className="text-3xl font-bold mb-8">Contact Details</h3>
                <ul className="space-y-8">
                  <li className="flex items-start gap-6 p-6 bg-[#fdeecd]/10 rounded-xl hover:bg-[#fdeecd]/15 transition-colors">
                    <div className="p-3 bg-[#fdeecd]/10 rounded-lg">
                      <MapPin className="h-8 w-8 text-[#fdeecd]" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Our Office</h4>
                      <p className="text-[#fdeecd]/90">Texas</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-6 p-6 bg-[#fdeecd]/10 rounded-xl hover:bg-[#fdeecd]/15 transition-colors">
                    <div className="p-3 bg-[#fdeecd]/10 rounded-lg">
                      <Mail className="h-8 w-8 text-[#fdeecd]" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Email Us</h4>
                      <a href="mailto:info@autoprofilechecker.com" className="text-[#fdeecd]/90 hover:text-[#fdeecd]">
                        info@easydrivehub.com
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-6 p-6 bg-[#fdeecd]/10 rounded-xl hover:bg-[#fdeecd]/15 transition-colors">
                    <div className="p-3 bg-[#fdeecd]/10 rounded-lg">
                      <Clock className="h-8 w-8 text-[#fdeecd]" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Working Hours</h4>
                      <p className="text-[#fdeecd]/90">24/7</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-6 p-6 bg-[#fdeecd]/10 rounded-xl hover:bg-[#fdeecd]/15 transition-colors">
                    <div className="p-3 bg-[#fdeecd]/10 rounded-lg">
                      <Phone className="h-8 w-8 text-[#fdeecd]" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Call Us</h4>
                      <a href="tel:+1234567890" className="text-[#fdeecd]/90 hover:text-[#fdeecd]">
                        +1 (806) 203 7774
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}
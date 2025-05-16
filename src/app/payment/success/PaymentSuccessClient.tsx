"use client";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function PaymentSuccessClient() {
  const searchParams = useSearchParams();
  const vehicle = searchParams.get("vehicle");
  const packageType = searchParams.get("package");

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="text-center"
    >
      <div className="flex justify-center mb-8">
        <CheckCircle className="h-16 w-16 text-[#820000]" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#820000]">
        Payment Successful!
      </h1>
      {vehicle && packageType && (
        <p className="text-xl text-[#820000]/90 mb-4">
          Purchased {vehicle.toUpperCase()} - {packageType.toUpperCase()} Package
        </p>
      )}
      <p className="text-xl text-[#820000]/90 mb-8 max-w-2xl mx-auto">
        Your report is being generated and will be available in your account shortly
      </p>
      <Button
        asChild
        className="bg-[#820000] text-[#fdeecd] hover:bg-[#6a0000] px-12 py-7 text-lg font-semibold"
      >
        <Link href="/">Get Back to Home</Link>
      </Button>
    </motion.div>
  );
}

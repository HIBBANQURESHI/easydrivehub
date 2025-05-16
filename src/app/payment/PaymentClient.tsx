"use client";

import { PaymentForm } from "@/components/payment/PaymentForm";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { VEHICLE_PRICING, VehicleType } from "@/lib/pricing";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function PaymentClient() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const vehicle = searchParams.get('vehicle') as VehicleType;
  const pkg = searchParams.get('package');

  const isValidVehicle = vehicle && VEHICLE_PRICING[vehicle];
  const isValidPackage = pkg && isValidVehicle && VEHICLE_PRICING[vehicle][pkg as keyof typeof VEHICLE_PRICING[VehicleType]];

  const amount = isValidVehicle && isValidPackage
    ? VEHICLE_PRICING[vehicle][pkg as keyof typeof VEHICLE_PRICING[VehicleType]]
    : 0;

  useEffect(() => {
    const createPaymentIntent = async () => {
      if (!isValidVehicle || !isValidPackage) {
        setLoadingError("Invalid vehicle or package selection");
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/payment-intent', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ vehicle, package: pkg })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Payment error:", error);
        setLoadingError(error instanceof Error ? error.message : "Failed to initialize payment");
      }
    };

    createPaymentIntent();
  }, [vehicle, pkg, isValidVehicle, isValidPackage]);

  if (!isValidVehicle || !isValidPackage) {
    return (
      <div className="text-center text-red-600">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Invalid Selection</h1>
        <p className="text-xl mb-8">Please choose a valid vehicle and package</p>
        <Button
          className="bg-[#820000] text-[#fdeecd] hover:bg-[#6a0000]"
          onClick={() => window.history.back()}
        >
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="text-center mb-12 space-y-8"
    >
      <h1 className="text-4xl md:text-5xl font-bold text-[#820000]"></h1>
      <div className="text-3xl text-[#820000] font-semibold">
        Total: ${(amount / 100).toFixed(2)}
      </div>
      <p className="text-xl text-[#820000]/90 max-w-2xl mx-auto">
        Securely enter your payment details to access your {vehicle.toUpperCase()} {pkg.toUpperCase()} Package report
      </p>

      {loadingError ? (
        <div className="text-center text-red-600">
          {loadingError}
          <Button
            className="mt-4 bg-[#820000] text-[#fdeecd] hover:bg-[#6a0000]"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      ) : clientSecret ? (
        <PaymentForm clientSecret={clientSecret} />
      ) : (
        <div className="text-center text-[#820000]">
          <Loader2 className="h-8 w-8 animate-spin inline-block mr-2" />
          Loading payment form...
        </div>
      )}
    </motion.div>
  );
}

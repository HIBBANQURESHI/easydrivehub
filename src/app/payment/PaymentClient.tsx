"use client";
import { PaymentForm } from "@/components/payment/PaymentForm";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { VEHICLE_PRICING, VehicleType } from "@/lib/pricing";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";



const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function PaymentClient() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [customerData, setCustomerData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    vin: "",
    phone: "",
    address: ""
  });
  const [formStep, setFormStep] = useState<"customer" | "payment">("customer");
  const searchParams = useSearchParams();

  const vehicle = searchParams.get('vehicle') as VehicleType;
  const pkg = searchParams.get('package');

  const isValidVehicle = vehicle && VEHICLE_PRICING[vehicle];
  const isValidPackage = pkg && isValidVehicle && VEHICLE_PRICING[vehicle][pkg as keyof typeof VEHICLE_PRICING[VehicleType]];

  const amount = isValidVehicle && isValidPackage
    ? VEHICLE_PRICING[vehicle][pkg as keyof typeof VEHICLE_PRICING[VehicleType]]
    : 0;

  const handleCustomerSubmit = async () => {
    if (!Object.values(customerData).every(Boolean)) {
      setLoadingError("All fields are required");
      return;
    }
    
    if (!/^[A-HJ-NPR-Z0-9]{17}$/i.test(customerData.vin)) {
      setLoadingError("Invalid VIN format");
      return;
    }

    try {
      const response = await fetch('/api/payment-intent', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          vehicle, 
          package: pkg, 
          ...customerData 
        })
      });

      if (!response.ok) throw new Error("Payment failed");
      const data = await response.json();
      setClientSecret(data.clientSecret);
      setFormStep("payment");
    } catch (error) {
      setLoadingError(error instanceof Error ? error.message : "Payment error");
    }
  };

  if (!isValidVehicle || !isValidPackage) {
    return (
      <div className="text-center text-red-600">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Invalid Selection</h1>
        <p className="text-xl mb-8">Please choose a valid vehicle and package</p>
        <Button className="bg-[#820000] text-[#fdeecd] hover:bg-[#6a0000]" onClick={() => window.history.back()}>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn} className="text-center mb-12 space-y-8">
      {formStep === "customer" ? (
        <Card className="border-[#fdeecd] rounded-2xl shadow-xl max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl text-[#820000]">Customer Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Input placeholder="First Name" value={customerData.firstName} 
                onChange={e => setCustomerData({...customerData, firstName: e.target.value})} />
              <Input placeholder="Last Name" value={customerData.lastName}
                onChange={e => setCustomerData({...customerData, lastName: e.target.value})} />
              <Input type="email" placeholder="Email" value={customerData.email}
                onChange={e => setCustomerData({...customerData, email: e.target.value})} className="col-span-2" />
              <Input placeholder="VIN Number" value={customerData.vin}
                onChange={e => setCustomerData({...customerData, vin: e.target.value})} className="col-span-2" />
              <Input placeholder="Phone" value={customerData.phone}
                onChange={e => setCustomerData({...customerData, phone: e.target.value})} />
              <Input placeholder="Address" value={customerData.address}
                onChange={e => setCustomerData({...customerData, address: e.target.value})} />
            </div>
            {loadingError && <div className="text-red-600 mb-4">{loadingError}</div>}
            <Button onClick={handleCustomerSubmit} className="w-full py-6 text-lg bg-[#820000] hover:bg-[#6a0000] text-[#fdeecd]">
              Continue to Payment
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <h1 className="text-4xl md:text-5xl font-bold text-[#820000]"></h1>
          <div className="text-3xl text-[#820000] font-semibold">
            Total: ${(amount / 100).toFixed(2)}
          </div>
          <p className="text-xl text-[#820000]/90 max-w-2xl mx-auto">
            Securely enter your payment details to access your {vehicle.toUpperCase()} {pkg.toUpperCase()} Package report
          </p>
          {clientSecret ? (
            <PaymentForm clientSecret={clientSecret} />
          ) : (
            <div className="text-center text-[#820000]">
              <Loader2 className="h-8 w-8 animate-spin inline-block mr-2" />
              Loading payment form...
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}
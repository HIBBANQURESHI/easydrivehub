"use client";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { FormEvent, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { VEHICLE_PRICING, VehicleType } from "@/lib/pricing";
import { Input } from "@/components/ui/input";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function PaymentPage() {
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
      <MainLayout>
        <section className="pt-32 pb-20 md:py-28 bg-gradient-to-br from-[#F9F6EE]/80 to-[#fdeecd]/80 min-h-screen backdrop-blur-3xl">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#820000]">Invalid Selection</h1>
            <p className="text-xl mb-8 text-[#820000]/90">Please choose a valid vehicle and package</p>
            <Button 
              className="bg-[#820000] text-[#fdeecd] hover:bg-[#6a0000] px-8 py-6 text-lg shadow-lg hover:shadow-[#820000]/30 transition-all"
              onClick={() => window.history.back()}
            >
              Go Back
            </Button>
          </div>
        </section>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="pt-32 pb-20 md:py-28 bg-gradient-to-br from-[#F9F6EE]/80 to-[#fdeecd]/80 min-h-screen backdrop-blur-3xl">
        <div className="container-custom">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-1">
              <Card className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 shadow-[0_8px_32px_rgba(130,0,0,0.1)]">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#820000] bg-white/30 p-4 rounded-xl backdrop-blur-sm">Your Order</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center pb-4 border-b border-[#820000]/10">
                      <div className="text-lg font-medium text-gray-700">Product</div>
                      <div className="text-lg font-medium text-gray-700">Total</div>
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900">{vehicle.toUpperCase()} {pkg.toUpperCase()} Package</h3>
                        <p className="text-sm text-gray-600 mt-1">Vehicle History Report</p>
                      </div>
                      <div className="text-lg font-bold text-[#820000]">${(amount / 100).toFixed(2)}</div>
                    </div>
                    
                    <div className="pt-4 border-t border-[#820000]/10">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-700">Subtotal</span>
                        <span className="text-gray-900 font-medium">${(amount / 100).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-700">Tax</span>
                        <span className="text-gray-900 font-medium">$0.00</span>
                      </div>
                      <div className="flex justify-between mt-4 pt-4 border-t border-[#820000]/20">
                        <span className="text-xl font-bold text-[#820000]">Total</span>
                        <span className="text-xl font-bold text-[#820000]">${(amount / 100).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 shadow-[0_8px_32px_rgba(130,0,0,0.1)] mt-8">
                <CardHeader>
                  <CardTitle className="text-xl text-[#820000] bg-white/30 p-4 rounded-xl backdrop-blur-sm">Payment Methods</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 bg-white/30 backdrop-blur-sm border border-white/30 rounded-xl transition-all hover:bg-white/40">
                      <div className="bg-[#820000]/10 p-2 rounded-lg">
                        <svg className="w-6 h-6 text-[#820000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                        </svg>
                      </div>
                      <span className="font-medium">Credit/Debit Card</span>
                    </div>
                    
                    <div className="flex items-center gap-4 p-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl opacity-50">
                      <div className="bg-[#820000]/10 p-2 rounded-lg">
                        <svg className="w-6 h-6 text-[#820000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                      </div>
                      <span className="font-medium">PayPal</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              <Card className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 shadow-[0_8px_32px_rgba(130,0,0,0.1)]">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#820000] bg-white/30 p-4 rounded-xl backdrop-blur-sm">
                    {formStep === "customer" ? "Customer Information" : "Payment Details"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-8">
                    <div className="flex justify-between mb-2">
                      <div className={`font-medium ${formStep === "customer" ? "text-[#820000]" : "text-gray-500"}`}>
                        Step 1: Customer Info
                      </div>
                      <div className={`font-medium ${formStep === "payment" ? "text-[#820000]" : "text-gray-500"}`}>
                        Step 2: Payment
                      </div>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden backdrop-blur-sm">
                      <div 
                        className={`h-full bg-[#820000] transition-all duration-500 ${
                          formStep === "customer" ? "w-1/2" : "w-full"
                        }`}
                      ></div>
                    </div>
                  </div>
                  
                  {formStep === "customer" ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-gray-700 mb-2 font-medium">First Name *</label>
                          <Input
                            placeholder="John"
                            value={customerData.firstName}
                            onChange={e => setCustomerData({...customerData, firstName: e.target.value})}
                            className="bg-white/50 border-[#820000]/30 focus:border-[#820000] backdrop-blur-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-2 font-medium">Last Name *</label>
                          <Input
                            placeholder="Doe"
                            value={customerData.lastName}
                            onChange={e => setCustomerData({...customerData, lastName: e.target.value})}
                            className="bg-white/50 border-[#820000]/30 focus:border-[#820000] backdrop-blur-sm"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-2 font-medium">Email Address *</label>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          value={customerData.email}
                          onChange={e => setCustomerData({...customerData, email: e.target.value})}
                          className="bg-white/50 border-[#820000]/30 focus:border-[#820000] backdrop-blur-sm"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-2 font-medium">VIN Number *</label>
                        <Input
                          placeholder="1HGCM82633A123456"
                          value={customerData.vin}
                          onChange={e => setCustomerData({...customerData, vin: e.target.value})}
                          className="bg-white/50 border-[#820000]/30 focus:border-[#820000] backdrop-blur-sm"
                        />
                        <p className="text-sm text-gray-500 mt-2">17-character vehicle identification number</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-gray-700 mb-2 font-medium">Phone *</label>
                          <Input
                            placeholder="(123) 456-7890"
                            value={customerData.phone}
                            onChange={e => setCustomerData({...customerData, phone: e.target.value})}
                            className="bg-white/50 border-[#820000]/30 focus:border-[#820000] backdrop-blur-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-2 font-medium">Address *</label>
                          <Input
                            placeholder="123 Main St, City, State"
                            value={customerData.address}
                            onChange={e => setCustomerData({...customerData, address: e.target.value})}
                            className="bg-white/50 border-[#820000]/30 focus:border-[#820000] backdrop-blur-sm"
                          />
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <h3 className="text-lg font-bold text-[#820000] mb-4">Additional Information</h3>
                        <textarea
                          placeholder="Any special requests or vehicle details..."
                          className="w-full p-4 bg-white/50 border border-[#820000]/30 rounded-xl focus:border-[#820000] min-h-[100px] backdrop-blur-sm"
                        ></textarea>
                      </div>
                      
                      {loadingError && (
                        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg backdrop-blur-sm">
                          {loadingError}
                        </div>
                      )}
                      
                      <div className="pt-6">
                        <Button
                          onClick={handleCustomerSubmit}
                          className="w-full py-6 text-lg bg-[#820000] hover:bg-[#6a0000] text-[#fdeecd] shadow-lg hover:shadow-[#820000]/30 transition-all"
                        >
                          Continue to Payment
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <div className="text-2xl text-[#820000] font-bold mb-2">
                          Total: ${(amount / 100).toFixed(2)}
                        </div>
                        <p className="text-[#820000]/80">
                          Securely enter your payment details for the {vehicle.toUpperCase()} {pkg.toUpperCase()} Package
                        </p>
                      </div>
                      
                      {clientSecret ? (
                        <Elements stripe={stripePromise} options={{ clientSecret }}>
                          <CheckoutForm />
                        </Elements>
                      ) : (
                        <div className="text-center py-12">
                          <Loader2 className="h-12 w-12 animate-spin text-[#820000] mx-auto mb-4" />
                          <p className="text-[#820000]">Loading payment form...</p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment/success`,
        payment_method_data: {
          billing_details: {
            name: name,
            email: email
          }
        }
      },
    });

    if (stripeError) setError(stripeError.message || "Payment failed");
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2 font-medium">Full Name *</label>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 bg-white/50 border border-[#820000]/30 rounded-xl focus:border-[#820000] backdrop-blur-sm"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2 font-medium">Email *</label>
          <input
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 bg-white/50 border border-[#820000]/30 rounded-xl focus:border-[#820000] backdrop-blur-sm"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2 font-medium">Card Details *</label>
          <div className="bg-white/50 border border-[#820000]/30 rounded-xl p-2 backdrop-blur-sm">
            <PaymentElement 
              options={{ 
                layout: "tabs",
                fields: {
                  billingDetails: "never"
                }
              }}
              className="[&_.Tab]:border-[#820000] [&_.Tab]:text-[#820000] [&_.TabSelected]:bg-[#820000] [&_.TabSelected]:text-[#fdeecd] p-2"
            />
          </div>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg backdrop-blur-sm">
          {error}
        </div>
      )}
      
      <Button
        type="submit"
        disabled={!stripe || loading}
        className={`w-full py-6 text-lg rounded-xl bg-[#820000] hover:bg-[#6a0000] text-[#fdeecd] shadow-lg hover:shadow-[#820000]/30 transition-all ${
          loading ? "opacity-80 cursor-not-allowed" : ""
        }`}
      >
        {loading ? <Loader2 className="h-6 w-6 animate-spin mx-auto" /> : "Pay Now"}
      </Button>
      
      <div className="text-center pt-4 border-t border-[#820000]/20">
        <p className="text-gray-600 text-sm">
          Your payment is securely processed by Stripe. We do not store your payment details.
        </p>
      </div>
    </form>
  );
}
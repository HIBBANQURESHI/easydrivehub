"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export function PaymentForm({ clientSecret }: { clientSecret: string }) {
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </Elements>
  );
}

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment/success`,
      },
    });

    if (stripeError) {
      setError(stripeError.message || "Payment failed");
    }

    setLoading(false);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="max-w-2xl mx-auto"
    >
      <Card className="border-[#fdeecd] rounded-2xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl text-[#820000] text-center">
            Secure Payment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <PaymentElement 
                options={{
                  layout: "tabs",
                  fields: {
                    billingDetails: {
                      name: "never",
                      email: "never",
                    }
                  }
                }}
                className="[&_.Tab]:border-[#820000] [&_.Tab]:text-[#820000] [&_.TabSelected]:bg-[#820000] [&_.TabSelected]:text-[#fdeecd]"
              />
            </div>

            {error && (
              <div className="text-red-600 text-center text-sm">{error}</div>
            )}

            <Button
              type="submit"
              disabled={!stripe || loading}
              className={`w-full py-6 text-lg rounded-xl bg-[#820000] hover:bg-[#6a0000] text-[#fdeecd] transition-all ${
                loading ? "opacity-80 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                "Pay Now"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
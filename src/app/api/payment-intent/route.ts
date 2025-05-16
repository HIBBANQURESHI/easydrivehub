import { NextResponse } from "next/server";
import Stripe from "stripe";
import { VEHICLE_PRICING, VehicleType } from "@/lib/pricing";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { vehicle, package: pkg } = await req.json(); // Destructure 'package' correctly
    
    // Validate input parameters
    if (vehicle === 'home' && !['basic', 'professional', 'enterprise'].includes(pkg)) {
      return NextResponse.json(
        { error: "Invalid vehicle type" },
        { status: 400 }
      );
    }

    const vehiclePricing = VEHICLE_PRICING[vehicle as VehicleType];
    const amount = vehiclePricing[pkg as keyof typeof vehiclePricing];

    if (!amount) {
      return NextResponse.json(
        { error: "Invalid package type" },
        { status: 400 }
      );
    }
    // ... rest of the code

    if (!amount) {
      return NextResponse.json(
        { error: "Invalid pricing configuration" },
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: { vehicle, package: pkg }
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { error: "Failed to create payment intent" },
      { status: 500 }
    );
  }
}
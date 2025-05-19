import { NextResponse } from "next/server";
import Stripe from "stripe";
import { VEHICLE_PRICING, VehicleType } from "@/lib/pricing";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const reqBody = await req.json();
    const { 
      vehicle, 
      package: pkg,
      firstName,
      lastName,
      email,
      vin,
      phone,
      address
    } = reqBody;

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'vin', 'phone', 'address', 'vehicle', 'package'];
    for (const field of requiredFields) {
      if (!(field in reqBody)) {
        return NextResponse.json({ error: `Missing ${field}` }, { status: 400 });
      }
    }

    // Type-safe vehicle check
    if (!(vehicle in VEHICLE_PRICING)) {
      return NextResponse.json({ error: "Invalid vehicle type" }, { status: 400 });
    }

    // Type-safe package check
    const vehiclePricing = VEHICLE_PRICING[vehicle as VehicleType];
    const amount = vehiclePricing[pkg as keyof typeof vehiclePricing];
    
    if (!amount) {
      return NextResponse.json({ error: "Invalid package type" }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: { 
        vehicle,
        package: pkg,
        firstName,
        lastName,
        email,
        vin,
        phone,
        address
      }
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json({ error: "Payment processing failed" }, { status: 500 });
  }
}
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

    // Validate required fields with specific messages
    const requiredFields = [
      { field: 'firstName', name: 'First Name' },
      { field: 'lastName', name: 'Last Name' },
      { field: 'email', name: 'Email' },
      { field: 'vin', name: 'VIN' },
      { field: 'phone', name: 'Phone' },
      { field: 'address', name: 'Address' },
      { field: 'vehicle', name: 'Vehicle Type' },
      { field: 'package', name: 'Package' },
    ];
    
    for (const { field, name } of requiredFields) {
      if (!reqBody[field]) {
        return NextResponse.json({ error: `${name} is required` }, { status: 400 });
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Validate VIN format (17 alphanumeric characters)
    const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/i;
    if (!vinRegex.test(vin)) {
      return NextResponse.json({ error: "VIN must be 17 alphanumeric characters" }, { status: 400 });
    }

    // Validate vehicle type
    if (!(vehicle in VEHICLE_PRICING)) {
      const validVehicles = Object.keys(VEHICLE_PRICING).join(", ");
      return NextResponse.json(
        { error: `Invalid vehicle type. Valid options: ${validVehicles}` }, 
        { status: 400 }
      );
    }

    // Validate package type
    const vehiclePricing = VEHICLE_PRICING[vehicle as VehicleType];
    const amount = vehiclePricing[pkg as keyof typeof vehiclePricing];
    
    if (!amount) {
      const validPackages = Object.keys(vehiclePricing).join(", ");
      return NextResponse.json(
        { error: `Invalid package type. Valid options: ${validPackages}` }, 
        { status: 400 }
      );
    }

    // Create payment intent
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
      },
      description: `${vehicle} ${pkg} Package`,
    });

    return NextResponse.json({ 
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
    
  } catch (error: any) {
    console.error("Stripe error:", error);
    
    // Handle specific Stripe errors
    if (error.type === 'StripeInvalidRequestError') {
      return NextResponse.json({ 
        error: "Invalid payment request", 
        details: error.message 
      }, { status: 400 });
    }
    
    return NextResponse.json({ 
      error: "Payment processing failed",
      details: error.message || "Unknown error"
    }, { status: 500 });
  }
}
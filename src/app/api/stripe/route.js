import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const res = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: res.line_items,
      mode: "payment",
      customer_email: res.customer.email,
      shipping_address_collection: {
        allowed_countries: ['IN'], // List of allowed countries for shipping
      },
      success_url: "http://localhost:3000/checkout?status=success",
      cancel_url: "http://localhost:3000/checkout?status=cancel",
    });

    return NextResponse.json({
      success: true,
      id: session.id,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Something went wrong! Please try again.",
    });
  }
}

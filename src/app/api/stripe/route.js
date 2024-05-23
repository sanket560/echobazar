import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
const FRONTEND_BASE_URL = process.env.NEXT_PUBLIC_FRONTEND_BASE_URL;

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const { line_items, customer, shipping } = await req.json();

    const allowedCountries = shipping.address.country === "IN" ? ['IN'] : ['US', 'CA', 'GB', 'AU'];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: line_items,
      mode: "payment",
      customer_email: customer.email,
      shipping_address_collection: {
        allowed_countries: allowedCountries,
      },
      success_url: `${FRONTEND_BASE_URL}checkout?status=success`,
      cancel_url: `${FRONTEND_BASE_URL}checkout?status=cancel`,
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

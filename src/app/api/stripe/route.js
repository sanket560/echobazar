import { NextResponse } from "next/server";

const stripe = require("stripe")(
  "sk_test_51PI3jGSDe6BFG61YheacnAwP09filjxRSB87KTBJdX0JR0qndO781XdUsKLLskLGrJS4gOgNzIBi16Ahurlfqtam00SCqOzQdj"
);

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const res = await req.json();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: res,
      mode: "payment",
      success_url: "http://localhost:3000/checkout" + "?status=success",
      cancel_url: "http://localhost:3000/checkout" + "?status=cancel",
    });
    return NextResponse.json({
        success : true,
        id : session.id
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "something went wrong",
    });
  }
}

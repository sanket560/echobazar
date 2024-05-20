import connectDB from "@/database/dbConfig";
import Cart from "@/models/Cart.Model";
import Order from "@/models/Order.Model";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();
    const { user } = data;
    const saveNewOrder = await Order.create(data);
    if (saveNewOrder) {
      await Cart.deleteMany({ userID: user });
      return NextResponse.json({
        success: true,
        message: "Order Placed Successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to create order try again",
      });
    }
    
  } catch (error) {
    console.log("error in creating order", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}

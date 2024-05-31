import Order from "@/models/Order.Model";
import connectDB from "@/database/dbConfig";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectDB();

    const extractAllOrders = await Order.find({}).populate("orderItems.product").populate("user");

    if (extractAllOrders) {
      return NextResponse.json({
        success: true,
        data: extractAllOrders,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to get order",
      });
    }
  } catch (error) {
    console.log("error in getting order", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again later",
    });
  }
}

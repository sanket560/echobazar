import connectDB from "@/database/dbConfig";
import Order from "@/models/Order.Model";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const extractAllOrders = await Order.find({ user: id }).populate(
      "orderItems.product"
    );

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
      message: "Something went wrong ! Please try again later",
    });
  }
}

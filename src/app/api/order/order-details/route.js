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
        message: "Invalid order ID",
      });
    }

    const extractOrderDetails = await Order.findById(id).populate('orderItems.product');
    
    if (extractOrderDetails) {
        return NextResponse.json({
          success: true,
          data: extractOrderDetails,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to get order details",
        });
      }

  } catch (error) {
    console.log("error in getting order details", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}

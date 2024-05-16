import connectDB from "@/database/dbConfig";
import Cart from "@/models/Cart.Model";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const extractAllCartItems = await Cart.find({ userID: id })
      .populate("userID")
      .populate("productID");
    if (extractAllCartItems) {
      return NextResponse.json({
        success: true,
        data: extractAllCartItems,
      });
    }else{
      return NextResponse.json({
        success: false,
        message: "No product is added in your cart",
      });
    }
  } catch (error) {
    console.log("error from fetching cart product", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}

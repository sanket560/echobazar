import connectDB from "@/database/dbConfig";
import Cart from "@/models/Cart.Model";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

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

    const extractAllCartItems = await Cart.find({ userID: id })
      .populate({
        path: "userID",
        select: "-password",
      })
      .populate("productID");

    if (extractAllCartItems && extractAllCartItems.length > 0) {
      return NextResponse.json({
        success: true,
        data: extractAllCartItems,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "No product is added in your cart",
      });
    }
  } catch (error) {
    console.log("error from fetching cart product", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again later",
    });
  }
}

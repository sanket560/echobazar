import connectDB from "@/database/dbConfig";
import Cart from "@/models/Cart.Model";
import { trusted } from "mongoose";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id)
      return NextResponse.json({
        success: false,
        message: "Product Id Required",
      });

    const deleteCartItem = await Cart.findByIdAndDelete(id);
    if (deleteCartItem) {
      return NextResponse.json({
        success: true,
        message: "product deleted from cart",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "failed to delete cart item",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "something went wrong ! please try again",
    });
  }
}

import connectDB from "@/database/dbConfig";
import Product from "@/models/Product.Model";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();

    const extractAllSellerProduct = await Product.find({});

    if (extractAllSellerProduct) {
      return NextResponse.json({
        success: true,
        data: extractAllSellerProduct,
      });
    } else {
      return NextResponse.json({
        success: true,
        message: "No Product Found! ",
      });
    }
  } catch (error) {
    console.log("error from fetching seller product", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}

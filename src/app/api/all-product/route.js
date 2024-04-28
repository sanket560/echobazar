import connectDB from "@/database/dbConfig";
import Product from "@/models/Product.Model";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();
    const getAllProduct = await Product.find({});
    return NextResponse.json({
      success: true,
      data: getAllProduct,
    });
  } catch (error) {
    console.log("error from fetching a product", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}

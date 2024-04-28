import connectDB from "@/database/dbConfig";
import Product from "@/models/Product.Model";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectDB();
    const extractData = await req.json();

    const newProduct = await Product.create(extractData);

    if (newProduct) {
      return NextResponse.json({
        success: true,
        message: "Product Added Successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to add product! Please try again",
      });
    }
  } catch (error) {
    console.log("error from adding product", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}

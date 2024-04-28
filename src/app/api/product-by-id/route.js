import connectDB from "@/database/dbConfig";
import Product from "@/models/Product.Model";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("id");

    if (!productId) {
      return NextResponse.json({
        success: false,
        status: 404,
        message: "Product ID not found",
      });
    }

    const getData = await Product.find({ _id: productId });

    if (getData) {
      return NextResponse.json({
        success: true,
        data: getData[0],
      });
    } else {
      return NextResponse.json({
        success: false,
        status: 204,
        message: "Product not found",
      });
    }

  } catch (error) {
    console.log("error from fetching a product", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}

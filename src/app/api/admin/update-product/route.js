import connectDB from "@/database/dbConfig";
import Product from "@/models/Product.Model";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req) {
  try {
    await connectDB();

    const extractData = await req.json();
    // console.log(extractData)
    const {
      _id,
      name,
      originalPrice,
      price,
      description,
      sellerName,
      storageOptions,
      colors,
      onSale,
      discountPrice,
      image,
    } = extractData;

    const updatedProduct = await Product.findOneAndUpdate(
      {
        _id: _id,
      },
      {
        name,
        originalPrice,
        price,
        description,
        sellerName,
        storageOptions,
        colors,
        onSale,
        discountPrice,
        image,
      },
      { new: true }
    );

    if (updatedProduct) {
      return NextResponse.json({
        success: true,
        message: "Product updated successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to update the product ! Please try again later",
      });
    }
  } catch (e) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}

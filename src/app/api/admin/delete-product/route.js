import connectDB from "@/database/dbConfig";
import Product from "@/models/Product.Model";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
  try {
    await connectDB();
    const  {searchParams} = new URL(req.url);
    const id = searchParams.get('id');

    if(!id) return NextResponse.json({success : false , message : "Product Id Required"});

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (deletedProduct) {
      return NextResponse.json({
        success: true,
        message : "Product Deleted Successfully"
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to delete the product try again",
      });
    }
  } catch (error) {
    console.log("error from deleting product", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}

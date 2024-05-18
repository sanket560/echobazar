import connectDB from "@/database/dbConfig";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Address from "@/models/Address.Model";

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

    const getAllAddresses = await Address.find({ userID: id });

    if (getAllAddresses && getAllAddresses.length > 0) {
      return NextResponse.json({
        success: true,
        data: getAllAddresses,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "No address is found",
      });
    }
  } catch (error) {
    console.log("error from fetching address", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again later",
    });
  }
}

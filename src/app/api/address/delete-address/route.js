import connectDB from "@/database/dbConfig";
import Address from "@/models/Address.Model";
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
        message: "Address Id Required",
      });

    const deletedAddress = await Address.findByIdAndDelete(id);
    if (deletedAddress) {
      return NextResponse.json({
        success: true,
        message: "Address deleted successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "failed to delete address",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "something went wrong ! please try again",
    });
  }
}

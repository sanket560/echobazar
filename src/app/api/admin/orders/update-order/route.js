import mongoose from "mongoose";
import Order from "@/models/Order.Model";
import connectDB from "@/database/dbConfig";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req) {
  try {
    await connectDB();
    const data = await req.json(); 
    const {
        _id,
        shippingAddress,
        orderItems,
        paymentMethod,
        isPaid,
        isProcessing,
    } = data;

    const updateOrder = await Order.findOneAndUpdate(
      {
        _id: _id,
      },
      {
        shippingAddress,
        orderItems,
        paymentMethod,
        isPaid,
        isProcessing,
      },
      {
        new: true,
      }
    );

    if (updateOrder) {
      return NextResponse.json({
        success: true,
        message: "Order status updated successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to update status of order",
      });
    }
  } catch (error) {
    console.log("error in getting order", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again later",
    });
  }
}

import connectDB from "@/database/dbConfig";
import Cart from "@/models/Cart.Model";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function POST(req) {
    try {
        await connectDB();
        const data = await req.json();
        const { productID, userID } = data;

        const isCurrentCartItemAlreadyExists = await Cart.findOne({
            productID: productID,
            userID: userID
        });

        if (isCurrentCartItemAlreadyExists) {
            return NextResponse.json({
                success: false,
                message: "This product is already in the cart",
            });
        }

        const saveProductToCart = await Cart.create(data);
        if (saveProductToCart) {
            return NextResponse.json({
                success: true,
                message: "Product added to cart",
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "Product not added",
            });
        }

    } catch (error) {
        console.log("Error adding product to cart", error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong! Please try again later",
        });
    }
}
import connectDB from "@/database/dbConfig";
import Cart from "@/models/Cart.Model";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function POST(req){
    try {
        await connectDB();
        const data = await req.json();
        const {productID , userID} = data;

        const isCurrentCartItemAlreadyExists = await Cart.find({
            productID : productID,
            userID : userID
        })

        if(isCurrentCartItemAlreadyExists){
            return NextResponse.json({
                success: false,
                message: "This product is there in cart",
            });
        }

        const saveProductToCart = await Cart.create(data);
        if(saveProductToCart){
            return NextResponse.json({
                success: true,
                message: "product added to cart",
            });
        }else{
            return NextResponse.json({
                success: false,
                message: "product not added",
            });
        }

    } catch (error) {
        console.log("error from adding a product", error);
        return NextResponse.json({
          success: false,
          message: "Something went wrong ! Please try again later",
        });
    }
}
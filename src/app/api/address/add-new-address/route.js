import connectDB from "@/database/dbConfig";
import Address from "@/models/Address.Model";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddNewAddress = Joi.object({
    address: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    postalCode: Joi.string().required(),
    state: Joi.string().required(),
    userID: Joi.string().required(),
  });

export const dynamic = "force-dynamic";

export async function POST(req) {
    try {
        await connectDB();
        const data = await req.json();
        const { address, state, city, country, postalCode, userID } = data;

        const { error } = AddNewAddress.validate({
          address,
          city,
          state,
          country,
          postalCode,
          userID,
        });
  
        if (error) {
          return NextResponse.json({
            success: false,
            message: error.details[0].message,
          });
        }
  
        const newlyAddedAddress = await Address.create(data);

        if (newlyAddedAddress) {
            return NextResponse.json({
                success: true,
                message: "Address added successfully",
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "Failed to add address",
            });
        }

    } catch (error) {
        console.log("Error adding address", error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong! Please try again later",
        });
    }
}

import connectDB from "@/database/dbConfig";
import Product from "@/models/Product.Model";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddNewProductSchema = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().valid("phone", "mens", "womens", "smart_tv").required(),
  brand: Joi.when("type", {
    is: Joi.string().valid("phone", "smart_tv"),
    then: Joi.string().required(),
    otherwise: Joi.optional(),
  }),
  image: Joi.string().required(),
  colors: Joi.array()
    .items(Joi.string())
    .when("type", {
      is: "phone",
      then: Joi.array().min(1).required(),
      otherwise: Joi.optional(),
    }),
  sizes: Joi.array()
    .items(Joi.string())
    .when("type", {
      is: ["mens", "womens"],
      then: Joi.array().min(1).required(),
      otherwise: Joi.optional(),
    }),
  displaySizes: Joi.array()
    .items(Joi.string())
    .when("type", {
      is: "smart_tv",
      then: Joi.array().min(1).required(),
      otherwise: Joi.optional(),
    }),
  operatingSystem: Joi.string().when("type", {
    is: "smart_tv",
    then: Joi.string().required(),
    otherwise: Joi.optional(),
  }),
  storageOptions: Joi.array()
    .items(Joi.string())
    .when("type", {
      is: "phone",
      then: Joi.array().min(1).required(),
      otherwise: Joi.optional(),
    }),
  onSale : Joi.string().required(),
  description: Joi.string().required(),
  originalPrice: Joi.number().required(),
  discountPrice: Joi.number().required(),
  sellerName: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectDB();

    const user = "Seller";

    if (user === "Seller") {
      const extractData = await req.json();
      const {
        name,
        type,
        brand,
        image,
        colors,
        sizes,
        displaySizes,
        operatingSystem,
        storageOptions,
        description,
        originalPrice,
        discountPrice,
        onSale,
        sellerName,
      } = extractData;

      const { error } = AddNewProductSchema.validate({
        name,
        type,
        brand,
        image,
        colors,
        sizes,
        displaySizes,
        operatingSystem,
        storageOptions,
        description,
        originalPrice,
        discountPrice,
        onSale,
        sellerName,
      });

      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }

      const newProduct = await Product.create(extractData);

      if (newProduct) {
        return NextResponse.json({
          success: true,
          message: "Product Added Successfully",
        });
      }else{
        return NextResponse.json({
            success: false,
            message: "Failed to add product! Please try again",
        });
      }

    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authorized !",
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

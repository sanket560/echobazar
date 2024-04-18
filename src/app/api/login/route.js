import connectDB from "@/database/dbConfig";
import User from "@/models/User.Model";
import { compare } from "bcryptjs";
import Joi from "joi";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();

  const { error } = schema.validate({ email, password });

  if (error) {
    return NextResponse.json({
      success: false,
      message: email.details[0],
    });
  }

  try {
    const checkUser = await User.findOne({ email });

    if (!checkUser) {
      return NextResponse.json({
        success: false,
        message: "Account not found with this email",
      });
    }

    const checkPassowrd = await compare(password, checkUser.password);
    if (!checkPassowrd) {
      return NextResponse.json({
        success: false,
        message: "Incorrect Password. Please try again!",
      });
    }

    const token = jwt.sign(
      {
        id: checkUser._id,
        email: checkUser?.email,
        role: checkUser?.role,
      },
      JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    const data = {
      token,
      user: {
        email: checkUser.email,
        name: checkUser.name,
        _id: checkUser._id,
        role: checkUser.role,
      },
    };

    return NextResponse.json({
      success: true,
      message: "Login Successfull",
      data
    });
  } catch (error) {
    console.log("error while new user registration", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}

import connectDB from "@/database/dbConfig";
import User from "@/models/User.Model";
import { hash } from "bcryptjs";
import Joi from "joi";
import { NextResponse } from "next/server";

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  await connectDB();
  const { name, email, password, role } = await req.json();
  // validate the schema
  const { error } = schema.validate({ name, email, password, role });

  if (error) {
    return NextResponse.json({
      success: false,
      message: email.details[0],
    });
  }

  try {

    // check user already exist or not
    const isUserAlreadyExist = await User.findOne({email});

    if(isUserAlreadyExist){
        return NextResponse.json({
            success: false,
            message: 'Email already exist. Please try with different email',
        });
    }else{
        const hashPassword = await hash(password,12);
        const newlyCreatedUser = await User.create({
            name , email , password : hashPassword , role
        })
        if (newlyCreatedUser) {
          return NextResponse.json({
            success: true,
            message: "Account created Successfully",
          });
        }
        
    }

  } catch (error) {
    console.log('error in creating new user registration',error);
    return NextResponse.json({
        success :false,
        message : 'Something went wrong ! please try again later'
    })
  }
}

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";
import User from "../models/user.model.js";

export const signUp = async (req, res, next) => {
  //Implement sign up logic
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    //Logic to create a new User
    const { name, email, password } = req.body;

    //Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("User already Exists");
      error.statusCode = 409; //Already Exists
      throw error;
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create(
      [
        {
          name,
          email,
          password: hashedPassword,
        },
      ],
      // Session added here incase any error occurs User will not be created!
      { session }
    );

    const token = jwt.sign({ userId: newUser[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    console.log(token);

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "User created Successfully",
      data: {
        token,
        user: newUser[0],
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  //Implement sign in logic
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("User doesn't exist");
      error.statusCode = 404;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error("Invalid Password");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.status(200).json({
      success: true,
      message: "user signed in successfully",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  //Implement sign out logic
  try {
    res.json({
      message: "Sign Out",
    });
  } catch (error) {
    next(error);
  }
};

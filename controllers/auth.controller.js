import mongoose from "mongoose";

export const signUp = async (req, res, next) => {
  //Implement sign up logic
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    //Logic to create a new User

    res.json({
      message: "Sign Up",
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
    res.json({
      message: "Sign In",
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

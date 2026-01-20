import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongoUrl = process.env.MONGODB_URI;
    if (!mongoUrl) {
      throw new Error("MONGODB_URI is not loaded");
    }

    await mongoose.connect(mongoUrl);
    console.log("Mongodb connected successfully");
  } catch (error) {
    console.error("Mongodb connection error", error);
    process.exit(1);
  }
};

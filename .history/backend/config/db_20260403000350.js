import mongoose from "mongoose";

export const connectDB = async () => {


    await mongoose.connect('localhost:27017/aiinvoice',).then(() => {;
}
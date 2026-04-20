import mongoose from "mongoose";

export const connectDB = async () => {


    await mongoose.connect('mongodb+srv://04sayan96_db_user:aiinvoicemongodb@cluster0.8kbhzsx.mongodb.net/AIINVOICE',).then(() => {
        console.log('Connected to MongoDB');
    });;
}
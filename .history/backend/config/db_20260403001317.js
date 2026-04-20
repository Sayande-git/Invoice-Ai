import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('localhost:27017/aiinvoice', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB Connected");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
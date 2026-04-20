import mongoose from "mongoose";

const businessProfileSchema = new mongoose.Schema({

    owner: {
        type: String,
        required: true,
        index: true
    },
    businessName: {
        type: String,
        default: ""
});

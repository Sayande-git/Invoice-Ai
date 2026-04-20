import mongoose from "mongoose";
import { trim } from "validator";

const businessProfileSchema = new mongoose.Schema({

    owner: {
        type: String,
        required: true,
        index: true
    },
    businessName: {
        type: String,
    },
    email: {
        type: String,
        required: false,
        trim: true,
        lowercase: true,
        default: "",
    },
});

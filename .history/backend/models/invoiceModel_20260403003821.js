import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true,
        default: 1
    },
    price: {
        type: Number,
        required: true
    }
});
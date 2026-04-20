import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    quantity: {
    }});
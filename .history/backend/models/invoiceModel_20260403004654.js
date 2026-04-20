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
    unitprice: {
        type: Number,
        required: true,
        default: 0
     },
    
},
    { _id: false });


    //the invoice schema 

    const InvoiceSchema =  new mongoose.Schema({
        owner:{
            type :String,
            required : true,
            index: true
        },
        //its clerk id
     //must be unique for each other 
        invoiceNumber: {
            type: String,
            required: true,
            index: true
        },
        issueDate: {
            type: Date,
            required: true},
        dueDate: {
            type: String,
           default:""},

           //
    });
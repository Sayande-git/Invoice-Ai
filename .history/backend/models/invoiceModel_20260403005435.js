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

           //For Bussiness information
                    fromBusinessName: { type: String, default: "" },
    fromEmail: { type: String, default: "" },
    fromAddress: { type: String, default: "" },
    fromPhone: { type: String, default: "" },
    fromGst: { type: String, default: "" },

    //client info
       client: {
      name: { type: String, default: "" },
      email: { type: String, default: "" },
      address: { type: String, default: "" },
      phone: { type: String, default: "" },
    },
 currency: { type: String, default: "INR" },
    status: { type: String, enum: ["draft", "unpaid", "paid", "overdue"], default: "draft" },
//for assets like logo stamp signature
    logoDataUrl: { type: String, default: null },
    stampDataUrl: { type: String, default: null },
    signatureDataUrl: { type: String, default: null },

    signatureName: { type: String, default: "" },
    signatureTitle: { type: String, default: "" },

    taxPercent: { type: Number, default: 18 },

    subtotal: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
}, { timestamps: true}
   

    });

    const Invoice =mongoose.model.Invoice || mongoose.model('Invoice', InvoiceSchema)
import express from "express";
import { createInvoice, getInvoiceById, getInvoices } from "../controllers/invoiceController.js";

import { clerkMiddleware } from "@clerk/express";

const invoiceRouter = express.Router();

invoiceRouter.use(clerkMiddleware());

invoiceRouter.get("/", getInvoices);
invoiceRouter.get("/:id", getInvoiceById);
invoiceRouter.post("/",createInvoice);
invoiceRouter.put("/:id", createInvoice);
invoiceRouter.delete("/:id", deleInvoice);

export default invoiceRouter;
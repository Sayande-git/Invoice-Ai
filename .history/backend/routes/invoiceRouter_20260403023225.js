import express from "express";
import { getInvoiceById, getInvoices } from "../controllers/invoiceController.js";

import { clerkMiddleware } from "@clerk/express";

const invoiceRouter = express.Router();

invoiceRouter.use(clerkMiddleware());

invoiceRouter.get("/", getInvoices);
invoiceRouter.get("/:id", getInvoiceById);

export default invoiceRouter;
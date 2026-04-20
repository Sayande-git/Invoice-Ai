import express from "express";
import { getInvoices } from "../controllers/invoiceController.js";

import { clerkMiddleware } from "@clerk/express";

const invoiceRouter = express.Router();

invoiceRouter.use(clerkMiddleware());

invoiceRouter.get("/", getInvoices);
invoice

export default invoiceRouter;
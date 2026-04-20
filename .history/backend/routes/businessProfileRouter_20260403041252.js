import express from "express";
import multer from "multer";
import path from "path";  

import { clerkMiddleware } from "@clerk/express";
const businessProfileRouter = express.Router();

businessProfileRouter.use(clerkMiddleware());

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) =>{
        cd()
    }
})
import express from "express";
import multer from "multer";
import path from "path";

import { clerkMiddleware } from "@clerk/express";
import { create } from "domain";

const businessProfileRouter = express.Router();

businessProfileRouter.use(clerkMiddleware());

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(), "uploads"));
    },
    filename: (req, file, cb) => {
        const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, unique + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

export default businessProfileRouter;

//create 
businessProfileRouter.post("/", upload.fields([
    { name: "logoName", maxCount: 1 },
    { name: "stampName", maxCount: 1 },
    { name: "signatureNameMeta", maxCount: 1 },
]),
createBusinessProfile
);

// to update 
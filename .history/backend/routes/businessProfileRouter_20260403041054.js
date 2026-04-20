import express from "express";
import multer from "multer";
import path from "path";  

import { clerkMiddleware } from "@clerk/express";
const businessProfileRouter = express.Router();

businessProfileRouter
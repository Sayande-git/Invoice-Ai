import express from "express";
import multer from "multer";
import path from "path";
import { createBusinessProfile } from "../controllers/businessProfileController.js";
import { clerkMiddleware } from "@clerk/express";
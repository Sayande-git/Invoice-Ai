import express from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const aiInvoiceRouter = express.Router();

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error("GEMINI_API_KEY is not set in environment variables.");
  process.exit(1);
}



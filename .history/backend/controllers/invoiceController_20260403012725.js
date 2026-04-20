import mongoose from "mongoose";
import Invoice from "../models/invoiceModel.js";
import { getAuth } from "@clerk/express";

const API_BASE = "http://localhost:4000";

function computeTotals(items = [], taxPercent = 0) {
    const safe = Array.isArray(items) ? items.filter(Boolean) : [];

    const subtotal = safe.reduce(
        (s, it) => s + (Number(it.qty || 0) * Number(it.unitPrice || 0)),
        0
    );

    const tax = (subtotal * Number(taxPercent || 0)) / 100;
    const total = subtotal + tax;

    return {
        subtotal,
        tax,
        total,
    };
}
//Parse From data 
// Parse FormData items
function parseItemsField(val) {
    if (!val) return [];

    if (Array.isArray(val)) return val;

    if (typeof val === "string") {
        try {
            return JSON.parse(val);
        } catch (error) {
            return []; // fallback if JSON is invalid
        }
    }

    return val ;
}

// check if string is Obj ID
function isObjectIdString(val) {
    return typeof val === "string" && /^[0-9a-fA-F]{24}$/.test(val);
}

// for helper function for uploading files to public user 

function uploadedFilesToUrls(req) {
  const urls = {};
  if (!req.files) return urls;
  const mapping = {
    logoName: "logoDataUrl",
    stampName: "stampDataUrl",
    signatureNameMeta: "signatureDataUrl",
    logo: "logoDataUrl",
    stamp: "stampDataUrl",
    signature: "signatureDataUrl",
  };
  Object.keys(mapping).forEach((field) => {
    const arr = req.files[field];
    if (Array.isArray(arr) && arr[0]) {
      const filename =
        arr[0].filename || (arr[0].path && path.basename(arr[0].path));
      if (filename) urls[mapping[field]] = `${API_BASE}/uploads/${filename}`;
    }
  });
  return urls;
}

// generate unique invoice number for db collition
async function generateUniqueInvoiceNumber(attempts = 8) {
  for (let i = 0; i < attempts; i++) {
    const ts = Date.now().toString();
    const suffix = Math.floor(Math.random() * 900000).toString().padStart(6, "0");
    const candidate = `INV-${ts.slice(-6)}-${suffix}`;

    const exists = await Invoice.exists({ invoiceNumber: candidate });
    if (!exists) return candidate;
    await new Promise((r) => setTimeout(r, 2));
  }
  return new mongoose.Types.ObjectId().toString();
}


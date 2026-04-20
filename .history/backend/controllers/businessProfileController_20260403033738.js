import {getAuth} from "@clerk/express";
import BusinessProfile from "../models/businessProfileModel.js";

const API_BASE = "http://localhost:4000";

// file to url

function uploadedFilesToUrls(req) {
  const urls = {};
  if (!req.files) return urls;

  const logoArr = req.files.logoName || req.files.logo || [];
  const stampArr = req.files.stampName || req.files.stamp || [];
  const sigArr = req.files.signatureNameMeta || req.files.signature || [];

  if (logoArr[0]) urls.logoUrl = `${API_BASE}/uploads/${logoArr[0].filename}`;
  if (stampArr[0]) urls.stampUrl = `${API_BASE}/uploads/${stampArr[0].filename}`;
  if (sigArr[0]) urls.signatureUrl = `${API_BASE}/uploads/${sigArr[0].filename}`;

  return urls;
}

// Create or update business profile


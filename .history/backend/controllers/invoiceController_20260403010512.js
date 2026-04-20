import mongoose from "mongoose";
import path from "path"; // ✅ REQUIRED
import { getAuth } from "@clerk/express"; // ✅ make sure installed

// keep your existing helpers (no change)
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

async function generateUniqueInvoiceNumber(attempts = 8) {
  for (let i = 0; i < attempts; i++) {
    const ts = Date.now().toString();
    const suffix = Math.floor(Math.random() * 900000)
      .toString()
      .padStart(6, "0");

    const candidate = `INV-${ts.slice(-6)}-${suffix}`;

    const exists = await Invoice.exists({ invoiceNumber: candidate });
    if (!exists) return candidate;

    await new Promise((r) => setTimeout(r, 2));
  }

  return new mongoose.Types.ObjectId().toString();
}

/* ----------------- CREATE ----------------- */
export async function createInvoice(req, res) {
  try {
    // ✅ FIX: safe auth
    const auth = getAuth(req);
    const userId = auth?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const body = req.body || {};

    // ✅ FIX: safe parsing
    let items = [];
    if (Array.isArray(body.items)) items = body.items;
    else if (typeof body.items === "string") {
      try {
        items = JSON.parse(body.items);
      } catch {
        items = [];
      }
    }

    const taxPercent = Number(
      body.taxPercent ?? body.tax ?? body.defaultTaxPercent ?? 0
    );

    const totals = computeTotals(items, taxPercent);
    const fileUrls = uploadedFilesToUrls(req);

    let invoiceNumberProvided =
      typeof body.invoiceNumber === "string" && body.invoiceNumber.trim()
        ? body.invoiceNumber.trim()
        : null;

    // ✅ duplicate check
    if (invoiceNumberProvided) {
      const duplicate = await Invoice.exists({
        invoiceNumber: invoiceNumberProvided,
      });

      if (duplicate) {
        return res.status(409).json({
          success: false,
          message: "Invoice number already exists",
        });
      }
    }

    let invoiceNumber =
      invoiceNumberProvided || (await generateUniqueInvoiceNumber());

    const doc = new Invoice({
      _id: new mongoose.Types.ObjectId(),
      owner: userId,
      invoiceNumber,
      issueDate: body.issueDate || new Date().toISOString().slice(0, 10),
      dueDate: body.dueDate || "",
      fromBusinessName: body.fromBusinessName || "",
      fromEmail: body.fromEmail || "",
      fromAddress: body.fromAddress || "",
      fromPhone: body.fromPhone || "",
      fromGst: body.fromGst || "",
      client:
        typeof body.client === "string" && body.client.trim()
          ? { name: body.client }
          : body.client || {},
      items,
      subtotal: totals.subtotal,
      tax: totals.tax,
      total: totals.total,
      currency: body.currency || "INR",
      status: body.status
        ? String(body.status).toLowerCase()
        : "draft",
      taxPercent,
      logoDataUrl:
        fileUrls.logoDataUrl || body.logoDataUrl || body.logo || null,
      stampDataUrl:
        fileUrls.stampDataUrl || body.stampDataUrl || body.stamp || null,
      signatureDataUrl:
        fileUrls.signatureDataUrl ||
        body.signatureDataUrl ||
        body.signature ||
        null,
      signatureName: body.signatureName || "",
      signatureTitle: body.signatureTitle || "",
      notes: body.notes || body.aiSource || "",
    });

    // ✅ SAVE WITH RETRY
    let saved = null;
    let attempts = 0;

    while (attempts < 5) {
      try {
        saved = await doc.save();
        break;
      } catch (err) {
        if (err.code === 11000) {
          doc.invoiceNumber = await generateUniqueInvoiceNumber();
          attempts++;
        } else {
          throw err;
        }
      }
    }

    if (!saved) {
      return res.status(500).json({
        success: false,
        message: "Failed to create invoice",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Invoice created",
      data: saved,
    });

  } catch (err) {
    // ✅ PROPER DEBUG
    console.error("createInvoice error FULL:", err);

    if (err.type === "entity.too.large") {
      return res.status(413).json({
        success: false,
        message: "Payload too large",
      });
    }

    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Duplicate invoice",
      });
    }

    return res.status(500).json({
      success: false,
      message: err.message || "Server error",
    });
  }
}
import express from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const aiInvoiceRouter = express.Router();

const API_KEY = process.env.GEMINI_API_KEY;

// ✅ FIX: stop app if key missing
if (!API_KEY) {
  throw new Error("GEMINI_API_KEY is not set in environment variables.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const MODEL_CANDIDATES = [
  "gemini-2.5-flash",
  "gemini-2.0-flash",
  "gemini-2.0",
];

// build prompt
function buildInvoicePrompt(promptText) {
  const invoiceTemplate = {
    invoiceNumber: `INV-${Math.floor(Math.random() * 9000) + 1000}`,
    issueDate: new Date().toISOString().slice(0, 10),
    dueDate: "",
    fromBusinessName: "",
    fromEmail: "",
    fromAddress: "",
    fromPhone: "",
    client: { name: "", email: "", address: "", phone: "" },
    items: [{ id: "1", description: "", qty: 1, unitPrice: 0 }],
    taxPercent: 18,
    notes: "",
  };

  return `
You are an invoice generation assistant.

Task:
  - Analyze the user's input text and produce a valid JSON object only (no explanatory text).
  - The JSON MUST match the schema below (include all fields even if empty).
  - Ensure all dates are ISO 'YYYY-MM-DD' strings and numeric fields are numbers.

Schema:
${JSON.stringify(invoiceTemplate, null, 2)}

User input:
${promptText}

Output: valid JSON only (no surrounding code fences, no commentary).
`;
}

// try models one by one
async function tryGenerateWithModel(modelName, prompt) {
  const response = await ai.models.generateContent({
    model: modelName,
    contents: prompt,
  });

  let text =
    (response && typeof response.text === "string" && response.text) ||
    (response?.output?.[0]?.content?.[0]?.text) ||
    (response?.outputs?.[0]?.text || response?.outputs?.[0]?.content) ||
    null;

  if (!text && response?.outputs) {
    const joined = response.outputs
      .map((o) => {
        if (!o) return "";
        if (typeof o === "string") return o;
        if (typeof o.text === "string") return o.text;
        if (Array.isArray(o.content)) {
          return o.content.map((c) => c?.text || "").join("\n");
        }
        return JSON.stringify(o);
      })
      .filter(Boolean)
      .join("\n\n");

    if (joined) text = joined;
  }

  if (!text && response) {
    try {
      text = JSON.stringify(response);
    } catch {
      text = String(response);
    }
  }

  if (!text || !String(text).trim()) {
    throw new Error("Empty text returned from model");
  }

  return { text: String(text).trim(), modelName };
}

// route
aiInvoiceRouter.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({
        success: false,
        message: "Prompt is required and must be a string.",
      });
    }

    const fullPrompt = buildInvoicePrompt(prompt);

    let lastErr = null;
    let lastText = null;
    let usedModel = null;

    for (const m of MODEL_CANDIDATES) {
      try {
        const { text, modelName } = await tryGenerateWithModel(
          m,
          fullPrompt
        );
        lastText = text;
        usedModel = modelName;
        if (text && text.trim()) break;
      } catch (err) {
        console.warn(`Model ${m} failed:`, err?.message || err);
        lastErr = err;
      }
    }

    if (!lastText) {
      const errMsg =
        lastErr?.message ||
        "All candidate models failed. Check API key or network.";

      return res.status(502).json({
        success: false,
        message: "AI generation failed",
        detail: errMsg,
      });
    }

    const text = lastText.trim();

    const firstBrace = text.indexOf("{");
    const lastBrace = text.lastIndexOf("}");

    if (firstBrace === -1 || lastBrace === -1) {
      return res.status(502).json({
        success: false,
        message: "AI returned malformed response (no JSON found)",
        raw: text,
        model: usedModel,
      });
    }

    const jsonText = text.substring(firstBrace, lastBrace + 1);

    try {
      const data = JSON.parse(jsonText); // ✅ FIXED

      return res.status(200).json({
        success: true,
        data,
        modelUsed: usedModel,
      });
    } catch (parseErr) {
      return res.status(502).json({
        success: false,
        message: "AI returned malformed JSON",
        raw: text,
        model: usedModel,
        parseError: parseErr.message,
      });
    }
  } catch (err) {
    console.error("AI invoice generation error:", err);

    return res.status(500).json({
      success: false,
      message: "Error generating invoice",
      error: err.message || String(err),
    });
  }
});

export default aiInvoiceRouter;
   


    



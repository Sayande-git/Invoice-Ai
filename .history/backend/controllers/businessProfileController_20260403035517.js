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

export async function createBusinessProfile(req,res){
    try{
        const {userId} = getAuth(req);

        if(!userId){
            return res.status(401).json({message:"Unauthorized"});
        }

        const body = req.body || {};
        const fileUrls = uploadedFilesToUrls(req);

          //  CREATE BUSINESS PROFILE
    const profile = new BusinessProfile({
      owner: userId,
      businessName: body.businessName || "ABC Solutions",
      email: body.email || "",
      address: body.address || "",
      phone: body.phone || "",
      gst: body.gst || "",
      logoUrl: fileUrls.logoUrl || body.logoUrl || null,
      stampUrl: fileUrls.stampUrl || body.stampUrl || null,
      signatureUrl: fileUrls.signatureUrl || body.signatureUrl || null,
      signatureOwnerName: body.signatureOwnerName || "",
      signatureOwnerTitle: body.signatureOwnerTitle || "",
      defaultTaxPercent:
        body.defaultTaxPercent !== undefined ? Number(body.defaultTaxPercent) : 18,
    });

    const saved = await profile.save();
    return res.status(201).json({
        success: true,
        data: saved,
        message: "Business profile created successfully",
    });

    }
    catch(error){
        console.error("Error in createBusinessProfile:", error)
        return res.status(500).json({message:"Internal Server Error",
            success: false,
            message: "Server Error",
        });
    }
}

// to update business profile
export async function updateBusinessProfile(req,res){
    try{
        const {Id} = req.params;
        const body = req.body || {};

        const fileUrls = uploadedFilesToUrls(req);

        const existing = await BusinessProfile.findById(Id);
        if(!existing){
            return res.status(404).json({
                success: false,
                message:"Business profile not found"
            });

            if (existing.owner.toString()!== userId{
                return res.status(403).json({
                    success: false,
                    message:"Forbidden: You don't have permission to update this profile"
                }); 
            
        
    }
        catch(error){

        }
    }


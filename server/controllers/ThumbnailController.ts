import { Request, Response } from "express";
import Thumbnail from "../models/Thumbnail.js";
import path from "node:path";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import fetch from "node-fetch";
import OpenAI from "openai";
import { fileFromPath } from "formdata-node/file-from-path";
import sharp from "sharp";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY as string,
});

const stylePrompts = {
  "Bold & Graphic":
    "eye-catching thumbnail, bold typography, vibrant colors, expressive facial reaction, dramatic lighting, high contrast, click-worthy composition",
  "Tech/Futuristic":
    "futuristic thumbnail, sleek modern design, digital UI elements, glowing accents, cyber-tech aesthetic",
  Minimalist:
    "minimalist thumbnail, clean layout, simple shapes, limited color palette, modern flat design",
  Photorealistic:
    "photorealistic thumbnail, ultra-realistic lighting, natural skin tones, DSLR photography style",
  Illustrated:
    "illustrated thumbnail, stylized characters, vibrant colors, cartoon or vector art style",
};

const colorSchemeDescriptions = {
  vibrant: "vibrant energetic colors with strong contrast",
  sunset: "orange pink purple sunset tones with cinematic glow",
  forest: "green earthy tones with natural atmosphere",
  neon: "neon cyberpunk colors with glowing lighting",
  purple: "magenta violet modern color palette",
  monochrome: "black and white high contrast style",
  ocean: "cool blue teal aquatic colors",
  pastel: "soft pastel low saturation colors",
};



// ===============================
// GENERATE THUMBNAIL
// ===============================
export const generateThumbnail = async (req: Request, res: Response) => {
  try {
    const { userId } = req.session as any;

    const {
      title,
      prompt: user_prompt,
      style,
      aspect_ratio,
      color_scheme,
      text_overlay,
    } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const thumbnail = await Thumbnail.create({
      userId,
      title,
      prompt_used: user_prompt,
      user_prompt,
      style,
      aspect_ratio,
      color_scheme,
      text_overlay,
      isGenerating: true,
    });

    let prompt = `Create a ${
      stylePrompts[style as keyof typeof stylePrompts]
    } YouTube thumbnail for "${title}". `;

    if (color_scheme) {
      prompt += `Use ${
        colorSchemeDescriptions[
          color_scheme as keyof typeof colorSchemeDescriptions
        ]
      }. `;
    }

    if (user_prompt) {
      prompt += `Additional details: ${user_prompt}. `;
    }

    prompt += `Aspect ratio ${aspect_ratio || "16:9"}. Make it bold, dramatic, and highly clickable.`;



    // Generate image using HuggingFace FLUX
    const hfResponse = await fetch(
      "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-schnell",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            width: 1280,
            height: 720,
          },
        }),
      }
    );

    if (!hfResponse.ok) {
      const errorText = await hfResponse.text();
      throw new Error(errorText);
    }

    const arrayBuffer = await hfResponse.arrayBuffer();
    const finalBuffer = Buffer.from(arrayBuffer);

    const filename = `thumbnail-${Date.now()}.png`;
    const filePath = path.join(process.cwd(), "images", filename);

    fs.mkdirSync("images", { recursive: true });
    fs.writeFileSync(filePath, finalBuffer);

    const uploadResult = await cloudinary.uploader.upload(filePath, {
      resource_type: "image",
    });

    thumbnail.image_url = uploadResult.secure_url;
    thumbnail.isGenerating = false;

    await thumbnail.save();

    fs.unlinkSync(filePath);

    res.json({
      message: "Thumbnail Generated",
      thumbnail,
    });

  } catch (error: any) {
    console.error("Thumbnail Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};



// ===============================
// DELETE THUMBNAIL
// ===============================
export const deleteThumbnail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.session as any;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    await Thumbnail.findOneAndDelete({ _id: id, userId });

    res.json({ message: "Thumbnail deleted successfully" });

  } catch (error: any) {
    console.error("Delete Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};



// ===============================
// RECREATE / EDIT THUMBNAIL
// ===============================

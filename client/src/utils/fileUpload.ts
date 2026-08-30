// src/utils/fileUpload.ts

const CLOUDINARY_CLOUD_NAME = "dwcrt1wtv"; 
const CLOUDINARY_UPLOAD_PRESET = "jobs_applications";

export async function uploadFileToCloud(file: File): Promise<string | null> {
  if (!file || file.size === 0) return null;

  const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`;
  const data = new FormData();

  data.append("file", file);
  data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await fetch(url, { method: "POST", body: data });
    const result = await response.json();

    if (result.secure_url) {
      return result.secure_url;
    }
    console.error("Cloudinary upload error:", result);
    return null;
  } catch (error) {
    console.error("Failed to connect to Cloudinary:", error);
    return null;
  }
}

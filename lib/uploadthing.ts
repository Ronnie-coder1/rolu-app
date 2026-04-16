import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

// Import your router type from where you defined your core.ts
import type { OurFileRouter } from "@/app/api/uploadthing/route";

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

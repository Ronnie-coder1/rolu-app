import { createUploadthing, type FileRouter } from "uploadthing/next"; // Fixed import
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"; // Use Clerk for the admin check

const f = createUploadthing();

export const ourFileRouter = {
  productImage: f({ image: { maxFileSize: "4MB" } }) // Specify "image" for better security
    .middleware(async ({ req }) => {
      // Use Clerk to get the user instead of custom headers
      const { userId } = await auth();
      
      if (!userId) throw new Error("Unauthorized");

      // You can add an extra check here to ensure the user is an ADMIN
      return { userId }; 
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);
      
      // Optional: Save to Prisma here if you want it automatic
      // await prisma.productImage.create({ data: { url: file.url } });
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // Access process.env directly to ensure the string is fully loaded
    url: process.env.DATABASE_URL,
  },
});

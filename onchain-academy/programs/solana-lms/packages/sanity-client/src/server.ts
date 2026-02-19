import { createClient } from "next-sanity";

/**
 * Server client - full access to READ AND WRITE TO SANITY
 */
export const serverClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2025-02-19",
  useCdn: true,
  perspective:"published"
});

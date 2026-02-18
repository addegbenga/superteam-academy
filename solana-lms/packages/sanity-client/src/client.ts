import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/signed";


/**
 * Public client - read only, safe for browser
 */

export const publicClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2025-02-19",
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
  useCdn: true,
  
});


const builder = createImageUrlBuilder(publicClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

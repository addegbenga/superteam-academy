// import { QueryClient } from "@tanstack/react-query";

// export function makeQueryClient() {
//   return new QueryClient({
//     defaultOptions: {
//       queries: {
//         staleTime: 60 * 1000, // 1 minute
//       },
//     },
//   });
// }

// let browserQueryClient: QueryClient | undefined = undefined;

// export function getQueryClient() {
//   if (typeof window === "undefined") {
//     return makeQueryClient();
//   } else {
//     if (!browserQueryClient) browserQueryClient = makeQueryClient();
//     return browserQueryClient;
//   }
// }

import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000 * 5, // 5 minutes
      },
    },
  });

// Server: one instance per request, scoped by React's cache()
const getServerQueryClient = cache(makeQueryClient);

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (typeof window === "undefined") {
    return getServerQueryClient(); // same instance within a single server render
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
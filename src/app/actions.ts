"use server";

import { suggestOptimalRoute, type SuggestOptimalRouteInput } from "@/ai/flows/suggest-optimal-route";

export async function getOptimalRoute(input: SuggestOptimalRouteInput) {
  try {
    const result = await suggestOptimalRoute(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error getting optimal route:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return { success: false, error: errorMessage };
  }
}

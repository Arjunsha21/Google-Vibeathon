'use server';

/**
 * @fileOverview Route suggestion AI agent, which proposes optimal route by
 * taking into account road conditions, real-time traffic, and historical ride
 * data.
 *
 * - suggestOptimalRoute - A function that handles the route suggestion process.
 * - SuggestOptimalRouteInput - The input type for the suggestOptimalRoute
 *   function.
 * - SuggestOptimalRouteOutput - The return type for the
 *   suggestOptimalRoute function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestOptimalRouteInputSchema = z.object({
  pickupLocation: z
    .string()
    .describe('The starting location for the route suggestion.'),
  dropLocation: z
    .string()
    .describe('The destination location for the route suggestion.'),
});
export type SuggestOptimalRouteInput = z.infer<
  typeof SuggestOptimalRouteInputSchema
>;

const SuggestOptimalRouteOutputSchema = z.object({
  route: z.array(z.object({lat: z.number(), lng: z.number()})).describe(
    'An array of lat/lng coordinates representing the suggested route, optimized for road conditions, real-time traffic, and historical ride data.'
  ),
  estimatedTravelTime: z
    .string()
    .describe(
      'The estimated travel time in minutes and seconds (e.g., 10 minutes 30 seconds).'
    ),
  estimatedFare: z
    .number()
    .describe('The estimated fare for the suggested route in USD.'),
  summary: z
    .string()
    .describe(
      'A brief summary of the route, highlighting key considerations such as traffic conditions or alternative route options.'
    ),
});
export type SuggestOptimalRouteOutput = z.infer<
  typeof SuggestOptimalRouteOutputSchema
>;

export async function suggestOptimalRoute(
  input: SuggestOptimalRouteInput
): Promise<SuggestOptimalRouteOutput> {
  return suggestOptimalRouteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestOptimalRoutePrompt',
  input: {schema: SuggestOptimalRouteInputSchema},
  output: {schema: SuggestOptimalRouteOutputSchema},
  prompt: `You are a route optimization expert specializing in suggesting the best routes for bike taxis, taking into account real-time traffic, road conditions, and historical ride data.

  Given the following pickup and dropoff locations, suggest the optimal route. Provide the route as an array of lat/lng coordinates, the estimated travel time in minutes and seconds, the estimated fare, and a brief summary of the route.

  Pickup Location: {{{pickupLocation}}}
  Dropoff Location: {{{dropLocation}}}

  Consider the following:
  - Real-time traffic conditions
  - Road conditions (e.g., construction, potholes)
  - Historical ride data (e.g., popular routes, average travel times)
  - Provide alternative routes if necessary.

  Ensure the output is formatted as a valid JSON object matching the following schema:
  ${JSON.stringify(SuggestOptimalRouteOutputSchema.describe())}`,
});

const suggestOptimalRouteFlow = ai.defineFlow(
  {
    name: 'suggestOptimalRouteFlow',
    inputSchema: SuggestOptimalRouteInputSchema,
    outputSchema: SuggestOptimalRouteOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

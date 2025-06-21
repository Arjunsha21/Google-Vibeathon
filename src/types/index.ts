import type { SuggestOptimalRouteOutput as RouteOutput } from "@/ai/flows/suggest-optimal-route";

// A GeoPoint representation
interface GeoPoint {
  latitude: number;
  longitude: number;
}

// User schema
export interface User {
  userId: string;
  displayName: string;
  role: 'user' | 'driver';
  email: string;
  phone?: string;
  location?: GeoPoint;
  isAvailable?: boolean; // For drivers
}

// Ride schema
export interface Ride {
  rideId: string;
  userId: string;
  driverId?: string;
  pickupLocation: GeoPoint;
  dropLocation: GeoPoint;
  status: 'requested' | 'accepted' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: Date;
  fare?: number;
}

export type SuggestOptimalRouteOutput = RouteOutput;

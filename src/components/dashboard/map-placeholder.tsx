'use client';

import type { SuggestOptimalRouteOutput } from '@/types';
import { Card } from '@/components/ui/card';
import { MapPin, Bike } from 'lucide-react';

interface MapPlaceholderProps {
  route: SuggestOptimalRouteOutput['route'] | null;
}

export function MapPlaceholder({ route }: MapPlaceholderProps) {
  // Normalize coordinates to fit into a 1000x600 SVG viewbox
  const getSvgPath = (routeData: SuggestOptimalRouteOutput['route']) => {
    if (!routeData || routeData.length === 0) return '';

    const lats = routeData.map(p => p.lat);
    const lngs = routeData.map(p => p.lng);

    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    const latRange = maxLat - minLat || 1;
    const lngRange = maxLng - minLng || 1;

    const scaleX = 960 / lngRange;
    const scaleY = 560 / latRange;

    const points = routeData
      .map(p => {
        const x = (p.lng - minLng) * scaleX + 20;
        const y = (maxLat - p.lat) * scaleY + 20;
        return `${x},${y}`;
      })
      .join(' ');
    
    return points;
  };
  
  const getPoint = (point: {lat: number, lng: number} | undefined, routeData: SuggestOptimalRouteOutput['route']) => {
    if (!point || !routeData || routeData.length === 0) return { x: 0, y: 0 };
    
    const lats = routeData.map(p => p.lat);
    const lngs = routeData.map(p => p.lng);

    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    const latRange = maxLat - minLat || 1;
    const lngRange = maxLng - minLng || 1;

    const scaleX = 960 / lngRange;
    const scaleY = 560 / latRange;

    return {
      x: (point.lng - minLng) * scaleX + 20,
      y: (maxLat - point.lat) * scaleY + 20,
    }
  }

  const routePath = route ? getSvgPath(route) : '';
  const startPoint = route ? getPoint(route[0], route) : null;
  const endPoint = route ? getPoint(route[route.length - 1], route) : null;

  return (
    <Card className="w-full h-full min-h-[400px] md:min-h-0 overflow-hidden shadow-lg flex items-center justify-center bg-secondary/30 relative">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(to_bottom,white,transparent)] dark:bg-grid-slate-700/40"></div>
      <div data-ai-hint="street map" className="w-full h-full bg-cover bg-center opacity-20" style={{backgroundImage: "url('https://placehold.co/1200x800.png')"}}></div>
      
      {route && routePath && startPoint && endPoint ? (
        <svg
          viewBox="0 0 1000 600"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <polyline
            points={routePath}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-draw"
            style={{ animation: 'draw 2s ease-out forwards' }}
          />
          
          <g transform={`translate(${startPoint.x}, ${startPoint.y})`}>
            <circle cx="0" cy="0" r="15" fill="hsl(var(--primary))" className="opacity-50" />
            <circle cx="0" cy="0" r="10" fill="hsl(var(--primary))" />
            <Bike className="text-primary-foreground" x="-12" y="-12" width="24" height="24" />
          </g>

          <g transform={`translate(${endPoint.x}, ${endPoint.y})`}>
             <circle cx="0" cy="0" r="15" fill="hsl(var(--accent))" className="opacity-50" />
            <MapPin className="text-accent-foreground" fill="hsl(var(--accent))" x="-12" y="-12" width="24" height="24" />
          </g>
        </svg>
      ) : (
        <div className="text-center p-8 z-10">
          <Bike className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium font-headline text-muted-foreground">Map is ready</h3>
          <p className="mt-1 text-sm text-muted-foreground">Enter your pickup and drop-off locations to see the route.</p>
        </div>
      )}
      <style jsx>{`
        @keyframes draw {
          from {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
          }
          to {
            stroke-dasharray: 1000;
            stroke-dashoffset: 0;
          }
        }
        .animate-draw {
          animation: draw 2s ease-out forwards;
        }
        .bg-grid-slate-100 {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(203 213 225 / 0.5)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
        }
        .dark .bg-grid-slate-700/40 {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(51 65 85 / 0.5)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
        }
      `}</style>
    </Card>
  );
}

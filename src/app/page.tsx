'use client';

import { useState } from 'react';
import { Header } from '@/components/dashboard/header';
import { RoutePlanner } from '@/components/dashboard/route-planner';
import { MapPlaceholder } from '@/components/dashboard/map-placeholder';
import type { SuggestOptimalRouteOutput } from '@/types';
import { Wallet } from '@/components/dashboard/wallet';
import { DriverFeedback } from '@/components/dashboard/driver-feedback';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  const [route, setRoute] = useState<SuggestOptimalRouteOutput['route'] | null>(null);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 overflow-hidden">
        <div className="h-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          <div className="col-span-1 md:col-span-1 lg:col-span-1 h-full overflow-y-auto space-y-6 pr-2">
            <RoutePlanner setRoute={(r) => setRoute(r?.route || null)} />
            <Separator />
            <Wallet />
            <Separator />
            <DriverFeedback />
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-3 h-full">
            <MapPlaceholder route={route} />
          </div>
        </div>
      </main>
    </div>
  );
}

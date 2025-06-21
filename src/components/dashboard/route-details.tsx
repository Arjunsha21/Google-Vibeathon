import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, DollarSign, Route } from 'lucide-react';
import type { SuggestOptimalRouteOutput } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

interface RouteDetailsProps {
  details: SuggestOptimalRouteOutput | null;
  loading: boolean;
}

export function RouteDetails({ details, loading }: RouteDetailsProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-32" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="flex items-start gap-4">
            <Skeleton className="h-8 w-8 rounded-full mt-1" />
            <div className='space-y-2 flex-1'>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!details) {
    return null;
  }

  return (
    <Card className="bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="font-headline text-lg">Route Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 p-2 rounded-full">
            <Clock className="h-4 w-4 text-primary" />
          </div>
          <p>
            <span className="font-semibold">{details.estimatedTravelTime}</span>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 p-2 rounded-full">
            <DollarSign className="h-4 w-4 text-primary" />
          </div>
          <p>
            Estimated Fare: <span className="font-semibold">${details.estimatedFare.toFixed(2)}</span>
          </p>
        </div>
        <div className="flex items-start gap-4">
           <div className="bg-primary/10 p-2 rounded-full mt-1">
            <Route className="h-4 w-4 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground">{details.summary}</p>
        </div>
      </CardContent>
    </Card>
  );
}

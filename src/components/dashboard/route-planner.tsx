'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MapPinned, Search, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getOptimalRoute } from '@/app/actions';
import type { SuggestOptimalRouteOutput } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { RouteDetails } from './route-details';

const formSchema = z.object({
  pickupLocation: z.string().min(3, 'Please enter a valid pickup location.'),
  dropLocation: z.string().min(3, 'Please enter a valid drop-off location.'),
});

type FormValues = z.infer<typeof formSchema>;

interface RoutePlannerProps {
  setRoute: (route: SuggestOptimalRouteOutput | null) => void;
}

export function RoutePlanner({ setRoute }: RoutePlannerProps) {
  const [loading, setLoading] = useState(false);
  const [routeDetails, setRouteDetails] = useState<SuggestOptimalRouteOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickupLocation: '',
      dropLocation: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setLoading(true);
    setRoute(null);
    setRouteDetails(null);

    const result = await getOptimalRoute(values);

    setLoading(false);

    if (result.success && result.data) {
      setRoute(result.data);
      setRouteDetails(result.data);
      toast({
        title: "Route found!",
        description: "We've found the optimal route for your trip.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: result.error || "There was a problem finding a route.",
      });
    }
  }

  return (
    <div className="space-y-4">
        <Card>
        <CardHeader>
            <CardTitle className="font-headline text-lg flex items-center gap-2">
            <MapPinned className="h-5 w-5" />
            <span>Book a Ride</span>
            </CardTitle>
        </CardHeader>
        <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                control={form.control}
                name="pickupLocation"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Pickup Location</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Central Park, New York" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="dropLocation"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Drop-off Location</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Times Square, New York" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={loading}>
                {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Search className="mr-2 h-4 w-4" />
                )}
                Find Best Route
                </Button>
            </form>
            </Form>
        </CardContent>
        </Card>
        <RouteDetails details={routeDetails} loading={loading} />
    </div>
  );
}

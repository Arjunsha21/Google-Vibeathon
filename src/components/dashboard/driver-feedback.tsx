'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export function DriverFeedback() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-headline text-lg">Rate Your Ride</CardTitle>
        <CardDescription>How was your trip with John Doe?</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
            <div className='flex items-center gap-3'>
                <Avatar>
                    <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="driver portrait" />
                    <AvatarFallback><User /></AvatarFallback>
                </Avatar>
                <div>
                    <p className='font-semibold'>John Doe</p>
                    <p className='text-sm text-muted-foreground'>Toyota Prius - ABC-123</p>
                </div>
            </div>
            <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    aria-label={`Rate ${star} out of 5 stars`}
                    className="p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                    <Star
                        className={cn(
                        'h-6 w-6 transition-colors',
                        (hoverRating || rating) >= star
                            ? 'text-accent fill-accent'
                            : 'text-muted-foreground/50'
                        )}
                    />
                    </button>
                ))}
            </div>
        </div>
        <Textarea placeholder="Leave a comment..." />
        <Button className="w-full bg-primary hover:bg-primary/90">Submit Feedback</Button>
      </CardContent>
    </Card>
  );
}

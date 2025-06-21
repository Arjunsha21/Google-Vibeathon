import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '../ui/separator';

const transactions = [
  {
    type: 'ride',
    amount: -12.50,
    description: 'Ride to Downtown',
    date: 'June 23, 2024',
  },
  {
    type: 'topup',
    amount: 50.00,
    description: 'Added funds',
    date: 'June 22, 2024',
  },
  {
    type: 'ride',
    amount: -8.75,
    description: 'Ride to Airport',
    date: 'June 21, 2024',
  },
];

export function Wallet() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-lg flex items-center gap-2">
          <WalletIcon className="h-5 w-5" />
          <span>Digital Wallet</span>
        </CardTitle>
        <CardDescription>Your current balance and recent activity.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 rounded-lg bg-primary/10 flex items-center justify-between">
            <div>
                <p className="text-sm text-primary">Available Balance</p>
                <p className="text-3xl font-bold font-headline text-primary">$137.50</p>
            </div>
          <Button>Add Money</Button>
        </div>
        <div>
            <h4 className='text-sm font-medium mb-2'>Recent Transactions</h4>
            <ul className="space-y-2">
            {transactions.map((tx, index) => (
                <li key={index}>
                    <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${tx.type === 'ride' ? 'bg-destructive/10' : 'bg-green-500/10'}`}>
                            {tx.type === 'ride' ? <ArrowUpRight className="h-4 w-4 text-destructive" /> : <ArrowDownLeft className="h-4 w-4 text-green-500" />}
                        </div>
                        <div>
                            <p className="font-semibold">{tx.description}</p>
                            <p className="text-xs text-muted-foreground">{tx.date}</p>
                        </div>
                        </div>
                        <p className={`font-semibold ${tx.type === 'ride' ? 'text-destructive' : 'text-green-500'}`}>
                        {tx.amount < 0 ? `-` : `+`}${Math.abs(tx.amount).toFixed(2)}
                        </p>
                    </div>
                    {index < transactions.length -1 && <Separator />}
                </li>
            ))}
            </ul>
        </div>
      </CardContent>
    </Card>
  );
}

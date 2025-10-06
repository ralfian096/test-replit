import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  amount: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  iconColor?: string;
}

export function StatCard({ title, amount, icon: Icon, trend, iconColor }: StatCardProps) {
  return (
    <Card data-testid={`card-stat-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          {title}
        </p>
        <div className={`rounded-md p-2 ${iconColor || 'bg-primary/10'}`}>
          <Icon className={`h-4 w-4 ${iconColor ? '' : 'text-primary'}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold tabular-nums" data-testid={`text-amount-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {amount}
        </div>
        {trend && (
          <p className={`text-xs ${trend.isPositive ? 'text-chart-1' : 'text-chart-3'} tabular-nums mt-1`}>
            {trend.isPositive ? '↑' : '↓'} {trend.value}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

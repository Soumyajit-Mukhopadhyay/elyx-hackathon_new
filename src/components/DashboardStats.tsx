import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Heart, Target, TrendingUp, Calendar } from 'lucide-react';

interface DashboardStatsProps {
  profile: any;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ profile }) => {
  const stats = [
    {
      title: 'Health Score',
      value: profile?.current_health_score || 87,
      unit: '%',
      icon: Heart,
      color: 'text-health-excellent',
      bgColor: 'bg-health-excellent/10'
    },
    {
      title: 'Plan Adherence',
      value: profile?.plan_adherence_rate || 92.5,
      unit: '%',
      icon: Target,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Active Interventions',
      value: 8,
      unit: '',
      icon: TrendingUp,
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      title: 'Days to Next Test',
      value: 45,
      unit: '',
      icon: Calendar,
      color: 'text-health-warning',
      bgColor: 'bg-health-warning/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`${stat.bgColor} p-2 rounded-lg`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {stat.value}{stat.unit}
              </div>
              {stat.title.includes('Score') || stat.title.includes('Adherence') ? (
                <Progress value={stat.value} className="mt-2" />
              ) : null}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardStats;
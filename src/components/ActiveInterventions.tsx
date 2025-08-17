import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Pill, Dumbbell, Apple, Brain } from 'lucide-react';

const ActiveInterventions: React.FC = () => {
  const interventions = [
    {
      name: 'Magnesium Supplement',
      type: 'medication',
      adherence: 95,
      status: 'active',
      icon: Pill,
      color: 'text-primary'
    },
    {
      name: 'Morning Cardio',
      type: 'exercise',
      adherence: 88,
      status: 'active',
      icon: Dumbbell,
      color: 'text-accent'
    },
    {
      name: 'Mediterranean Diet',
      type: 'nutrition',
      adherence: 92,
      status: 'active',
      icon: Apple,
      color: 'text-health-good'
    },
    {
      name: 'Meditation Practice',
      type: 'therapy',
      adherence: 75,
      status: 'needs_attention',
      icon: Brain,
      color: 'text-health-warning'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-health-excellent text-white">Active</Badge>;
      case 'needs_attention':
        return <Badge variant="secondary" className="bg-health-warning text-white">Needs Attention</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Active Interventions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {interventions.map((intervention, index) => {
            const Icon = intervention.icon;
            return (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border bg-card/50">
                <div className="flex items-center space-x-3">
                  <Icon className={`h-5 w-5 ${intervention.color}`} />
                  <div>
                    <p className="font-medium text-foreground">{intervention.name}</p>
                    <p className="text-sm text-muted-foreground capitalize">{intervention.type}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{intervention.adherence}%</p>
                    <Progress value={intervention.adherence} className="w-16 h-2" />
                  </div>
                  {getStatusBadge(intervention.status)}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveInterventions;
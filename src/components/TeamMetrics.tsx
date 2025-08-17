import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const TeamMetrics: React.FC = () => {
  const metrics = [
    { name: 'Ruby Chen', role: 'Concierge', hours: 45.2, utilization: 94, responseTime: 15 },
    { name: 'Dr. Warren Kim', role: 'Medical Strategist', hours: 38.5, utilization: 88, responseTime: 25 },
    { name: 'Advik Sharma', role: 'Performance Scientist', hours: 42.1, utilization: 91, responseTime: 18 },
    { name: 'Carla Rodriguez', role: 'Nutritionist', hours: 35.8, utilization: 85, responseTime: 22 },
    { name: 'Rachel Thompson', role: 'Physiotherapist', hours: 40.3, utilization: 89, responseTime: 20 },
    { name: 'Neel Patel', role: 'Relationship Manager', hours: 32.5, utilization: 78, responseTime: 30 }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.map((member, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
              <div className="mt-2 space-y-2">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Hours: {member.hours}</span>
                    <span>{member.utilization}%</span>
                  </div>
                  <Progress value={member.utilization} className="h-2" />
                </div>
                <p className="text-xs text-muted-foreground">Avg Response: {member.responseTime}min</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamMetrics;
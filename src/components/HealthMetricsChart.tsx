import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const HealthMetricsChart: React.FC = () => {
  const data = [
    { metric: 'HRV', current: 52, target: 55, baseline: 45 },
    { metric: 'Sleep', current: 8.1, target: 8.5, baseline: 7.2 },
    { metric: 'Stress', current: 3.2, target: 2.5, baseline: 4.1 },
    { metric: 'VO2 Max', current: 45, target: 50, baseline: 42 }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Metrics Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="metric" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="baseline" fill="hsl(var(--muted))" name="Baseline" />
              <Bar dataKey="current" fill="hsl(var(--primary))" name="Current" />
              <Bar dataKey="target" fill="hsl(var(--accent))" name="Target" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthMetricsChart;
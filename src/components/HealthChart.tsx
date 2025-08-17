import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const HealthChart: React.FC = () => {
  const data = [
    { month: 'Jan', score: 82, hrv: 45, sleep: 7.2 },
    { month: 'Feb', score: 84, hrv: 47, sleep: 7.5 },
    { month: 'Mar', score: 86, hrv: 49, sleep: 7.8 },
    { month: 'Apr', score: 85, hrv: 48, sleep: 7.4 },
    { month: 'May', score: 87, hrv: 51, sleep: 8.1 },
    { month: 'Jun', score: 89, hrv: 53, sleep: 8.0 },
    { month: 'Jul', score: 87, hrv: 52, sleep: 7.9 },
    { month: 'Aug', score: 90, hrv: 55, sleep: 8.2 },
  ];

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Health Metrics Trend
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                name="Health Score"
              />
              <Line 
                type="monotone" 
                dataKey="hrv" 
                stroke="hsl(var(--accent))" 
                strokeWidth={2}
                name="HRV"
              />
              <Line 
                type="monotone" 
                dataKey="sleep" 
                stroke="hsl(var(--health-good))" 
                strokeWidth={2}
                name="Sleep Hours"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthChart;
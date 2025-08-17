import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DecisionRationale: React.FC = () => {
  const decisions = [
    {
      decision: 'Magnesium Supplement',
      rationale: 'Based on sleep quality analysis and stress indicators from wearable data',
      date: 'May 15, 2025'
    },
    {
      decision: 'Cardio Intensity Adjustment',
      rationale: 'Heart rate variability trends suggested need for modified training zones',
      date: 'May 10, 2025'
    },
    {
      decision: 'Nutrition Plan Update',
      rationale: 'Food log analysis revealed inflammation markers correlation with specific foods',
      date: 'May 5, 2025'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Decision Rationale</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {decisions.map((item, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <h3 className="font-medium text-sm">{item.decision}</h3>
              <p className="text-xs text-muted-foreground mt-1">{item.rationale}</p>
              <p className="text-xs text-muted-foreground mt-2">{item.date}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DecisionRationale;
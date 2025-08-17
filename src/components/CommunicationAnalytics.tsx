import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CommunicationAnalytics: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Communication Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 border rounded">
              <h3 className="text-2xl font-bold text-primary">2,847</h3>
              <p className="text-sm text-muted-foreground">Total Messages</p>
            </div>
            <div className="p-4 border rounded">
              <h3 className="text-2xl font-bold text-accent">94.2%</h3>
              <p className="text-sm text-muted-foreground">Response Rate</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Avg Response Time</span>
              <span className="text-sm font-medium">22 minutes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Member Satisfaction</span>
              <span className="text-sm font-medium">4.8/5.0</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunicationAnalytics;
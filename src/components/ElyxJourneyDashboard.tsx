// src/components/ElyxJourneyDashboard.tsx
import React from 'react';
import ChatInterface from './ChatInterface';
import DecisionJourney from './DecisionJourney';
import JourneyTimeline from './JourneyTimeline';
import DecisionRationale from './DecisionRationale';
import HealthChart from './HealthChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ElyxJourneyDashboard: React.FC = () => {
  return (
    <div className="space-y-6 p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Member Chat & Decisions</CardTitle>
            </CardHeader>
            <CardContent>
              <ChatInterface />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Decision Journey</CardTitle>
            </CardHeader>
            <CardContent>
              <DecisionJourney />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <JourneyTimeline />
        </div>
        <div>
          <DecisionRationale />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HealthChart />
        <Card>
          <CardHeader>
            <CardTitle>Progress Summary / Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Use this area to place KPI tiles (ApoB, LDL-C, hsCRP, HRV, Sleep, BP) and charts. The HealthChart component provides a sample trend visual — replace data source with your weekly metrics table or public JSON.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ElyxJourneyDashboard;

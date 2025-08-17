import React from 'react';
import Layout from '@/components/Layout';
import JourneyTimeline from '@/components/JourneyTimeline';
import DecisionRationale from '@/components/DecisionRationale';
import DecisionJourney from '@/components/DecisionJourney';
import EightMonthJourney from '@/components/EightMonthJourney';

const Journey: React.FC = () => {
  return (
    <Layout>
      <div className="p-6 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Health Journey</h1>
          <p className="text-muted-foreground mt-2">
            Track your complete health journey with episode-based insights and decision rationale
          </p>
        </div>

        <EightMonthJourney />
        
        <DecisionJourney />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <JourneyTimeline />
          </div>
          <div>
            <DecisionRationale />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Journey;
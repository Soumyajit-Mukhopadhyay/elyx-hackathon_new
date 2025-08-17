import React from 'react';
import Layout from '@/components/Layout';
import TeamMetrics from '@/components/TeamMetrics';
import HealthMetricsChart from '@/components/HealthMetricsChart';
import CommunicationAnalytics from '@/components/CommunicationAnalytics';

const Analytics: React.FC = () => {
  return (
    <Layout>
      <div className="p-6 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive analytics for health metrics, team performance, and communication insights
          </p>
        </div>

        <div className="space-y-6">
          <TeamMetrics />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <HealthMetricsChart />
            <CommunicationAnalytics />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;
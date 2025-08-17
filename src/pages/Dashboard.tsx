import React from 'react';
import Layout from '@/components/Layout';
import { useProfile } from '@/hooks/useProfile';
import DashboardStats from '@/components/DashboardStats';
import HealthChart from '@/components/HealthChart';
import ActiveInterventions from '@/components/ActiveInterventions';
import RecentActivity from '@/components/RecentActivity';
import { Loader2 } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { profile, loading } = useProfile();

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {profile?.preferred_name || 'Member'}
          </h1>
          <p className="text-muted-foreground mt-2">
            Here's your health overview and progress summary
          </p>
        </div>

        {/* Stats Grid */}
        <DashboardStats profile={profile} />

        {/* Charts and Data */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <HealthChart />
          <ActiveInterventions />
        </div>

        {/* Recent Activity */}
        <RecentActivity />
      </div>
    </Layout>
  );
};

export default Dashboard;
import React from 'react';
import Layout from '@/components/Layout';
import ChatInterface from '@/components/ChatInterface';
import TeamMemberList from '@/components/TeamMemberList';

const Communications: React.FC = () => {
  return (
    <Layout>
      <div className="h-[calc(100vh-4rem)] flex">
        {/* Team Members Sidebar */}
        <div className="w-80 border-r border-border bg-card/50">
          <TeamMemberList />
        </div>
        
        {/* Chat Interface */}
        <div className="flex-1">
          <ChatInterface />
        </div>
      </div>
    </Layout>
  );
};

export default Communications;
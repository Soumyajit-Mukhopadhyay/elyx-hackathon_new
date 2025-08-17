import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const JourneyTimeline: React.FC = () => {
  const episodes = [
    { id: 1, title: 'Initial Health Inquiry', date: 'Jan 2025', status: 'completed', outcome: 'Information Provided' },
    { id: 2, title: 'Data Gathering & Workout Plan', date: 'Feb 2025', status: 'completed', outcome: 'Plan in Motion' },
    { id: 3, title: 'Member Feedback & Improvements', date: 'Mar 2025', status: 'completed', outcome: 'Service Enhanced' },
    { id: 4, title: 'Health Optimization Plan', date: 'Apr 2025', status: 'in_progress', outcome: 'Ongoing Adjustments' },
    { id: 5, title: 'Medical Coordination', date: 'May 2025', status: 'scheduled', outcome: 'Planned' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Journey Episodes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {episodes.map((episode) => (
            <div key={episode.id} className="flex items-center space-x-4 p-4 border rounded-lg">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div className="flex-1">
                <h3 className="font-medium">{episode.title}</h3>
                <p className="text-sm text-muted-foreground">{episode.date}</p>
              </div>
              <div className="text-right">
                <Badge variant={episode.status === 'completed' ? 'default' : 'secondary'}>
                  {episode.status}
                </Badge>
                <p className="text-sm text-muted-foreground mt-1">{episode.outcome}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default JourneyTimeline;
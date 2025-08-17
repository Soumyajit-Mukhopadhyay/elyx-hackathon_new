import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

const RecentActivity: React.FC = () => {
  const activities = [
    {
      id: 1,
      type: 'communication',
      message: 'Dr. Warren reviewed your latest blood panel results',
      time: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      user: 'Dr. Warren Kim',
      userInitials: 'DW',
      priority: 'high'
    },
    {
      id: 2,
      type: 'intervention',
      message: 'Exercise plan updated - New cardio routine added',
      time: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      user: 'Rachel Thompson',
      userInitials: 'RT',
      priority: 'normal'
    },
    {
      id: 3,
      type: 'test',
      message: 'Reminder: Full diagnostic panel scheduled for next week',
      time: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      user: 'Ruby Chen',
      userInitials: 'RC',
      priority: 'normal'
    },
    {
      id: 4,
      type: 'communication',
      message: 'Nutrition plan adjustment based on food log analysis',
      time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      user: 'Carla Rodriguez',
      userInitials: 'CR',
      priority: 'normal'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'communication':
        return '💬';
      case 'intervention':
        return '🎯';
      case 'test':
        return '🧪';
      default:
        return '📝';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'normal':
        return <Badge variant="secondary">Normal</Badge>;
      default:
        return <Badge variant="outline">Low</Badge>;
    }
  };

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg border border-border bg-card/50">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{getActivityIcon(activity.type)}</span>
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">{activity.userInitials}</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{activity.message}</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-muted-foreground">
                    {activity.user} • {formatDistanceToNow(activity.time, { addSuffix: true })}
                  </p>
                  {getPriorityBadge(activity.priority)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
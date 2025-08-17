import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { User, MessageCircle, Clock } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialization: string;
  response_time_avg: number;
  hours_worked: number;
}

const TeamMemberList: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const { data, error } = await supabase
          .from('team_members')
          .select('*')
          .order('name');

        if (error) throw error;
        setTeamMembers(data || []);
      } catch (error) {
        console.error('Error fetching team members:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  const getRoleColor = (role: string) => {
    const colors = {
      'Concierge': 'bg-primary/10 text-primary',
      'Medical Strategist': 'bg-health-critical/10 text-health-critical',
      'Performance Scientist': 'bg-accent/10 text-accent',
      'Nutritionist': 'bg-health-good/10 text-health-good',
      'Physiotherapist': 'bg-health-warning/10 text-health-warning',
      'Relationship Manager': 'bg-primary-variant/10 text-primary-variant'
    };
    return colors[role as keyof typeof colors] || 'bg-muted text-muted-foreground';
  };

  const getAvailabilityStatus = (responseTime: number) => {
    if (responseTime < 30) return { status: 'Online', color: 'bg-health-excellent' };
    if (responseTime < 120) return { status: 'Available', color: 'bg-health-good' };
    return { status: 'Busy', color: 'bg-health-warning' };
  };

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-16 bg-muted rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <CardHeader className="border-b border-border">
        <CardTitle className="flex items-center space-x-2">
          <User className="h-5 w-5" />
          <span>Your Care Team</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 space-y-3">
        {teamMembers.map((member) => {
          const availability = getAvailabilityStatus(member.response_time_avg);
          
          return (
            <div
              key={member.id}
              className="flex items-center space-x-3 p-3 rounded-lg border border-border bg-card/50 hover:bg-card cursor-pointer transition-colors"
            >
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="text-sm">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${availability.color} rounded-full border-2 border-background`}></div>
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{member.name}</p>
                <Badge variant="outline" className={`text-xs ${getRoleColor(member.role)}`}>
                  {member.role}
                </Badge>
                <div className="flex items-center space-x-4 mt-1">
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{member.response_time_avg}m avg</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <MessageCircle className="h-3 w-3" />
                    <span>{availability.status}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </div>
  );
};

export default TeamMemberList;
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, Activity, Pill, Stethoscope, TrendingUp } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';
import { supabase } from '@/integrations/supabase/client';

interface Decision {
  id: string;
  decision_type: string;
  decision_title: string;
  rationale: string;
  data_points: any;
  communication_refs: any;
  team_member_responsible: string;
  created_at: string;
}

const DecisionJourney: React.FC = () => {
  const { profile } = useProfile();
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [selectedDecision, setSelectedDecision] = useState<Decision | null>(null);

  useEffect(() => {
    loadDecisions();
  }, [profile]);

  const loadDecisions = async () => {
    if (!profile) return;

    try {
      const { data, error } = await supabase
        .from('decision_tracking')
        .select('*')
        .eq('member_id', profile.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDecisions((data || []) as Decision[]);
    } catch (error) {
      console.error('Error loading decisions:', error);
    }
  };

  const getDecisionIcon = (type: string) => {
    switch (type) {
      case 'medication':
        return <Pill className="h-4 w-4" />;
      case 'therapy':
        return <Stethoscope className="h-4 w-4" />;
      case 'intervention':
        return <Activity className="h-4 w-4" />;
      case 'test':
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <CalendarDays className="h-4 w-4" />;
    }
  };

  const getDecisionColor = (type: string) => {
    switch (type) {
      case 'medication':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'therapy':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'intervention':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'test':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Decision Journey & Rationale
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Complete transparency into why each decision was made for your health optimization
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Decisions Timeline */}
            <div className="space-y-4">
              <h3 className="font-medium">Recent Decisions</h3>
              {decisions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Your decision journey will appear here as our team makes recommendations.</p>
                </div>
              ) : (
                decisions.map((decision) => (
                  <Card 
                    key={decision.id} 
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedDecision?.id === decision.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedDecision(decision)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            {getDecisionIcon(decision.decision_type)}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{decision.decision_title}</h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              By {decision.team_member_responsible}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(decision.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Badge className={getDecisionColor(decision.decision_type)}>
                          {decision.decision_type}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Decision Details */}
            <div className="space-y-4">
              <h3 className="font-medium">Decision Details</h3>
              {selectedDecision ? (
                <Card>
                  <CardContent className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{selectedDecision.decision_title}</h4>
                      <Badge className={getDecisionColor(selectedDecision.decision_type)}>
                        {selectedDecision.decision_type}
                      </Badge>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium mb-2">Rationale</h5>
                      <p className="text-sm text-muted-foreground">
                        {selectedDecision.rationale}
                      </p>
                    </div>

                    <div>
                      <h5 className="text-sm font-medium mb-2">Responsible Team Member</h5>
                      <p className="text-sm">{selectedDecision.team_member_responsible}</p>
                    </div>

                    {selectedDecision.data_points && Object.keys(selectedDecision.data_points).length > 0 && (
                      <div>
                        <h5 className="text-sm font-medium mb-2">Supporting Data</h5>
                        <div className="text-xs bg-muted p-3 rounded">
                          <pre className="whitespace-pre-wrap">
                            {JSON.stringify(selectedDecision.data_points, null, 2)}
                          </pre>
                        </div>
                      </div>
                    )}

                    {selectedDecision.communication_refs && Array.isArray(selectedDecision.communication_refs) && selectedDecision.communication_refs.length > 0 && (
                      <div>
                        <h5 className="text-sm font-medium mb-2">Related Communications</h5>
                        <p className="text-xs text-muted-foreground">
                          {selectedDecision.communication_refs.length} related message(s)
                        </p>
                      </div>
                    )}

                    <div className="text-xs text-muted-foreground pt-2 border-t">
                      Decision made on {new Date(selectedDecision.created_at).toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground">
                      Select a decision from the timeline to view detailed rationale and supporting data.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DecisionJourney;
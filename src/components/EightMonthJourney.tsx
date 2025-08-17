import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CalendarDays, TrendingUp, Activity, Heart, Brain, Shield } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';

interface MonthData {
  month: number;
  monthName: string;
  healthScore: number;
  keyMilestones: string[];
  interventions: string[];
  testPanels: string[];
  travelWeeks: number[];
  adherenceRate: number;
  focusAreas: string[];
}

const EightMonthJourney: React.FC = () => {
  const { profile } = useProfile();
  const [selectedMonth, setSelectedMonth] = useState<number>(1);

  // Simulated 8-month journey data for Rohan Patel
  const journeyData: MonthData[] = [
    {
      month: 1,
      monthName: 'January 2025',
      healthScore: 72,
      keyMilestones: [
        'Initial comprehensive health assessment',
        'Baseline wearable data collection (Garmin)',
        'POTS/Long COVID evaluation with Dr. Warren'
      ],
      interventions: [
        'Magnesium supplement (Dr. Warren)',
        'Modified cardio zones (Rachel)',
        'Travel nutrition plan (Carla)'
      ],
      testPanels: ['Comprehensive Health Panel', 'Autonomic Function Tests'],
      travelWeeks: [2, 4],
      adherenceRate: 65,
      focusAreas: ['Autonomic Dysfunction', 'Baseline Establishment']
    },
    {
      month: 2,
      monthName: 'February 2025',
      healthScore: 75,
      keyMilestones: [
        'HRV patterns stabilization',
        'Improved sleep quality metrics',
        'Travel protocol optimization'
      ],
      interventions: [
        'Adjusted supplement timing (Carla)',
        'Zone 2 cardio protocol (Rachel)',
        'Stress management techniques (Advik)'
      ],
      testPanels: [],
      travelWeeks: [1, 3],
      adherenceRate: 72,
      focusAreas: ['Recovery Optimization', 'Travel Adaptation']
    },
    {
      month: 3,
      monthName: 'March 2025',
      healthScore: 78,
      keyMilestones: [
        'First quarterly comprehensive review',
        'Cognitive function baseline established',
        'Family history risk stratification'
      ],
      interventions: [
        'Omega-3 supplementation (Dr. Warren)',
        'Cognitive training protocol (Advik)',
        'Anti-inflammatory diet (Carla)'
      ],
      testPanels: ['Quarterly Health Panel', 'Cognitive Assessment'],
      travelWeeks: [2],
      adherenceRate: 78,
      focusAreas: ['Cognitive Enhancement', 'Heart Disease Prevention']
    },
    {
      month: 4,
      monthName: 'April 2025',
      healthScore: 81,
      keyMilestones: [
        'Stable cardiovascular markers',
        'Enhanced work performance metrics',
        'Optimized morning routine'
      ],
      interventions: [
        'Advanced HRV training (Advik)',
        'Strength training progression (Rachel)',
        'Intermittent fasting protocol (Carla)'
      ],
      testPanels: [],
      travelWeeks: [1, 4],
      adherenceRate: 85,
      focusAreas: ['Performance Optimization', 'Routine Refinement']
    },
    {
      month: 5,
      monthName: 'May 2025',
      healthScore: 84,
      keyMilestones: [
        'Peak HRV consistency achieved',
        'Stress resilience improvement',
        'Family support system integration'
      ],
      interventions: [
        'Advanced recovery protocols (Rachel)',
        'Personalized nutrition timing (Carla)',
        'Family health education (Ruby)'
      ],
      testPanels: [],
      travelWeeks: [2, 3],
      adherenceRate: 82,
      focusAreas: ['Stress Resilience', 'Family Integration']
    },
    {
      month: 6,
      monthName: 'June 2025',
      healthScore: 87,
      keyMilestones: [
        'Cognitive function goals achieved',
        'Optimal biomarker ranges',
        'Second quarterly review'
      ],
      interventions: [
        'Maintenance protocol optimization (Dr. Warren)',
        'Advanced movement patterns (Rachel)',
        'Longevity-focused nutrition (Carla)'
      ],
      testPanels: ['Quarterly Health Panel', 'Advanced Cognitive Tests'],
      travelWeeks: [1],
      adherenceRate: 88,
      focusAreas: ['Goal Achievement', 'Protocol Refinement']
    },
    {
      month: 7,
      monthName: 'July 2025',
      healthScore: 89,
      keyMilestones: [
        'Sustained high performance',
        'Travel resilience mastery',
        'Long-term habit formation'
      ],
      interventions: [
        'Performance maintenance (Advik)',
        'Travel optimization mastery (Ruby)',
        'Sustainable lifestyle design (Neel)'
      ],
      testPanels: [],
      travelWeeks: [2, 4],
      adherenceRate: 90,
      focusAreas: ['Sustainability', 'Mastery']
    },
    {
      month: 8,
      monthName: 'August 2025',
      healthScore: 92,
      keyMilestones: [
        'All primary goals achieved',
        'Independent protocol management',
        'Long-term strategy established'
      ],
      interventions: [
        'Transition to maintenance (Dr. Warren)',
        'Self-directed optimization (Neel)',
        'Future planning protocol (Ruby)'
      ],
      testPanels: ['Comprehensive Final Assessment'],
      travelWeeks: [1, 3],
      adherenceRate: 92,
      focusAreas: ['Independence', 'Long-term Success']
    }
  ];

  const currentMonthData = journeyData[selectedMonth - 1];

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (score: number) => {
    if (score >= 85) return 'bg-green-500';
    if (score >= 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5" />
            8-Month Health Optimization Journey
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {profile?.preferred_name}'s complete transformation journey with AI-driven insights and decision tracking
          </p>
        </CardHeader>
        <CardContent>
          {/* Month Selection */}
          <div className="flex flex-wrap gap-2 mb-6">
            {journeyData.map((month) => (
              <Button
                key={month.month}
                variant={selectedMonth === month.month ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedMonth(month.month)}
                className="text-xs"
              >
                Month {month.month}
              </Button>
            ))}
          </div>

          {/* Health Score Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">Health Score Progression</h3>
              <span className="text-sm text-muted-foreground">Target: 87+ by Month 6</span>
            </div>
            <div className="flex items-center gap-2">
              {journeyData.map((month, index) => (
                <div key={month.month} className="flex-1">
                  <div className="text-xs text-center mb-1">M{month.month}</div>
                  <Progress 
                    value={month.healthScore} 
                    className="h-2"
                  />
                  <div className={`text-xs text-center mt-1 font-medium ${getScoreColor(month.healthScore)}`}>
                    {month.healthScore}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Current Month Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{currentMonthData.monthName}</CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Health Score:</span>
                    <span className={`text-xl font-bold ${getScoreColor(currentMonthData.healthScore)}`}>
                      {currentMonthData.healthScore}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Key Milestones
                    </h4>
                    <ul className="space-y-1">
                      {currentMonthData.keyMilestones.map((milestone, index) => (
                        <li key={index} className="text-sm text-muted-foreground">• {milestone}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      Active Interventions
                    </h4>
                    <ul className="space-y-1">
                      {currentMonthData.interventions.map((intervention, index) => (
                        <li key={index} className="text-sm text-muted-foreground">• {intervention}</li>
                      ))}
                    </ul>
                  </div>

                  {currentMonthData.testPanels.length > 0 && (
                    <div>
                      <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Diagnostic Tests
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {currentMonthData.testPanels.map((test, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {test}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Monthly Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Plan Adherence</span>
                      <span className="text-sm font-medium">{currentMonthData.adherenceRate}%</span>
                    </div>
                    <Progress value={currentMonthData.adherenceRate} className="h-2" />
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">Travel Schedule</h4>
                    <p className="text-sm text-muted-foreground">
                      Weeks {currentMonthData.travelWeeks.join(', ')} - Business travel
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">Focus Areas</h4>
                    <div className="flex flex-wrap gap-1">
                      {currentMonthData.focusAreas.map((area, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-500" />
                      Primary Goals Progress
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Heart Disease Risk Reduction</span>
                        <span className="font-medium">{Math.min(100, (currentMonthData.healthScore - 70) * 3)}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Cognitive Enhancement</span>
                        <span className="font-medium">{selectedMonth >= 6 ? 100 : Math.min(100, (currentMonthData.healthScore - 70) * 2.5)}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Health Screening Implementation</span>
                        <span className="font-medium">{selectedMonth >= 3 ? 100 : 0}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EightMonthJourney;
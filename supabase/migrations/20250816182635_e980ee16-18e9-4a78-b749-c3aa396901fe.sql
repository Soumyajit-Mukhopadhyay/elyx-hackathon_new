-- Create enhanced communications table for AI team members
ALTER TABLE communications 
ADD COLUMN team_member_name TEXT,
ADD COLUMN team_member_role TEXT,
ADD COLUMN response_context JSONB DEFAULT '{}',
ADD COLUMN decision_rationale TEXT,
ADD COLUMN related_intervention_id UUID,
ADD COLUMN communication_thread_id UUID;

-- Add indexes for better performance
CREATE INDEX idx_communications_thread ON communications(communication_thread_id);
CREATE INDEX idx_communications_member_team ON communications(member_id, team_member_name);

-- Create decision tracking table
CREATE TABLE decision_tracking (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  member_id UUID NOT NULL,
  decision_type TEXT NOT NULL, -- 'medication', 'therapy', 'intervention', 'test'
  decision_title TEXT NOT NULL,
  rationale TEXT NOT NULL,
  data_points JSONB DEFAULT '{}', -- wearable data, lab results that influenced decision
  communication_refs JSONB DEFAULT '[]', -- references to communications that led to decision
  team_member_responsible TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE decision_tracking ENABLE ROW LEVEL SECURITY;

-- Create policies for decision tracking
CREATE POLICY "Users can view own decisions" 
ON decision_tracking 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM member_profiles 
  WHERE member_profiles.id = decision_tracking.member_id 
  AND member_profiles.user_id = auth.uid()
));

CREATE POLICY "Users can insert own decisions" 
ON decision_tracking 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM member_profiles 
  WHERE member_profiles.id = decision_tracking.member_id 
  AND member_profiles.user_id = auth.uid()
));

-- Create trigger for decision tracking timestamps
CREATE TRIGGER update_decision_tracking_updated_at
BEFORE UPDATE ON decision_tracking
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create member journey episodes enhancement
ALTER TABLE journey_episodes 
ADD COLUMN ai_insights JSONB DEFAULT '{}',
ADD COLUMN key_decisions JSONB DEFAULT '[]',
ADD COLUMN health_score_change NUMERIC DEFAULT 0;

-- Insert sample team members
INSERT INTO team_members (name, role, specialization, description, avatar_url) VALUES
('Ruby', 'Concierge', 'Coordination & Logistics', 'Primary point of contact for all logistics. Master of coordination, scheduling, reminders, and follow-ups.', '/api/placeholder/100/100'),
('Dr. Warren', 'Medical Strategist', 'Clinical Medicine', 'Team physician and final clinical authority. Interprets lab results, analyzes medical records, and sets medical direction.', '/api/placeholder/100/100'),
('Advik', 'Performance Scientist', 'Data Analysis', 'Data analysis expert specializing in wearable data, sleep, recovery, HRV, and stress patterns.', '/api/placeholder/100/100'),
('Carla', 'Nutritionist', 'Nutrition & Supplements', 'Owner of the Fuel pillar. Designs nutrition plans, analyzes food logs and CGM data.', '/api/placeholder/100/100'),
('Rachel', 'Physiotherapist', 'Movement & Exercise', 'Owner of the Chassis. Manages strength training, mobility, injury rehabilitation, and exercise programming.', '/api/placeholder/100/100'),
('Neel', 'Concierge Lead', 'Strategy & Relationships', 'Senior leader for strategic reviews, client relationships, and connecting day-to-day work to long-term goals.', '/api/placeholder/100/100')
ON CONFLICT (name) DO NOTHING;
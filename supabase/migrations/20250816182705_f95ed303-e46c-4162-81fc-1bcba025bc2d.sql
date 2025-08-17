-- Create enhanced communications table for AI team members
ALTER TABLE communications 
ADD COLUMN IF NOT EXISTS team_member_name TEXT,
ADD COLUMN IF NOT EXISTS team_member_role TEXT,
ADD COLUMN IF NOT EXISTS response_context JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS decision_rationale TEXT,
ADD COLUMN IF NOT EXISTS related_intervention_id UUID,
ADD COLUMN IF NOT EXISTS communication_thread_id UUID;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_communications_thread ON communications(communication_thread_id);
CREATE INDEX IF NOT EXISTS idx_communications_member_team ON communications(member_id, team_member_name);

-- Create decision tracking table
CREATE TABLE IF NOT EXISTS decision_tracking (
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
DROP POLICY IF EXISTS "Users can view own decisions" ON decision_tracking;
CREATE POLICY "Users can view own decisions" 
ON decision_tracking 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM member_profiles 
  WHERE member_profiles.id = decision_tracking.member_id 
  AND member_profiles.user_id = auth.uid()
));

DROP POLICY IF EXISTS "Users can insert own decisions" ON decision_tracking;
CREATE POLICY "Users can insert own decisions" 
ON decision_tracking 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM member_profiles 
  WHERE member_profiles.id = decision_tracking.member_id 
  AND member_profiles.user_id = auth.uid()
));

-- Create trigger for decision tracking timestamps
DROP TRIGGER IF EXISTS update_decision_tracking_updated_at ON decision_tracking;
CREATE TRIGGER update_decision_tracking_updated_at
BEFORE UPDATE ON decision_tracking
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create member journey episodes enhancement
ALTER TABLE journey_episodes 
ADD COLUMN IF NOT EXISTS ai_insights JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS key_decisions JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS health_score_change NUMERIC DEFAULT 0;
-- Create comprehensive Elyx healthcare platform database schema

-- Member profiles table
CREATE TABLE public.member_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  preferred_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  gender TEXT NOT NULL,
  primary_residence TEXT NOT NULL,
  occupation TEXT,
  personal_assistant_name TEXT,
  personal_assistant_email TEXT,
  health_goals JSONB DEFAULT '[]'::jsonb,
  success_metrics JSONB DEFAULT '{}'::jsonb,
  personality_assessment JSONB DEFAULT '{}'::jsonb,
  tech_stack JSONB DEFAULT '{}'::jsonb,
  communication_preferences JSONB DEFAULT '{}'::jsonb,
  current_health_score INTEGER DEFAULT 0,
  plan_adherence_rate DECIMAL(5,2) DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Team members table
CREATE TABLE public.team_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  specialization TEXT,
  description TEXT,
  avatar_url TEXT,
  hours_worked DECIMAL(8,2) DEFAULT 0.00,
  response_time_avg INTEGER DEFAULT 0, -- in minutes
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Communications table
CREATE TABLE public.communications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  member_id UUID REFERENCES public.member_profiles(id) ON DELETE CASCADE,
  team_member_id UUID REFERENCES public.team_members(id),
  message_type TEXT NOT NULL DEFAULT 'text', -- text, image, document, report
  content TEXT NOT NULL,
  direction TEXT NOT NULL, -- incoming, outgoing
  category TEXT, -- query, plan_update, intervention, follow_up, report
  attachments JSONB DEFAULT '[]'::jsonb,
  is_read BOOLEAN DEFAULT false,
  priority TEXT DEFAULT 'normal', -- low, normal, high, urgent
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Health interventions table
CREATE TABLE public.health_interventions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  member_id UUID REFERENCES public.member_profiles(id) ON DELETE CASCADE,
  intervention_type TEXT NOT NULL, -- medication, exercise, nutrition, therapy
  name TEXT NOT NULL,
  description TEXT,
  dosage_or_frequency TEXT,
  start_date DATE,
  end_date DATE,
  status TEXT DEFAULT 'active', -- active, completed, paused, discontinued
  adherence_rate DECIMAL(5,2) DEFAULT 0.00,
  decision_rationale TEXT,
  communication_refs JSONB DEFAULT '[]'::jsonb, -- references to communication IDs
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Test panels and results
CREATE TABLE public.test_panels (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  member_id UUID REFERENCES public.member_profiles(id) ON DELETE CASCADE,
  panel_type TEXT NOT NULL, -- full_diagnostic, specific_test
  scheduled_date DATE NOT NULL,
  completed_date DATE,
  status TEXT DEFAULT 'scheduled', -- scheduled, in_progress, completed, cancelled
  results JSONB DEFAULT '{}'::jsonb,
  recommendations JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Journey episodes table
CREATE TABLE public.journey_episodes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  member_id UUID REFERENCES public.member_profiles(id) ON DELETE CASCADE,
  episode_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  triggered_by TEXT, -- member, team, system
  friction_points JSONB DEFAULT '[]'::jsonb,
  outcome TEXT,
  metrics JSONB DEFAULT '{}'::jsonb,
  communication_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Health metrics tracking
CREATE TABLE public.health_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  member_id UUID REFERENCES public.member_profiles(id) ON DELETE CASCADE,
  metric_type TEXT NOT NULL, -- heart_rate, blood_pressure, sleep_score, etc.
  value DECIMAL(10,4) NOT NULL,
  unit TEXT,
  recorded_date DATE NOT NULL,
  source TEXT, -- garmin, oura, manual, test_result
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Wearable data
CREATE TABLE public.wearable_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  member_id UUID REFERENCES public.member_profiles(id) ON DELETE CASCADE,
  device_type TEXT NOT NULL, -- garmin, oura, whoop
  data_type TEXT NOT NULL, -- hrv, sleep, activity, stress
  data_value JSONB NOT NULL,
  recorded_at TIMESTAMP WITH TIME ZONE NOT NULL,
  synced_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.member_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_interventions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_panels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journey_episodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wearable_data ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for member_profiles
CREATE POLICY "Users can view own profile" ON public.member_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON public.member_profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON public.member_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for team_members (viewable by all authenticated users)
CREATE POLICY "Authenticated users can view team members" ON public.team_members
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create RLS policies for communications
CREATE POLICY "Users can view own communications" ON public.communications
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.member_profiles 
      WHERE id = communications.member_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own communications" ON public.communications
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.member_profiles 
      WHERE id = communications.member_id AND user_id = auth.uid()
    )
  );

-- Create similar policies for other tables
CREATE POLICY "Users can view own interventions" ON public.health_interventions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.member_profiles 
      WHERE id = health_interventions.member_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view own test panels" ON public.test_panels
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.member_profiles 
      WHERE id = test_panels.member_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view own journey episodes" ON public.journey_episodes
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.member_profiles 
      WHERE id = journey_episodes.member_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view own health metrics" ON public.health_metrics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.member_profiles 
      WHERE id = health_metrics.member_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view own wearable data" ON public.wearable_data
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.member_profiles 
      WHERE id = wearable_data.member_id AND user_id = auth.uid()
    )
  );

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_member_profiles_updated_at
  BEFORE UPDATE ON public.member_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_team_members_updated_at
  BEFORE UPDATE ON public.team_members
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_health_interventions_updated_at
  BEFORE UPDATE ON public.health_interventions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_test_panels_updated_at
  BEFORE UPDATE ON public.test_panels
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_journey_episodes_updated_at
  BEFORE UPDATE ON public.journey_episodes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample team members
INSERT INTO public.team_members (name, role, specialization, description) VALUES
('Ruby Chen', 'Concierge', 'Logistics & Coordination', 'Primary point of contact for all logistics, scheduling, and coordination'),
('Dr. Warren Kim', 'Medical Strategist', 'Clinical Medicine', 'Team physician and clinical authority for medical strategies'),
('Advik Sharma', 'Performance Scientist', 'Data Analysis', 'Expert in wearable data analysis and performance optimization'),
('Carla Rodriguez', 'Nutritionist', 'Nutrition Science', 'Specialist in nutrition planning and supplement recommendations'),
('Rachel Thompson', 'Physiotherapist', 'Physical Therapy', 'Expert in movement, strength training, and injury rehabilitation'),
('Neel Patel', 'Relationship Manager', 'Strategic Leadership', 'Senior leader for strategic reviews and client relationship management');
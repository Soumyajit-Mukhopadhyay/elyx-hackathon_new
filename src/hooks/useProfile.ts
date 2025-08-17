import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface MemberProfile {
  id: string;
  preferred_name: string;
  date_of_birth?: string;
  gender?: string;
  primary_residence?: string;
  occupation?: string;
  current_health_score: number;
  plan_adherence_rate: number;
  health_goals: any;
  created_at: string;
}

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<MemberProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('member_profiles')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) throw error;

        if (!data) {
          // Create profile if it doesn't exist
          const newProfile = {
            user_id: user.id,
            preferred_name: user.user_metadata?.preferred_name || 'Member',
            occupation: user.user_metadata?.occupation || '',
            primary_residence: 'Singapore',
            gender: 'Male',
            date_of_birth: '1979-03-12',
            current_health_score: 87,
            plan_adherence_rate: 92.5,
            health_goals: [
              'Reduce risk of heart disease',
              'Enhance cognitive function',
              'Implement annual health screenings'
            ]
          };

          const { data: created, error: createError } = await supabase
            .from('member_profiles')
            .insert(newProfile)
            .select()
            .single();

          if (createError) throw createError;
          setProfile(created);
        } else {
          setProfile(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  return { profile, loading, error };
};
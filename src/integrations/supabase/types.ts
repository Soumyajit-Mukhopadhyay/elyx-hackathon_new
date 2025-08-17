export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      communications: {
        Row: {
          attachments: Json | null
          category: string | null
          communication_thread_id: string | null
          content: string
          created_at: string
          decision_rationale: string | null
          direction: string
          id: string
          is_read: boolean | null
          member_id: string | null
          message_type: string
          priority: string | null
          related_intervention_id: string | null
          response_context: Json | null
          team_member_id: string | null
          team_member_name: string | null
          team_member_role: string | null
        }
        Insert: {
          attachments?: Json | null
          category?: string | null
          communication_thread_id?: string | null
          content: string
          created_at?: string
          decision_rationale?: string | null
          direction: string
          id?: string
          is_read?: boolean | null
          member_id?: string | null
          message_type?: string
          priority?: string | null
          related_intervention_id?: string | null
          response_context?: Json | null
          team_member_id?: string | null
          team_member_name?: string | null
          team_member_role?: string | null
        }
        Update: {
          attachments?: Json | null
          category?: string | null
          communication_thread_id?: string | null
          content?: string
          created_at?: string
          decision_rationale?: string | null
          direction?: string
          id?: string
          is_read?: boolean | null
          member_id?: string | null
          message_type?: string
          priority?: string | null
          related_intervention_id?: string | null
          response_context?: Json | null
          team_member_id?: string | null
          team_member_name?: string | null
          team_member_role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "communications_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "member_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "communications_team_member_id_fkey"
            columns: ["team_member_id"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
        ]
      }
      decision_tracking: {
        Row: {
          communication_refs: Json | null
          created_at: string
          data_points: Json | null
          decision_title: string
          decision_type: string
          id: string
          member_id: string
          rationale: string
          team_member_responsible: string
          updated_at: string
        }
        Insert: {
          communication_refs?: Json | null
          created_at?: string
          data_points?: Json | null
          decision_title: string
          decision_type: string
          id?: string
          member_id: string
          rationale: string
          team_member_responsible: string
          updated_at?: string
        }
        Update: {
          communication_refs?: Json | null
          created_at?: string
          data_points?: Json | null
          decision_title?: string
          decision_type?: string
          id?: string
          member_id?: string
          rationale?: string
          team_member_responsible?: string
          updated_at?: string
        }
        Relationships: []
      }
      health_interventions: {
        Row: {
          adherence_rate: number | null
          communication_refs: Json | null
          created_at: string
          decision_rationale: string | null
          description: string | null
          dosage_or_frequency: string | null
          end_date: string | null
          id: string
          intervention_type: string
          member_id: string | null
          name: string
          start_date: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          adherence_rate?: number | null
          communication_refs?: Json | null
          created_at?: string
          decision_rationale?: string | null
          description?: string | null
          dosage_or_frequency?: string | null
          end_date?: string | null
          id?: string
          intervention_type: string
          member_id?: string | null
          name: string
          start_date?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          adherence_rate?: number | null
          communication_refs?: Json | null
          created_at?: string
          decision_rationale?: string | null
          description?: string | null
          dosage_or_frequency?: string | null
          end_date?: string | null
          id?: string
          intervention_type?: string
          member_id?: string | null
          name?: string
          start_date?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "health_interventions_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "member_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      health_metrics: {
        Row: {
          created_at: string
          id: string
          member_id: string | null
          metric_type: string
          recorded_date: string
          source: string | null
          unit: string | null
          value: number
        }
        Insert: {
          created_at?: string
          id?: string
          member_id?: string | null
          metric_type: string
          recorded_date: string
          source?: string | null
          unit?: string | null
          value: number
        }
        Update: {
          created_at?: string
          id?: string
          member_id?: string | null
          metric_type?: string
          recorded_date?: string
          source?: string | null
          unit?: string | null
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "health_metrics_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "member_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      journey_episodes: {
        Row: {
          ai_insights: Json | null
          communication_count: number | null
          created_at: string
          description: string | null
          end_date: string | null
          episode_number: number
          friction_points: Json | null
          health_score_change: number | null
          id: string
          key_decisions: Json | null
          member_id: string | null
          metrics: Json | null
          outcome: string | null
          start_date: string
          title: string
          triggered_by: string | null
          updated_at: string
        }
        Insert: {
          ai_insights?: Json | null
          communication_count?: number | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          episode_number: number
          friction_points?: Json | null
          health_score_change?: number | null
          id?: string
          key_decisions?: Json | null
          member_id?: string | null
          metrics?: Json | null
          outcome?: string | null
          start_date: string
          title: string
          triggered_by?: string | null
          updated_at?: string
        }
        Update: {
          ai_insights?: Json | null
          communication_count?: number | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          episode_number?: number
          friction_points?: Json | null
          health_score_change?: number | null
          id?: string
          key_decisions?: Json | null
          member_id?: string | null
          metrics?: Json | null
          outcome?: string | null
          start_date?: string
          title?: string
          triggered_by?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "journey_episodes_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "member_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      member_profiles: {
        Row: {
          communication_preferences: Json | null
          created_at: string
          current_health_score: number | null
          date_of_birth: string
          gender: string
          health_goals: Json | null
          id: string
          occupation: string | null
          personal_assistant_email: string | null
          personal_assistant_name: string | null
          personality_assessment: Json | null
          plan_adherence_rate: number | null
          preferred_name: string
          primary_residence: string
          success_metrics: Json | null
          tech_stack: Json | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          communication_preferences?: Json | null
          created_at?: string
          current_health_score?: number | null
          date_of_birth: string
          gender: string
          health_goals?: Json | null
          id?: string
          occupation?: string | null
          personal_assistant_email?: string | null
          personal_assistant_name?: string | null
          personality_assessment?: Json | null
          plan_adherence_rate?: number | null
          preferred_name: string
          primary_residence: string
          success_metrics?: Json | null
          tech_stack?: Json | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          communication_preferences?: Json | null
          created_at?: string
          current_health_score?: number | null
          date_of_birth?: string
          gender?: string
          health_goals?: Json | null
          id?: string
          occupation?: string | null
          personal_assistant_email?: string | null
          personal_assistant_name?: string | null
          personality_assessment?: Json | null
          plan_adherence_rate?: number | null
          preferred_name?: string
          primary_residence?: string
          success_metrics?: Json | null
          tech_stack?: Json | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      team_members: {
        Row: {
          avatar_url: string | null
          created_at: string
          description: string | null
          hours_worked: number | null
          id: string
          name: string
          response_time_avg: number | null
          role: string
          specialization: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          description?: string | null
          hours_worked?: number | null
          id?: string
          name: string
          response_time_avg?: number | null
          role: string
          specialization?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          description?: string | null
          hours_worked?: number | null
          id?: string
          name?: string
          response_time_avg?: number | null
          role?: string
          specialization?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      test_panels: {
        Row: {
          completed_date: string | null
          created_at: string
          id: string
          member_id: string | null
          panel_type: string
          recommendations: Json | null
          results: Json | null
          scheduled_date: string
          status: string | null
          updated_at: string
        }
        Insert: {
          completed_date?: string | null
          created_at?: string
          id?: string
          member_id?: string | null
          panel_type: string
          recommendations?: Json | null
          results?: Json | null
          scheduled_date: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          completed_date?: string | null
          created_at?: string
          id?: string
          member_id?: string | null
          panel_type?: string
          recommendations?: Json | null
          results?: Json | null
          scheduled_date?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "test_panels_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "member_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      wearable_data: {
        Row: {
          data_type: string
          data_value: Json
          device_type: string
          id: string
          member_id: string | null
          recorded_at: string
          synced_at: string
        }
        Insert: {
          data_type: string
          data_value: Json
          device_type: string
          id?: string
          member_id?: string | null
          recorded_at: string
          synced_at?: string
        }
        Update: {
          data_type?: string
          data_value?: Json
          device_type?: string
          id?: string
          member_id?: string | null
          recorded_at?: string
          synced_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "wearable_data_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "member_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

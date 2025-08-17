import React from 'react';

// Team member personalities and routing logic
export interface TeamMember {
  name: string;
  role: string;
  personality: string;
  specializations: string[];
  responseStyle: string;
}

export const TEAM_MEMBERS: Record<string, TeamMember> = {
  ruby: {
    name: 'Ruby',
    role: 'Concierge',
    personality: 'Empathetic, organized, and proactive. Anticipates needs and confirms every action.',
    specializations: ['scheduling', 'logistics', 'coordination', 'reminders', 'general_queries'],
    responseStyle: 'caring_organized'
  },
  warren: {
    name: 'Dr. Warren',
    role: 'Medical Strategist',
    personality: 'Authoritative, precise, and scientific. Explains complex medical topics clearly.',
    specializations: ['medical_analysis', 'lab_results', 'diagnosis', 'medical_strategy', 'health_concerns'],
    responseStyle: 'clinical_precise'
  },
  advik: {
    name: 'Advik',
    role: 'Performance Scientist',
    personality: 'Analytical, curious, and pattern-oriented. Communicates through experiments and data.',
    specializations: ['wearable_data', 'sleep_analysis', 'hrv', 'stress_patterns', 'performance_metrics'],
    responseStyle: 'data_driven'
  },
  carla: {
    name: 'Carla',
    role: 'Nutritionist',
    personality: 'Practical, educational, and focused on behavioral change. Explains the why behind choices.',
    specializations: ['nutrition', 'supplements', 'food_logs', 'cgm_data', 'dietary_plans'],
    responseStyle: 'educational_practical'
  },
  rachel: {
    name: 'Rachel',
    role: 'Physiotherapist',
    personality: 'Direct, encouraging, and focused on form and function. Expert on physical structure.',
    specializations: ['exercise', 'mobility', 'strength_training', 'injury_prevention', 'movement_patterns'],
    responseStyle: 'direct_encouraging'
  },
  neel: {
    name: 'Neel',
    role: 'Concierge Lead',
    personality: 'Strategic, reassuring, and big-picture focused. Provides context and long-term vision.',
    specializations: ['strategy', 'escalation', 'relationship_management', 'goal_setting', 'reviews'],
    responseStyle: 'strategic_reassuring'
  }
};

export class AITeamRouter {
  static routeQuery(message: string): string {
    const lowerMessage = message.toLowerCase();
    
    // Medical concerns and symptoms
    if (this.containsKeywords(lowerMessage, ['dizzy', 'pain', 'symptoms', 'medical', 'blood', 'lab', 'test', 'diagnosis', 'pots', 'covid', 'heart'])) {
      return 'warren';
    }
    
    // Wearable data and performance metrics
    if (this.containsKeywords(lowerMessage, ['garmin', 'oura', 'hrv', 'sleep', 'recovery', 'stress', 'intensity', 'wearable', 'data', 'performance'])) {
      return 'advik';
    }
    
    // Nutrition and supplements
    if (this.containsKeywords(lowerMessage, ['nutrition', 'food', 'eat', 'supplement', 'diet', 'cgm', 'glucose', 'meal', 'nutrients'])) {
      return 'carla';
    }
    
    // Exercise and movement
    if (this.containsKeywords(lowerMessage, ['exercise', 'workout', 'training', 'movement', 'strength', 'mobility', 'physical', 'injury', 'rehabilitation'])) {
      return 'rachel';
    }
    
    // Strategic and relationship management
    if (this.containsKeywords(lowerMessage, ['goal', 'strategy', 'plan', 'review', 'concern', 'overall', 'frustrated', 'progress'])) {
      return 'neel';
    }
    
    // Default to Ruby for scheduling, logistics, and general queries
    return 'ruby';
  }
  
  static generateResponse(teamMemberKey: string, userMessage: string, memberProfile: any): string {
    const member = TEAM_MEMBERS[teamMemberKey];
    
    switch (teamMemberKey) {
      case 'ruby':
        return this.generateRubyResponse(userMessage, memberProfile);
      case 'warren':
        return this.generateWarrenResponse(userMessage, memberProfile);
      case 'advik':
        return this.generateAdvikResponse(userMessage, memberProfile);
      case 'carla':
        return this.generateCarlaResponse(userMessage, memberProfile);
      case 'rachel':
        return this.generateRachelResponse(userMessage, memberProfile);
      case 'neel':
        return this.generateNeelResponse(userMessage, memberProfile);
      default:
        return this.generateRubyResponse(userMessage, memberProfile);
    }
  }
  
  private static containsKeywords(message: string, keywords: string[]): boolean {
    return keywords.some(keyword => message.includes(keyword));
  }
  
  private static generateRubyResponse(message: string, profile: any): string {
    const responses = [
      `Hi ${profile?.preferred_name || 'there'}, I've received your message and I'm reviewing this now. Let me coordinate with the right team member to get you the best support.`,
      `Thank you for reaching out, ${profile?.preferred_name || 'there'}. I'm flagging this for the appropriate specialist to review immediately as Priority 1.`,
      `I understand your concern, ${profile?.preferred_name || 'there'}. I'll make sure this gets the attention it needs and follow up with you within 24 hours.`,
      `Got it, ${profile?.preferred_name || 'there'}. I'm coordinating the logistics for this and will ensure everything is seamlessly handled for you.`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  private static generateWarrenResponse(message: string, profile: any): string {
    const responses = [
      `${profile?.preferred_name || 'Patient'}, Dr. Warren here. I've reviewed your submission. To proceed with a clinical-grade strategy, we need to consolidate your complete medical data for safety and accuracy.`,
      `This presents interesting clinical indicators, ${profile?.preferred_name || 'Patient'}. Based on your symptoms and data, I recommend we proceed with targeted diagnostic testing to establish a baseline.`,
      `${profile?.preferred_name || 'Patient'}, the symptoms you're describing warrant immediate clinical attention. I'm prioritizing this for comprehensive medical review within the next 24 hours.`,
      `I've analyzed your health data, ${profile?.preferred_name || 'Patient'}. The patterns suggest we should adjust your current protocol based on evidence-based medicine principles.`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  private static generateAdvikResponse(message: string, profile: any): string {
    const responses = [
      `Interesting data patterns here, ${profile?.preferred_name || 'there'}. I'm seeing some anomalies in your wearable metrics that warrant deeper analysis. Let me run this through our performance algorithms.`,
      `${profile?.preferred_name || 'there'}, your HRV trends are showing significant variance. This could indicate autonomic dysfunction - I recommend we monitor this closely over the next 7 days.`,
      `The intensity minutes you're logging don't align with typical patterns, ${profile?.preferred_name || 'there'}. I suspect there's an underlying physiological factor we need to investigate.`,
      `Based on your Garmin data, ${profile?.preferred_name || 'there'}, I'm detecting stress response patterns that suggest we need to adjust your recovery protocols immediately.`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  private static generateCarlaResponse(message: string, profile: any): string {
    const responses = [
      `Hi ${profile?.preferred_name || 'there'}, let's dive into the nutritional aspects of what you're experiencing. Your current supplement regime needs optimization based on your metabolic profile.`,
      `${profile?.preferred_name || 'there'}, I'm reviewing your food logs and CGM data. There are some inflammation patterns we can address through targeted dietary modifications.`,
      `Great question, ${profile?.preferred_name || 'there'}! The nutritional science behind this is fascinating. Let me explain why specific nutrients will support your goals.`,
      `${profile?.preferred_name || 'there'}, based on your travel schedule and stress levels, we need to adjust your nutrition strategy to maintain optimal fuel efficiency.`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  private static generateRachelResponse(message: string, profile: any): string {
    const responses = [
      `${profile?.preferred_name || 'there'}, let's focus on optimizing your movement patterns. Your current exercise routine needs adjustments based on your body's feedback.`,
      `I'm analyzing your movement data, ${profile?.preferred_name || 'there'}. We need to address some biomechanical inefficiencies that could be impacting your performance.`,
      `${profile?.preferred_name || 'there'}, your form and function can be significantly improved. Let me design a targeted intervention for your specific needs.`,
      `Based on your physical assessment, ${profile?.preferred_name || 'there'}, I recommend we modify your training zones to prevent overuse and optimize recovery.`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  private static generateNeelResponse(message: string, profile: any): string {
    const responses = [
      `${profile?.preferred_name || 'there'}, I'm stepping in to ensure we're aligning all these interventions with your bigger health and performance goals. Let's refocus on what matters most.`,
      `I understand your frustration, ${profile?.preferred_name || 'there'}. Let me provide some strategic context on how this fits into your long-term health optimization journey.`,
      `${profile?.preferred_name || 'there'}, let's take a step back and review how all these elements connect to deliver the outcomes you're seeking in your demanding professional life.`,
      `This is exactly why we have this comprehensive approach, ${profile?.preferred_name || 'there'}. I'm ensuring our entire team is coordinated to deliver maximum value for your investment.`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
}

export default AITeamRouter;
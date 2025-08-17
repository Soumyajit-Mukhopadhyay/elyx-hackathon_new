// src/components/ChatInterface.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Send, Paperclip, Mic, Bot } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { supabase } from '@/integrations/supabase/client';
import { AITeamRouter, TEAM_MEMBERS } from './AITeamRouter';
import DecisionPanel from './DecisionPanel'; // NEW

interface Message {
  id: string;
  content: string;
  direction: 'incoming' | 'outgoing';
  timestamp: Date;
  sender: string;
  category?: string;
  decision_rationale?: string | null;
  response_context?: any;
  communication_thread_id?: string | null;
}

const ChatInterface: React.FC = () => {
  const { user } = useAuth();
  const profile = useProfile();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedDecision, setSelectedDecision] = useState<any>(null);
  const [openDecision, setOpenDecision] = useState(false);

  useEffect(() => {
    // greeting or initial starter
    if (profile && messages.length === 0) {
      const greeting: Message = {
        id: 'welcome',
        content: `Hi ${profile.preferred_name || ''}, welcome to Elyx.`,
        direction: 'incoming',
        timestamp: new Date(),
        sender: 'Ruby (Concierge)',
        category: 'greeting'
      };
      setMessages([greeting]);
    }
  }, [profile]);

  const loadMessages = async () => {
    if (!user || !profile) return;

    try {
      const { data, error } = await supabase
        .from('communications')
        .select('*')
        .eq('member_id', profile.id)
        .order('created_at', { ascending: true });

      if (error) throw error;

      if (data) {
        // NOTE: historic exports may have 'text' instead of 'content'.
        const formattedMessages: Message[] = data.map((comm: any) => ({
          id: comm.id,
          content: comm.content ?? comm.text ?? comm.body ?? '',
          direction: (comm.direction as 'incoming' | 'outgoing') || (comm.team_member_name === profile.preferred_name ? 'outgoing' : 'incoming'),
          timestamp: new Date(comm.created_at ?? new Date()),
          sender: comm.team_member_name ? `${comm.team_member_name}` : (comm.sender || 'System'),
          category: comm.category || undefined,
          decision_rationale: comm.decision_rationale || null,
          response_context: comm.response_context || {},
          communication_thread_id: comm.communication_thread_id || null
        }));
        setMessages(formattedMessages);
      }
    } catch (err) {
      console.error('Failed to load messages', err);
    }
  };

  useEffect(() => {
    loadMessages();
    // real-time subscription to update UI quickly
    if (!profile) return;
    const channel = supabase
      .channel(`comm:${profile.id}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'communications', filter: `member_id=eq.${profile.id}` }, (payload) => {
        const comm = payload.new;
        const formatted = {
          id: comm.id,
          content: comm.content ?? comm.text ?? comm.body ?? '',
          direction: (comm.direction as 'incoming' | 'outgoing') || 'incoming',
          timestamp: new Date(comm.created_at),
          sender: comm.team_member_name || 'System',
          category: comm.category || undefined,
          decision_rationale: comm.decision_rationale || null,
          response_context: comm.response_context || {},
          communication_thread_id: comm.communication_thread_id || null
        } as Message;

        setMessages(prev => {
          const idx = prev.findIndex(m => m.id === formatted.id);
          if (idx >= 0) {
            const copy = prev.slice();
            copy[idx] = formatted;
            return copy;
          }
          return [...prev, formatted];
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [profile]);

  // small AI stub - calls the local AITeamRouter simulation (already in your repo)
  const generateAIResponse = async (messageText: string): Promise<string> => {
    // route to team member
    const teamKey = AITeamRouter.routeQuery(messageText);
    const response = AITeamRouter.generateResponse(teamKey, messageText, profile);
    // simulate latency
    return new Promise(resolve => setTimeout(() => resolve(response), 700));
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !user || !profile) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      direction: 'outgoing',
      timestamp: new Date(),
      sender: 'You'
    };

    setMessages(prev => [...prev, userMessage]);
    const messageContent = newMessage;
    setNewMessage('');
    setIsGenerating(true);

    try {
      // Save user message to database (include both fields for backward compatibility)
      await supabase.from('communications').insert({
        member_id: profile.id,
        content: messageContent,
        text: messageContent, // fallback field for older exports
        direction: 'outgoing',
        message_type: 'text',
        communication_thread_id: null
      });

      const aiResponse = await generateAIResponse(messageContent);
      const teamMemberKey = AITeamRouter.routeQuery(messageContent);
      const teamMemberInfo = TEAM_MEMBERS[teamMemberKey];

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        direction: 'incoming',
        timestamp: new Date(),
        sender: `${teamMemberInfo.name} (${teamMemberInfo.role})`,
        category: 'response'
      };

      setMessages(prev => [...prev, aiMessage]);

      // Save AI response to database (again include both content & text)
      await supabase.from('communications').insert({
        member_id: profile.id,
        content: aiResponse,
        text: aiResponse,
        direction: 'incoming',
        message_type: 'text',
        team_member_name: teamMemberInfo.name,
        team_member_role: teamMemberInfo.role,
        category: 'response'
      });
    } catch (error) {
      console.error('Error generating response:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const getCategoryBadge = (category?: string) => {
    if (!category) return null;

    const categoryColors: Record<string, string> = {
      follow_up: 'bg-primary/10 text-primary',
      plan_update: 'bg-accent/10 text-accent',
      query: 'bg-muted text-muted-foreground',
      intervention: 'bg-health-warning/10 text-health-warning'
    };

    const label = category.replace('_', ' ');
    return (<Badge variant="outline" className={categoryColors[category] || 'bg-muted'}>{label}</Badge>);
  };

  const openDecisionFromMessage = (m: Message) => {
    // If the DB contains a decision row separately, you can fetch it here
    // For simplicity we build a mini decision object from the message fields
    if (!m.decision_rationale && !m.response_context) return;
    const dec = {
      decision_type: m.response_context?.decision_type || 'intervention',
      decision_title: m.response_context?.decision_title || `Decision linked to message ${m.id}`,
      rationale: m.decision_rationale || 'No explicit rationale stored',
      data_points: m.response_context?.data_points || {},
      communication_refs: [m.id],
      team_member_responsible: m.sender,
      created_at: m.timestamp
    };
    setSelectedDecision(dec);
    setOpenDecision(true);
  };

  return (
    <div className="h-full flex flex-col">
      <CardHeader className="border-b border-border">
        <CardTitle className="flex items-center space-x-2">
          <span>Healthcare Communications</span>
          <Badge variant="outline" className="bg-health-excellent/10 text-health-excellent">Active</Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden">
        <div className="h-[60vh] overflow-y-auto pr-2">
          <div className="px-2">
            {messages.map(message => (
              <div key={message.id} className={`flex ${message.direction === 'outgoing' ? 'justify-end' : 'justify-start'} mb-4`}>
                <div className={`max-w-xs lg:max-w-md flex ${message.direction === 'outgoing' ? 'flex-row-reverse' : 'flex-row'} space-x-2`}>
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback className="text-xs">
                      {message.direction === 'outgoing' ? 'You' :
                        message.sender === 'AI Assistant' ? <Bot className="h-4 w-4" /> :
                        message.sender.split(' ').map((n:any) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`${message.direction === 'outgoing' ? 'mr-2' : 'ml-2'}`}>
                    <div className={`rounded-lg p-3 ${message.direction === 'outgoing' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <p className="text-xs text-muted-foreground">
                        {message.sender} • {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                      </p>
                      {getCategoryBadge(message.category)}
                      {/* Decision chip if message carries rationale */}
                      {message.decision_rationale ? (
                        <Button size="sm" variant="ghost" onClick={() => openDecisionFromMessage(message)}>
                          Decision made
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Paperclip className="h-4 w-4" />
            </Button>

            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button variant="ghost" size="sm">
              <Mic className="h-4 w-4" />
            </Button>
            <Button onClick={handleSendMessage} size="sm" disabled={!newMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>

      {/* Decision Dialog */}
      <DecisionPanel open={openDecision} onOpenChange={setOpenDecision} decision={selectedDecision} />
    </div>
  );
};

export default ChatInterface;

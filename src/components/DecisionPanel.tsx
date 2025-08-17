// src/components/DecisionPanel.tsx
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface DecisionPanelProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  decision: any | null;
}

const DecisionPanel: React.FC<DecisionPanelProps> = ({ open, onOpenChange, decision }) => {
  if (!decision) return null;

  const { decision_type, decision_title, rationale, data_points, communication_refs, team_member_responsible, created_at } = decision;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Badge>{decision_type || 'Intervention'}</Badge>
            <span className="font-semibold">{decision_title}</span>
          </DialogTitle>
        </DialogHeader>

        <CardContent className="space-y-4">
          <div>
            <div className="text-xs uppercase opacity-60 mb-1">Rationale</div>
            <p className="text-sm leading-relaxed">{rationale || '—'}</p>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-xs uppercase opacity-60 mb-1">Data points</div>
              <pre className="text-xs bg-muted rounded-xl p-3 overflow-auto max-h-48">{JSON.stringify(data_points || {}, null, 2)}</pre>
            </div>

            <div>
              <div className="text-xs uppercase opacity-60 mb-1">Linked messages</div>
              <ul className="text-sm list-disc pl-4 space-y-1">
                {(communication_refs || []).map((m: any) => (
                  <li key={m} className="underline cursor-pointer">Message #{m}</li>
                ))}
                {(!communication_refs || communication_refs.length === 0) && <li className="text-xs text-muted-foreground">No linked messages</li>}
              </ul>
            </div>
          </div>

          <Separator />

          <div className="text-xs opacity-70">Owner: {team_member_responsible || 'Team'} • {created_at ? new Date(created_at).toLocaleString() : '—'}</div>
        </CardContent>
      </DialogContent>
    </Dialog>
  );
};

export default DecisionPanel;

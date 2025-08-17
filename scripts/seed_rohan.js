// scripts/seed_rohan.js
// Run: SUPABASE_SERVICE_ROLE_KEY=your_service_role_key node scripts/seed_rohan.js
const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL || !SERVICE_KEY) {
  console.error('Set SUPABASE_SERVICE_ROLE_KEY and NEXT_PUBLIC_SUPABASE_URL in env before running.');
  process.exit(1);
}

const supabase = createClient(URL, SERVICE_KEY);

async function main() {
  const raw = fs.readFileSync('./public/data/rohan_patell_8mo_messages.json', 'utf8');
  const rows = JSON.parse(raw);

  // Map 'text' -> 'content' for compatibility
  const cleaned = rows.map(r => ({
    id: r.id,
    member_id: r.member_id,
    content: r.content ?? r.text ?? r.body ?? '',
    text: r.text ?? r.content ?? '',
    message_type: r.message_type ?? 'text',
    direction: r.direction ?? (r.team_member_name === 'Rohan' ? 'outgoing' : 'incoming'),
    created_at: r.created_at,
    team_member_name: r.team_member_name,
    team_member_role: r.team_member_role,
    communication_thread_id: r.communication_thread_id,
    decision_rationale: r.decision_rationale || null,
    response_context: r.data_points || {},
  }));

  console.log('Inserting', cleaned.length, 'rows (batched).');

  // Insert in batches of 200 to avoid payload issues
  const chunkSize = 200;
  for (let i = 0; i < cleaned.length; i += chunkSize) {
    const chunk = cleaned.slice(i, i + chunkSize);
    const { error } = await supabase.from('communications').insert(chunk);
    if (error) {
      console.error('Insert error on chunk', i, error);
      process.exit(1);
    } else {
      console.log('Inserted chunk', i / chunkSize + 1);
    }
  }

  console.log('Done.');
}

main().catch(err => {
  console.error(err);
});

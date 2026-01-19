import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  const { data, error } = await supabase
    .from('site_stats')
    .select('*');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const stats: Record<string, number> = {};
  data?.forEach((stat) => {
    stats[stat.id] = stat.value;
  });

  return NextResponse.json(stats);
}

export async function POST(request: Request) {
  const { stat_id, increment = 1 } = await request.json();

  const { data: current } = await supabase
    .from('site_stats')
    .select('value')
    .eq('id', stat_id)
    .single();

  const newValue = (current?.value || 0) + increment;

  const { error } = await supabase
    .from('site_stats')
    .update({ value: newValue, updated_at: new Date().toISOString() })
    .eq('id', stat_id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, value: newValue });
}

import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  const { data, error } = await supabase
    .from('admins')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Identifiants incorrects' }, { status: 401 });
  }

  if (data.password_hash !== password) {
    return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 });
  }

  return NextResponse.json({ 
    success: true, 
    admin: { 
      id: data.id, 
      email: data.email, 
      name: data.name 
    } 
  });
}

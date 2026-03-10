import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Nom, email et message sont requis' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 });
    }

    if (name.trim().length < 2 || name.trim().length > 100) {
      return NextResponse.json({ error: 'Nom invalide' }, { status: 400 });
    }

    if (message.trim().length < 5 || message.trim().length > 2000) {
      return NextResponse.json({ error: 'Message trop court ou trop long' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('contacts')
      .insert([{
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject?.trim() || null,
        message: message.trim(),
      }])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

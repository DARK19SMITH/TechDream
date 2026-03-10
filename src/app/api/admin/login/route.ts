import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email et mot de passe requis' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('admins')
      .select('*')
      .eq('email', email.trim().toLowerCase())
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Identifiants incorrects' }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, data.password_hash);
    if (!isValid) {
      return NextResponse.json({ error: 'Identifiants incorrects' }, { status: 401 });
    }

    const sessionToken = crypto.randomBytes(32).toString('hex');

    const response = NextResponse.json({
      success: true,
      admin: {
        id: data.id,
        email: data.email,
        name: data.name,
      },
      token: sessionToken,
    });

    response.cookies.set('admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

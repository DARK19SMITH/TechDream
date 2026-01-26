import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Admin {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  image: string | null;
  category: 'conseil' | 'actualite' | 'astuce';
  published: boolean;
  price: number;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
  category: 'pc' | 'laptop' | 'gaming' | 'professionnel' | 'accessoire';
  specs: string[] | null;
  in_stock: boolean;
  gallery: string[] | null;
  videos: string[] | null;
  recommendations: string | null;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  product_id: string;
  customer_name: string;
  customer_phone: string;
  delivery_location: string;
  status: 'pending' | 'completed' | 'cancelled';
  total_price: number;
  created_at: string;
  updated_at: string;
  product?: Product;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  created_at: string;
}

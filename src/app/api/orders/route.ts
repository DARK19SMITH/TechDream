import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { product_id, customer_name, customer_phone, delivery_location, total_price } = body;

    if (!product_id || !customer_name?.trim() || !customer_phone?.trim() || !delivery_location?.trim()) {
      return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 });
    }

    const phoneRegex = /^[\d\s+\-()]{8,20}$/;
    if (!phoneRegex.test(customer_phone.trim())) {
      return NextResponse.json({ error: "Numéro de téléphone invalide" }, { status: 400 });
    }

    if (customer_name.trim().length < 2 || customer_name.trim().length > 100) {
      return NextResponse.json({ error: "Nom invalide" }, { status: 400 });
    }

    if (delivery_location.trim().length < 3 || delivery_location.trim().length > 200) {
      return NextResponse.json({ error: "Lieu de livraison invalide" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("orders")
      .insert([
        {
          product_id,
          customer_name: customer_name.trim(),
          customer_phone: customer_phone.trim(),
          delivery_location: delivery_location.trim(),
          total_price: Number(total_price) || 0,
          status: "pending",
        },
      ])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0], { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*, products(*)")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { product_id, customer_name, customer_phone, delivery_location, total_price } = body;

    const { data, error } = await supabase
      .from("orders")
      .insert([
        {
          product_id,
          customer_name,
          customer_phone,
          delivery_location,
          total_price,
          status: "pending",
        },
      ])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
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
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import Stripe from "stripe";
import shopData from "@/data/shop.json";

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const { productId } = await req.json();

  const product = shopData.products.find((p) => p.id === productId);
  if (!product || !product.inStock || product.price === 0) {
    return NextResponse.json({ error: "Invalid product" }, { status: 400 });
  }

  const origin = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            description: product.description,
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${origin}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/shop`,
    metadata: { productId: product.id },
  });

  return NextResponse.json({ url: session.url });
}

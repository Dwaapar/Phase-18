import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import Stripe from "npm:stripe@14.21.0";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeSecretKey) {
      throw new Error("Missing Stripe secret key");
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2024-11-20.acacia",
    });

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const {
      userId,
      productIds,
      quantities,
      couponCode,
      successUrl,
      cancelUrl,
    } = await req.json();

    const { data: products } = await supabase
      .from("products")
      .select("*")
      .in("id", productIds);

    if (!products || products.length === 0) {
      throw new Error("Products not found");
    }

    const { data: userData } = await supabase
      .from("profiles")
      .select("email, full_name")
      .eq("id", userId)
      .single();

    let customer;
    const { data: existingCustomer } = await supabase
      .from("subscriptions")
      .select("stripe_customer_id")
      .eq("user_id", userId)
      .maybeSingle();

    if (existingCustomer?.stripe_customer_id) {
      customer = await stripe.customers.retrieve(existingCustomer.stripe_customer_id);
    } else {
      customer = await stripe.customers.create({
        email: userData?.email,
        name: userData?.full_name,
        metadata: {
          user_id: userId,
        },
      });
    }

    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;

    let subtotal = 0;
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = products.map((product, index) => {
      const quantity = quantities[index] || 1;
      const price = product.base_price;
      subtotal += price * quantity;

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            description: product.description,
            images: product.media?.images || [],
          },
          unit_amount: price,
        },
        quantity,
      };
    });

    const { data: order } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
        order_number: orderNumber,
        status: "pending",
        subtotal,
        total: subtotal,
        currency: "USD",
      })
      .select()
      .single();

    if (!order) {
      throw new Error("Failed to create order");
    }

    await supabase.from("order_items").insert(
      products.map((product, index) => ({
        order_id: order.id,
        product_id: product.id,
        quantity: quantities[index] || 1,
        unit_price: product.base_price,
        total_price: product.base_price * (quantities[index] || 1),
      }))
    );

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      customer: customer.id,
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        user_id: userId,
        order_id: order.id,
        order_number: orderNumber,
      },
    };

    if (couponCode) {
      try {
        const coupon = await stripe.coupons.retrieve(couponCode);
        if (coupon) {
          sessionParams.discounts = [{ coupon: couponCode }];
        }
      } catch (error) {
        console.warn("Coupon not found:", couponCode);
      }
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    await supabase
      .from("orders")
      .update({
        stripe_payment_intent_id: session.payment_intent as string,
        status: "processing",
      })
      .eq("id", order.id);

    return new Response(
      JSON.stringify({
        id: session.id,
        url: session.url,
        sessionId: session.id,
        orderId: order.id,
        orderNumber: orderNumber,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Product checkout error:", error);

    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});

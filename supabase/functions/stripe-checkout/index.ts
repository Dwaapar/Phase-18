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
      tierId,
      billingCycle,
      trialDays = 14,
      couponCode,
      successUrl,
      cancelUrl,
    } = await req.json();

    const { data: tierData } = await supabase
      .from("pricing_tiers")
      .select("*")
      .eq("id", tierId)
      .single();

    if (!tierData) {
      throw new Error("Tier not found");
    }

    const { data: userData } = await supabase
      .from("profiles")
      .select("email, full_name")
      .eq("id", userId)
      .single();

    let customer;
    const { data: existingSub } = await supabase
      .from("subscriptions")
      .select("stripe_customer_id")
      .eq("user_id", userId)
      .maybeSingle();

    if (existingSub?.stripe_customer_id) {
      customer = await stripe.customers.retrieve(existingSub.stripe_customer_id);
    } else {
      customer = await stripe.customers.create({
        email: userData?.email,
        name: userData?.full_name,
        metadata: {
          user_id: userId,
        },
      });
    }

    const price = billingCycle === "monthly" ? tierData.price_monthly : tierData.price_annual;

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      customer: customer.id,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${tierData.name} Plan`,
              description: tierData.description,
            },
            unit_amount: price,
            recurring: {
              interval: billingCycle === "monthly" ? "month" : "year",
            },
          },
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_period_days: trialDays,
        metadata: {
          user_id: userId,
          tier_id: tierId,
        },
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        user_id: userId,
        tier_id: tierId,
      },
    };

    if (couponCode) {
      const coupon = await stripe.coupons.retrieve(couponCode);
      if (coupon) {
        sessionParams.discounts = [{ coupon: couponCode }];
      }
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    await supabase.from("subscriptions").insert({
      user_id: userId,
      tier_id: tierId,
      billing_cycle: billingCycle,
      status: "trialing",
      stripe_subscription_id: session.subscription as string,
      stripe_customer_id: customer.id,
      trial_ends_at: new Date(Date.now() + trialDays * 24 * 60 * 60 * 1000).toISOString(),
      current_period_start: new Date().toISOString(),
      current_period_end: new Date(Date.now() + trialDays * 24 * 60 * 60 * 1000).toISOString(),
    });

    return new Response(
      JSON.stringify({
        id: session.id,
        url: session.url,
        sessionId: session.id,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Checkout error:", error);

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

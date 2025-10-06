import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ContactRequest {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  type: 'general' | 'sales' | 'support' | 'partnership';
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const body: ContactRequest = await req.json();

    const emailContent = `
New Contact Form Submission

Name: ${body.name}
Email: ${body.email}
Company: ${body.company || 'N/A'}
Type: ${body.type}
Subject: ${body.subject}

Message:
${body.message}
    `;

    console.log('Contact form submission:', emailContent);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Contact form submitted successfully',
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});
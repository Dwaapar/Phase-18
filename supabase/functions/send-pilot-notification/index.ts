import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface PilotRequest {
  name: string;
  email: string;
  company: string;
  useCase: string;
  stack: string;
  dataAccess: string;
  timeline: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const body: PilotRequest = await req.json();

    const emailContent = `
New Automation Pilot Application

Applicant Information:
Name: ${body.name}
Email: ${body.email}
Company: ${body.company}

Project Details:
Use Case: ${body.useCase}
Tech Stack: ${body.stack}
Data Access: ${body.dataAccess}
Timeline: ${body.timeline}
    `;

    console.log('Pilot application:', emailContent);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Pilot application submitted successfully',
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
    console.error('Error processing pilot application:', error);
    
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
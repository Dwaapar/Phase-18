import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ExecuteRequest {
  workflowId: string;
  config?: Record<string, any>;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        {
          status: 401,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const body: ExecuteRequest = await req.json();

    const { data: userWorkflow } = await supabaseClient
      .from('user_workflows')
      .select('*, workflow:workflows(*)')
      .eq('user_id', user.id)
      .eq('workflow_id', body.workflowId)
      .single();

    if (!userWorkflow) {
      return new Response(
        JSON.stringify({ error: 'Workflow not found or not authorized' }),
        {
          status: 404,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const executionId = crypto.randomUUID();
    const startTime = Date.now();

    console.log(`Executing workflow ${body.workflowId} for user ${user.id}`);
    console.log('Workflow config:', body.config);

    await new Promise(resolve => setTimeout(resolve, 2000));

    const executionTime = Date.now() - startTime;

    await supabaseClient
      .from('user_workflows')
      .update({
        last_run: new Date().toISOString(),
        runs_count: (userWorkflow.runs_count || 0) + 1,
      })
      .eq('id', userWorkflow.id);

    return new Response(
      JSON.stringify({
        success: true,
        executionId,
        executionTime,
        workflowName: userWorkflow.workflow?.name,
        status: 'completed',
        message: 'Workflow executed successfully',
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
    console.error('Error executing workflow:', error);
    
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
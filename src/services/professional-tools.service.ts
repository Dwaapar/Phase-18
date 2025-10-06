import { supabase } from '../lib/supabase';

export interface ProfessionalTool {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  tool_type: string;
  features: string[];
  templates_count: number;
  pricing_tier: string;
  free_uses_per_month: number;
  is_active: boolean;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface ToolUsage {
  id: string;
  user_id: string;
  tool_id: string;
  usage_type: string;
  usage_data: Record<string, any>;
  result_data: Record<string, any>;
  session_id?: string;
  success: boolean;
  created_at: string;
}

export interface ToolTemplate {
  id: string;
  tool_id: string;
  name: string;
  description?: string;
  category?: string;
  industry?: string;
  template_data: Record<string, any>;
  preview_image?: string;
  is_premium: boolean;
  usage_count: number;
  rating: number;
}

export interface UserToolCreation {
  id: string;
  user_id: string;
  tool_id: string;
  template_id?: string;
  name: string;
  content: Record<string, any>;
  status: 'draft' | 'published' | 'archived';
  version: number;
  share_token?: string;
  created_at: string;
  updated_at: string;
}

export interface UsageLimit {
  usage_count: number;
  limit_count: number;
  remaining: number;
  has_unlimited: boolean;
  period_end: string;
}

class ProfessionalToolsService {
  async getAllTools(): Promise<ProfessionalTool[]> {
    const { data, error } = await supabase
      .from('professional_tools')
      .select('*')
      .eq('is_active', true)
      .order('category', { ascending: true })
      .order('name', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  async getToolBySlug(slug: string): Promise<ProfessionalTool | null> {
    const { data, error } = await supabase
      .from('professional_tools')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  async getToolTemplates(toolId: string): Promise<ToolTemplate[]> {
    const { data, error } = await supabase
      .from('tool_templates')
      .select('*')
      .eq('tool_id', toolId)
      .order('usage_count', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async checkUsageLimit(userId: string, toolSlug: string): Promise<UsageLimit> {
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('tier_id, status, current_period_end')
      .eq('user_id', userId)
      .eq('status', 'active')
      .maybeSingle();

    const hasUnlimited = subscription && ['professional', 'enterprise'].includes(
      subscription.tier_id.toLowerCase()
    );

    if (hasUnlimited) {
      return {
        usage_count: 0,
        limit_count: -1,
        remaining: -1,
        has_unlimited: true,
        period_end: subscription.current_period_end
      };
    }

    const tool = await this.getToolBySlug(toolSlug);
    if (!tool) {
      throw new Error('Tool not found');
    }

    const now = new Date();
    const periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const periodEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    const { data: limit, error } = await supabase
      .from('tool_usage_limits')
      .select('*')
      .eq('user_id', userId)
      .eq('tool_id', tool.id)
      .gte('period_end', now.toISOString())
      .maybeSingle();

    if (error && error.code !== 'PGRST116') throw error;

    if (!limit) {
      const { data: newLimit, error: createError } = await supabase
        .from('tool_usage_limits')
        .insert({
          user_id: userId,
          tool_id: tool.id,
          period_start: periodStart.toISOString(),
          period_end: periodEnd.toISOString(),
          usage_count: 0,
          limit_count: tool.free_uses_per_month
        })
        .select()
        .single();

      if (createError) throw createError;

      return {
        usage_count: 0,
        limit_count: tool.free_uses_per_month,
        remaining: tool.free_uses_per_month,
        has_unlimited: false,
        period_end: periodEnd.toISOString()
      };
    }

    return {
      usage_count: limit.usage_count,
      limit_count: limit.limit_count,
      remaining: Math.max(0, limit.limit_count - limit.usage_count),
      has_unlimited: false,
      period_end: limit.period_end
    };
  }

  async recordUsage(
    userId: string,
    toolSlug: string,
    usageType: string,
    usageData: Record<string, any>,
    resultData: Record<string, any>,
    success: boolean = true
  ): Promise<void> {
    const tool = await this.getToolBySlug(toolSlug);
    if (!tool) throw new Error('Tool not found');

    const usageLimit = await this.checkUsageLimit(userId, toolSlug);

    if (!usageLimit.has_unlimited && usageLimit.remaining <= 0) {
      throw new Error('Usage limit exceeded. Upgrade to Professional for unlimited access.');
    }

    const { error: usageError } = await supabase
      .from('tool_usage')
      .insert({
        user_id: userId,
        tool_id: tool.id,
        usage_type: usageType,
        usage_data: usageData,
        result_data: resultData,
        success: success
      });

    if (usageError) throw usageError;

    if (!usageLimit.has_unlimited) {
      const now = new Date();
      const { error: limitError } = await supabase
        .from('tool_usage_limits')
        .update({ usage_count: usageLimit.usage_count + 1 })
        .eq('user_id', userId)
        .eq('tool_id', tool.id)
        .gte('period_end', now.toISOString());

      if (limitError) throw limitError;
    }
  }

  async getUserCreations(userId: string, toolSlug?: string): Promise<UserToolCreation[]> {
    let query = supabase
      .from('user_tool_creations')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (toolSlug) {
      const tool = await this.getToolBySlug(toolSlug);
      if (tool) {
        query = query.eq('tool_id', tool.id);
      }
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async createUserCreation(
    userId: string,
    toolSlug: string,
    name: string,
    content: Record<string, any>,
    templateId?: string
  ): Promise<UserToolCreation> {
    const tool = await this.getToolBySlug(toolSlug);
    if (!tool) throw new Error('Tool not found');

    const { data, error } = await supabase
      .from('user_tool_creations')
      .insert({
        user_id: userId,
        tool_id: tool.id,
        template_id: templateId,
        name: name,
        content: content,
        status: 'draft'
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateUserCreation(
    creationId: string,
    updates: Partial<UserToolCreation>
  ): Promise<UserToolCreation> {
    const { data, error } = await supabase
      .from('user_tool_creations')
      .update(updates)
      .eq('id', creationId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteUserCreation(creationId: string): Promise<void> {
    const { error } = await supabase
      .from('user_tool_creations')
      .delete()
      .eq('id', creationId);

    if (error) throw error;
  }

  async getUserUsageStats(userId: string): Promise<Record<string, any>> {
    const { data: tools } = await supabase
      .from('professional_tools')
      .select('id, slug, name');

    if (!tools) return {};

    const stats: Record<string, any> = {};

    for (const tool of tools) {
      const limit = await this.checkUsageLimit(userId, tool.slug);
      stats[tool.slug] = {
        name: tool.name,
        ...limit
      };
    }

    return stats;
  }
}

export const professionalToolsService = new ProfessionalToolsService();

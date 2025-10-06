import { supabase } from '../lib/supabase';
import type { UsageLimit, UsageEvent, UsageCheckResult } from '../types/platform.types';

export const usageTrackingService = {
  async getUserUsageLimits(userId: string): Promise<UsageLimit[]> {
    const { data, error } = await supabase
      .from('usage_limits')
      .select('*')
      .eq('user_id', userId)
      .gte('period_end', new Date().toISOString());

    if (error) throw error;
    return data as UsageLimit[];
  },

  async checkUsageLimit(
    userId: string,
    limitType: UsageLimit['limitType']
  ): Promise<UsageCheckResult> {
    const { data, error } = await supabase.rpc('check_usage_limit', {
      p_user_id: userId,
      p_limit_type: limitType,
    });

    if (error) throw error;
    return data as UsageCheckResult;
  },

  async incrementUsage(
    userId: string,
    limitType: UsageLimit['limitType'],
    resourceType: string,
    resourceId?: string,
    metadata: Record<string, any> = {}
  ): Promise<void> {
    const check = await this.checkUsageLimit(userId, limitType);

    if (!check.canProceed && !check.isUnlimited) {
      throw new Error(
        `Usage limit exceeded for ${limitType}. Current: ${check.current}, Limit: ${check.totalCapacity}`
      );
    }

    const { error: incrementError } = await supabase.rpc('increment_usage_limit', {
      p_user_id: userId,
      p_limit_type: limitType,
    });

    if (incrementError) throw incrementError;

    const eventTypeMap: Record<string, UsageEvent['eventType']> = {
      workflow_deployments: 'workflow_deployment',
      agents: 'agent_creation',
      asset_downloads: 'asset_download',
      tool_uses: 'tool_use',
      api_calls: 'api_call',
    };

    await this.logUsageEvent(
      userId,
      eventTypeMap[limitType] || 'api_call',
      resourceType,
      resourceId,
      metadata
    );
  },

  async decrementUsage(
    userId: string,
    limitType: UsageLimit['limitType'],
    resourceType: string,
    resourceId?: string
  ): Promise<void> {
    const { error } = await supabase
      .from('usage_limits')
      .update({
        current_value: supabase.rpc('greatest', [0, supabase.rpc('current_value - 1')]),
      })
      .eq('user_id', userId)
      .eq('limit_type', limitType)
      .gte('period_end', new Date().toISOString());

    if (error) throw error;

    const eventTypeMap: Record<string, UsageEvent['eventType']> = {
      workflow_deployments: 'workflow_deletion',
      agents: 'agent_deletion',
    };

    if (eventTypeMap[limitType]) {
      await this.logUsageEvent(userId, eventTypeMap[limitType], resourceType, resourceId);
    }
  },

  async logUsageEvent(
    userId: string,
    eventType: UsageEvent['eventType'],
    resourceType: string,
    resourceId?: string,
    metadata: Record<string, any> = {}
  ): Promise<void> {
    const { error } = await supabase.from('usage_events').insert({
      user_id: userId,
      event_type: eventType,
      resource_type: resourceType,
      resource_id: resourceId,
      metadata,
    });

    if (error) throw error;
  },

  async getUsageHistory(
    userId: string,
    options: {
      eventType?: UsageEvent['eventType'];
      startDate?: string;
      endDate?: string;
      limit?: number;
    } = {}
  ): Promise<UsageEvent[]> {
    let query = supabase
      .from('usage_events')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (options.eventType) {
      query = query.eq('event_type', options.eventType);
    }

    if (options.startDate) {
      query = query.gte('created_at', options.startDate);
    }

    if (options.endDate) {
      query = query.lte('created_at', options.endDate);
    }

    if (options.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data as UsageEvent[];
  },

  async resetUsageLimits(userId: string): Promise<void> {
    const { error } = await supabase.rpc('reset_usage_limits', {
      p_user_id: userId,
    });

    if (error) throw error;
  },

  async initializeUsageLimits(userId: string, tierId: string): Promise<void> {
    const { error } = await supabase.rpc('initialize_usage_limits', {
      p_user_id: userId,
      p_tier_id: tierId,
    });

    if (error) throw error;
  },

  async getUsageSummary(userId: string): Promise<{
    limits: UsageLimit[];
    percentages: Record<string, number>;
    warnings: string[];
  }> {
    const limits = await this.getUserUsageLimits(userId);

    const percentages: Record<string, number> = {};
    const warnings: string[] = [];

    for (const limit of limits) {
      if (limit.limitValue === -1) {
        percentages[limit.limitType] = 0;
        continue;
      }

      const percentage = (limit.currentValue / limit.limitValue) * 100;
      percentages[limit.limitType] = percentage;

      if (percentage >= limit.softCapThreshold * 100) {
        warnings.push(
          `You've used ${limit.currentValue} of ${limit.limitValue} ${limit.limitType.replace('_', ' ')}`
        );
      }
    }

    return { limits, percentages, warnings };
  },
};

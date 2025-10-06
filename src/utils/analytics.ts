interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  userId?: string;
}

class Analytics {
  private isEnabled: boolean;
  private userId?: string;

  constructor() {
    this.isEnabled = process.env.REACT_APP_ENABLE_ANALYTICS === 'true';
  }

  setUserId(userId: string) {
    this.userId = userId;
  }

  track(event: AnalyticsEvent) {
    if (!this.isEnabled) return;

    // In a real app, this would send to your analytics service
    console.log('Analytics Event:', {
      ...event,
      userId: event.userId || this.userId,
      timestamp: new Date().toISOString()
    });

    // Example: Send to Google Analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', event.name, event.properties);
    }
  }

  page(pageName: string, properties?: Record<string, any>) {
    this.track({
      name: 'page_view',
      properties: {
        page: pageName,
        ...properties
      }
    });
  }

  // Predefined events for common actions
  workflowDeployed(workflowId: string, workflowName: string) {
    this.track({
      name: 'workflow_deployed',
      properties: {
        workflow_id: workflowId,
        workflow_name: workflowName
      }
    });
  }

  agentCreated(agentType: string) {
    this.track({
      name: 'agent_created',
      properties: {
        agent_type: agentType
      }
    });
  }

  assetDownloaded(assetId: string, assetType: string) {
    this.track({
      name: 'asset_downloaded',
      properties: {
        asset_id: assetId,
        asset_type: assetType
      }
    });
  }

  quizCompleted(results: Record<string, any>) {
    this.track({
      name: 'quiz_completed',
      properties: results
    });
  }

  pilotBooked(useCase: string) {
    this.track({
      name: 'pilot_booked',
      properties: {
        use_case: useCase
      }
    });
  }

  signUp(method: string) {
    this.track({
      name: 'sign_up',
      properties: {
        method
      }
    });
  }

  signIn(method: string) {
    this.track({
      name: 'sign_in',
      properties: {
        method
      }
    });
  }
}

export const analytics = new Analytics();

// React hook for analytics
export function useAnalytics() {
  return {
    track: analytics.track.bind(analytics),
    page: analytics.page.bind(analytics),
    setUserId: analytics.setUserId.bind(analytics),
    workflowDeployed: analytics.workflowDeployed.bind(analytics),
    agentCreated: analytics.agentCreated.bind(analytics),
    assetDownloaded: analytics.assetDownloaded.bind(analytics),
    quizCompleted: analytics.quizCompleted.bind(analytics),
    pilotBooked: analytics.pilotBooked.bind(analytics),
    signUp: analytics.signUp.bind(analytics),
    signIn: analytics.signIn.bind(analytics)
  };
}
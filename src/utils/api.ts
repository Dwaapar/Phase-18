// API utility functions for future backend integration

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.findawise.com';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new ApiError(response.status, `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export const api = {
  // Workflows
  getWorkflows: () => apiRequest('/workflows'),
  getWorkflow: (id: string) => apiRequest(`/workflows/${id}`),
  
  // Agents
  getAgents: () => apiRequest('/agents'),
  getAgent: (id: string) => apiRequest(`/agents/${id}`),
  
  // Assets
  getAssets: () => apiRequest('/assets'),
  getAsset: (id: string) => apiRequest(`/assets/${id}`),
  
  // Case Studies
  getCaseStudies: () => apiRequest('/case-studies'),
  getCaseStudy: (id: string) => apiRequest(`/case-studies/${id}`),
  
  // Blog
  getBlogPosts: () => apiRequest('/blog'),
  getBlogPost: (id: string) => apiRequest(`/blog/${id}`),
  
  // Contact
  submitContact: (data: any) => apiRequest('/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  // Pilot
  submitPilot: (data: any) => apiRequest('/pilot', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  // Newsletter
  subscribe: (email: string) => apiRequest('/newsletter/subscribe', {
    method: 'POST',
    body: JSON.stringify({ email }),
  }),
};
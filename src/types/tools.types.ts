export interface ResumeTemplate {
  id: string;
  name: string;
  category: 'modern' | 'classic' | 'creative' | 'minimal' | 'professional';
  industry?: string;
  preview_image?: string;
  is_premium: boolean;
  structure: {
    layout: 'single-column' | 'two-column' | 'sidebar';
    sections: string[];
    colors: {
      primary: string;
      secondary: string;
      accent: string;
    };
  };
}

export interface ResumeData {
  personal: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    website?: string;
    summary: string;
  };
  experience: Array<{
    company: string;
    position: string;
    location?: string;
    start_date: string;
    end_date?: string;
    current: boolean;
    description: string;
    achievements: string[];
  }>;
  education: Array<{
    school: string;
    degree: string;
    field?: string;
    location?: string;
    graduation_date: string;
    gpa?: string;
    honors?: string[];
  }>;
  skills: {
    technical: string[];
    soft: string[];
    languages: string[];
  };
  certifications?: Array<{
    name: string;
    issuer: string;
    date: string;
    url?: string;
  }>;
  projects?: Array<{
    name: string;
    description: string;
    technologies: string[];
    url?: string;
  }>;
}

export interface CoverLetterTemplate {
  id: string;
  name: string;
  industry: string;
  tone: 'formal' | 'professional' | 'friendly' | 'enthusiastic';
  structure: string[];
  is_premium: boolean;
}

export interface CoverLetterData {
  recipient: {
    company: string;
    hiring_manager?: string;
    job_title?: string;
  };
  opening: string;
  body_paragraphs: string[];
  closing: string;
  metadata: {
    job_description?: string;
    key_requirements?: string[];
    company_research?: string;
  };
}

export interface PortfolioTemplate {
  id: string;
  name: string;
  style: 'minimal' | 'bold' | 'creative' | 'corporate' | 'personal';
  layout: 'grid' | 'masonry' | 'carousel' | 'vertical';
  is_premium: boolean;
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  images: string[];
  demo_url?: string;
  repo_url?: string;
  featured: boolean;
  order: number;
}

export interface PortfolioData {
  profile: {
    name: string;
    tagline: string;
    bio: string;
    avatar?: string;
    location?: string;
    email: string;
    social: Record<string, string>;
  };
  projects: PortfolioProject[];
  skills: string[];
  testimonials?: Array<{
    text: string;
    author: string;
    role: string;
    company?: string;
  }>;
  contact: {
    email: string;
    phone?: string;
    availability: string;
  };
}

export interface EmailAnalysisResult {
  subject_score: number;
  content_score: number;
  overall_score: number;
  deliverability: {
    spam_score: number;
    sender_reputation: string;
    authentication: boolean;
  };
  engagement_prediction: {
    open_rate: number;
    click_rate: number;
    reply_rate: number;
  };
  suggestions: Array<{
    type: 'subject' | 'content' | 'cta' | 'formatting' | 'timing';
    severity: 'low' | 'medium' | 'high';
    message: string;
    recommendation: string;
  }>;
  tone_analysis: {
    sentiment: 'positive' | 'neutral' | 'negative';
    formality: number;
    urgency: number;
    personalization: number;
  };
}

export interface PitchDeckTemplate {
  id: string;
  name: string;
  industry: string;
  stage: 'pre-seed' | 'seed' | 'series-a' | 'series-b+';
  slides: Array<{
    title: string;
    type: string;
    layout: string;
    content_hints: string[];
  }>;
  is_premium: boolean;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  category: 'behavioral' | 'technical' | 'situational' | 'cultural';
  difficulty: 'easy' | 'medium' | 'hard';
  industry?: string;
  common_follow_ups: string[];
  framework: 'STAR' | 'CAR' | 'PAR' | 'general';
  tips: string[];
  example_answers?: string[];
}

export interface SalaryData {
  base_salary: number;
  bonus: number;
  equity_value: number;
  benefits_value: number;
  total_compensation: number;
  market_comparison: {
    percentile: number;
    min: number;
    median: number;
    max: number;
  };
  location_adjustment: number;
  industry_benchmark: number;
}

export interface BrandAuditResult {
  overall_score: number;
  linkedin: {
    score: number;
    profile_completeness: number;
    engagement_rate: number;
    connection_quality: number;
    suggestions: string[];
  };
  portfolio: {
    score: number;
    seo_score: number;
    load_time: number;
    mobile_friendly: boolean;
    suggestions: string[];
  };
  social_media: {
    score: number;
    consistency: number;
    activity_level: number;
    professional_image: number;
    suggestions: string[];
  };
  overall_suggestions: Array<{
    priority: 'high' | 'medium' | 'low';
    category: string;
    suggestion: string;
    impact: string;
  }>;
}

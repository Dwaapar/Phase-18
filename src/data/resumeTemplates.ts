import { ResumeTemplate } from '../types/tools.types';

export const resumeTemplates: ResumeTemplate[] = [
  {
    id: 'modern-pro',
    name: 'Modern Professional',
    category: 'modern',
    is_premium: false,
    structure: {
      layout: 'two-column',
      sections: ['personal', 'summary', 'experience', 'education', 'skills'],
      colors: {
        primary: '#1e293b',
        secondary: '#64748b',
        accent: '#3b82f6'
      }
    }
  },
  {
    id: 'classic-executive',
    name: 'Classic Executive',
    category: 'classic',
    industry: 'finance',
    is_premium: false,
    structure: {
      layout: 'single-column',
      sections: ['personal', 'summary', 'experience', 'education', 'certifications', 'skills'],
      colors: {
        primary: '#0f172a',
        secondary: '#475569',
        accent: '#0ea5e9'
      }
    }
  },
  {
    id: 'creative-designer',
    name: 'Creative Designer',
    category: 'creative',
    industry: 'design',
    is_premium: false,
    structure: {
      layout: 'sidebar',
      sections: ['personal', 'summary', 'experience', 'projects', 'education', 'skills'],
      colors: {
        primary: '#0c4a6e',
        secondary: '#7dd3fc',
        accent: '#06b6d4'
      }
    }
  },
  {
    id: 'minimal-tech',
    name: 'Minimal Tech',
    category: 'minimal',
    industry: 'technology',
    is_premium: false,
    structure: {
      layout: 'single-column',
      sections: ['personal', 'summary', 'skills', 'experience', 'projects', 'education'],
      colors: {
        primary: '#18181b',
        secondary: '#71717a',
        accent: '#10b981'
      }
    }
  },
  {
    id: 'professional-standard',
    name: 'Professional Standard',
    category: 'professional',
    is_premium: false,
    structure: {
      layout: 'two-column',
      sections: ['personal', 'experience', 'education', 'skills', 'certifications'],
      colors: {
        primary: '#1e3a8a',
        secondary: '#60a5fa',
        accent: '#2563eb'
      }
    }
  },
  {
    id: 'modern-manager',
    name: 'Modern Manager',
    category: 'modern',
    industry: 'management',
    is_premium: true,
    structure: {
      layout: 'two-column',
      sections: ['personal', 'summary', 'experience', 'education', 'skills', 'certifications'],
      colors: {
        primary: '#831843',
        secondary: '#f472b6',
        accent: '#ec4899'
      }
    }
  },
  {
    id: 'creative-portfolio',
    name: 'Creative Portfolio',
    category: 'creative',
    industry: 'creative',
    is_premium: true,
    structure: {
      layout: 'sidebar',
      sections: ['personal', 'summary', 'projects', 'experience', 'education', 'skills'],
      colors: {
        primary: '#4c1d95',
        secondary: '#c4b5fd',
        accent: '#8b5cf6'
      }
    }
  },
  {
    id: 'executive-leader',
    name: 'Executive Leader',
    category: 'professional',
    industry: 'executive',
    is_premium: true,
    structure: {
      layout: 'single-column',
      sections: ['personal', 'summary', 'experience', 'education', 'certifications', 'skills'],
      colors: {
        primary: '#1e293b',
        secondary: '#94a3b8',
        accent: '#0284c7'
      }
    }
  },
  {
    id: 'startup-founder',
    name: 'Startup Founder',
    category: 'modern',
    industry: 'startup',
    is_premium: true,
    structure: {
      layout: 'two-column',
      sections: ['personal', 'summary', 'experience', 'projects', 'education', 'skills'],
      colors: {
        primary: '#047857',
        secondary: '#6ee7b7',
        accent: '#10b981'
      }
    }
  },
  {
    id: 'data-scientist',
    name: 'Data Scientist',
    category: 'professional',
    industry: 'data science',
    is_premium: true,
    structure: {
      layout: 'two-column',
      sections: ['personal', 'summary', 'skills', 'experience', 'projects', 'education', 'certifications'],
      colors: {
        primary: '#1e40af',
        secondary: '#93c5fd',
        accent: '#3b82f6'
      }
    }
  },
  {
    id: 'healthcare-pro',
    name: 'Healthcare Professional',
    category: 'classic',
    industry: 'healthcare',
    is_premium: false,
    structure: {
      layout: 'single-column',
      sections: ['personal', 'summary', 'education', 'certifications', 'experience', 'skills'],
      colors: {
        primary: '#065f46',
        secondary: '#6ee7b7',
        accent: '#059669'
      }
    }
  },
  {
    id: 'marketing-specialist',
    name: 'Marketing Specialist',
    category: 'modern',
    industry: 'marketing',
    is_premium: false,
    structure: {
      layout: 'two-column',
      sections: ['personal', 'summary', 'experience', 'skills', 'projects', 'education'],
      colors: {
        primary: '#9f1239',
        secondary: '#fda4af',
        accent: '#f43f5e'
      }
    }
  },
  {
    id: 'sales-executive',
    name: 'Sales Executive',
    category: 'professional',
    industry: 'sales',
    is_premium: false,
    structure: {
      layout: 'two-column',
      sections: ['personal', 'summary', 'experience', 'education', 'skills'],
      colors: {
        primary: '#b45309',
        secondary: '#fbbf24',
        accent: '#f59e0b'
      }
    }
  },
  {
    id: 'engineer-modern',
    name: 'Software Engineer',
    category: 'minimal',
    industry: 'engineering',
    is_premium: false,
    structure: {
      layout: 'single-column',
      sections: ['personal', 'skills', 'experience', 'projects', 'education'],
      colors: {
        primary: '#1e293b',
        secondary: '#64748b',
        accent: '#22c55e'
      }
    }
  },
  {
    id: 'academic-researcher',
    name: 'Academic Researcher',
    category: 'classic',
    industry: 'academia',
    is_premium: true,
    structure: {
      layout: 'single-column',
      sections: ['personal', 'education', 'experience', 'projects', 'certifications', 'skills'],
      colors: {
        primary: '#172554',
        secondary: '#93c5fd',
        accent: '#3b82f6'
      }
    }
  },
  {
    id: 'consultant-pro',
    name: 'Management Consultant',
    category: 'professional',
    industry: 'consulting',
    is_premium: true,
    structure: {
      layout: 'two-column',
      sections: ['personal', 'summary', 'experience', 'education', 'skills', 'certifications'],
      colors: {
        primary: '#1e293b',
        secondary: '#94a3b8',
        accent: '#0284c7'
      }
    }
  },
  {
    id: 'product-manager',
    name: 'Product Manager',
    category: 'modern',
    industry: 'product',
    is_premium: true,
    structure: {
      layout: 'two-column',
      sections: ['personal', 'summary', 'experience', 'skills', 'projects', 'education'],
      colors: {
        primary: '#4c1d95',
        secondary: '#c4b5fd',
        accent: '#8b5cf6'
      }
    }
  },
  {
    id: 'ux-designer',
    name: 'UX Designer',
    category: 'creative',
    industry: 'design',
    is_premium: true,
    structure: {
      layout: 'sidebar',
      sections: ['personal', 'summary', 'projects', 'experience', 'skills', 'education'],
      colors: {
        primary: '#be123c',
        secondary: '#fda4af',
        accent: '#e11d48'
      }
    }
  },
  {
    id: 'legal-professional',
    name: 'Legal Professional',
    category: 'classic',
    industry: 'legal',
    is_premium: false,
    structure: {
      layout: 'single-column',
      sections: ['personal', 'education', 'certifications', 'experience', 'skills'],
      colors: {
        primary: '#0f172a',
        secondary: '#475569',
        accent: '#0369a1'
      }
    }
  },
  {
    id: 'entry-level',
    name: 'Entry Level Fresh',
    category: 'minimal',
    is_premium: false,
    structure: {
      layout: 'single-column',
      sections: ['personal', 'summary', 'education', 'projects', 'skills', 'experience'],
      colors: {
        primary: '#1e3a8a',
        secondary: '#93c5fd',
        accent: '#3b82f6'
      }
    }
  }
];

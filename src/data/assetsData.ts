import type {
  AssetCategory,
  AssetSubcategory,
  AssetLicense,
  DigitalAsset,
} from '../types/asset.types';

export const assetCategories: AssetCategory[] = [
  {
    id: 'cat-1',
    name: 'Prompt Packs',
    slug: 'prompt-packs',
    description: 'Curated collections of AI prompts for various use cases',
    icon: 'Sparkles',
    sortOrder: 1,
    isActive: true,
  },
  {
    id: 'cat-2',
    name: 'Datasets',
    slug: 'datasets',
    description: 'High-quality data collections for training and analysis',
    icon: 'Database',
    sortOrder: 2,
    isActive: true,
  },
  {
    id: 'cat-3',
    name: 'Playbooks',
    slug: 'playbooks',
    description: 'Step-by-step guides and frameworks for business processes',
    icon: 'BookOpen',
    sortOrder: 3,
    isActive: true,
  },
  {
    id: 'cat-4',
    name: 'Creative Bundles',
    slug: 'creative-bundles',
    description: 'Design assets, templates, and creative resources',
    icon: 'Palette',
    sortOrder: 4,
    isActive: true,
  },
  {
    id: 'cat-5',
    name: 'Templates',
    slug: 'templates',
    description: 'Ready-to-use templates for documents, presentations, and more',
    icon: 'FileText',
    sortOrder: 5,
    isActive: true,
  },
];

export const assetSubcategories: AssetSubcategory[] = [
  { id: 'sub-1', categoryId: 'cat-1', name: 'Sales', slug: 'sales', description: 'Sales-focused prompts and tools', sortOrder: 1, isActive: true },
  { id: 'sub-2', categoryId: 'cat-1', name: 'Marketing', slug: 'marketing', description: 'Marketing content and campaigns', sortOrder: 2, isActive: true },
  { id: 'sub-3', categoryId: 'cat-1', name: 'Operations', slug: 'operations', description: 'Operational efficiency prompts', sortOrder: 3, isActive: true },
  { id: 'sub-4', categoryId: 'cat-1', name: 'Content', slug: 'content', description: 'Content creation and writing', sortOrder: 4, isActive: true },
  { id: 'sub-5', categoryId: 'cat-2', name: 'Analytics', slug: 'analytics', description: 'Data for analysis and insights', sortOrder: 1, isActive: true },
  { id: 'sub-6', categoryId: 'cat-2', name: 'Training', slug: 'training', description: 'Machine learning training data', sortOrder: 2, isActive: true },
  { id: 'sub-7', categoryId: 'cat-3', name: 'Strategy', slug: 'strategy', description: 'Strategic planning frameworks', sortOrder: 1, isActive: true },
  { id: 'sub-8', categoryId: 'cat-3', name: 'Design', slug: 'design', description: 'Design process playbooks', sortOrder: 2, isActive: true },
  { id: 'sub-9', categoryId: 'cat-4', name: 'Graphics', slug: 'graphics', description: 'Graphic design assets', sortOrder: 1, isActive: true },
  { id: 'sub-10', categoryId: 'cat-5', name: 'Business', slug: 'business', description: 'Business document templates', sortOrder: 1, isActive: true },
];

export const assetLicenses: AssetLicense[] = [
  {
    id: 'lic-1',
    name: 'Personal Use',
    slug: 'personal',
    description: 'Use for personal projects only. No commercial use or resale permitted.',
    allowsPersonalUse: true,
    allowsCommercialUse: false,
    allowsResale: false,
    allowsModification: true,
    maxTeamSize: 1,
    sortOrder: 1,
  },
  {
    id: 'lic-2',
    name: 'Commercial License',
    slug: 'commercial',
    description: 'Full commercial rights for use in business projects. Modification allowed. No resale.',
    allowsPersonalUse: true,
    allowsCommercialUse: true,
    allowsResale: false,
    allowsModification: true,
    maxTeamSize: 10,
    sortOrder: 2,
  },
  {
    id: 'lic-3',
    name: 'Enterprise License',
    slug: 'enterprise',
    description: 'Unlimited team use with full commercial rights. Includes resale and white-label permissions.',
    allowsPersonalUse: true,
    allowsCommercialUse: true,
    allowsResale: true,
    allowsModification: true,
    sortOrder: 3,
  },
  {
    id: 'lic-4',
    name: 'Free License',
    slug: 'free',
    description: 'Free for personal and commercial use. Attribution appreciated but not required.',
    allowsPersonalUse: true,
    allowsCommercialUse: true,
    allowsResale: false,
    allowsModification: true,
    sortOrder: 4,
  },
];

const generateAssets = (): DigitalAsset[] => {
  const assets: DigitalAsset[] = [];
  let assetId = 1;

  const promptPacksData = [
    { title: 'Sales Email Mastery Pack', desc: '50+ proven email prompts for outbound sales', price: 29, features: ['Cold outreach templates', 'Follow-up sequences', 'Objection handling'] },
    { title: 'Content Marketing Prompts', desc: 'Complete content strategy prompts for blogs and social', price: 0, features: ['Blog post outlines', 'Social media hooks', 'SEO optimization'] },
    { title: 'Customer Service Excellence', desc: 'AI prompts for exceptional customer support', price: 39, features: ['Response templates', 'Escalation scripts', 'Satisfaction surveys'] },
    { title: 'Product Development Prompts', desc: 'Innovation and ideation prompt collection', price: 49, features: ['Feature brainstorming', 'User story generation', 'PRD templates'] },
    { title: 'Marketing Campaign Generator', desc: '100+ prompts for complete marketing campaigns', price: 59, features: ['Campaign planning', 'Ad copy variations', 'Landing page content'] },
    { title: 'LinkedIn Content Creator', desc: 'Viral LinkedIn post and article prompts', price: 0, features: ['Thought leadership posts', 'Engagement hooks', 'Profile optimization'] },
    { title: 'SEO Content Optimizer', desc: 'Search-optimized content creation prompts', price: 44, features: ['Keyword research', 'Meta descriptions', 'Content structure'] },
    { title: 'Email Newsletter Suite', desc: 'Complete newsletter content creation system', price: 34, features: ['Subject lines', 'Body content', 'CTA optimization'] },
    { title: 'Social Media Manager Pack', desc: 'Multi-platform social content prompts', price: 0, features: ['Platform-specific content', 'Hashtag strategies', 'Engagement tactics'] },
    { title: 'Video Script Generator', desc: 'Professional video scripting prompts', price: 54, features: ['YouTube scripts', 'Ad scripts', 'Tutorial outlines'] },
    { title: 'Copywriting Masterclass', desc: 'Conversion-focused copywriting prompts', price: 69, features: ['Sales pages', 'Email sequences', 'Ad copy'] },
    { title: 'Business Strategy Prompts', desc: 'Strategic planning and analysis prompts', price: 79, features: ['SWOT analysis', 'Market research', 'Competitive analysis'] },
  ];

  promptPacksData.forEach((item, idx) => {
    const tier = item.price === 0 ? 'free' : item.price > 50 ? 'professional' : 'professional';
    const subcats = ['sub-1', 'sub-2', 'sub-4'];

    assets.push({
      id: `asset-${assetId++}`,
      categoryId: 'cat-1',
      subcategoryId: subcats[idx % subcats.length],
      licenseId: tier === 'free' ? 'lic-4' : 'lic-2',
      title: item.title,
      slug: item.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      description: `${item.desc}. This comprehensive collection includes carefully crafted prompts designed by industry experts to help you achieve outstanding results. Each prompt is tested and optimized for maximum effectiveness.`,
      shortDescription: item.desc,
      tier,
      price: item.price,
      fileFormat: 'PDF',
      fileSize: '2.4 MB',
      fileSizeBytes: 2516582,
      version: '2.0',
      previewImages: ['https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg'],
      previewContent: 'Sample prompt: "Create a compelling sales email that addresses [pain point] and highlights [solution] for [target audience]..."',
      downloadUrl: '/downloads/prompt-packs/' + (assetId - 1),
      features: item.features,
      specifications: { 'Format': 'PDF', 'Pages': '25-50', 'Language': 'English', 'Updates': 'Lifetime' },
      includedItems: ['PDF guide', 'Editable templates', 'Usage examples', 'Best practices'],
      downloadCount: Math.floor(Math.random() * 5000) + 500,
      viewCount: Math.floor(Math.random() * 10000) + 1000,
      ratingAverage: 4.2 + Math.random() * 0.8,
      ratingCount: Math.floor(Math.random() * 200) + 50,
      isFeatured: idx < 3,
      isActive: true,
      publishedAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString(),
    });
  });

  const datasetData = [
    { title: 'Customer Sentiment Dataset', desc: '100K+ customer reviews with sentiment labels', price: 149, format: 'CSV' },
    { title: 'E-commerce Product Catalog', desc: '500K products with categories and attributes', price: 0, format: 'JSON' },
    { title: 'Financial Time Series Data', desc: 'Historical stock and crypto data for analysis', price: 199, format: 'CSV' },
    { title: 'Healthcare Records Dataset', desc: 'Anonymized patient data for research', price: 299, format: 'CSV' },
    { title: 'Social Media Engagement Data', desc: 'Millions of posts with engagement metrics', price: 0, format: 'JSON' },
    { title: 'Real Estate Listings Dataset', desc: 'Comprehensive property data with pricing', price: 179, format: 'CSV' },
    { title: 'Job Postings Analysis Dataset', desc: '1M+ job listings with skills and salaries', price: 0, format: 'JSON' },
    { title: 'Weather Patterns Dataset', desc: 'Global weather data spanning 50 years', price: 229, format: 'CSV' },
  ];

  datasetData.forEach((item, idx) => {
    const tier = item.price === 0 ? 'free' : item.price > 200 ? 'enterprise' : 'professional';

    assets.push({
      id: `asset-${assetId++}`,
      categoryId: 'cat-2',
      subcategoryId: idx % 2 === 0 ? 'sub-5' : 'sub-6',
      licenseId: tier === 'free' ? 'lic-4' : tier === 'enterprise' ? 'lic-3' : 'lic-2',
      title: item.title,
      slug: item.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      description: `${item.desc}. This dataset has been carefully cleaned, validated, and structured for immediate use in your analysis or machine learning projects. Includes comprehensive documentation and example code.`,
      shortDescription: item.desc,
      tier,
      price: item.price,
      fileFormat: item.format,
      fileSize: item.format === 'CSV' ? '125 MB' : '85 MB',
      fileSizeBytes: item.format === 'CSV' ? 131072000 : 89128960,
      version: '3.1',
      previewImages: ['https://images.pexels.com/photos/7688465/pexels-photo-7688465.jpeg'],
      previewContent: `Sample data structure: ${item.format === 'CSV' ? 'id,category,value,timestamp' : '{"id": 1, "category": "sample", "metrics": {...}}'}`,
      downloadUrl: '/downloads/datasets/' + (assetId - 1),
      features: ['Clean and validated', 'Well-structured', 'Documentation included', 'Regular updates'],
      specifications: { 'Format': item.format, 'Size': '100MB+', 'Records': '100K+', 'Quality': 'Premium' },
      includedItems: ['Dataset files', 'Data dictionary', 'Sample code', 'Documentation'],
      downloadCount: Math.floor(Math.random() * 3000) + 300,
      viewCount: Math.floor(Math.random() * 8000) + 800,
      ratingAverage: 4.3 + Math.random() * 0.7,
      ratingCount: Math.floor(Math.random() * 150) + 30,
      isFeatured: idx < 2,
      isActive: true,
      publishedAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString(),
    });
  });

  const playbookData = [
    { title: 'Sales Playbook Ultimate', desc: 'Complete sales methodology from prospecting to close', price: 99, sub: 'sub-7' },
    { title: 'Product Launch Framework', desc: 'Step-by-step guide for successful product launches', price: 0, sub: 'sub-7' },
    { title: 'Customer Success Playbook', desc: 'Retention and growth strategies for CS teams', price: 89, sub: 'sub-7' },
    { title: 'Digital Marketing Strategy', desc: 'Comprehensive digital marketing implementation guide', price: 109, sub: 'sub-7' },
    { title: 'Agile Development Playbook', desc: 'Best practices for agile software development', price: 0, sub: 'sub-8' },
    { title: 'Design Thinking Workshop', desc: 'Complete design thinking process and tools', price: 79, sub: 'sub-8' },
    { title: 'Content Strategy Blueprint', desc: 'Build a winning content marketing strategy', price: 94, sub: 'sub-7' },
    { title: 'Growth Hacking Playbook', desc: 'Proven growth tactics for startups', price: 0, sub: 'sub-7' },
  ];

  playbookData.forEach((item, idx) => {
    const tier = item.price === 0 ? 'free' : item.price > 95 ? 'professional' : 'professional';

    assets.push({
      id: `asset-${assetId++}`,
      categoryId: 'cat-3',
      subcategoryId: item.sub,
      licenseId: tier === 'free' ? 'lic-4' : 'lic-2',
      title: item.title,
      slug: item.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      description: `${item.desc}. This playbook includes detailed frameworks, templates, checklists, and real-world examples from successful companies. Perfect for teams looking to implement proven processes.`,
      shortDescription: item.desc,
      tier,
      price: item.price,
      fileFormat: 'PDF',
      fileSize: '15.8 MB',
      fileSizeBytes: 16560128,
      version: '4.0',
      previewImages: ['https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg'],
      previewContent: 'Chapter 1: Foundation - Understanding the core principles and setting up for success...',
      downloadUrl: '/downloads/playbooks/' + (assetId - 1),
      features: ['Step-by-step frameworks', 'Templates included', 'Real case studies', 'Actionable checklists'],
      specifications: { 'Format': 'PDF', 'Pages': '120-200', 'Chapters': '8-12', 'Worksheets': '15+' },
      includedItems: ['Complete playbook', 'Editable templates', 'Worksheets', 'Bonus resources'],
      downloadCount: Math.floor(Math.random() * 4000) + 400,
      viewCount: Math.floor(Math.random() * 9000) + 900,
      ratingAverage: 4.4 + Math.random() * 0.6,
      ratingCount: Math.floor(Math.random() * 180) + 40,
      isFeatured: idx < 2,
      isActive: true,
      publishedAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString(),
    });
  });

  const creativeBundleData = [
    { title: 'Instagram Stories Bundle', desc: '500+ customizable story templates', price: 49 },
    { title: 'Logo Design Toolkit', desc: 'Complete logo creation resources and templates', price: 0 },
    { title: 'Presentation Master Pack', desc: '100+ PowerPoint and Keynote templates', price: 69 },
    { title: 'Social Media Graphics Bundle', desc: '1000+ graphics for all social platforms', price: 79 },
    { title: 'Email Marketing Templates', desc: 'Professional email design templates', price: 0 },
    { title: 'Website UI Kit Pro', desc: 'Complete UI component library for web', price: 99 },
    { title: 'Brand Identity Package', desc: 'Full brand identity design system', price: 129 },
    { title: 'Icon Library Ultimate', desc: '5000+ premium icons in multiple formats', price: 0 },
  ];

  creativeBundleData.forEach((item, idx) => {
    const tier = item.price === 0 ? 'free' : item.price > 80 ? 'professional' : 'professional';

    assets.push({
      id: `asset-${assetId++}`,
      categoryId: 'cat-4',
      subcategoryId: 'sub-9',
      licenseId: tier === 'free' ? 'lic-4' : 'lic-2',
      title: item.title,
      slug: item.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      description: `${item.desc}. Professional-quality creative assets designed by expert designers. Fully customizable and ready to use in your projects. Compatible with popular design tools.`,
      shortDescription: item.desc,
      tier,
      price: item.price,
      fileFormat: 'ZIP',
      fileSize: '245 MB',
      fileSizeBytes: 256901120,
      version: '2.5',
      previewImages: ['https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg'],
      previewContent: 'Preview includes thumbnail gallery of included templates and assets...',
      downloadUrl: '/downloads/creative-bundles/' + (assetId - 1),
      features: ['Fully customizable', 'Multiple formats', 'Professional quality', 'Commercial license'],
      specifications: { 'Format': 'PSD, AI, Figma', 'Files': '100+', 'Resolution': 'High-res', 'Updates': 'Free' },
      includedItems: ['Design files', 'Font licenses', 'Color palettes', 'Usage guide'],
      downloadCount: Math.floor(Math.random() * 6000) + 600,
      viewCount: Math.floor(Math.random() * 12000) + 1200,
      ratingAverage: 4.5 + Math.random() * 0.5,
      ratingCount: Math.floor(Math.random() * 250) + 60,
      isFeatured: idx < 2,
      isActive: true,
      publishedAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString(),
    });
  });

  const templateData = [
    { title: 'Business Proposal Templates', desc: '25 professional proposal templates', price: 39 },
    { title: 'Resume and CV Bundle', desc: 'Modern resume templates for all industries', price: 0 },
    { title: 'Invoice and Quote Templates', desc: 'Professional billing templates', price: 29 },
    { title: 'Project Management Templates', desc: 'Complete PM template collection', price: 49 },
    { title: 'Meeting Notes Templates', desc: 'Structured meeting documentation', price: 0 },
    { title: 'Financial Planning Templates', desc: 'Budget and planning spreadsheets', price: 44 },
  ];

  templateData.forEach((item, idx) => {
    const tier = item.price === 0 ? 'free' : 'professional';

    assets.push({
      id: `asset-${assetId++}`,
      categoryId: 'cat-5',
      subcategoryId: 'sub-10',
      licenseId: tier === 'free' ? 'lic-4' : 'lic-2',
      title: item.title,
      slug: item.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      description: `${item.desc}. Save time with our professionally designed templates. Fully editable and customizable to match your brand. Works with Word, Google Docs, and other popular tools.`,
      shortDescription: item.desc,
      tier,
      price: item.price,
      fileFormat: 'DOCX',
      fileSize: '8.2 MB',
      fileSizeBytes: 8597094,
      version: '1.8',
      previewImages: ['https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg'],
      previewContent: 'Template preview showing professional layout and structure...',
      downloadUrl: '/downloads/templates/' + (assetId - 1),
      features: ['Fully editable', 'Multiple formats', 'Professional design', 'Easy customization'],
      specifications: { 'Format': 'DOCX, PDF', 'Compatibility': 'Word, Google Docs', 'Pages': '5-20', 'Style': 'Modern' },
      includedItems: ['Template files', 'Instructions', 'Font recommendations', 'Color schemes'],
      downloadCount: Math.floor(Math.random() * 7000) + 700,
      viewCount: Math.floor(Math.random() * 14000) + 1400,
      ratingAverage: 4.3 + Math.random() * 0.7,
      ratingCount: Math.floor(Math.random() * 220) + 50,
      isFeatured: idx < 2,
      isActive: true,
      publishedAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString(),
    });
  });

  for (let i = assets.length; i < 210; i++) {
    const categories = assetCategories;
    const category = categories[i % categories.length];
    const subcats = assetSubcategories.filter(s => s.categoryId === category.id);
    const subcat = subcats[i % subcats.length];

    const tierRand = Math.random();
    const tier: 'free' | 'professional' | 'enterprise' =
      tierRand < 0.4 ? 'free' : tierRand < 0.9 ? 'professional' : 'enterprise';

    const price = tier === 'free' ? 0 : tier === 'professional' ?
      Math.floor(Math.random() * 100) + 20 : Math.floor(Math.random() * 200) + 150;

    assets.push({
      id: `asset-${assetId++}`,
      categoryId: category.id,
      subcategoryId: subcat.id,
      licenseId: tier === 'free' ? 'lic-4' : tier === 'enterprise' ? 'lic-3' : 'lic-2',
      title: `${category.name.slice(0, -1)} ${i + 1}: ${subcat.name} Edition`,
      slug: `${category.slug}-${i + 1}-${subcat.slug}`,
      description: `Premium ${category.name.toLowerCase()} focused on ${subcat.name.toLowerCase()}. This comprehensive resource includes everything you need to excel in your projects. Created by industry experts with years of experience.`,
      shortDescription: `Professional ${category.name.toLowerCase()} for ${subcat.name.toLowerCase()} professionals`,
      tier,
      price,
      fileFormat: category.id === 'cat-2' ? 'CSV' : category.id === 'cat-4' ? 'ZIP' : 'PDF',
      fileSize: Math.floor(Math.random() * 50) + 5 + ' MB',
      fileSizeBytes: (Math.floor(Math.random() * 50) + 5) * 1024 * 1024,
      version: '1.' + Math.floor(Math.random() * 10),
      previewImages: ['https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg'],
      downloadUrl: `/downloads/${category.slug}/${assetId - 1}`,
      features: [
        'Professional quality',
        'Easy to customize',
        'Comprehensive documentation',
        'Regular updates',
      ],
      specifications: {
        'Quality': 'Premium',
        'Support': 'Email',
        'Updates': 'Lifetime',
        'License': tier === 'free' ? 'Free' : 'Commercial',
      },
      includedItems: [
        'Main files',
        'Documentation',
        'Examples',
        'Support',
      ],
      downloadCount: Math.floor(Math.random() * 5000) + 100,
      viewCount: Math.floor(Math.random() * 10000) + 500,
      ratingAverage: 3.8 + Math.random() * 1.2,
      ratingCount: Math.floor(Math.random() * 200) + 20,
      isFeatured: Math.random() > 0.9,
      isActive: true,
      publishedAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString(),
    });
  }

  return assets;
};

export const digitalAssets = generateAssets();

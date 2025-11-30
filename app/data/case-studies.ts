export interface CaseStudy {
  slug: string;
  company: string;
  title: string;
  role: string;
  period: string;
  tagline: string;
  type: 'founding-engineer' | 'rescue' | 'studio';
  
  // Hero metrics
  metrics: {
    label: string;
    value: string;
  }[];
  
  // Main content sections
  context: {
    overview: string;
    stage: string;
    teamSize: string;
  };
  
  challenges: string[];
  
  whatIDid: {
    title: string;
    description: string;
    details: string[];
  }[];
  
  impact: {
    label: string;
    description: string;
  }[];
  
  tech: string[];
  
  // Optional media
  coverImage?: string;
  images?: {
    url: string;
    caption: string;
  }[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'tout-technologies',
    company: 'TOUT Technologies',
    title: 'Rebuilding a Failing Social App for Women',
    role: 'Founding Engineer (Full-Stack)',
    period: 'Apr - Aug 2025 (4 months)',
    tagline: 'Took a crashing React Native app from 0 to first stable alpha with 10 users in 3 months.',
    type: 'founding-engineer',
    
    metrics: [
      { label: 'Launch', value: 'First stable alpha in 3 months' },
      { label: 'Crash Reduction', value: '40% faster diagnosis' },
      { label: 'Security', value: '10+ users, zero unauthorized access' },
    ],
    
    context: {
      overview: 'TOUT is building a women-only social platform. When I joined as the first engineer, the React Native app was failing in production—crashes, broken flows, no observability. The founding team needed someone who could rebuild the entire stack and get to a stable alpha for their first user cohort.',
      stage: 'Pre-seed, 0 to alpha',
      teamSize: 'Solo engineer, working with 2 founders',
    },
    
    challenges: [
      'Unstable codebase: App crashed frequently with no error tracking or monitoring',
      'Security gap: No way to enforce women-only access at signup',
      'Zero observability: No insight into what was breaking or when',
      'Timeline pressure: Needed to launch alpha for first 10 users in 3 months',
    ],
    
    whatIDid: [
      {
        title: 'Rebuilt the app from scratch',
        description: 'React Native, TypeScript',
        details: [
          'Refactored core navigation and state management',
          'Fixed memory leaks causing crashes',
          'Established component library for consistency',
          'Set up CI/CD pipeline for automated testing',
        ],
      },
      {
        title: 'Designed invite-only onboarding with OTP verification',
        description: 'Custom auth flow',
        details: [
          'Built custom auth flow enforcing invite codes',
          'Integrated Twilio for SMS-based OTP',
          'Protected community integrity before scaling',
          'Created admin tools for invite management',
        ],
      },
      {
        title: 'Integrated observability stack',
        description: 'Sentry, Grafana, Prometheus',
        details: [
          'Set up error tracking and alerting',
          'Built custom dashboards for user behavior',
          'Reduced crash diagnosis time by 40%+',
          'Implemented real-time monitoring for critical paths',
        ],
      },
    ],
    
    impact: [
      {
        label: 'Delivered first stable alpha on time',
        description: 'Got to 10 users in 3 months with zero critical bugs',
      },
      {
        label: 'Onboarded first 10 women users',
        description: 'Zero unauthorized access, protected community integrity',
      },
      {
        label: 'Enabled team to diagnose issues 40% faster',
        description: 'Accelerated iteration and reduced downtime',
      },
      {
        label: 'Set foundation for scaling',
        description: 'Architecture ready for 100+ users post-launch',
      },
    ],
    
    tech: ['React Native', 'TypeScript', 'Twilio', 'Sentry', 'Grafana', 'Prometheus', 'AWS'],
  },
  
  {
    slug: 'helpar',
    company: 'HELPAR',
    title: 'Scaling a Multi-Tenant NFC Platform',
    role: 'Senior Full-Stack Engineer',
    period: 'Jun 2024 - Present',
    tagline: 'Leading a team to modernize infrastructure and build a platform that scales to thousands of users.',
    type: 'founding-engineer',
    
    metrics: [
      { label: 'Deploy Speed', value: '60% faster' },
      { label: 'Scale', value: '1000+ concurrent users' },
      { label: 'Team', value: 'Leading 5 engineers globally' },
    ],
    
    context: {
      overview: 'HELPAR needed to modernize their aging CRA app and build a new multi-tenant NFC platform for brands to track product interactions. I joined to lead the rebuild and architect the new platform.',
      stage: 'Series A, scaling phase',
      teamSize: 'Leading 5 engineers (global team)',
    },
    
    challenges: [
      'Legacy CRA app: Slow deploys, poor developer experience',
      'Multi-tenancy requirements: Needed to support multiple brands with isolated data',
      'Scale challenges: Needed to handle thousands of concurrent users',
      'Distributed team: Managing engineers across multiple time zones',
    ],
    
    whatIDid: [
      {
        title: 'Led migration to Next.js Turbo monorepo',
        description: 'Modern infrastructure',
        details: [
          'Migrated from CRA to Next.js 14 with Turbo',
          'Reduced deploy times by 60%',
          'Improved developer experience with faster builds',
          'Set up shared component library across apps',
        ],
      },
      {
        title: 'Architected multi-tenant NFC platform',
        description: 'AWS serverless infrastructure',
        details: [
          'Built on AWS Lambda, DynamoDB, and S3',
          'Designed tenant isolation and data security',
          'Created analytics dashboards for brands',
          'Integrated NFC tag reading and tracking',
        ],
      },
      {
        title: 'Scaled to thousands of concurrent users',
        description: 'Zero downtime',
        details: [
          'Implemented auto-scaling infrastructure',
          'Optimized database queries and caching',
          'Set up CDN and edge caching',
          'Monitored performance and fixed bottlenecks',
        ],
      },
    ],
    
    impact: [
      {
        label: 'Reduced deploy times by 60%',
        description: 'Team can ship features faster with confidence',
      },
      {
        label: 'Scaled to 1000+ concurrent users',
        description: 'Zero downtime, auto-scaling infrastructure',
      },
      {
        label: 'Enabled multi-brand platform',
        description: 'Brands can track customer interactions post-purchase',
      },
      {
        label: 'Improved team velocity',
        description: 'Better tooling and processes for global team',
      },
    ],
    
    tech: ['Next.js', 'Turbo', 'AWS Lambda', 'DynamoDB', 'S3', 'TypeScript', 'React'],
  },
  
  {
    slug: 'lumenaut',
    company: 'Lumenaut Studio',
    title: 'Shipping 50+ Sites as a Solo Studio',
    role: 'Studio Owner & Lead Engineer',
    period: '2018 - Present',
    tagline: 'Building a sustainable studio practice delivering high-quality websites and apps for creators and startups.',
    type: 'studio',
    
    metrics: [
      { label: 'Projects Delivered', value: '50+ websites, 20+ apps' },
      { label: 'Client Retention', value: '70% repeat clients' },
      { label: 'Time to Launch', value: 'Avg 2-4 weeks for sites' },
    ],
    
    context: {
      overview: 'Lumenaut is my studio practice, filling the gap between freelance and agency. I work with small businesses, creators, and early-stage startups who need fast, focused development without hiring a full team.',
      stage: 'Ongoing, multiple concurrent clients',
      teamSize: 'Solo with occasional contractors',
    },
    
    challenges: [
      'Balancing multiple concurrent projects and clients',
      'Maintaining quality while moving fast',
      'Building sustainable processes for one-person operation',
      'Managing client expectations and scope creep',
    ],
    
    whatIDid: [
      {
        title: 'Built sustainable studio processes',
        description: 'Templates and systems',
        details: [
          'Created reusable component libraries and templates',
          'Established clear scoping and pricing frameworks',
          'Set up async-first communication with clients',
          'Built tools for rapid prototyping and deployment',
        ],
      },
      {
        title: 'Delivered 50+ websites and 20+ apps',
        description: 'For SMBs and startups',
        details: [
          'E-commerce sites for small businesses',
          'Marketing sites for SaaS startups',
          'Custom web apps with CMS integration',
          'Mobile apps with React Native',
        ],
      },
      {
        title: 'Enhanced CMS/CRM platforms',
        description: 'Custom integrations',
        details: [
          'Built custom Webflow and Framer integrations',
          'Extended CRMs with JavaScript automation',
          'Enabled non-technical teams to self-serve',
          'Reduced client dependency on developers',
        ],
      },
    ],
    
    impact: [
      {
        label: 'Delivered 70+ total projects',
        description: 'Consistent quality across wide range of clients',
      },
      {
        label: '70% repeat client rate',
        description: 'Clients come back for more projects',
      },
      {
        label: 'Enabled non-technical teams',
        description: 'Custom tools let clients move faster independently',
      },
      {
        label: 'Sustainable business model',
        description: 'Profitable studio running for 7+ years',
      },
    ],
    
    tech: ['React', 'Node.js', 'Next.js', 'React Native', 'JavaScript', 'CMS', 'Webflow', 'Framer'],
  },
];


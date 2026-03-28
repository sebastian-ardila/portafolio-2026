import type { ISkill } from '@/app/types'

export const skills: ISkill[] = [
  // Frontend
  {
    name: 'React',
    category: 'frontend',
    icon: 'SiReact',
    years: 7,
    isCore: true,
    usedAt: ['RunMyProcess', 'VeriTran', 'ExcelAscent'],
    description:
      'Led the development team behind the RunMyProcess platform redesign, building 50+ components for the rendering engine and improving load times by 35%. Contributed to transitioning the codebase from pure JS to a component-based architecture at VeriTran. Built a crypto payment frontend at ExcelAscent.',
  },
  {
    name: 'TypeScript',
    category: 'frontend',
    icon: 'SiTypescript',
    years: 5,
    isCore: true,
    usedAt: ['RunMyProcess', 'VeriTran'],
    description:
      'Typed the RunMyProcess low-code rendering engine and 50+ UI components as part of the platform-wide redesign focused on scalable architecture. Enhanced the VeriTran financial platform with strict TypeScript, reducing runtime errors.',
  },
  {
    name: 'JavaScript',
    category: 'frontend',
    icon: 'SiJavascript',
    years: 9,
    isCore: true,
    usedAt: ['RunMyProcess', 'VeriTran', 'ExcelAscent', 'TD7', 'Onyx Soft'],
    description:
      'Core language across all roles. Built interactive frontend features, real-time integrations, and contributed to a full JS-to-TypeScript migration at VeriTran.',
  },
  {
    name: 'HTML/CSS',
    category: 'frontend',
    icon: 'SiHtml5',
    years: 9,
    isCore: false,
    usedAt: ['RunMyProcess', 'VeriTran', 'ExcelAscent', 'TD7'],
    description:
      'Structured and styled interfaces for enterprise low-code platforms, financial apps, and client-facing payment systems.',
  },
  {
    name: 'Redux',
    category: 'frontend',
    icon: 'SiRedux',
    years: 5,
    isCore: false,
    usedAt: ['RunMyProcess', 'VeriTran'],
    description:
      'Managed complex application state in the RunMyProcess low-code platform and VeriTran financial tools, including real-time data flows and drag-and-drop interactions.',
  },
  {
    name: 'Tailwind CSS',
    category: 'frontend',
    icon: 'SiTailwindcss',
    years: 3,
    isCore: false,
    usedAt: ['RunMyProcess', 'Personal Projects'],
    description:
      'Adopted for rapid UI development at RunMyProcess and personal projects like this portfolio, enabling consistent, responsive designs.',
  },

  {
    name: 'Next.js',
    category: 'frontend',
    icon: 'SiNextdotjs',
    years: 3,
    isCore: true,
    usedAt: ['Clinity', 'Personal Projects'],
    description:
      'Built full-stack applications with Next.js for Clinity and multiple personal projects including Copairo, Mudanzas Pereira, Café Independencia, and Casa de Asterión Ediciones.',
  },
  {
    name: 'SEO',
    category: 'frontend',
    icon: 'SiGooglesearchconsole',
    years: 3,
    isCore: false,
    usedAt: ['Clinity', 'Personal Projects'],
    description:
      'Optimized web applications for search engines with structured data, meta tags, Open Graph, sitemap generation, and Core Web Vitals performance tuning.',
  },

  // Real Time & Integration
  {
    name: 'WebSockets',
    category: 'backend',
    icon: 'SiSocketdotio',
    years: 4,
    isCore: false,
    usedAt: ['VeriTran', 'ExcelAscent'],
    description:
      'Integrated WebSocket-based real-time communication for the VeriTran financial platform. Used Socket.io for live cryptocurrency price visualization at ExcelAscent.',
  },
  {
    name: 'GraphQL',
    category: 'backend',
    icon: 'SiGraphql',
    years: 2,
    isCore: false,
    usedAt: ['ExcelAscent'],
    description:
      'Implemented GraphQL to unify the API schema of the crypto payment platform, replacing multiple REST endpoints with a single flexible query layer.',
  },
  {
    name: 'REST APIs',
    category: 'backend',
    icon: 'SiOpenapiinitiative',
    years: 8,
    isCore: false,
    usedAt: ['RunMyProcess', 'VeriTran', 'ExcelAscent'],
    description:
      'Designed and consumed RESTful services for enterprise platforms, financial integrations, and payment systems across multiple companies.',
  },

  // Backend & Data
  {
    name: 'Node.js',
    category: 'backend',
    icon: 'SiNodedotjs',
    years: 6,
    isCore: true,
    usedAt: ['VeriTran', 'ExcelAscent', 'TD7'],
    description:
      'Built backend services and tooling at VeriTran. Developed server-side logic for the crypto platform at ExcelAscent and internal systems at TD7.',
  },
  {
    name: 'Express.js',
    category: 'backend',
    icon: 'SiExpress',
    years: 4,
    isCore: false,
    usedAt: ['ExcelAscent', 'TD7'],
    description:
      'Created REST API servers for the crypto payment system at ExcelAscent and backend web services at Tecnología Digital 7.',
  },
  {
    name: 'MongoDB',
    category: 'backend',
    icon: 'SiMongodb',
    years: 4,
    isCore: false,
    usedAt: ['ExcelAscent', 'TD7'],
    description:
      'Managed large volumes of transactional data for the crypto investment platform at ExcelAscent. Used for data persistence at TD7.',
  },

  {
    name: 'PostgreSQL',
    category: 'backend',
    icon: 'SiPostgresql',
    years: 3,
    isCore: false,
    usedAt: ['Clinity', 'Personal Projects'],
    description:
      'Designed and managed relational databases for web applications, handling migrations, queries, and data modeling.',
  },
  {
    name: 'Python',
    category: 'backend',
    icon: 'SiPython',
    years: 3,
    isCore: false,
    usedAt: ['Personal Projects', 'University'],
    description:
      'Built a PL/0 compiler, automation scripts, and backend services. Used for data processing and AI integrations.',
  },
  {
    name: 'Docker',
    category: 'backend',
    icon: 'SiDocker',
    years: 2,
    isCore: false,
    usedAt: ['Clinity', 'Personal Projects'],
    description:
      'Containerized applications for consistent development and deployment environments. Built multi-stage Docker images for production.',
  },
  {
    name: 'Kubernetes',
    category: 'backend',
    icon: 'SiKubernetes',
    years: 1,
    isCore: false,
    usedAt: ['Clinity'],
    description:
      'Orchestrated containerized deployments, managed scaling and service discovery for cloud-native applications.',
  },
  {
    name: 'AWS S3',
    category: 'backend',
    icon: 'SiAmazons3',
    years: 2,
    isCore: false,
    usedAt: ['Personal Projects', 'Clinity'],
    description:
      'Managed static asset storage, file uploads, and content delivery for web applications.',
  },
  {
    name: 'AWS CloudFront',
    category: 'backend',
    icon: 'SiAmazonwebservices',
    years: 2,
    isCore: false,
    usedAt: ['Personal Projects'],
    description:
      'Configured CDN distribution for fast global content delivery with custom domains and SSL certificates.',
  },
  {
    name: 'AWS EC2',
    category: 'backend',
    icon: 'SiAmazonec2',
    years: 2,
    isCore: false,
    usedAt: ['Personal Projects'],
    description:
      'Deployed and managed virtual servers for web applications and backend services.',
  },
  {
    name: 'AWS ECS',
    category: 'backend',
    icon: 'SiAmazonecs',
    years: 1,
    isCore: false,
    usedAt: ['Clinity'],
    description:
      'Managed container orchestration on AWS for scalable application deployments.',
  },
  {
    name: 'CI/CD',
    category: 'backend',
    icon: 'SiGithubactions',
    years: 3,
    isCore: false,
    usedAt: ['RunMyProcess', 'Personal Projects', 'Clinity'],
    description:
      'Set up continuous integration and deployment pipelines with GitHub Actions, automating testing, building, and deployment workflows.',
  },
  {
    name: 'OpenAI',
    category: 'backend',
    icon: 'SiOpenai',
    years: 2,
    isCore: false,
    usedAt: ['Clinity', 'Personal Projects'],
    description:
      'Integrated OpenAI APIs for AI-powered features including text generation, embeddings, and intelligent assistants.',
  },
  {
    name: 'Anthropic',
    category: 'backend',
    icon: 'SiAnthropic',
    years: 1,
    isCore: false,
    usedAt: ['Clinity', 'Personal Projects'],
    description:
      'Integrated Claude API for AI-powered workflows, code generation, and intelligent automation.',
  },
  {
    name: 'Google Gemini',
    category: 'backend',
    icon: 'SiGooglegemini',
    years: 1,
    isCore: false,
    usedAt: ['Personal Projects'],
    description:
      'Explored Gemini API for multimodal AI capabilities and content generation.',
  },

  // Testing & Quality
  {
    name: 'Jest',
    category: 'tools',
    icon: 'SiJest',
    years: 4,
    isCore: false,
    usedAt: ['RunMyProcess', 'VeriTran'],
    description:
      'Wrote unit and integration tests for low-code platform components at RunMyProcess and financial application modules at VeriTran.',
  },
  {
    name: 'Git',
    category: 'tools',
    icon: 'SiGit',
    years: 9,
    isCore: false,
    usedAt: ['RunMyProcess', 'VeriTran', 'ExcelAscent', 'TD7'],
    description:
      'Version control and collaboration across all professional roles, managing codebases with multiple contributors and release workflows.',
  },
  {
    name: 'Confluence',
    category: 'tools',
    icon: 'SiConfluence',
    years: 3,
    isCore: false,
    usedAt: ['RunMyProcess'],
    description:
      'Maintained technical documentation covering 50+ components for the RunMyProcess rendering engine and internal platform guidelines.',
  },

  {
    name: 'Vercel',
    category: 'tools',
    icon: 'SiVercel',
    years: 3,
    isCore: false,
    usedAt: ['Clinity', 'Personal Projects'],
    description:
      'Deployed and managed Next.js applications on Vercel with custom domains, edge functions, and analytics.',
  },

  // Design
  {
    name: 'Figma',
    category: 'design',
    icon: 'SiFigma',
    years: 4,
    isCore: false,
    usedAt: ['RunMyProcess'],
    description:
      'Led UX prototyping and design for the RunMyProcess platform redesign, defining the new user experience and collaborating with the development team to implement pixel-perfect interfaces.',
  },
  {
    name: 'UI/UX Design',
    category: 'design',
    icon: 'SiAntdesign',
    years: 5,
    isCore: true,
    usedAt: ['RunMyProcess', 'VeriTran'],
    description:
      'Led the implementation of a new user experience at RunMyProcess, driving a comprehensive UI redesign that improved usability by 30% and defining the UX roadmap across 3 product lines. Built visual construction tools with drag & drop at VeriTran.',
  },

  {
    name: 'Accessibility',
    category: 'design',
    icon: 'HiEye',
    years: 4,
    isCore: false,
    usedAt: ['RunMyProcess', 'Personal Projects'],
    description:
      'Implemented WCAG guidelines, semantic HTML, ARIA attributes, and keyboard navigation to ensure inclusive web experiences.',
  },

  // Leadership & Business
  {
    name: 'Stakeholder Management',
    category: 'leadership',
    icon: 'HiUsers',
    years: 5,
    isCore: true,
    usedAt: ['RunMyProcess', 'VeriTran', 'ExcelAscent'],
    description:
      'Aligned technical decisions with business goals across multiple product lines. Bridged communication between engineering, product, and executive teams.',
  },
  {
    name: 'Technical Leadership',
    category: 'leadership',
    icon: 'HiLightningBolt',
    years: 4,
    isCore: true,
    usedAt: ['RunMyProcess', 'VeriTran'],
    description:
      'Led frontend teams, defined technical direction, conducted code reviews, and mentored junior developers. Drove architecture decisions for platform-wide redesigns.',
  },
  {
    name: 'Product Strategy',
    category: 'leadership',
    icon: 'HiChartBar',
    years: 3,
    isCore: false,
    usedAt: ['RunMyProcess'],
    description:
      'Defined the UX roadmap across 3 product lines at RunMyProcess. Prioritized features based on user research, business impact, and technical feasibility.',
  },
  {
    name: 'Agile & Scrum',
    category: 'leadership',
    icon: 'HiRefresh',
    years: 6,
    isCore: false,
    usedAt: ['RunMyProcess', 'VeriTran', 'ExcelAscent'],
    description:
      'Worked in Agile environments with sprint planning, retrospectives, and daily standups. Led sprint ceremonies and backlog refinement sessions.',
  },
  {
    name: 'Cross-functional Collaboration',
    category: 'leadership',
    icon: 'HiPuzzle',
    years: 5,
    isCore: false,
    usedAt: ['RunMyProcess', 'VeriTran'],
    description:
      'Coordinated across engineering, design, QA, and product teams to deliver cohesive features. Facilitated workshops and design reviews.',
  },
  {
    name: 'Strategic Negotiation',
    category: 'leadership',
    icon: 'HiScale',
    years: 3,
    isCore: false,
    usedAt: ['RunMyProcess', 'ExcelAscent'],
    description:
      'Negotiated technical scope, timelines, and resource allocation with stakeholders. Balanced business demands with engineering capacity.',
  },
  {
    name: 'Business Analysis',
    category: 'leadership',
    icon: 'HiDocumentSearch',
    years: 4,
    isCore: false,
    usedAt: ['RunMyProcess', 'VeriTran'],
    description:
      'Translated business requirements into technical specifications. Conducted competitive analysis and user research to inform product decisions.',
  },
]

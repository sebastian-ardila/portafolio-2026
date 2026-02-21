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
]

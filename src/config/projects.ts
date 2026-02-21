import type { IProject } from '@/app/types'

export const projects: IProject[] = [
  {
    id: 'rmp-lowcode',
    title: 'RunMyProcess Low-Code Platform',
    description:
      'Enterprise low-code platform with rendering engine and 50+ custom components.',
    longDescription:
      'Led the complete redesign of the RunMyProcess platform with a focus on scalable architecture, user experience, and performance. Developed and integrated components for the rendering engine, improving page load times by 35% and reducing visual rendering errors by 40%. Optimized the internal low-code platform reducing bugs by 25% and build performance by 20%.',
    technologies: ['React', 'TypeScript', 'Redux', 'Low-Code', 'Confluence'],
    image: '/projects/lowcode.jpg',
    featured: true,
  },
  {
    id: 'veritran-platform',
    title: 'VeriTran Financial Platform',
    description:
      'Low-code platform for financial institutions with real-time features.',
    longDescription:
      'Enhanced a low-code platform serving financial institutions using React.js and TypeScript. Contributed to transitioning from pure JavaScript to a component-based architecture. Integrated WebSockets for real-time communication. Built visual construction tools including drag & drop guides and zoom-based component adjustments. Improved performance via code splitting.',
    technologies: ['React', 'TypeScript', 'WebSockets', 'Node.js', 'Code Splitting'],
    image: '/projects/veritran.jpg',
    featured: true,
  },
  {
    id: 'crypto-platform',
    title: 'Crypto Payment & Investment Platform',
    description:
      'Cryptocurrency payment system with real-time price tracking.',
    longDescription:
      'Built a cryptocurrency payment and investment management system with a dynamic React.js frontend. Led a team of two developers and a UX designer. Migrated the project to Remix.js and implemented GraphQL to unify the API schema. Developed real-time price visualization with Socket.io. Managed MongoDB for large volumes of transactional data.',
    technologies: ['React', 'Remix.js', 'GraphQL', 'Socket.io', 'MongoDB'],
    image: '/projects/crypto.jpg',
    featured: true,
  },
  {
    id: 'compiler-pl0',
    title: 'PL/0 Compiler in Python',
    description:
      'Academic compiler implementation for the PL/0 programming language.',
    longDescription:
      'Built a complete compiler for the PL/0 programming language in Python as part of systems engineering coursework. Implements lexical analysis, parsing, and code generation phases. A demonstration of computer science fundamentals and language theory.',
    technologies: ['Python', 'Compilers', 'Lexical Analysis', 'Parsing'],
    image: '/projects/compiler.jpg',
    repoUrl: 'https://github.com/sebastian-ardila',
    featured: false,
  },
]

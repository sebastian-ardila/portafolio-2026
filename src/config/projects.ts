import type { IProject } from '@/app/types'

export const projects: IProject[] = [
  // --- Work Experience ---
  {
    id: 'clinity',
    title: 'Clinity',
    description:
      'Strategic technology execution partnership platform.',
    longDescription:
      'Collaborating as Senior Full Stack Engineer, Architect, and Business Development at Clinity. Building the platform with Next.js, focusing on scalable architecture and strategic growth.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Full Stack', 'Architecture', 'Business Development', 'Strategic Planning'],
    image: '/projects/lowcode.jpg',
    icon: '/clinity-icon.svg',
    liveUrls: [
      { label: 'clinity.ai', url: 'https://clinity.ai' },
    ],
    featured: true,
    type: 'work',
  },
  {
    id: 'rmp-lowcode',
    title: 'RunMyProcess Low-Code Platform',
    description:
      'Enterprise low-code platform with rendering engine and 50+ custom components.',
    longDescription:
      'Led the complete redesign of the RunMyProcess platform with a focus on scalable architecture, user experience, and performance. Developed and integrated components for the rendering engine, improving page load times by 35% and reducing visual rendering errors by 40%. Optimized the internal low-code platform reducing bugs by 25% and build performance by 20%.',
    technologies: ['React', 'TypeScript', 'Redux', 'Low-Code', 'Confluence', 'Figma', 'Team Leadership', 'UX Roadmapping', 'Cross-cultural Collaboration', 'Technical Consultancy', 'Client Support', 'AI Integration'],
    image: '/projects/lowcode.jpg',
    icon: '/projects/icons/rmp-lowcode.ico',
    liveUrls: [
      { label: 'RunMyProcess', url: 'https://www.runmyprocess.com' },
      { label: 'Fluyenta', url: 'https://www.fluyenta.com' },
    ],
    featured: true,
    type: 'work',
  },
  {
    id: 'veritran-platform',
    title: 'VeriTran Financial Platform',
    description:
      'Low-code platform for financial institutions with real-time features.',
    longDescription:
      'Enhanced a low-code platform serving financial institutions using React.js and TypeScript. Contributed to transitioning from pure JavaScript to a component-based architecture. Integrated WebSockets for real-time communication. Built visual construction tools including drag & drop guides and zoom-based component adjustments. Improved performance via code splitting.',
    technologies: ['React', 'TypeScript', 'WebSockets', 'Node.js', 'Code Splitting', 'Architecture Migration', 'Drag & Drop', 'Low-Code', 'Clean Code', 'SOLID'],
    image: '/projects/veritran.jpg',
    icon: '/projects/icons/veritran-platform.ico',
    liveUrls: [
      { label: 'VeriTran', url: 'https://www.veritran.com' },
    ],
    featured: true,
    type: 'work',
  },

  // --- Personal / Collaboration ---
  {
    id: 'copairo',
    title: 'Copairo',
    description:
      'Web platform for Copairo brand and services. CEO & Founder.',
    longDescription:
      'Built the web presence for Copairo as CEO & Founder, delivering a modern and responsive experience with Next.js that highlights the brand identity and services offered.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Brand Identity', 'Responsive Design', 'Entrepreneurship', 'Business Strategy'],
    image: '/projects/copairo.jpg',
    icon: '/projects/icons/copairo.svg',
    liveUrls: [
      { label: 'copairo.com', url: 'https://copairo.com' },
    ],
    featured: true,
    type: 'personal',
  },
  {
    id: 'mudanzas-pereira',
    title: 'Mudanzas Pereira',
    description:
      'Landing page for a moving services company in Pereira, Colombia.',
    longDescription:
      'Designed and developed a professional landing page for a local moving company using Next.js. Focused on SEO optimization, fast load times, and a clear call-to-action to drive customer inquiries.',
    technologies: ['Next.js', 'React', 'SEO', 'Client Communication', 'Branding'],
    image: '/projects/mudanzas-pereira.jpg',
    icon: '/projects/icons/mudanzas-pereira.svg',
    liveUrls: [
      { label: 'mudanzaspereira.co', url: 'https://mudanzaspereira.co' },
    ],
    featured: true,
    type: 'personal',
  },
  {
    id: 'cafe-independencia',
    title: 'Café Independencia',
    description:
      'Website for a local coffee shop showcasing their menu and story.',
    longDescription:
      'Created a visually appealing website for Café Independencia using Next.js, highlighting their menu, story, and location.',
    technologies: ['Next.js', 'React', 'UX Design', 'Responsive Design'],
    image: '/projects/cafe-independencia.jpg',
    icon: '/projects/icons/cafe-independencia.svg',
    liveUrls: [
      { label: 'Café Independencia', url: 'https://sebastian-ardila.github.io/cafe-independencia/' },
    ],
    featured: true,
    type: 'personal',
  },
  {
    id: 'casa-asterion',
    title: 'Casa de Asterión Ediciones',
    description:
      'Website for an independent publishing house.',
    longDescription:
      'Built the web presence for Casa de Asterión Ediciones using Next.js, an independent publishing house. The site showcases their catalog, authors, and editorial philosophy.',
    technologies: ['Next.js', 'React', 'Content Strategy', 'Editorial UX'],
    image: '/projects/casa-asterion.jpg',
    icon: 'emoji:📚',
    liveUrls: [
      { label: 'casadeasterionediciones.com', url: 'https://www.casadeasterionediciones.com/' },
    ],
    featured: true,
    type: 'personal',
  },
  {
    id: 'pirogramei',
    title: 'Pirogramei',
    description:
      'Web project showcasing Pirogramei content and services.',
    longDescription:
      'Developed a site for Pirogramei with Astro, focusing on clean design, accessibility, and fast performance using GitHub Pages for hosting.',
    technologies: ['Astro', 'HTML', 'CSS', 'JavaScript', 'GitHub Pages', 'Accessibility'],
    image: '/projects/pirogramei.jpg',
    icon: '/projects/icons/pirogramei.svg',
    liveUrls: [
      { label: 'Pirogramei', url: 'https://sebastian-ardila.github.io/pirogramei/' },
    ],
    featured: true,
    type: 'personal',
  },
  {
    id: 'cspereira',
    title: 'CS Pereira',
    description:
      'Couchsurfing community platform for Pereira.',
    longDescription:
      'Developed a web platform for the Couchsurfing community in Pereira, providing information about the travelers community and its activities. Hosted on GitHub Pages with a responsive design.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages', 'Community Building', 'Responsive Design'],
    image: '/projects/cspereira.jpg',
    icon: '/projects/icons/cspereira.ico',
    liveUrls: [
      { label: 'CS Pereira', url: 'https://sebastian-ardila.github.io/cspereira/' },
    ],
    featured: true,
    type: 'collaboration',
  },
  {
    id: 'compiler-pl0',
    title: 'PL/0 Compiler in Python',
    description:
      'Academic compiler implementation for the PL/0 programming language.',
    longDescription:
      'Built a complete compiler for the PL/0 programming language in Python as part of systems engineering coursework. Implements lexical analysis, parsing, and code generation phases. A demonstration of computer science fundamentals and language theory.',
    technologies: ['Python', 'Compilers', 'Lexical Analysis', 'Parsing', 'Problem Solving'],
    image: '/projects/compiler.jpg',
    repoUrl: 'https://github.com/sebastian-ardila',
    featured: false,
    type: 'personal',
  },
]

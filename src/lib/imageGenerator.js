// Dynamic image generator based on blog content
export function generateBlogImage(post) {
  const { title, category, content } = post;
  
  // Extract keywords from title and content
  const keywords = extractKeywords(title, content);
  
  // Determine image type based on category and keywords
  const imageConfig = getImageConfig(category, keywords);
  
  return {
    ...imageConfig,
    alt: `${title} - ${category} blog post`,
    keywords: keywords
  };
}

function extractKeywords(title, content) {
  const text = `${title} ${content}`.toLowerCase();
  
  // Technology keywords
  const techKeywords = {
    'nextjs': ['next.js', 'nextjs', 'react', 'javascript', 'frontend'],
    'react': ['react', 'jsx', 'component', 'hooks', 'state'],
    'javascript': ['javascript', 'js', 'es6', 'node', 'typescript'],
    'css': ['css', 'styling', 'tailwind', 'bootstrap', 'scss'],
    'html': ['html', 'markup', 'semantic', 'accessibility'],
    'api': ['api', 'rest', 'graphql', 'endpoint', 'fetch'],
    'database': ['database', 'sql', 'mongodb', 'postgresql', 'mysql'],
    'cloud': ['cloud', 'aws', 'azure', 'gcp', 'deployment'],
    'ai': ['ai', 'artificial intelligence', 'machine learning', 'ml', 'neural'],
    'security': ['security', 'auth', 'authentication', 'encryption', 'jwt'],
    'performance': ['performance', 'optimization', 'speed', 'lighthouse', 'core web vitals'],
    'seo': ['seo', 'search engine', 'optimization', 'meta', 'semantic'],
    'mobile': ['mobile', 'responsive', 'pwa', 'app', 'ios', 'android'],
    'devops': ['devops', 'ci/cd', 'docker', 'kubernetes', 'deployment'],
    'testing': ['testing', 'jest', 'cypress', 'unit test', 'integration'],
    'design': ['design', 'ui', 'ux', 'figma', 'sketch', 'prototype']
  };
  
  const foundKeywords = [];
  
  for (const [key, terms] of Object.entries(techKeywords)) {
    if (terms.some(term => text.includes(term))) {
      foundKeywords.push(key);
    }
  }
  
  return foundKeywords.length > 0 ? foundKeywords : ['general'];
}

function getImageConfig(category, keywords) {
  // Default configurations for different categories and keywords
  const configs = {
    'Technology': {
      gradient: 'from-blue-500 via-purple-500 to-indigo-600',
      icon: '💻',
      pattern: 'circuit',
      primaryColor: '#3B82F6',
      secondaryColor: '#8B5CF6'
    },
    'Programming': {
      gradient: 'from-green-500 via-teal-500 to-cyan-600',
      icon: '⚡',
      pattern: 'code',
      primaryColor: '#10B981',
      secondaryColor: '#14B8A6'
    },
    'Design': {
      gradient: 'from-pink-500 via-rose-500 to-red-600',
      icon: '🎨',
      pattern: 'geometric',
      primaryColor: '#EC4899',
      secondaryColor: '#F43F5E'
    },
    'AI': {
      gradient: 'from-purple-500 via-violet-500 to-fuchsia-600',
      icon: '🤖',
      pattern: 'neural',
      primaryColor: '#8B5CF6',
      secondaryColor: '#A855F7'
    },
    'Cloud': {
      gradient: 'from-sky-500 via-blue-500 to-indigo-600',
      icon: '☁️',
      pattern: 'cloud',
      primaryColor: '#0EA5E9',
      secondaryColor: '#3B82F6'
    },
    'Security': {
      gradient: 'from-red-500 via-orange-500 to-yellow-600',
      icon: '🔒',
      pattern: 'shield',
      primaryColor: '#EF4444',
      secondaryColor: '#F97316'
    },
    'Performance': {
      gradient: 'from-emerald-500 via-green-500 to-teal-600',
      icon: '⚡',
      pattern: 'speed',
      primaryColor: '#10B981',
      secondaryColor: '#059669'
    },
    'SEO': {
      gradient: 'from-amber-500 via-yellow-500 to-orange-600',
      icon: '🔍',
      pattern: 'search',
      primaryColor: '#F59E0B',
      secondaryColor: '#EAB308'
    },
    'Mobile': {
      gradient: 'from-indigo-500 via-purple-500 to-pink-600',
      icon: '📱',
      pattern: 'mobile',
      primaryColor: '#6366F1',
      secondaryColor: '#8B5CF6'
    },
    'DevOps': {
      gradient: 'from-gray-500 via-slate-500 to-zinc-600',
      icon: '⚙️',
      pattern: 'gear',
      primaryColor: '#6B7280',
      secondaryColor: '#475569'
    },
    'Testing': {
      gradient: 'from-lime-500 via-green-500 to-emerald-600',
      icon: '🧪',
      pattern: 'test',
      primaryColor: '#84CC16',
      secondaryColor: '#10B981'
    },
    'Accessibility': {
      gradient: 'from-cyan-500 via-blue-500 to-indigo-600',
      icon: '♿',
      pattern: 'accessibility',
      primaryColor: '#06B6D4',
      secondaryColor: '#3B82F6'
    },
    'General': {
      gradient: 'from-slate-500 via-gray-500 to-zinc-600',
      icon: '📝',
      pattern: 'general',
      primaryColor: '#64748B',
      secondaryColor: '#6B7280'
    }
  };
  
  // Find the best matching configuration
  let bestMatch = configs['General'];
  
  // First try to match by category
  if (configs[category]) {
    bestMatch = configs[category];
  } else {
    // Try to match by keywords
    for (const keyword of keywords) {
      if (configs[keyword]) {
        bestMatch = configs[keyword];
        break;
      }
    }
  }
  
  return {
    ...bestMatch,
    category: category,
    keywords: keywords
  };
}

// Generate SVG pattern based on content
export function generateSVGPattern(config) {
  const { pattern, primaryColor, secondaryColor } = config;
  
  const patterns = {
    circuit: `
      <defs>
        <pattern id="circuit" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <rect width="40" height="40" fill="${primaryColor}" opacity="0.1"/>
          <path d="M20,0 L20,10 M20,30 L20,40 M0,20 L10,20 M30,20 L40,20 M10,10 L30,10 M10,30 L30,30" 
                stroke="${secondaryColor}" stroke-width="1" opacity="0.3"/>
          <circle cx="20" cy="20" r="2" fill="${primaryColor}" opacity="0.6"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#circuit)"/>
    `,
    code: `
      <defs>
        <pattern id="code" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <rect width="30" height="30" fill="${primaryColor}" opacity="0.05"/>
          <text x="15" y="20" font-family="monospace" font-size="12" fill="${secondaryColor}" 
                opacity="0.4" text-anchor="middle">{ }</text>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#code)"/>
    `,
    geometric: `
      <defs>
        <pattern id="geometric" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
          <rect width="50" height="50" fill="${primaryColor}" opacity="0.1"/>
          <polygon points="25,5 45,20 25,35 5,20" fill="${secondaryColor}" opacity="0.2"/>
          <circle cx="25" cy="20" r="3" fill="${primaryColor}" opacity="0.6"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#geometric)"/>
    `,
    neural: `
      <defs>
        <pattern id="neural" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <rect width="60" height="60" fill="${primaryColor}" opacity="0.1"/>
          <circle cx="15" cy="15" r="3" fill="${secondaryColor}" opacity="0.4"/>
          <circle cx="45" cy="15" r="3" fill="${secondaryColor}" opacity="0.4"/>
          <circle cx="15" cy="45" r="3" fill="${secondaryColor}" opacity="0.4"/>
          <circle cx="45" cy="45" r="3" fill="${secondaryColor}" opacity="0.4"/>
          <circle cx="30" cy="30" r="4" fill="${primaryColor}" opacity="0.6"/>
          <path d="M15,15 L30,30 M45,15 L30,30 M15,45 L30,30 M45,45 L30,30" 
                stroke="${secondaryColor}" stroke-width="1" opacity="0.3"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#neural)"/>
    `,
    cloud: `
      <defs>
        <pattern id="cloud" x="0" y="0" width="80" height="40" patternUnits="userSpaceOnUse">
          <rect width="80" height="40" fill="${primaryColor}" opacity="0.1"/>
          <ellipse cx="20" cy="20" rx="15" ry="8" fill="${secondaryColor}" opacity="0.2"/>
          <ellipse cx="40" cy="20" rx="20" ry="10" fill="${primaryColor}" opacity="0.3"/>
          <ellipse cx="60" cy="20" rx="12" ry="6" fill="${secondaryColor}" opacity="0.2"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#cloud)"/>
    `,
    shield: `
      <defs>
        <pattern id="shield" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <rect width="40" height="40" fill="${primaryColor}" opacity="0.1"/>
          <path d="M20,5 L30,10 L30,25 L20,35 L10,25 L10,10 Z" 
                fill="${secondaryColor}" opacity="0.2"/>
          <path d="M20,5 L30,10 L30,25 L20,35 L10,25 L10,10 Z" 
                stroke="${primaryColor}" stroke-width="1" opacity="0.4" fill="none"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#shield)"/>
    `,
    speed: `
      <defs>
        <pattern id="speed" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
          <rect width="50" height="50" fill="${primaryColor}" opacity="0.1"/>
          <path d="M10,25 Q25,10 40,25 Q25,40 10,25" 
                fill="${secondaryColor}" opacity="0.2"/>
          <circle cx="25" cy="25" r="3" fill="${primaryColor}" opacity="0.6"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#speed)"/>
    `,
    search: `
      <defs>
        <pattern id="search" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <rect width="40" height="40" fill="${primaryColor}" opacity="0.1"/>
          <circle cx="15" cy="15" r="8" fill="none" stroke="${secondaryColor}" 
                  stroke-width="2" opacity="0.3"/>
          <path d="M20,20 L30,30" stroke="${secondaryColor}" stroke-width="2" opacity="0.3"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#search)"/>
    `,
    mobile: `
      <defs>
        <pattern id="mobile" x="0" y="0" width="30" height="50" patternUnits="userSpaceOnUse">
          <rect width="30" height="50" fill="${primaryColor}" opacity="0.1"/>
          <rect x="5" y="5" width="20" height="35" rx="3" fill="${secondaryColor}" opacity="0.2"/>
          <rect x="8" y="8" width="14" height="25" rx="1" fill="${primaryColor}" opacity="0.3"/>
          <circle cx="15" cy="40" r="2" fill="${secondaryColor}" opacity="0.4"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#mobile)"/>
    `,
    gear: `
      <defs>
        <pattern id="gear" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
          <rect width="50" height="50" fill="${primaryColor}" opacity="0.1"/>
          <circle cx="25" cy="25" r="15" fill="${secondaryColor}" opacity="0.2"/>
          <circle cx="25" cy="25" r="8" fill="${primaryColor}" opacity="0.3"/>
          <rect x="23" y="5" width="4" height="10" fill="${secondaryColor}" opacity="0.4"/>
          <rect x="23" y="35" width="4" height="10" fill="${secondaryColor}" opacity="0.4"/>
          <rect x="5" y="23" width="10" height="4" fill="${secondaryColor}" opacity="0.4"/>
          <rect x="35" y="23" width="10" height="4" fill="${secondaryColor}" opacity="0.4"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#gear)"/>
    `,
    test: `
      <defs>
        <pattern id="test" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <rect width="40" height="40" fill="${primaryColor}" opacity="0.1"/>
          <path d="M10,10 L30,10 L30,30 L10,30 Z" fill="${secondaryColor}" opacity="0.2"/>
          <path d="M15,20 L20,25 L25,15" stroke="${primaryColor}" stroke-width="2" 
                opacity="0.6" fill="none"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#test)"/>
    `,
    accessibility: `
      <defs>
        <pattern id="accessibility" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
          <rect width="50" height="50" fill="${primaryColor}" opacity="0.1"/>
          <circle cx="25" cy="20" r="8" fill="${secondaryColor}" opacity="0.2"/>
          <path d="M15,35 L25,25 L35,35" stroke="${primaryColor}" stroke-width="2" 
                opacity="0.4" fill="none"/>
          <circle cx="20" cy="15" r="1" fill="${primaryColor}" opacity="0.6"/>
          <circle cx="30" cy="15" r="1" fill="${primaryColor}" opacity="0.6"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#accessibility)"/>
    `,
    general: `
      <defs>
        <pattern id="general" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <rect width="30" height="30" fill="${primaryColor}" opacity="0.1"/>
          <circle cx="15" cy="15" r="5" fill="${secondaryColor}" opacity="0.2"/>
          <circle cx="15" cy="15" r="2" fill="${primaryColor}" opacity="0.4"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#general)"/>
    `
  };
  
  return patterns[pattern] || patterns.general;
}

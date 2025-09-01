// Mock user data (replace with actual database)
let user = {
  id: '1',
  name: 'Evan Patrick',
  email: 'EvanPatrick3@protonmail.com',
  bio: 'Full-stack developer passionate about creating beautiful and functional web applications.',
  location: 'Available for remote work worldwide',
  resumeUrl: '/resume.pdf',
  skills: [
    'JavaScript',
    'TypeScript',
    'React',
    'Node.js',
    'GraphQL',
    'Apollo Server',
    'CSS3',
    'HTML5',
    'Git',
    'MongoDB',
    'PostgreSQL'
  ],
  socialLinks: {
    github: 'https://github.com/EvanPatrick423',
    linkedin: 'https://linkedin.com/in/evanpatrick423',
    twitter: null,
    website: 'https://evanpatrick.dev'
  }
};

export const userResolvers = {
  Query: {
    me: () => user,
  },

  Mutation: {
    updateProfile: (_: any, args: any) => {
      // Filter out undefined values
      const updates = Object.fromEntries(
        Object.entries(args).filter(([_, value]) => value !== undefined)
      );
      
      user = { ...user, ...updates };
      console.log('👤 Profile updated:', updates);
      
      return user;
    },
  },
};

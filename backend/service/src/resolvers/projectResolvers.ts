import { GraphQLError } from 'graphql';

// Mock project data (replace with actual database)
let projects = [
  {
    id: '1',
    title: 'Portfolio Website',
    description: 'A modern, responsive portfolio website built with React and TypeScript',
    technologies: ['React', 'TypeScript', 'CSS3', 'Vite'],
    githubUrl: 'https://github.com/EvanPatrick423/portfolio',
    liveUrl: 'https://evanpatrick.dev',
    imageUrl: '/images/portfolio-preview.jpg',
    featured: true,
    createdAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: '2',
    title: 'Apollo GraphQL Backend',
    description: 'A robust GraphQL API built with Apollo Server and TypeScript',
    technologies: ['Apollo Server', 'GraphQL', 'TypeScript', 'Node.js'],
    githubUrl: 'https://github.com/EvanPatrick423/portfolio-backend',
    liveUrl: null,
    imageUrl: '/images/graphql-preview.jpg',
    featured: true,
    createdAt: new Date('2024-01-20').toISOString(),
  },
];

let projectIdCounter = 3;

export const projectResolvers = {
  Query: {
    projects: () => projects,
    project: (_: any, { id }: { id: string }) => {
      const project = projects.find(p => p.id === id);
      if (!project) {
        throw new GraphQLError('Project not found', {
          extensions: { code: 'NOT_FOUND' }
        });
      }
      return project;
    },
    featuredProjects: () => projects.filter(p => p.featured),
  },

  Mutation: {
    createProject: (_: any, { input }: { input: any }) => {
      const newProject = {
        id: String(projectIdCounter++),
        ...input,
        createdAt: new Date().toISOString(),
      };
      
      projects.push(newProject);
      console.log('🚀 New project created:', newProject);
      
      return newProject;
    },

    updateProject: (_: any, { id, input }: { id: string; input: any }) => {
      const projectIndex = projects.findIndex(p => p.id === id);
      if (projectIndex === -1) {
        throw new GraphQLError('Project not found', {
          extensions: { code: 'NOT_FOUND' }
        });
      }
      
      projects[projectIndex] = { ...projects[projectIndex], ...input };
      return projects[projectIndex];
    },

    deleteProject: (_: any, { id }: { id: string }) => {
      const projectIndex = projects.findIndex(p => p.id === id);
      if (projectIndex === -1) {
        throw new GraphQLError('Project not found', {
          extensions: { code: 'NOT_FOUND' }
        });
      }
      
      projects.splice(projectIndex, 1);
      console.log('🗑️ Project deleted:', id);
      
      return true;
    },
  },
};

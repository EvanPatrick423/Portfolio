export interface UserModel {
  id: string;
  name: string;
  email: string;
  bio?: string;
  location?: string;
  resumeUrl?: string;
  skills: string[];
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

export interface ProjectModel {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
  createdAt: string;
}

export interface ContactSubmissionModel {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
  status: 'PENDING' | 'PROCESSED' | 'REPLIED';
}

# Portfolio Backend - Apollo GraphQL Server

A modern GraphQL API built with Apollo Server 4, TypeScript, and Node.js for the portfolio website.

## 🚀 Features

- **Apollo Server 4** with TypeScript
- **GraphQL** schema with type safety
- **Contact Form** submissions handling
- **Project Management** API
- **User Profile** management
- **Custom Scalars** (DateTime, EmailAddress)
- **Hot Reload** development with tsx
- **ESLint** code linting
- **GraphQL Code Generation** for types

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn

## 🛠️ Installation

1. Navigate to the backend directory:
```bash
cd Portfolio/backend/service
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file (optional):
```bash
cp .env.example .env
```

## 🏃‍♂️ Development

Start the development server with hot reload:
```bash
npm run dev
```

The GraphQL server will be available at:
- **Server**: http://localhost:4000
- **GraphQL Playground**: http://localhost:4000

## 📜 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm start` - Start production server
- `npm run build` - Build TypeScript to JavaScript
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types
- `npm run gql:generate:types` - Generate TypeScript types from GraphQL schema

## 🔧 Project Structure

```
src/
├── schema/
│   ├── schema.graphql   # GraphQL schema definitions
│   ├── resolvers.ts     # Main resolver aggregation
│   └── index.ts         # Schema exports & loader
├── resolvers/
│   ├── contactResolvers.ts    # Contact form resolvers
│   ├── projectResolvers.ts    # Project management resolvers
│   └── userResolvers.ts       # User profile resolvers
├── types/
│   ├── context.ts       # GraphQL context types
│   └── models.ts        # Data model types
└── server.ts           # Apollo Server setup
```

## 📊 GraphQL Schema

### Queries
- `ping` - Health check
- `projects` - Get all projects
- `project(id)` - Get project by ID
- `featuredProjects` - Get featured projects
- `contacts` - Get contact submissions
- `me` - Get user profile

### Mutations
- `submitContact(input)` - Submit contact form
- `createProject(input)` - Create new project
- `updateProject(id, input)` - Update project
- `deleteProject(id)` - Delete project
- `updateProfile(...)` - Update user profile

### Custom Scalars
- `DateTime` - ISO 8601 date-time strings
- `EmailAddress` - Validated email addresses

## 🔌 Frontend Integration

To connect your React frontend to this GraphQL API:

1. Install Apollo Client in your frontend:
```bash
npm install @apollo/client graphql
```

2. Set up Apollo Client pointing to `http://localhost:4000`

3. Use GraphQL queries and mutations in your React components

## 🚀 Production Deployment

1. Build the project:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## 🔮 Future Enhancements

- Database integration (PostgreSQL/MongoDB)
- Authentication & Authorization
- File upload handling
- Email service integration
- Rate limiting
- Caching with Redis
- WebSocket subscriptions

## 🤝 Contributing

1. Follow TypeScript best practices
2. Add proper error handling
3. Write GraphQL descriptions
4. Update this README for new features

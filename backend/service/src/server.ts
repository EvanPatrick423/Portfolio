import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers } from './resolvers.js';
import { loadFilesSync } from '@graphql-tools/load-files';

// Load environment variables from .env file
dotenv.config();

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs: loadFilesSync('./src/graphql/**/*.graphql'),
  resolvers,
  // Enable GraphQL Playground in development
  introspection: process.env.NODE_ENV !== 'production',
  includeStacktraceInErrorResponses: process.env.NODE_ENV !== 'production',
});

// Start the server
async function startServer() {
  try {
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
      context: async ({ req }) => {
        // Add authentication context here if needed
        return {
          // You can add user authentication, database connections, etc.
          userAgent: req.headers['user-agent'],
        };
      },
    });

    console.log(`🚀 Apollo Server ready at ${url}`);
    console.log(`📊 GraphQL Playground available at ${url}`);
  } catch (error) {
    console.error('❌ Error starting server:', error);
    process.exit(1);
  }
}

// Start the server
startServer();
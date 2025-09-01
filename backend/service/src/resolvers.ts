import { DateTimeResolver, EmailAddressResolver } from 'graphql-scalars';
import { contactResolvers } from './resolvers/contactResolvers.js';
import { projectResolvers } from './resolvers/projectResolvers.js';
import { userResolvers } from './resolvers/userResolvers.js';

export const resolvers = {
  // Custom Scalars
  DateTime: DateTimeResolver,
  EmailAddress: EmailAddressResolver,

  // Root resolvers
  Query: {
    ping: () => 'pong! 🚀 Apollo Server is running with TypeScript and GraphQL!',
    
    // Contact queries
    ...contactResolvers.Query,
    
    // Project queries
    ...projectResolvers.Query,
    
    // User queries
    ...userResolvers.Query,
  },

  Mutation: {
    // Contact mutations
    ...contactResolvers.Mutation,
    
    // Project mutations
    ...projectResolvers.Mutation,
    
    // User mutations
    ...userResolvers.Mutation,
  },

  Subscription: {
    // Contact subscriptions
    ...contactResolvers.Subscription,
  },
};

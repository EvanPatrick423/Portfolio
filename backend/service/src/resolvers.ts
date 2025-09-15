import { DateTimeResolver, EmailAddressResolver } from 'graphql-scalars';
import { contactResolvers } from './resolvers/contactResolvers.js';

export const resolvers = {
  // Custom Scalars
  DateTime: DateTimeResolver,
  EmailAddress: EmailAddressResolver,

  // Root resolvers
  Query: {
    ping: () => 'pong! 🚀 Apollo Server is running with TypeScript and GraphQL!',
    
    // Contact queries
    ...contactResolvers.Query,
  },

  Mutation: {
    // Contact mutations
    ...contactResolvers.Mutation,
  },

  Subscription: {
    // Contact subscriptions
    ...contactResolvers.Subscription,
  },
};

import { GraphQLError } from 'graphql';
import { submitContactResolver } from './submitContactResolver.js';

export const contactResolvers = {
  Query: {
    contacts: () => {
      // Return empty array since we're not storing contacts
      return [];
    },
  },

  Mutation: {
    submitContact: submitContactResolver,

    updateContactStatus: () => {
      // Since we're not storing contacts, this operation is not supported
      throw new GraphQLError('Contact status updates not supported - contacts are not stored in this system', {
        extensions: { code: 'NOT_SUPPORTED' }
      });
    },
  },

  Subscription: {
    contactSubmitted: {
      subscribe: () => {
        // This would typically use a pub/sub system like Redis
        // For now, this is a placeholder
        console.log('Subscription: contactSubmitted - not implemented');
        return {}; // Placeholder return for subscription
      },
    },
  },
};

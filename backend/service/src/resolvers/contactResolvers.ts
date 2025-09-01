import { GraphQLError } from 'graphql';
import { submitContactResolver, contacts } from './submitContactResolver.js';

export const contactResolvers = {
  Query: {
    contacts: () => contacts,
    contact: (_: any, { id }: { id: string }) => {
      const contact = contacts.find(c => c.id === id);
      if (!contact) {
        throw new GraphQLError('Contact not found', {
          extensions: { code: 'NOT_FOUND' }
        });
      }
      return contact;
    },
  },

  Mutation: {
    submitContact: submitContactResolver,

    updateContactStatus: (_: any, { id, status }: { id: string; status: string }) => {
      const contactIndex = contacts.findIndex(c => c.id === id);
      if (contactIndex === -1) {
        throw new GraphQLError('Contact not found', {
          extensions: { code: 'NOT_FOUND' }
        });
      }
      
      contacts[contactIndex].status = status;
      return contacts[contactIndex];
    },
  },

  Subscription: {
    contactSubmitted: {
      subscribe: () => {
        // This would typically use a pub/sub system like Redis
        // For now, this is a placeholder
        console.log('Subscription: contactSubmitted');
      },
    },
  },
};

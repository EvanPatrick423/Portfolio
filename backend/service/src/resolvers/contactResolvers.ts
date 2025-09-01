import { GraphQLError } from 'graphql';

// Mock data store (replace with actual database)
let contacts: any[] = [];
let contactIdCounter = 1;

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
    submitContact: (_: any, { input }: { input: any }) => {
      const newContact = {
        id: String(contactIdCounter++),
        ...input,
        submittedAt: new Date().toISOString(),
        status: 'PENDING',
      };
      
      contacts.push(newContact);
      
      // Here you would typically:
      // 1. Save to database
      // 2. Send email notification
      // 3. Trigger any webhooks
      
      console.log('📧 New contact submission:', newContact);
      
      return newContact;
    },

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

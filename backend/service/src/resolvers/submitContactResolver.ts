import { GraphQLError } from 'graphql';

// Mock data store (replace with actual database)
// Note: In a real application, this would be imported from a shared data layer
const contacts: any[] = [];
let contactIdCounter = 1;

/**
 * Submit Contact Resolver
 * Handles the submission of new contact forms
 */
export const submitContactResolver = (_: any, { input }: { input: any }) => {
  try {
    // Validate required fields
    if (!input.name || !input.email || !input.message) {
      throw new GraphQLError('Missing required fields: name, email, and message are required', {
        extensions: { 
          code: 'VALIDATION_ERROR',
          invalidFields: ['name', 'email', 'message'].filter(field => !input[field])
        }
      });
    }

    // Validate email format (basic validation)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.email)) {
      throw new GraphQLError('Invalid email format', {
        extensions: { 
          code: 'VALIDATION_ERROR',
          invalidFields: ['email']
        }
      });
    }

    // Create new contact entry
    const newContact = {
      id: String(contactIdCounter++),
      ...input,
      submittedAt: new Date().toISOString(),
      status: 'PENDING',
    };
    
    // Store the contact (in a real app, this would be a database save)
    contacts.push(newContact);
    
    // Future enhancements could include:
    // 1. Save to database with proper ORM/query builder
    // 2. Send email notification to admin
    // 3. Send confirmation email to user
    // 4. Trigger webhooks for integrations
    // 5. Add to CRM system
    // 6. Spam detection
    // 7. Rate limiting per IP/email
    
    console.log('📧 New contact submission:', {
      id: newContact.id,
      name: newContact.name,
      email: newContact.email,
      submittedAt: newContact.submittedAt
    });
    
    return newContact;
    
  } catch (error) {
    // Log error for debugging
    console.error('❌ Error submitting contact:', error);
    
    // Re-throw GraphQL errors as-is
    if (error instanceof GraphQLError) {
      throw error;
    }
    
    // Wrap other errors in GraphQL error
    throw new GraphQLError('Failed to submit contact form', {
      extensions: { 
        code: 'INTERNAL_ERROR',
        originalError: error instanceof Error ? error.message : 'Unknown error'
      }
    });
  }
};

// Export the contacts array for other resolvers to use
// In a real app, this would be replaced with database queries
export { contacts, contactIdCounter };

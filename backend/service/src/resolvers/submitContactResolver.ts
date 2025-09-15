import { GraphQLError } from 'graphql';
import { emailService } from '../services/emailService';
import type { ContactInput, ContactSubmission, Mutation } from '../graphql.js';
import { ContactStatus } from '../graphql.js';

/**
 * Submit Contact Resolver
 * Handles the submission of new contact forms
 */
export const submitContactResolver = async (_parent: Mutation, { input }: { input: ContactInput }): Promise<ContactSubmission> => {
  try {
    // Validate required fields
    const missingFields: string[] = [];
    if (!input.name) missingFields.push('name');
    if (!input.email) missingFields.push('email');
    if (!input.message) missingFields.push('message');
    
    if (missingFields.length > 0) {
      throw new GraphQLError('Missing required fields: name, email, and message are required', {
        extensions: { 
          code: 'VALIDATION_ERROR',
          invalidFields: missingFields
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

    console.log('📧 New contact submission:', {
      name: input.name,
      email: input.email,
      subject: input.subject,
      submittedAt: new Date().toISOString()
    });

    // Send email notifications
    try {
      await emailService.sendContactEmails({
        name: input.name,
        email: input.email,
        subject: input.subject,
        message: input.message,
        submittedAt: new Date().toISOString()
      });
      
      console.log('✅ Contact emails sent successfully');
    } catch (emailError) {
      console.error('❌ Failed to send contact emails:', emailError);
      
      // If it's an email configuration error, throw it to the frontend
      if (emailError instanceof GraphQLError) {
        throw emailError;
      }
      
      // For other email errors, throw a user-friendly error
      throw new GraphQLError('Failed to send email notification. Please try again or contact support.', {
        extensions: { 
          code: 'EMAIL_SEND_ERROR',
          originalError: emailError instanceof Error ? emailError.message : 'Unknown email error'
        }
      });
    }
    
    // Return a simple success response
    return {
      id: '1', // Placeholder ID since we're not storing
      name: input.name,
      email: input.email,
      subject: input.subject,
      message: input.message,
      submittedAt: new Date().toISOString(),
      status: ContactStatus.Pending
    };
    
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

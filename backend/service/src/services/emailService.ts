import * as nodemailer from 'nodemailer';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';

// Ensure environment variables are loaded
dotenv.config();

// Email configuration interface
interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
}

// Contact form data interface
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
}

class EmailService {
  private transporter: nodemailer.Transporter | null = null;
  private config: EmailConfig;

  constructor() {
    // Debug: Log raw environment variables
    console.log('🔍 Environment Variables Debug:', {
      SMTP_HOST: process.env.SMTP_HOST,
      SMTP_PORT: process.env.SMTP_PORT,
      SMTP_SECURE: process.env.SMTP_SECURE,
      SMTP_USER: process.env.SMTP_USER,
      hasPassword: !!process.env.SMTP_PASS,
      EMAIL_FROM: process.env.EMAIL_FROM,
      ADMIN_EMAIL: process.env.ADMIN_EMAIL,
      NODE_ENV: process.env.NODE_ENV
    });

    this.config = {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || '',
      from: process.env.EMAIL_FROM || process.env.SMTP_USER || ''
    };

    // Debug: Log the configuration (without showing the password)
    console.log('📧 Email Service Configuration:', {
      host: this.config.host,
      port: this.config.port,
      secure: this.config.secure,
      user: this.config.user,
      hasPassword: !!this.config.pass,
      from: this.config.from
    });

    this.initializeTransporter();
  }

  private initializeTransporter() {
    try {
      // Check if we have the required credentials
      if (!this.config.user || !this.config.pass) {
        console.warn('⚠️ Email credentials not configured. Email functionality will be disabled.');
        console.log('💡 Add SMTP_USER and SMTP_PASS to your .env file to enable email notifications.');
        this.transporter = null;
        return;
      }

      this.transporter = nodemailer.createTransport({
        host: this.config.host,
        port: this.config.port,
        secure: this.config.secure,
        auth: {
          user: this.config.user,
          pass: this.config.pass,
        },
      });

      console.log('📧 Email service initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize email service:', error);
      this.transporter = null;
    }
  }

  // Verify email connection
  async verifyConnection(): Promise<boolean> {
    if (!this.transporter) {
      return false;
    }

    try {
      await this.transporter.verify();
      console.log('✅ Email server connection verified');
      return true;
    } catch (error) {
      console.error('❌ Email server connection failed:', error);
      return false;
    }
  }

  // Generate HTML email template for admin notification
  private generateAdminEmailTemplate(data: ContactFormData): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Contact Form Submission</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
          .field { margin: 15px 0; padding: 10px; background: white; border-radius: 4px; border-left: 4px solid #667eea; }
          .field-label { font-weight: bold; color: #555; }
          .field-value { margin-top: 5px; }
          .message-box { background: white; padding: 15px; border-radius: 4px; border: 1px solid #ddd; white-space: pre-wrap; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎯 New Contact Form Submission</h1>
            <p>You have received a new message through your portfolio contact form.</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="field-label">👤 Name:</div>
              <div class="field-value">${data.name}</div>
            </div>
            <div class="field">
              <div class="field-label">📧 Email:</div>
              <div class="field-value">${data.email}</div>
            </div>
            <div class="field">
              <div class="field-label">📋 Subject:</div>
              <div class="field-value">${data.subject}</div>
            </div>
            <div class="field">
              <div class="field-label">💬 Message:</div>
              <div class="message-box">${data.message}</div>
            </div>
            <div class="field">
              <div class="field-label">⏰ Submitted At:</div>
              <div class="field-value">${new Date(data.submittedAt).toLocaleString()}</div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // Generate HTML email template for user confirmation
  private generateConfirmationEmailTemplate(data: ContactFormData): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Message Received - Thank You!</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
          .summary { background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #667eea; margin: 15px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Message Received!</h1>
            <p>Thank you for reaching out through my portfolio</p>
          </div>
          <div class="content">
            <p>Hi ${data.name},</p>
            
            <p>Thank you for contacting me! I've received your message and will get back to you as soon as possible.</p>
            
            <div class="summary">
              <h3>📋 Your Message Summary:</h3>
              <p><strong>Subject:</strong> ${data.subject}</p>
              <p><strong>Submitted:</strong> ${new Date(data.submittedAt).toLocaleString()}</p>
            </div>
            
            <p>I typically respond within 24-48 hours. If your inquiry is urgent, please don't hesitate to reach out again.</p>
            
            <p>Best regards,<br>
            <strong>Evan Patrick</strong></p>
            
            <div class="footer">
              <p>This is an automated confirmation email. Please do not reply to this message.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // Send admin notification email
  async sendAdminNotification(contactData: ContactFormData): Promise<void> {
    if (!this.transporter) {
      throw new GraphQLError('Email service not configured. Please check your SMTP settings in the .env file.', {
        extensions: { code: 'EMAIL_SERVICE_ERROR' }
      });
    }

    const adminEmail = process.env.ADMIN_EMAIL || this.config.user;

    try {
      const info = await this.transporter.sendMail({
        from: this.config.from,
        to: adminEmail,
        subject: `🎯 New Contact: ${contactData.subject}`,
        html: this.generateAdminEmailTemplate(contactData),
        replyTo: contactData.email,
      });

      console.log('📧 Admin notification sent:', info.messageId);
    } catch (error) {
      console.error('❌ Failed to send admin notification:', error);
      throw new GraphQLError('Failed to send admin notification', {
        extensions: { 
          code: 'EMAIL_SEND_ERROR',
          details: error instanceof Error ? error.message : 'Unknown error'
        }
      });
    }
  }

  // Send user confirmation email
  async sendUserConfirmation(contactData: ContactFormData): Promise<void> {
    if (!this.transporter) {
      throw new GraphQLError('Email service not initialized', {
        extensions: { code: 'EMAIL_SERVICE_ERROR' }
      });
    }

    try {
      const info = await this.transporter.sendMail({
        from: this.config.from,
        to: contactData.email,
        subject: `✅ Message Received - Thank You, ${contactData.name}!`,
        html: this.generateConfirmationEmailTemplate(contactData),
      });

      console.log('📧 User confirmation sent:', info.messageId);
    } catch (error) {
      console.error('❌ Failed to send user confirmation:', error);
      // Don't throw error for user confirmation failure - admin notification is more critical
      console.warn('⚠️ Continuing despite user confirmation failure');
    }
  }

  // Send both admin notification and user confirmation
  async sendContactEmails(contactData: ContactFormData): Promise<void> {
    try {
      // Send admin notification (critical)
      await this.sendAdminNotification(contactData);
      
      // Send user confirmation (nice to have)
      await this.sendUserConfirmation(contactData);
      
      console.log('✅ All contact emails sent successfully');
    } catch (error) {
      // Re-throw admin notification errors
      console.error('❌ Failed to send contact emails:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const emailService = new EmailService();
export default EmailService;

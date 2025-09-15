import React, { useState } from 'react';
import './Contact.css';

// Import Apollo Client hooks
import { useMutation } from '@apollo/client/react';
import { SUBMIT_CONTACT } from '../../graphql/mutations';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const [submitContact] = useMutation(SUBMIT_CONTACT, {
    onCompleted: (data) => {
      console.log('Contact submitted successfully:', data);
      setSubmitMessage('Thank you for your message! I\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    },
    onError: (error) => {
      console.error('Error submitting contact:', error);
      setSubmitMessage('Sorry, there was an error sending your message. Please try again.');
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      await submitContact({
        variables: {
          input: {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message
          }
        }
      });
    } catch (error) {
      // Error handling is done in the onError callback
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-content">
        <div className="contact-header">
          <h1>Get In Touch</h1>
          <p>I'd love to hear from you! Whether you have a project in mind, want to collaborate, or just want to say hello, feel free to reach out.</p>
        </div>

        <div className="email-disclaimer">
          <p><strong>📧 Email Confirmation:</strong> You'll receive a confirmation email from my personal Gmail address after submitting this form. This was the only free smtp server I could find. Please check your spam folder if you don't see it in your inbox.</p>
        </div>

        <div className="contact-body">
          <div className="contact-info">
            <h2>Let's Connect</h2>
            <div className="contact-item">
              <h3>Email</h3>
              <p>EvanPatrick3@protonmail.com</p>
            </div>
            <div className="contact-item">
              <h3>Location</h3>
              <p>Available for remote work worldwide</p>
            </div>
            <div className="contact-item">
              <h3>Response Time</h3>
              <p>I typically respond within 24 hours</p>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="What's this about?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                placeholder="Tell me about your project or just say hello!"
              />
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

            {submitMessage && (
              <div className={`submit-message ${submitMessage.includes('error') ? 'error' : 'success'}`}>
                {submitMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

/**
 * EmailJS integration for contact form submissions.
 * 
 * To enable EmailJS:
 * 1. Sign up at https://www.emailjs.com/
 * 2. Create a service and template
 * 3. Add your public key and service ID to environment variables
 * 4. Uncomment and configure the code below
 */

// Uncomment when ready to use EmailJS
/*
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const sendEmail = async (data: ContactFormData): Promise<{ success: boolean; error?: string }> => {
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    return {
      success: false,
      error: 'EmailJS is not configured. Please add environment variables.',
    };
  }

  try {
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        from_name: data.name,
        from_email: data.email,
        message: data.message,
      },
      EMAILJS_PUBLIC_KEY
    );
    return { success: true };
  } catch (error) {
    console.error('EmailJS error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email',
    };
  }
};
*/

// Placeholder function for now
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const sendEmail = async (data: ContactFormData): Promise<{ success: boolean; error?: string }> => {
  // Fallback to mailto for now
  const subject = encodeURIComponent(`Portfolio Contact: ${data.name}`);
  const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`);
  window.location.href = `mailto:sutharsanmail311@gmail.com?subject=${subject}&body=${body}`;
  return { success: true };
};

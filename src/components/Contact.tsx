import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, Send } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { GradientButton } from "@/components/ui/gradient-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trackEvent } from "@/lib/analytics";

const links = [
  {
    label: "Email",
    href: "mailto:sutharsanmail311@gmail.com",
    icon: Mail,
    value: "sutharsanmail311@gmail.com",
  },
  {
    label: "GitHub",
    href: "https://github.com/sutharsan-311",
    icon: Github,
    value: "github.com/sutharsan-311",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/sutharsan",
    icon: Linkedin,
    value: "linkedin.com/in/sutharsan",
  },
  {
    label: "Location",
    href: "#",
    icon: MapPin,
    value: "Coimbatore, India",
  },
];

// Modern Card Wrapper Component
function ModernCard({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = motion.useReducedMotion ? motion.useReducedMotion() : false;

  return (
    <motion.div 
      className="rounded-2xl overflow-hidden group relative"
      whileHover={!prefersReducedMotion ? {
        y: -6,
        transition: { duration: 0.3, ease: "easeOut" }
      } : {}}
    >
      {/* Glow background */}
      <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/25 via-primary/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none" />
      
      <div className="relative glass-md">
        {children}
      </div>
    </motion.div>
  );
}

/**
 * Contact component - Contact form and social links section.
 * Features a contact form that can be integrated with EmailJS and displays social media links.
 * 
 * To enable EmailJS integration:
 * 1. Install: npm install @emailjs/browser
 * 2. Configure environment variables (VITE_EMAILJS_SERVICE_ID, etc.)
 * 3. Update handleSubmit to use sendEmail from @/lib/emailjs
 */
export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    try {
      const { sendEmail } = await import('@/lib/emailjs');
      const result = await sendEmail({ name, email, message });
      
      if (result.success) {
        setSubmitStatus({ type: 'success', message: 'Message sent successfully! I\'ll get back to you soon.' });
        trackEvent('contact_form_submit', 'Contact', 'success');
        form.reset();
      } else if (result.fallback) {
        // Mailto fallback - show info message
        setSubmitStatus({ type: 'success', message: 'Email client opened. Please send the email manually. I\'ll receive it once you send it.' });
        trackEvent('contact_form_submit', 'Contact', 'fallback_mailto');
      form.reset();
      } else {
        setSubmitStatus({ type: 'error', message: result.error || 'Failed to send message. Please try again.' });
        trackEvent('contact_form_submit', 'Contact', 'error');
      }
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: error instanceof Error ? error.message : 'Failed to send message. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 border-t border-border section-contact" role="region" aria-labelledby="contact-heading">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.15 }}
        >
          <h2 id="contact-heading" className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Get in Touch With Me
          </h2>
          <p className="text-muted-foreground mb-12 max-w-2xl">
            Have a question, want to collaborate, or just want to say hello? I'd love to hear from you. Drop me a message and I'll get back to you soon.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <ModernCard>
                <Card className="h-full border-0 bg-gradient-to-br from-card to-card/50 shadow-sm flex flex-col">
                  <CardHeader className="flex-shrink-0">
                    <CardTitle className="leading-tight min-h-[2.5rem]">Let's Chat</CardTitle>
                    <CardDescription>
                      Whether you have questions about robotics, want to collaborate, or just want to connect — I'm here to help.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow space-y-4">
                    {links.map((link) => {
                      const Icon = link.icon;
                      return (
                        <a
                          key={link.label}
                          href={link.href}
                          target={link.href.startsWith("mailto:") || link.href === "#" ? undefined : "_blank"}
                          rel={link.href.startsWith("mailto:") || link.href === "#" ? undefined : "noopener noreferrer"}
                          aria-label={`Contact via ${link.label}: ${link.value}`}
                          className="flex items-center gap-4 text-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg transition-colors group"
                        >
                          <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider">{link.label}</p>
                            <p className="text-sm font-medium">{link.value}</p>
                          </div>
                        </a>
                      );
                    })}
                  </CardContent>
                </Card>
              </ModernCard>
            </div>

            {/* Contact Form */}
            <ModernCard>
              <Card className="h-full border-0 bg-gradient-to-br from-card to-card/50 shadow-sm flex flex-col">
                <CardHeader className="flex-shrink-0">
                  <CardTitle className="leading-tight min-h-[2.5rem]">Send a Message</CardTitle>
                  <CardDescription>
                    Fill out the form and I'll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <form onSubmit={handleSubmit} className="space-y-4" aria-label="Contact form">
                    <div aria-live="polite" aria-atomic="true" className="sr-only">
                      {submitStatus.type === 'success' && submitStatus.message}
                      {submitStatus.type === 'error' && submitStatus.message}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        required
                        className="bg-secondary/40 border-border/60 hover:border-border focus:border-primary/50 focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-primary/50 transition-colors"
                        aria-required="true"
                        aria-describedby="name-description"
                      />
                      <span id="name-description" className="sr-only">Enter your full name</span>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                        className="bg-secondary/40 border-border/60 hover:border-border focus:border-primary/50 focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-primary/50 transition-colors"
                        aria-required="true"
                        aria-describedby="email-description"
                      />
                      <span id="email-description" className="sr-only">Enter your email address for response</span>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-foreground">
                        Your Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="What would you like to discuss? Feel free to share your thoughts..."
                        required
                        rows={5}
                        className="bg-secondary/40 border-border/60 hover:border-border focus:border-primary/50 focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-primary/50 resize-none transition-colors"
                        aria-required="true"
                        aria-describedby="message-description"
                      />
                      <span id="message-description" className="sr-only">Enter your message or question</span>
                    </div>
                    <GradientButton 
                      type="submit" 
                      variant="variant" 
                      className="w-full min-w-0"
                      aria-label="Submit contact form"
                      disabled={isSubmitting}
                    >
                      <Send className="w-4 h-4 mr-2" aria-hidden="true" />
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </GradientButton>
                    {submitStatus.type && (
                      <p 
                        className={`text-xs text-center ${submitStatus.type === 'success' ? 'text-green-500' : 'text-red-500'}`}
                        role="status"
                        aria-live="polite"
                        aria-atomic="true"
                      >
                        {submitStatus.message}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground text-center">
                      By submitting, you agree to a friendly conversation about robotics 
                    </p>
                  </form>
                </CardContent>
              </Card>
            </ModernCard>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

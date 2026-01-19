import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, Send } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { GradientButton } from "@/components/ui/gradient-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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

// Glowing Card Wrapper Component
function GlowingCard({ children }: { children: React.ReactNode }) {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(
      'ontouchstart' in window || 
      navigator.maxTouchPoints > 0
    );
  }, []);

  return (
    <div className="relative rounded-[1.25rem] md:rounded-[1.5rem] border-[0.75px] border-border p-2 md:p-3">
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={isTouchDevice}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={3}
      />
      <div className="relative rounded-xl border-[0.75px] border-border/50">
        {children}
      </div>
    </div>
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
        form.reset();
      } else if (result.fallback) {
        // Mailto fallback - show info message
        setSubmitStatus({ type: 'success', message: 'Email client opened. Please send the email manually. I\'ll receive it once you send it.' });
      form.reset();
      } else {
        setSubmitStatus({ type: 'error', message: result.error || 'Failed to send message. Please try again.' });
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
              <GlowingCard>
                <Card className="h-full border-0 bg-background shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] flex flex-col">
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
              </GlowingCard>
            </div>

            {/* Contact Form */}
            <GlowingCard>
              <Card className="h-full border-0 bg-background shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] flex flex-col">
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
                        className="bg-background glow-focus focus-visible:ring-offset-0 focus-visible:ring-transparent"
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
                        className="bg-background glow-focus focus-visible:ring-offset-0 focus-visible:ring-transparent"
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
                        className="bg-background resize-none glow-focus focus-visible:ring-offset-0 focus-visible:ring-transparent"
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
            </GlowingCard>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { ImageModal } from "./ImageModal";
import { ExternalLink, Image as ImageIcon } from "lucide-react";

interface Project {
  title: string;
  summary: string;
  details: string[];
  constraints: string[];
  stack: string[];
  outcome: string;
  imageUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
}

interface ProjectCardProps {
  project: Project;
  value: string;
  featured?: boolean;
}

/**
 * ProjectCard component displays a project with expandable details.
 * Supports image gallery, demo links, and GitHub links.
 * 
 * @param project - Project data including title, summary, details, etc.
 * @param value - Unique value for accordion item
 * @param featured - Whether this is a featured project
 */
export function ProjectCard({ project, value, featured = false }: ProjectCardProps) {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Detect touch device - disable glow on mobile/touch for performance
    setIsTouchDevice(
      'ontouchstart' in window || 
      navigator.maxTouchPoints > 0
    );
  }, []);

  return (
    <motion.div 
      className="relative rounded-2xl border border-border/50 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: "easeOut" }}
      whileHover={!prefersReducedMotion && !isTouchDevice ? {
        y: -6,
        boxShadow: "0 20px 50px -12px rgba(199, 210, 254, 0.1)",
        transition: { duration: 0.3, ease: "easeOut" }
      } : {}}
    >
      {/* Inner Content Card */}
      <motion.div 
        className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-card to-card/50 border border-border/40 shadow-sm"
        whileHover={!prefersReducedMotion && !isTouchDevice ? {
          borderColor: "hsl(199 100% 45% / 0.3)",
          transition: { duration: 0.3 }
        } : {}}
      >
        <AccordionItem
          value={value}
          className="border-0 bg-transparent data-[state=open]:bg-transparent"
        >
          <AccordionTrigger 
            id={`${value}-trigger`}
            className="w-full px-6 md:px-8 py-6 text-left hover:bg-primary/5 transition-all duration-200 hover:no-underline group"
            aria-expanded={value === "project-0" || value === "project-1" || value === "project-2" ? undefined : false}
            aria-controls={`${value}-content`}
          >
            <div className="flex-1 min-w-0 text-left">
              <motion.h3 
                className="text-lg md:text-xl font-semibold text-foreground mb-2 leading-tight"
                whileHover={!prefersReducedMotion ? {
                  x: 2,
                  transition: { duration: 0.2 }
                } : {}}
              >
                {project.title}
              </motion.h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed group-hover:text-foreground/70 transition-colors duration-200">
                {project.summary}
              </p>
            </div>
          </AccordionTrigger>

          <AccordionContent 
            id={`${value}-content`}
            className="px-6 md:px-8 pb-8 pt-4 border-t border-border/30"
            role="region"
            aria-labelledby={`${value}-trigger`}
          >
            <div className="space-y-6 pt-2">
              <div>
                <h4 className="text-sm font-mono text-muted-foreground uppercase tracking-wider mb-3">
                  Implementation
                </h4>
                <ul className="space-y-2">
                  {project.details.map((detail, i) => (
                    <li key={i} className="text-sm text-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">·</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-mono text-muted-foreground uppercase tracking-wider mb-3">
                  Constraints
                </h4>
                <ul className="space-y-2">
                  {project.constraints.map((constraint, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-muted-foreground mt-1">·</span>
                      {constraint}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-mono text-muted-foreground uppercase tracking-wider mb-3">
                  Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech, techIndex) => (
                    <motion.div
                      key={tech}
                      initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
                      whileInView={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={prefersReducedMotion ? { duration: 0 } : {
                        duration: 0.2,
                        delay: techIndex * 0.05
                      }}
                      whileHover={!prefersReducedMotion ? {
                        scale: 1.1,
                        y: -2,
                        transition: { duration: 0.2 }
                      } : {}}
                    >
                      <Badge
                        variant="outline"
                        className="font-mono text-xs text-muted-foreground bg-secondary border-border hover:border-primary/50 hover:bg-primary/5 hover:text-foreground transition-all duration-200 cursor-default"
                      >
                        {tech}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-mono text-muted-foreground uppercase tracking-wider mb-3">
                  Outcome
                </h4>
                <p className="text-sm text-foreground">
                  {project.outcome}
                </p>
              </div>

              {(project.imageUrl || project.demoUrl || project.githubUrl) && (
                <div>
                  <h4 className="text-sm font-mono text-muted-foreground uppercase tracking-wider mb-3">
                    Links & Media
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.imageUrl && (
                      <motion.button
                        onClick={() => setIsImageModalOpen(true)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-foreground bg-secondary border border-border rounded hover:border-primary/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        aria-label={`View image for ${project.title}`}
                        whileHover={!prefersReducedMotion ? {
                          scale: 1.05,
                          y: -1,
                          transition: { duration: 0.2 }
                        } : {}}
                        whileTap={!prefersReducedMotion ? {
                          scale: 0.95,
                          transition: { duration: 0.1 }
                        } : {}}
                      >
                        <motion.div
                          whileHover={!prefersReducedMotion ? {
                            rotate: [0, -10, 10, -10, 0],
                            transition: { duration: 0.5 }
                          } : {}}
                        >
                          <ImageIcon className="h-3 w-3" />
                        </motion.div>
                        View Image
                      </motion.button>
                    )}
                    {project.demoUrl && (
                      <motion.a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-foreground bg-secondary border border-border rounded hover:border-primary/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        aria-label={`View live demo of ${project.title}`}
                        whileHover={!prefersReducedMotion ? {
                          scale: 1.05,
                          y: -1,
                          transition: { duration: 0.2 }
                        } : {}}
                        whileTap={!prefersReducedMotion ? {
                          scale: 0.95,
                          transition: { duration: 0.1 }
                        } : {}}
                      >
                        <motion.div
                          whileHover={!prefersReducedMotion ? {
                            x: 2,
                            y: -2,
                            transition: { duration: 0.2 }
                          } : {}}
                        >
                          <ExternalLink className="h-3 w-3" />
                        </motion.div>
                        Live Demo
                      </motion.a>
                    )}
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-foreground bg-secondary border border-border rounded hover:border-primary/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        aria-label={`View GitHub repository for ${project.title}`}
                        whileHover={!prefersReducedMotion ? {
                          scale: 1.05,
                          y: -1,
                          transition: { duration: 0.2 }
                        } : {}}
                        whileTap={!prefersReducedMotion ? {
                          scale: 0.95,
                          transition: { duration: 0.1 }
                        } : {}}
                      >
                        <motion.div
                          whileHover={!prefersReducedMotion ? {
                            x: 2,
                            y: -2,
                            transition: { duration: 0.2 }
                          } : {}}
                        >
                          <ExternalLink className="h-3 w-3" />
                        </motion.div>
                        GitHub
                      </motion.a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </motion.div>
      
      {project.imageUrl && (
        <ImageModal
          isOpen={isImageModalOpen}
          onClose={() => setIsImageModalOpen(false)}
          imageUrl={project.imageUrl}
          alt={`${project.title} project image`}
          title={project.title}
        />
      )}
    </motion.div>
  );
}

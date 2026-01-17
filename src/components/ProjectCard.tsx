import { useEffect, useState } from "react";
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

  useEffect(() => {
    // Detect touch device - disable glow on mobile/touch for performance
    setIsTouchDevice(
      'ontouchstart' in window || 
      navigator.maxTouchPoints > 0
    );
  }, []);

  return (
    <div className="relative rounded-[1.25rem] md:rounded-[1.5rem] border-[0.75px] border-border p-2 md:p-3">
      {/* Glowing Effect - Outer Boundary */}
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={isTouchDevice}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={3}
      />

      {/* Inner Content Card - Double Boundary */}
      <div className="relative flex h-full flex-col overflow-hidden rounded-xl border-[0.75px] bg-background shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)]">
        <AccordionItem
          value={value}
          className="border-0 bg-transparent data-[state=open]:bg-transparent"
        >
          <AccordionTrigger className="w-full px-6 py-6 text-left hover:bg-secondary/30 transition-colors duration-150 hover:no-underline">
            <div className="flex-1 min-w-0 text-left">
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2 leading-tight">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                {project.summary}
              </p>
            </div>
          </AccordionTrigger>

          <AccordionContent className="px-6 pb-6 pt-2 border-t border-border/50">
            <div className="space-y-6 pt-4">
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
                  {project.stack.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="font-mono text-xs text-muted-foreground bg-secondary border-border"
                    >
                      {tech}
                    </Badge>
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
                      <button
                        onClick={() => setIsImageModalOpen(true)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-foreground bg-secondary border border-border rounded hover:border-primary/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        aria-label={`View image for ${project.title}`}
                      >
                        <ImageIcon className="h-3 w-3" />
                        View Image
                      </button>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-foreground bg-secondary border border-border rounded hover:border-primary/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        aria-label={`View live demo of ${project.title}`}
                      >
                        <ExternalLink className="h-3 w-3" />
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-foreground bg-secondary border border-border rounded hover:border-primary/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        aria-label={`View GitHub repository for ${project.title}`}
                      >
                        <ExternalLink className="h-3 w-3" />
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </div>
      
      {project.imageUrl && (
        <ImageModal
          isOpen={isImageModalOpen}
          onClose={() => setIsImageModalOpen(false)}
          imageUrl={project.imageUrl}
          alt={`${project.title} project image`}
          title={project.title}
        />
      )}
    </div>
  );
}

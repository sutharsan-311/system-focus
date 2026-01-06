import { useEffect, useState } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { GlowingEffect } from "@/components/ui/glowing-effect";

interface Project {
  title: string;
  summary: string;
  details: string[];
  constraints: string[];
  stack: string[];
  outcome: string;
}

interface ProjectCardProps {
  project: Project;
  value: string;
  featured?: boolean;
}

export function ProjectCard({ project, value, featured = false }: ProjectCardProps) {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device - disable glow on mobile/touch for performance
    setIsTouchDevice(
      'ontouchstart' in window || 
      navigator.maxTouchPoints > 0
    );
  }, []);

  return (
    <div className="relative rounded-lg">
      {/* Glow layer - must be direct child of relative parent */}
      {featured && (
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={isTouchDevice}
          proximity={64}
          inactiveZone={0.15}
          borderWidth={2}
        />
      )}

      {/* Card content - must have relative z-10 and same border radius */}
      <AccordionItem
        value={value}
        className="relative z-10 border border-border rounded-lg bg-background overflow-hidden data-[state=open]:bg-background"
      >
        <AccordionTrigger className="w-full px-6 py-6 text-left hover:bg-secondary/50 transition-colors duration-150 hover:no-underline">
          <div className="flex-1 min-w-0 text-left">
            <h3 className="text-lg font-medium text-foreground mb-2">
              {project.title}
            </h3>
            <p className="text-muted-foreground text-sm">
              {project.summary}
            </p>
          </div>
        </AccordionTrigger>

        <AccordionContent className="px-6 pb-6 pt-2 border-t border-border">
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
          </div>
        </AccordionContent>
      </AccordionItem>
    </div>
  );
}

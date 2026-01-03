import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

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
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border border-border rounded-lg bg-card overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-secondary/50 transition-colors duration-150"
      >
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium text-foreground mb-2">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm">
            {project.summary}
          </p>
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-muted-foreground flex-shrink-0 mt-1 transition-transform duration-150 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2 border-t border-border space-y-6">
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
                    <span
                      key={tech}
                      className="font-mono text-xs text-muted-foreground px-2 py-1 bg-secondary rounded border border-border"
                    >
                      {tech}
                    </span>
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { motion, useInView, useMotionValue, useSpring, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { Code, Briefcase, Award, Rocket } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const stats = [
  {
    icon: Briefcase,
    value: "2+",
    label: "Years Experience",
    description: "Building autonomous systems",
  },
  {
    icon: Code,
    value: "10+",
    label: "Projects Completed",
    description: "Robotics & CV projects",
  },
  {
    icon: Rocket,
    value: "100%",
    label: "Real Deployment",
    description: "Production-ready systems",
  },
  {
    icon: Award,
    value: "Finalist",
    label: "E-Yantra Competition",
    description: "National robotics competition",
  },
];

/**
 * Counter component for animating numbers
 */
function Counter({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);
  
  // Extract number from value (e.g., "2+" -> 2, "100%" -> 100)
  const numericValue = parseInt(value.replace(/\D/g, '')) || 0;
  const suffix = value.replace(/\d/g, ''); // Get non-numeric part
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 200,
  });
  
  // Subscribe to spring value changes
  useMotionValueEvent(springValue, "change", (latest) => {
    setDisplayValue(Math.floor(latest));
  });
  
  useEffect(() => {
    if (isInView) {
      motionValue.set(numericValue);
    }
  }, [isInView, motionValue, numericValue]);
  
  // For non-numeric values like "Finalist", just display as-is
  if (isNaN(numericValue) || numericValue === 0) {
    return (
      <div ref={ref} className="text-3xl md:text-4xl font-bold text-foreground" aria-live="polite">
        {value}
      </div>
    );
  }
  
  return (
    <div ref={ref} className="text-3xl md:text-4xl font-bold text-foreground" aria-live="polite">
      {displayValue}{suffix}
    </div>
  );
}

/**
 * Stats component - Displays key statistics and achievements.
 * Shows metrics like years of experience, projects completed, and achievements with animated icons.
 * Shows skeleton placeholders until the section is in view.
 */
export function Stats() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  
  return (
    <section ref={sectionRef} className="py-12 border-t border-border bg-background" role="region" aria-label="Statistics and achievements">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {!isInView ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="text-center space-y-2">
                <Skeleton className="h-12 w-12 mx-auto rounded-lg mb-3" />
                <Skeleton className="h-8 w-12 mx-auto" />
                <Skeleton className="h-4 w-24 mx-auto" />
                <Skeleton className="h-3 w-32 mx-auto" />
              </div>
            ))
          ) : stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="text-center space-y-2"
                whileHover={!prefersReducedMotion ? {
                  y: -4,
                  transition: { duration: 0.3, ease: "easeOut" }
                } : {}}
              >
                <motion.div 
                  className="flex justify-center mb-3"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 200, 
                    damping: 15,
                    delay: index * 0.1 + 0.2 
                  }}
                  whileHover={!prefersReducedMotion ? {
                    scale: 1.15,
                    rotate: [0, -5, 5, -5, 0],
                    transition: { duration: 0.5 }
                  } : {}}
                >
                  <motion.div 
                    className="p-3 rounded-lg bg-primary/10 transition-colors duration-200"
                    whileHover={!prefersReducedMotion ? {
                      backgroundColor: "rgba(var(--primary), 0.2)",
                      transition: { duration: 0.2 }
                    } : {}}
                  >
                    <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
                  </motion.div>
                </motion.div>
                <Counter value={stat.value} label={stat.label} />
                <div className="text-sm font-semibold text-foreground">
                  {stat.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.description}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

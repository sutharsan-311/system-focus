import { motion, useReducedMotion } from "framer-motion";
import { Award } from "lucide-react";

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

const achievements = [
  {
    title: "BRICS Medallion for Excellence",
    issuer: "BRICS",
    description: "Medallion for excellence in robotics/innovation.",
  },
  {
    title: "SIH 2nd Runner Up, ₹50K",
    issuer: "Smart India Hackathon",
    description: "National hackathon second runner-up prize.",
  },
  {
    title: "Best Innovation Award",
    issuer: "Ignite",
    description: "Award for best innovation.",
  },
  {
    title: "eYRC Semifinalist",
    issuer: "E-Yantra Robotics Competition (IIT Bombay)",
    description: "Semifinalist in national robotics competition.",
  },
];

/**
 * Achievements component - Displays honors and awards in a timeline layout.
 */
export function Achievements() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="achievements"
      className="py-28 border-t border-border section-achievements"
      role="region"
      aria-labelledby="achievements-heading"
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.15 }}
          className="max-w-3xl"
        >
          <h2
            id="achievements-heading"
            className="text-3xl md:text-4xl font-semibold text-foreground mb-12"
          >
            Honors & Awards
          </h2>

          <motion.div
            className="space-y-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {achievements.map((item, index) => (
              <motion.div
                key={item.title}
                variants={staggerItem}
                viewport={{ once: true }}
                transition={
                  prefersReducedMotion ? { duration: 0 } : { duration: 0.4 }
                }
                className="relative pl-8 border-l-2 border-border rounded-lg p-4 hover:bg-primary/5 transition-colors duration-200"
                whileHover={
                  !prefersReducedMotion
                    ? {
                        x: 4,
                        transition: { duration: 0.3, ease: "easeOut" },
                      }
                    : {}
                }
              >
                <motion.div
                  initial={prefersReducedMotion ? {} : { scale: 0 }}
                  whileInView={prefersReducedMotion ? {} : { scale: 1 }}
                  viewport={{ once: true }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { duration: 0.3, delay: index * 0.1 + 0.1 }
                  }
                  className="absolute -left-[9px] top-4 w-4 h-4 rounded-full bg-primary border-2 border-background z-10 shadow-lg shadow-primary/20 flex items-center justify-center"
                  whileHover={
                    !prefersReducedMotion
                      ? {
                          scale: 1.4,
                          boxShadow:
                            "0 0 20px rgba(var(--primary), 0.4)",
                          transition: {
                            type: "spring",
                            stiffness: 400,
                            damping: 10,
                          },
                        }
                      : {}
                  }
                >
                  <Award className="w-2.5 h-2.5 text-primary-foreground" aria-hidden />
                </motion.div>
                <motion.div
                  className="space-y-1"
                  initial={prefersReducedMotion ? {} : { opacity: 0 }}
                  whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
                  viewport={{ once: true }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { duration: 0.3, delay: index * 0.1 }
                  }
                >
                  <h3 className="text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm font-medium text-muted-foreground">
                    {item.issuer}
                  </p>
                  {item.description && (
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Code, Briefcase, Award, Rocket } from "lucide-react";

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
 * Stats component - Displays key statistics and achievements.
 * Shows metrics like years of experience, projects completed, and achievements with animated icons.
 */
export function Stats() {
  return (
    <section className="py-12 border-t border-border bg-black">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="text-center space-y-2"
              >
                <div className="flex justify-center mb-3">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground">
                  {stat.value}
                </div>
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

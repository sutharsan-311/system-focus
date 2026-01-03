import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="py-24 border-t border-border">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.15 }}
          className="max-w-2xl"
        >
          <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-wider mb-4">
            About
          </h2>
          
          <p className="text-lg text-foreground leading-relaxed mb-6">
            I design autonomy stacks that remain stable under noise, drift, and imperfect sensors. 
            My work focuses on real-world deployment—not just simulation.
          </p>
          
          <p className="text-muted-foreground leading-relaxed">
            With experience across perception, navigation, and motion planning, I prioritize 
            system clarity and debuggability. When something fails at 2 AM in a warehouse, 
            the logs should tell you why.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

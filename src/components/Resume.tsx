import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Resume() {
  return (
    <section id="resume" className="py-24 border-t border-border">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.15 }}
          className="max-w-xl"
        >
          <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-wider mb-4">
            Resume
          </h2>
          
          <p className="text-muted-foreground mb-6">
            Download my full resume for detailed work history and technical skills.
          </p>

          <Button variant="outline" size="lg" className="font-medium">
            <Download className="w-4 h-4 mr-2" />
            Download Resume (PDF)
          </Button>

          <p className="text-sm text-muted-foreground mt-4">
            You can also ask the AI assistant about this resume.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

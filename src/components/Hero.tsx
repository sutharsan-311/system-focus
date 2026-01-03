import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const capabilities = [
  "ROS",
  "Navigation",
  "SLAM",
  "Sensor Fusion",
  "Simulation",
  "Deployment",
];

export function Hero() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const openAssistant = () => {
    window.dispatchEvent(new CustomEvent("open-assistant"));
  };

  return (
    <section className="min-h-[90vh] flex flex-col justify-center py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground mb-6">
            Robotics Software Engineer
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
            I build reliable autonomous systems using ROS, perception pipelines, and AI-driven decision layers.
          </p>

          <div className="flex flex-wrap gap-2 mb-12">
            {capabilities.map((cap, index) => (
              <span
                key={cap}
                className="font-mono text-sm text-muted-foreground px-3 py-1.5 bg-secondary rounded border border-border"
              >
                {cap}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <Button 
              variant="default" 
              size="lg"
              onClick={scrollToProjects}
              className="font-medium"
            >
              View Projects
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={openAssistant}
              className="font-medium"
            >
              Ask My AI Assistant
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Accordion } from "@/components/ui/accordion";
import { ProjectCard } from "./ProjectCard";

const projects = [
  {
    title: "Krishi Bot – E-Yantra Robotics Competition",
    summary: "Autonomous agricultural robot with arm manipulation and computer vision, finalist in national competition.",
    details: [
      "Implemented arm manipulation control for pick-and-place agricultural tasks",
      "Developed computer vision pipelines for crop and object recognition",
      "Wrote robot control code in Python integrated with ROS",
      "Collaborated on system integration between perception, planning, and actuation",
    ],
    constraints: [
      "Limited compute resources on embedded hardware",
      "Variable lighting conditions in agricultural environments",
      "Timing constraints for competition task completion",
    ],
    stack: ["ROS", "Python", "OpenCV", "Embedded Systems"],
    outcome: "Finalist in E-Yantra Robotics Competition 2022-2023.",
    imageUrl: "/project-krishi-bot.jpg", // Add your project image to public folder
    githubUrl: "https://github.com/sutharsan-311/krishi-bot", // Update with your actual GitHub repo
  },
  {
    title: "Medical Drone",
    summary: "Emergency response drone with computer vision for person detection and localization.",
    details: [
      "Implemented image segmentation pipelines using OpenCV and Python",
      "Developed object recognition system for emergency response scenarios",
      "Integrated vision system with drone navigation controls",
    ],
    constraints: [
      "Real-time processing requirements for emergency response",
      "Variable outdoor lighting and weather conditions",
      "Weight and power constraints on drone platform",
    ],
    stack: ["Python", "OpenCV", "Image Segmentation", "Drone Systems"],
    outcome: "Functional prototype demonstrating vision-guided emergency response capabilities.",
    imageUrl: "/project-medical-drone.jpg", // Add your project image to public folder
    githubUrl: "https://github.com/sutharsan-311/medical-drone", // Update with your actual GitHub repo
  },
  {
    title: "Flipkart GRID 2.0 – Computer Vision Challenge",
    summary: "Image segmentation system for e-commerce product recognition and classification.",
    details: [
      "Developed image processing pipelines for product segmentation",
      "Implemented object recognition algorithms using OpenCV",
      "Applied computer vision techniques for product classification tasks",
    ],
    constraints: [
      "Large variety of product categories requiring robust classification",
      "Variable image quality and backgrounds",
      "Accuracy requirements for production-level recognition",
    ],
    stack: ["Python", "OpenCV", "Image Segmentation", "Computer Vision"],
    outcome: "Short-listed for Level 2 in Flipkart GRID 2.0 competition.",
    imageUrl: "/project-flipkart-grid.jpg", // Add your project image to public folder
    githubUrl: "https://github.com/sutharsan-311/flipkart-grid", // Update with your actual GitHub repo
  },
];

/**
 * Projects component - Displays featured robotics projects in an accordion layout.
 * Each project can be expanded to show implementation details, constraints, tech stack, and outcomes.
 */
export function Projects() {
  return (
    <section id="projects" className="py-28 border-t border-border section-projects" role="region" aria-labelledby="projects-heading">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.15 }}
        >
          <h2 id="projects-heading" className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Featured Work
          </h2>
          <p className="text-muted-foreground mb-12 max-w-2xl">
            A selection of robotics projects showcasing autonomous systems, perception, and intelligent solutions
          </p>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
          <Accordion type="single" collapsible className="space-y-4 md:space-y-6">
            {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.4 }}
                >
              <ProjectCard
                project={project}
                value={`project-${index}`}
                featured={true}
              />
                </motion.div>
            ))}
          </Accordion>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

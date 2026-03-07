import { motion } from "framer-motion";
import { Accordion } from "@/components/ui/accordion";
import { ProjectCard } from "./ProjectCard";

const projects = [
  {
    title: "UV Hospital Disinfection Robot — Spotless AI",
    summary: "Software engineer on the team deploying autonomous UV disinfection robots across hospital wards at Spotless AI. Full navigation, mapping, and perception stack; on-site deployment and production debugging.",
    details: [
      "Contributed to developing and deploying ROS2-based UV disinfection autonomous mobile robots across hospital environments in real-world production settings — from codebase to on-site operation.",
      "Implemented full autonomous navigation stack using Nav2 (SBPL global planner, DWB local planner), ros2_control hardware integration, and multi-sensor perception (LiDAR, RGB-D, YOLO, PointCloud2).",
      "Managed on-site deployment cycles, debugging real-world sensor and navigation failures under production constraints.",
    ],
    constraints: [
      "Dynamic, human-occupied hospital environments",
      "Production-level reliability and uptime requirements",
      "TF/TF2, sensor noise, timing failures, and planner stability under real-world conditions",
    ],
    stack: ["ROS2", "Nav2", "ros2_control", "LiDAR", "RGB-D", "Python", "C++"],
    outcome: "Deployed in live hospital settings; robots operate autonomously in production.",
  },
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
  {
    title: "LabConnect – Role-Based Collaboration Platform",
    summary: "Full-stack web application for managing lab registrations, attendance, and collaboration within a Product Innovation Center, enabling structured interaction between students, faculty, industry experts, and administrators.",
    details: [
      "Contributed to UI/UX design and layout, focusing on usability and role clarity",
      "Designed intuitive dashboards for Students, Faculty, Industry Experts, and Admins",
      "Structured user flows for lab registration, request handling, and discussion forums",
      "Collaborated with backend and API teams to align UI behavior with system logic",
      "Implemented role-based access control for Admin, Faculty, Student, and Industry users",
      "Developed lab creation, event management, and full CRUD operations (Admin)",
      "Built attendance management and request approval workflows (Faculty)",
      "Created discussion forum enabling cross-role collaboration using REST APIs",
    ],
    constraints: [
      "Multi-role system requiring clear permission boundaries",
      "Real-time interaction requirements for collaboration features",
      "Complex user flows across different user types",
    ],
    stack: ["ReactJS", "Spring Boot", "MySQL", "Axios", "Ngrok", "CSS"],
    outcome: "While my primary focus is robotics, this project reflects my ability to collaborate across software domains, design usable systems, and work in multi-disciplinary teams—skills that directly translate to complex robotics systems.",
    githubUrl: "https://github.com/RAVIVARMA0707/Lab-Connect-Role-Based-Collaboration-Platform",
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
          <p className="text-muted-foreground mb-8 max-w-2xl">
            A selection of robotics projects showcasing autonomous systems, perception, and intelligent solutions, along with additional software projects demonstrating cross-domain collaboration capabilities
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

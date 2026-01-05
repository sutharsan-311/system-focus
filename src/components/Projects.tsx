import { motion } from "framer-motion";
import { Accordion } from "@/components/ui/accordion";
import { ProjectCard } from "./ProjectCard";

const projects = [
  {
    title: "ROS Developer – Spotless AI",
    summary: "Built perception, mapping, and navigation systems for deployed autonomous robots.",
    details: [
      "Developed perception pipelines using OpenCV, YOLO, and point cloud data for object detection and image segmentation",
      "Built ROS nodes for sensor data synchronization (RGB + Depth), real-time point cloud processing, and occupancy grid updates",
      "Integrated navigation stacks using Move Base, SPBL, and DWB planners for autonomous movement",
      "Created mapping pipelines: Occupancy Grid Maps, Gmapping, Semantic Grids, edge/corner detection, and map smoothing",
      "Published markers, maps, and costmaps for downstream planning systems",
    ],
    constraints: [
      "Sensor noise requiring robust filtering and validation",
      "Transformation mismatches between sensor frames",
      "Planner failures under real-world dynamic conditions",
    ],
    stack: ["ROS/ROS2", "Python", "C++", "OpenCV", "YOLO", "LiDAR", "Depth Cameras"],
    outcome: "Deployed systems running on real hardware with integrated perception, mapping, and navigation stacks.",
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
  },
  {
    title: "Small Scale Digital Twin",
    summary: "Real-time simulation and lifecycle prediction system for physical assets.",
    details: [
      "Building digital twin framework for real-time analysis and simulation",
      "Implementing lifecycle prediction models based on sensor data",
      "Integrating simulation with real-world sensor inputs",
    ],
    constraints: [
      "Synchronization between physical and digital systems",
      "Real-time data processing requirements",
      "Accuracy of predictive models under varying conditions",
    ],
    stack: ["Simulation", "MATLAB", "Blender", "Python"],
    outcome: "Ongoing project focused on predictive analysis and simulation fidelity.",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-24 border-t border-border">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.15 }}
        >
          <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-wider mb-8">
            Projects
          </h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                value={`project-${index}`}
              />
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

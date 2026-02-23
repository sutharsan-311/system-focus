import { motion, useReducedMotion } from "framer-motion";

const skillCategories = [
  {
    title: "Robotics & ROS",
    skills: [
      "ROS2",
      "ROS1",
      "nav2",
      "ros2_control",
      "tf2",
      "MoveIt",
      "Gmapping",
      "SLAM",
    ],
  },
  {
    title: "Perception",
    skills: [
      "OpenCV",
      "YOLO",
      "PointCloud2",
      "Image Segmentation",
      "Object Detection",
      "RGB-D Fusion",
    ],
  },
  {
    title: "Navigation",
    skills: [
      "SBPL Planner",
      "DWB Planner",
      "Path Planning",
      "Localization",
      "AMCL",
      "Costmap Tuning",
    ],
  },
  {
    title: "Programming",
    skills: [
      "Python",
      "C++",
      "Bash",
      "CMake",
    ],
  },
  {
    title: "Tools",
    skills: [
      "Ubuntu",
      "Gazebo",
      "RViz2",
      "Git",
      "Docker",
    ],
  },
  {
    title: "Systems",
    skills: [
      "Hardware Integration",
      "Real-time Systems",
      "System Debugging",
      "Performance Optimization",
    ],
  },
];

/**
 * Skills component - Displays technical stack organized by categories.
 * Shows skills in a grid layout with hover effects and organized by domain (Robotics, Perception, Navigation, etc.).
 */
export function Skills() {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <section id="skills" className="py-28 border-t border-border section-skills" role="region" aria-labelledby="skills-heading">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.15 }}
        >
          <h2 id="skills-heading" className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Technical Stack
          </h2>
          <p className="text-muted-foreground mb-12 max-w-2xl">
            A comprehensive toolkit for building intelligent robotic systems
          </p>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {skillCategories.map((category, index) => (
              <motion.div 
                key={index} 
                className="space-y-3"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.4 }}
              >
                <motion.h3 
                  className="text-base font-semibold text-foreground"
                  initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
                  whileInView={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, delay: index * 0.1 }}
                  whileHover={!prefersReducedMotion ? {
                    scale: 1.05,
                    x: 2,
                    transition: { duration: 0.2, ease: "easeOut" }
                  } : {}}
                >
                  {category.title}
                </motion.h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      className="text-xs text-muted-foreground font-mono px-3 py-1.5 bg-secondary/40 rounded-lg border border-border/60 hover:border-primary/50 hover:bg-primary/10 hover:text-foreground cursor-default focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200"
                      tabIndex={0}
                      role="text"
                      aria-label={`Skill: ${skill}`}
                      initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
                      whileInView={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={prefersReducedMotion ? { duration: 0 } : {
                        duration: 0.3,
                        delay: index * 0.08 + skillIndex * 0.02
                      }}
                      whileHover={!prefersReducedMotion ? {
                        scale: 1.08,
                        y: -2,
                        transition: { duration: 0.2, ease: "easeOut" }
                      } : {}}
                      whileFocus={!prefersReducedMotion ? {
                        scale: 1.08,
                        y: -2,
                        transition: { duration: 0.2, ease: "easeOut" }
                      } : {}}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

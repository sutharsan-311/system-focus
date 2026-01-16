import { motion } from "framer-motion";

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

export function Skills() {
  return (
    <section id="skills" className="py-24 border-t border-border">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.15 }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Technical Stack
          </h2>
          <p className="text-muted-foreground mb-12 max-w-2xl">
            A comprehensive toolkit for building intelligent robotic systems
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {skillCategories.map((category, index) => (
              <div key={index} className="space-y-3">
                <h3 className="text-base font-semibold text-foreground">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs text-muted-foreground font-mono px-2.5 py-1 bg-secondary rounded border border-border hover:border-primary/50 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

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
      "Topics",
      "Services",
      "Actions",
      "Occupancy Grid Mapping",
      "Gmapping",
      "Sensor Integration (LiDAR, RGB-D)",
    ],
  },
  {
    title: "Perception",
    skills: [
      "OpenCV",
      "YOLO",
      "Point Cloud Processing (PointCloud2)",
    ],
  },
  {
    title: "Programming",
    skills: [
      "Python",
      "C++",
    ],
  },
  {
    title: "Tools",
    skills: [
      "Ubuntu Linux",
      "Gazebo",
      "RViz / RViz2",
      "Git",
      "GitHub",
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
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
            // SKILLS
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Technical Stack
          </h2>
          <p className="text-muted-foreground mb-12 max-w-2xl">
            A comprehensive toolkit for building intelligent robotic systems
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            {skillCategories.map((category, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-sm text-muted-foreground font-mono px-3 py-1.5 bg-secondary rounded border border-border hover:border-primary/50 transition-colors"
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

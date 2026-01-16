import { motion } from "framer-motion";

const experiences = [
  {
    title: "Junior ROS Developer",
    company: "Spotless AI",
    period: "Mar 2024 – Present",
    bullets: [
      "Developing and maintaining **ROS2-based autonomous mobile robots** for real-world deployment",
      "Implemented autonomous navigation using **nav2**, integrating **SBPL (global planner)** and **DWB (local planner)**",
      "Integrated robot hardware using **ros2_control**, managing controllers and actuator interfaces",
      "Built perception pipelines using **OpenCV, YOLO, Python, and PointCloud2**",
      "Implemented **RGB + Depth sensor synchronization** and point cloud filtering",
      "Developed **occupancy grid maps, semantic grids, and Gmapping-based workflows**",
      "Integrated **LiDAR and RGB-D sensors** for mapping, localization, and room boundary detection",
      "Improved navigation reliability using **edge & corner detection, map modification, and smoothing**",
      "Debugged system-level issues including **tf2 tree mismatches, sensor noise, planner failures, timing issues, and CPU overuse**",
      "Maintained codebases using **Git & GitHub**, following modular ROS2 node design",
    ],
  },
  {
    title: "ROS Trainee",
    company: "Logical Minds IT Services",
    period: "Jan 2024 – Mar 2024",
    bullets: [
      "Trained in **ROS/ROS2 fundamentals**, perception, mapping, navigation, and simulation",
      "Contributed to live robotics projects in collaboration with **Spotless AI**, leading to a full-time transition",
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-24 border-t border-border">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.15 }}
          className="max-w-3xl"
        >
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
            // EXPERIENCE
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-12">
            Work Experience
          </h2>
          
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-8 border-l-2 border-border">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-2 border-background" />
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {exp.title}
                    </h3>
                    <p className="text-muted-foreground font-medium">
                      {exp.company}
                    </p>
                    <p className="text-sm text-muted-foreground italic">
                      {exp.period}
                    </p>
                  </div>
                  
                  <ul className="space-y-2">
                    {exp.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="text-foreground leading-relaxed text-sm">
                        <span className="text-muted-foreground">• </span>
                        <span dangerouslySetInnerHTML={{ __html: bullet.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

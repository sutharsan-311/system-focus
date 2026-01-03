import { motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";

const projects = [
  {
    title: "Warehouse AMR Navigation Stack",
    summary: "Multi-robot navigation system for autonomous mobile robots in high-density warehouse environments.",
    details: [
      "Implemented Nav2-based navigation with custom costmap layers for dynamic obstacle handling",
      "Designed multi-robot coordination protocol to prevent deadlocks in narrow aisles",
      "Integrated wheel odometry with IMU and LiDAR for robust localization under slip conditions",
      "Built real-time path replanning system with 10Hz update rate",
    ],
    constraints: [
      "Wheel slip on dusty concrete floors causing odometry drift",
      "Reflective surfaces creating LiDAR artifacts",
      "WiFi dead zones requiring autonomous fallback behaviors",
    ],
    stack: ["ROS 2 Humble", "Nav2", "Gazebo", "C++", "Python", "Docker"],
    outcome: "Deployed on 12 robots operating 24/7 with 99.2% task completion rate over 6 months.",
  },
  {
    title: "Outdoor SLAM with GPS Fusion",
    summary: "Robust localization system for agricultural robots operating in unstructured outdoor environments.",
    details: [
      "Extended Kalman Filter fusing RTK-GPS, wheel encoders, and IMU data",
      "Implemented sensor health monitoring with automatic degradation detection",
      "Designed fallback to visual odometry when GPS signal is degraded",
      "Created offline map correction pipeline for seasonal terrain changes",
    ],
    constraints: [
      "GPS multipath errors near tree canopy and structures",
      "Seasonal appearance changes breaking visual features",
      "Mud and vegetation affecting wheel odometry",
    ],
    stack: ["ROS 2", "GTSAM", "OpenCV", "robot_localization", "C++"],
    outcome: "Achieved <10cm position accuracy in open fields, <50cm under partial canopy cover.",
  },
  {
    title: "Perception Pipeline for Pick & Place",
    summary: "Real-time object detection and pose estimation for robotic arm manipulation in unstructured bins.",
    details: [
      "Trained custom YOLOv8 model on synthetic and real-world data with domain randomization",
      "Implemented point cloud segmentation for 6-DOF pose estimation",
      "Designed grasp planning algorithm accounting for object geometry and gripper constraints",
      "Built calibration routine for hand-eye and depth camera intrinsics",
    ],
    constraints: [
      "Reflective and transparent objects causing depth sensor failures",
      "Objects with similar textures requiring geometry-based discrimination",
      "Cycle time requirement of <3 seconds per pick",
    ],
    stack: ["ROS 2", "PyTorch", "PCL", "MoveIt 2", "Isaac Sim", "Python"],
    outcome: "92% first-attempt grasp success rate on 15 object classes, 2.1s average cycle time.",
  },
  {
    title: "Simulation-to-Real Transfer Framework",
    summary: "Systematic approach for validating autonomy software in simulation before hardware deployment.",
    details: [
      "Built parameterized sensor models with configurable noise profiles",
      "Implemented automated regression testing with behavior metrics",
      "Designed CI/CD pipeline running simulation tests on every commit",
      "Created domain randomization framework for robust policy training",
    ],
    constraints: [
      "Reality gap in contact dynamics and sensor characteristics",
      "Long simulation times limiting test coverage",
      "Maintaining parity between sim and real codepaths",
    ],
    stack: ["Gazebo", "Isaac Sim", "ROS 2", "GitHub Actions", "Python", "pytest"],
    outcome: "Reduced hardware testing time by 60% while catching 85% of bugs in simulation.",
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
          
          <div className="space-y-4">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

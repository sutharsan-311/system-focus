export interface KnowledgeChunk {
  id: string;
  title: string;
  section: "summary" | "experience" | "project" | "skills" | "education";
  content: string;
}

// Knowledge base used by the AI assistant (server-side only).
export const knowledgeBase: KnowledgeChunk[] = [
  {
    id: "summary-1",
    section: "summary",
    title: "Professional Summary",
    content:
      "Sutharsan is a Junior ROS2 Developer working on autonomous mobile robots in production environments. His work focuses on perception, mapping, navigation, and hardware integration using ROS2, nav2, ros2_control, LiDAR, RGB-D cameras, and point cloud processing.",
  },
  {
    id: "experience-spotless",
    section: "experience",
    title: "Spotless AI - Junior ROS Developer",
    content:
      "At Spotless AI, Sutharsan develops and maintains ROS2-based autonomous mobile robots. He integrates navigation using nav2 with SBPL and DWB planners, tunes costmaps, and debugs planner failures. He builds perception pipelines in Python using OpenCV, YOLO, and PointCloud2, synchronising RGB and depth data, filtering point clouds, and generating occupancy and semantic maps. He also debugs tf2 trees, handles sensor noise, timing issues, and CPU bottlenecks, and follows modular ROS2 node design with Git and GitHub.",
  },
  {
    id: "experience-training",
    section: "experience",
    title: "ROS Trainee - Logical Minds IT Services",
    content:
      "As a ROS Trainee at Logical Minds IT Services, Sutharsan trained on ROS and ROS2 fundamentals, perception, mapping, navigation, and simulation. He contributed to live robotics projects in collaboration with Spotless AI, leading to a full-time role.",
  },
  {
    id: "project-krishi-bot",
    section: "project",
    title: "Krishi Bot – E-Yantra Robotics Competition",
    content:
      "Krishi Bot is an autonomous agricultural robot built for the E-Yantra Robotics Competition. Sutharsan implemented arm manipulation for pick-and-place tasks, developed computer vision pipelines for crop and object recognition, and integrated robot control code in Python with ROS. The project focused on operating under limited embedded compute, variable lighting, and tight competition timing, and reached finalist stage in 2022-2023.",
  },
  {
    id: "project-medical-drone",
    section: "project",
    title: "Medical Drone",
    content:
      "The Medical Drone project is an emergency response drone with computer vision for person detection and localisation. Sutharsan implemented image segmentation pipelines using OpenCV and Python, built object recognition for emergency scenarios, and integrated the vision system with drone navigation under real-time, outdoor, and resource-constrained conditions.",
  },
  {
    id: "project-flipkart-grid",
    section: "project",
    title: "Flipkart GRID 2.0 – Computer Vision Challenge",
    content:
      "For the Flipkart GRID 2.0 Computer Vision Challenge, Sutharsan developed image processing and segmentation pipelines for product recognition and classification in e-commerce settings. The system handled varied backgrounds, lighting, and product categories and was shortlisted to Level 2 of the competition.",
  },
  {
    id: "project-labconnect",
    section: "project",
    title: "LabConnect – Role-Based Collaboration Platform",
    content:
      "LabConnect is a full-stack web application for managing lab registrations, attendance, and collaboration at a Product Innovation Center. Sutharsan contributed to UI and UX design, dashboards for multiple roles, user flows, role-based access control, lab and event management, attendance workflows, and a REST-based discussion forum using ReactJS, Spring Boot, and MySQL.",
  },
  {
    id: "skills-robotics",
    section: "skills",
    title: "Robotics and ROS Skills",
    content:
      "Key robotics skills include ROS2, ROS1, nav2, ros2_control, tf2, MoveIt, Gmapping, SLAM, SBPL, DWB, path planning, localisation, AMCL, and costmap tuning. He works extensively with Ubuntu, Gazebo, RViz2, and Docker.",
  },
  {
    id: "skills-perception",
    section: "skills",
    title: "Perception and Computer Vision Skills",
    content:
      "Perception skills include OpenCV, YOLO, PointCloud2, image segmentation, object detection, RGB-D fusion, and point cloud processing for LiDAR and depth cameras.",
  },
  {
    id: "skills-programming",
    section: "skills",
    title: "Programming Skills",
    content:
      "Programming and tooling skills: Python, C++, Bash, CMake, Git, GitHub, and debugging of real-time robotic systems.",
  },
  {
    id: "education-1",
    section: "education",
    title: "Education",
    content:
      "Sutharsan is pursuing a B.E. in Mechatronics Engineering at Bannari Amman Institute of Technology (2021–2025). His studies cover robotics, control systems, embedded systems, and related engineering topics.",
  },
  {
    id: "achievements-1",
    section: "summary",
    title: "Competitions and Achievements",
    content:
      "Notable achievements: Smart India Hackathon Winner (2021–2022), Ignite Best Project Award Winner, BRICS Robotics Competition Runner-up, E-Yantra Robotics Competition Finalist, and Flipkart GRID 2.0 Level 2 shortlist.",
  },
];


export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sutharsan",
  jobTitle: "Robotics Software Engineer",
  description: "I build reliable autonomous systems using ROS, perception pipelines, and AI-driven decision layers.",
  url: "https://sutharsan.is-a.dev/",
  sameAs: [
    "https://github.com/sutharsan-311",
    "https://linkedin.com/in/sutharsan",
  ],
  email: "sutharsanmail311@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Coimbatore",
    addressCountry: "IN",
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Bannari Amman Institute of Technology",
  },
  knowsAbout: [
    "ROS2",
    "ROS1",
    "nav2",
    "ros2_control",
    "Autonomous Navigation",
    "Robot Perception",
    "Computer Vision",
    "OpenCV",
    "YOLO",
    "Point Cloud Processing",
    "Python",
    "C++",
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Sutharsan - Robotics Software Engineer Portfolio",
  url: "https://sutharsan.is-a.dev/",
  description: "Portfolio website showcasing robotics projects, experience, and technical expertise in ROS, perception, and autonomous systems.",
  author: {
    "@type": "Person",
    name: "Sutharsan",
  },
};

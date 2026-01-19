import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { GradientButton } from "@/components/ui/gradient-button";
import { Spotlight } from "@/components/ui/spotlight";
import { SplineScene } from "@/components/ui/spline";

const capabilities = [
  "ROS/ROS2",
  "Perception",
  "Mapping",
  "Navigation",
  "Point Clouds",
  "Real Deployment",
];

const rotatingTitles = [
  "ROS Developer",
  "Perception Engineer",
  "Navigation Systems Specialist",
  "Robotics Software Engineer",
];

/**
 * Hero component - The main landing section with 3D robot model, rotating titles, and call-to-action buttons.
 * Features a Spline 3D scene, animated text, and smooth scroll navigation.
 */
export function Hero() {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % rotatingTitles.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const scrollToProjects = () => {
    scrollToSection("projects");
  };

  const scrollToContact = () => {
    scrollToSection("contact");
  };

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Sutharsan_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section ref={heroRef} className="h-screen w-full flex flex-col justify-center" role="banner" aria-label="Hero section">
      <div className="w-full h-full">
        <div className="w-full h-full bg-black relative overflow-hidden">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            aria-hidden={true}
          />
          
          <div className="flex h-full">
            {/* Left content */}
            <div className="flex-1 p-8 md:p-12 relative z-10 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-3">
                  Sutharsan
                </h1>
                <div className="h-12 md:h-14 lg:h-16 mb-6 flex items-center">
                  <AnimatePresence mode="wait">
                    <motion.h2
                      key={currentTitleIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="text-2xl md:text-3xl lg:text-4xl font-medium text-neutral-300"
                    >
                      {rotatingTitles[currentTitleIndex]}
                    </motion.h2>
                  </AnimatePresence>
                </div>
                
                <p className="mt-4 text-lg md:text-xl text-neutral-300 max-w-2xl mb-8">
                  I build and deploy real world autonomous robots using <strong>ROS2, nav2, and ros2_control</strong> working hands on with perception, mapping, navigation, and robot hardware.
                </p>

                <div className="flex flex-wrap gap-2 mb-12">
                  {capabilities.map((cap) => (
                    <span
                      key={cap}
                      className="font-mono text-sm text-neutral-400 px-3 py-1.5 bg-neutral-900/50 rounded border border-neutral-800"
                    >
                      {cap}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <GradientButton 
                    onClick={scrollToProjects}
                    aria-label="Scroll to projects section"
                  >
                    View Projects
                  </GradientButton>
                  <GradientButton 
                    variant="variant" 
                    onClick={scrollToContact}
                    aria-label="Scroll to contact section"
                  >
                    Let's Connect
                  </GradientButton>
                  <GradientButton 
                    variant="resume" 
                    onClick={downloadResume}
                    aria-label="Download resume"
                  >
                    Download Resume
                  </GradientButton>
                </div>
              </motion.div>
            </div>

            {/* Right content - 3D Robot */}
            <motion.div 
              className="flex-1 relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                y: y,
                opacity: opacity,
              }}
            >
              <SplineScene 
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

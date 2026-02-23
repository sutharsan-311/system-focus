import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { GradientButton } from "@/components/ui/gradient-button";
import { Spotlight } from "@/components/ui/spotlight";
import { SplineScene } from "@/components/ui/spline";
import { trackEvent } from "@/lib/analytics";

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
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  const animationConfig = prefersReducedMotion 
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 300, damping: 20 };

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
    trackEvent('click', 'Navigation', 'View Projects Button');
    scrollToSection("projects");
  };

  const scrollToContact = () => {
    trackEvent('click', 'Navigation', 'Lets Connect Button');
    scrollToSection("contact");
  };

  const downloadResume = () => {
    trackEvent('download', 'Resume', 'Download Resume Button');
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Sutharsan_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section ref={heroRef} className="h-screen w-full flex flex-col justify-center relative" role="banner" aria-label="Hero section">
      <div className="w-full h-full">
        <div className="w-full h-full bg-gradient-to-b from-background via-background to-background/95 relative overflow-hidden">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            aria-hidden={true}
          />
          
          <div className="flex h-full">
            {/* Left content */}
            <div className="flex-1 px-6 md:px-12 lg:px-16 relative z-10 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground mb-4 text-balance">
                  Sutharsan
                </h1>
                <div className="h-14 md:h-16 lg:h-20 mb-8 flex items-center">
                  <AnimatePresence mode="wait">
                    <motion.h2
                      key={currentTitleIndex}
                      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                      animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                      exit={prefersReducedMotion ? {} : { opacity: 0, y: -20 }}
                      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: "easeInOut" }}
                      className="text-2xl md:text-3xl lg:text-4xl font-semibold text-muted-foreground"
                    >
                      {rotatingTitles[currentTitleIndex]}
                    </motion.h2>
                  </AnimatePresence>
                </div>
                
                <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mb-10 leading-relaxed">
                  I build and deploy real world autonomous robots using <span className="text-foreground font-semibold">ROS2, nav2, and ros2_control</span> working hands on with perception, mapping, navigation, and robot hardware.
                </p>

                <div className="flex flex-wrap gap-3 mb-14">
                  {capabilities.map((cap, index) => (
                    <motion.span
                      key={cap}
                      className="font-mono text-xs md:text-sm text-muted-foreground px-4 py-2 glass rounded-lg cursor-default transition-all duration-200 hover:bg-primary/15 hover:text-foreground hover:border-primary/60 group"
                      initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                      animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                      transition={prefersReducedMotion ? { duration: 0 } : {
                        duration: 0.4,
                        delay: index * 0.08
                      }}
                      whileHover={!prefersReducedMotion ? {
                        scale: 1.08,
                        y: -3,
                      } : {}}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10" />
                      {cap}
                    </motion.span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl">
                  <GradientButton 
                    onClick={scrollToProjects}
                    aria-label="Scroll to projects section"
                    className="flex-1 sm:flex-none"
                  >
                    View Projects
                  </GradientButton>
                  <GradientButton 
                    variant="variant" 
                    onClick={scrollToContact}
                    aria-label="Scroll to contact section"
                    className="flex-1 sm:flex-none"
                  >
                    Let's Connect
                  </GradientButton>
                  <GradientButton 
                    variant="resume" 
                    onClick={downloadResume}
                    aria-label="Download resume"
                    className="flex-1 sm:flex-none"
                  >
                    Download Resume
                  </GradientButton>
                </div>
              </motion.div>
            </div>

            {/* Right content - 3D Robot */}
            <motion.div 
              className="hidden lg:flex flex-1 relative"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
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

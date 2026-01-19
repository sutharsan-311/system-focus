import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Map, Scan, Settings, Wrench, Target, BookOpen, Heart, Code2 } from "lucide-react";

const features = [
  {
    icon: Map,
    title: "Nav2 + Tuning",
    description: "Autonomous navigation with SBPL and DWB planners, costmap optimization, and real-world path planning.",
  },
  {
    icon: Scan,
    title: "Perception (RGB-D + LiDAR)",
    description: "Sensor fusion, point cloud processing, object detection with YOLO, and semantic mapping pipelines.",
  },
  {
    icon: Settings,
    title: "ros2_control + Hardware",
    description: "Hardware interfacing via ros2_control, actuator control, sensor integration, and real-time system management.",
  },
  {
    icon: Wrench,
    title: "Deployment Debugging",
    description: "tf2 tree debugging, sensor noise handling, planner failure recovery, timing issues, and CPU optimization.",
  },
];

// Glowing Card Wrapper Component
function GlowingCard({ children }: { children: React.ReactNode }) {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(
      'ontouchstart' in window || 
      navigator.maxTouchPoints > 0
    );
  }, []);

  return (
    <div className="relative rounded-[1.25rem] md:rounded-[1.5rem] border-[0.75px] border-border p-2 md:p-3">
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={isTouchDevice}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={3}
      />
      <div className="relative rounded-xl border-[0.75px] border-border/50">
        {children}
      </div>
    </div>
  );
}

/**
 * About component - Displays information about the developer's expertise and capabilities.
 * Features animated cards with icons showcasing key skills in robotics, perception, and navigation.
 */
export function About() {
  const aboutRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"]
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section ref={aboutRef} id="about" className="py-28 border-t border-border section-about relative overflow-hidden" role="region" aria-labelledby="about-heading">
      <motion.div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ y: backgroundY }}
        aria-hidden="true"
      />
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2 space-y-6">
              <p className="text-lg text-foreground leading-relaxed">
                I'm a Junior ROS2 Developer working on <strong>autonomous mobile robots</strong> in production environments. My work sits at the intersection of <strong>robot perception, navigation, and hardware integration</strong>, where theory meets noisy sensors and real world constraints.
              </p>
              
              <div className="flex items-center gap-3 text-muted-foreground my-4" aria-hidden="true">
                <div className="h-px flex-1 bg-border" />
                <Code2 className="w-5 h-5" aria-hidden="true" />
                <div className="h-px flex-1 bg-border" />
              </div>
              
              <p className="text-foreground leading-relaxed">
                I've built systems using <strong>Nav2 for autonomous navigation</strong>, <strong>ros2_control for hardware interfacing</strong>, and perception pipelines combining <strong>LiDAR, RGB-D cameras, OpenCV, YOLO, and point clouds</strong>. I'm comfortable debugging tf2 trees, tuning planners, optimizing CPU usage, and shipping code that runs on real robots not just simulations.
              </p>
              
              <div className="flex items-center gap-3 text-muted-foreground my-4" aria-hidden="true">
                <div className="h-px flex-1 bg-border" />
                <Target className="w-5 h-5" aria-hidden="true" />
                <div className="h-px flex-1 bg-border" />
              </div>
              
              <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg">
                <p className="text-foreground leading-relaxed italic">
                I care about systems that work reliably, not demos that look good once.
              </p>
              </div>
              
              <div className="flex items-center gap-3 text-muted-foreground my-4" aria-hidden="true">
                <div className="h-px flex-1 bg-border" />
                <Heart className="w-5 h-5" aria-hidden="true" />
                <div className="h-px flex-1 bg-border" />
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" aria-hidden="true" />
                    What Drives Me
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    I'm passionate about building robots that work in the real world. The challenge of making autonomous systems reliable under unpredictable conditions—sensor noise, hardware failures, environmental changes—is what keeps me motivated. Every bug fixed and every optimization made brings us closer to robots that truly help people.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-2 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-primary" aria-hidden="true" />
                    My Approach
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    I believe in iterative development, thorough testing, and learning from failures. I start with simulations, validate in controlled environments, then deploy to real robots. Debugging on actual hardware teaches you things simulations never can. I document everything, share knowledge with the team, and always ask "what could go wrong?"
                  </p>
                </div>
              </div>
            </div>

            {/* Education Card */}
            <div>
              <GlowingCard>
                <Card className="h-full border-0 bg-background shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] flex flex-col">
                  <CardHeader className="flex-shrink-0">
                    <CardTitle className="text-lg leading-tight min-h-[2.5rem]">Education</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow space-y-2">
                    <h3 className="font-medium text-foreground">
                      B.E. Mechatronics Engineering
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Bannari Amman Institute of Technology
                    </p>
                    <p className="text-sm text-muted-foreground">
                      2021 – 2025
                    </p>
                  </CardContent>
                </Card>
              </GlowingCard>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <GlowingCard key={index}>
                  <Card className="h-full border-0 bg-background shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] flex flex-col">
                    <CardHeader className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className={`${feature.title.length > 10 ? 'text-base' : 'text-lg'} leading-tight min-h-[2.5rem]`}>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <CardDescription className="text-sm leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </GlowingCard>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

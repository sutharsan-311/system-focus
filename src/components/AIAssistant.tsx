import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  role: "assistant" | "user";
  content: string;
}

const initialMessage: Message = {
  role: "assistant",
  content: "I answer questions using my resume, projects, and professional experience in robotics and ROS development.",
};

// Mock responses for demo - would be replaced with actual AI backend
const getResponse = (question: string): string => {
  const q = question.toLowerCase();
  
  if (q.includes("ros") || q.includes("experience") || q.includes("work")) {
    return "I work as a ROS Developer at Spotless AI, building perception, mapping, and navigation systems. I develop ROS nodes for sensor synchronization, point cloud processing, occupancy grid updates, and semantic mapping. I also integrate navigation stacks using planners like Move Base, SBPL, and DWB.";
  }
  if (q.includes("navigation") || q.includes("nav") || q.includes("planner")) {
    return "I integrate navigation stacks using Move Base, SBPL, and DWB planners for autonomous robot movement. This includes publishing costmaps, handling real-time replanning, and debugging planner failures under dynamic conditions.";
  }
  if (q.includes("mapping") || q.includes("slam") || q.includes("localization")) {
    return "I build mapping pipelines including Occupancy Grid Maps, Gmapping, Semantic Grids, and edge/corner detection. I also work on map modification and smoothing for deployed systems.";
  }
  if (q.includes("perception") || q.includes("vision") || q.includes("camera") || q.includes("lidar")) {
    return "I develop perception pipelines using OpenCV, YOLO, and point cloud data. My work includes RGB + Depth synchronization, real-time point cloud processing, object detection, and image segmentation for robot systems.";
  }
  if (q.includes("project") || q.includes("competition")) {
    return "Key projects include my work at Spotless AI (deployed ROS systems), Krishi Bot (E-Yantra finalist, arm manipulation + vision), Medical Drone (emergency response CV), and Flipkart GRID 2.0 (image segmentation, Level 2 shortlist).";
  }
  if (q.includes("language") || q.includes("programming") || q.includes("python") || q.includes("c++") || q.includes("skill")) {
    return "Primary languages: Python and C++ for ROS development. I also work with OpenCV, YOLO, LiDAR processing, Git, MATLAB, and tools like Visual Studio Code and Ubuntu. Simulation tools include Gazebo and Blender.";
  }
  if (q.includes("education") || q.includes("degree") || q.includes("university") || q.includes("college")) {
    return "B.E. Mechatronics from Bannari Amman Institute of Technology, graduating April 2025. CGPA: 7.93 (till 5th semester).";
  }
  if (q.includes("achievement") || q.includes("award") || q.includes("hackathon")) {
    return "Smart India Hackathon Winner (2021-2022), Ignite Best Project Award Winner, BRICS Robotics Competition Runner-up, E-Yantra Robotics Competition Finalist, and Flipkart GRID 2.0 Level 2 shortlist.";
  }
  if (q.includes("contact") || q.includes("email") || q.includes("reach")) {
    return "You can reach me via email at sutharsanmail311@gmail.com or call +91 8438536404. Links are in the Contact section below.";
  }
  
  return "I can answer questions about my ROS development experience at Spotless AI, perception and mapping work, competition projects, technical skills, and education. What would you like to know?";
};

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-assistant", handleOpen);
    return () => window.removeEventListener("open-assistant", handleOpen);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    // Simulate response delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    const response = getResponse(userMessage);
    setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              size="lg"
              className="rounded-full h-14 px-5 shadow-lg"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Ask AI
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-card border-l border-border z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div>
                <h3 className="font-medium text-foreground">AI Assistant</h3>
                <p className="text-xs text-muted-foreground">Resume & Projects</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {messages.map((message, i) => (
                <div
                  key={i}
                  className={`${
                    message.role === "assistant"
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block mb-1">
                    {message.role === "assistant" ? "Assistant" : "You"}
                  </span>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              ))}
              {isLoading && (
                <div className="text-muted-foreground">
                  <span className="text-xs font-mono uppercase tracking-wider block mb-1">
                    Assistant
                  </span>
                  <p className="text-sm">...</p>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-border">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about projects, skills, or experience"
                  className="flex-1 bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <Button type="submit" size="icon" disabled={!input.trim() || isLoading}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

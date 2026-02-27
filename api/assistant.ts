import type { VercelRequest, VercelResponse } from "@vercel/node";
import OpenAI from "openai";

// Knowledge base inlined to avoid Vercel module resolution issues
const knowledgeBase = [
  { id: "summary-1", section: "summary" as const, title: "Professional Summary", content: "Sutharsan is a Junior ROS2 Developer working on autonomous mobile robots in production environments. His work focuses on perception, mapping, navigation, and hardware integration using ROS2, nav2, ros2_control, LiDAR, RGB-D cameras, and point cloud processing." },
  { id: "experience-spotless", section: "experience" as const, title: "Spotless AI - Junior ROS Developer", content: "At Spotless AI, Sutharsan develops and maintains ROS2-based autonomous mobile robots. He integrates navigation using nav2 with SBPL and DWB planners, tunes costmaps, and debugs planner failures. He builds perception pipelines in Python using OpenCV, YOLO, and PointCloud2, synchronising RGB and depth data, filtering point clouds, and generating occupancy and semantic maps. He also debugs tf2 trees, handles sensor noise, timing issues, and CPU bottlenecks, and follows modular ROS2 node design with Git and GitHub." },
  { id: "experience-training", section: "experience" as const, title: "ROS Trainee - Logical Minds IT Services", content: "As a ROS Trainee at Logical Minds IT Services, Sutharsan trained on ROS and ROS2 fundamentals, perception, mapping, navigation, and simulation. He contributed to live robotics projects in collaboration with Spotless AI, leading to a full-time role." },
  { id: "project-krishi-bot", section: "project" as const, title: "Krishi Bot – E-Yantra Robotics Competition", content: "Krishi Bot is an autonomous agricultural robot built for the E-Yantra Robotics Competition. Sutharsan implemented arm manipulation for pick-and-place tasks, developed computer vision pipelines for crop and object recognition, and integrated robot control code in Python with ROS. The project focused on operating under limited embedded compute, variable lighting, and tight competition timing, and reached finalist stage in 2022-2023." },
  { id: "project-medical-drone", section: "project" as const, title: "Medical Drone", content: "The Medical Drone project is an emergency response drone with computer vision for person detection and localisation. Sutharsan implemented image segmentation pipelines using OpenCV and Python, built object recognition for emergency scenarios, and integrated the vision system with drone navigation under real-time, outdoor, and resource-constrained conditions." },
  { id: "project-flipkart-grid", section: "project" as const, title: "Flipkart GRID 2.0 – Computer Vision Challenge", content: "For the Flipkart GRID 2.0 Computer Vision Challenge, Sutharsan developed image processing and segmentation pipelines for product recognition and classification in e-commerce settings. The system handled varied backgrounds, lighting, and product categories and was shortlisted to Level 2 of the competition." },
  { id: "project-labconnect", section: "project" as const, title: "LabConnect – Role-Based Collaboration Platform", content: "LabConnect is a full-stack web application for managing lab registrations, attendance, and collaboration at a Product Innovation Center. Sutharsan contributed to UI and UX design, dashboards for multiple roles, user flows, role-based access control, lab and event management, attendance workflows, and a REST-based discussion forum using ReactJS, Spring Boot, and MySQL." },
  { id: "skills-robotics", section: "skills" as const, title: "Robotics and ROS Skills", content: "Key robotics skills include ROS2, ROS1, nav2, ros2_control, tf2, MoveIt, Gmapping, SLAM, SBPL, DWB, path planning, localisation, AMCL, and costmap tuning. He works extensively with Ubuntu, Gazebo, RViz2, and Docker." },
  { id: "skills-perception", section: "skills" as const, title: "Perception and Computer Vision Skills", content: "Perception skills include OpenCV, YOLO, PointCloud2, image segmentation, object detection, RGB-D fusion, and point cloud processing for LiDAR and depth cameras." },
  { id: "skills-programming", section: "skills" as const, title: "Programming Skills", content: "Programming and tooling skills: Python, C++, Bash, CMake, Git, GitHub, and debugging of real-time robotic systems." },
  { id: "education-1", section: "education" as const, title: "Education", content: "Sutharsan is pursuing a B.E. in Mechatronics Engineering at Bannari Amman Institute of Technology (2021–2025). His studies cover robotics, control systems, embedded systems, and related engineering topics." },
  { id: "achievements-1", section: "summary" as const, title: "Competitions and Achievements", content: "Notable achievements: Smart India Hackathon Winner (2021–2022), Ignite Best Project Award Winner, BRICS Robotics Competition Runner-up, E-Yantra Robotics Competition Finalist, and Flipkart GRID 2.0 Level 2 shortlist." },
];

// Cache embeddings across invocations (Vercel keeps the module warm between requests).
let cachedEmbeddings:
  | { id: string; embedding: number[]; title: string; section: string }[]
  | null = null;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  if (!normA || !normB) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

async function ensureEmbeddings() {
  if (cachedEmbeddings) return cachedEmbeddings;

  const inputs = knowledgeBase.map((doc) => doc.content);

  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: inputs,
  });

  cachedEmbeddings = response.data.map((item, index) => ({
    id: knowledgeBase[index].id,
    title: knowledgeBase[index].title,
    section: knowledgeBase[index].section,
    embedding: item.embedding as number[],
  }));

  return cachedEmbeddings;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    res.status(200).setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.end();
    return;
  }

  if (req.method !== "POST") {
    res.writeHead(405, {
      "Content-Type": "application/json",
      ...CORS_HEADERS,
    });
    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  if (!process.env.OPENAI_API_KEY) {
    res.writeHead(500, {
      "Content-Type": "application/json",
      ...CORS_HEADERS,
    });
    res.end(
      JSON.stringify({
        error: "OPENAI_API_KEY is not set in the environment.",
      })
    );
    return;
  }

  try {
    const body = req.body ?? {};
    const messages = body.messages as { role: "user" | "assistant"; content: string }[] | undefined;
    const latestUserMessage =
      body.question ??
      messages?.slice().reverse().find((m) => m.role === "user")?.content;

    if (!latestUserMessage || typeof latestUserMessage !== "string") {
      res.writeHead(400, {
        "Content-Type": "application/json",
        ...CORS_HEADERS,
      });
      res.end(JSON.stringify({ error: "Missing question or messages." }));
      return;
    }

    const embeddings = await ensureEmbeddings();

    const qEmbeddingResponse = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: latestUserMessage,
    });

    const qEmbedding = qEmbeddingResponse.data[0].embedding as number[];

    const scored = embeddings
      .map((doc) => ({
        ...doc,
        score: cosineSimilarity(qEmbedding, doc.embedding),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    const context = scored
      .map(
        (s) =>
          `[${s.section.toUpperCase()}] ${s.title}\n${knowledgeBase.find(
            (d) => d.id === s.id
          )?.content}`
      )
      .join("\n\n");

    const systemPrompt =
      "You are an AI assistant that only answers questions about Sutharsan's background, skills, projects, and experience in robotics and ROS. " +
      "Use the provided context sections as the source of truth. If something is not in the context, say you don't know instead of guessing. " +
      "Keep answers concise and clear for recruiters and engineers reading a portfolio site.";

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content:
            "Context:\n" +
            context +
            "\n\nQuestion from website visitor:\n" +
            latestUserMessage,
        },
      ],
      temperature: 0.3,
    });

    const answer =
      completion.choices[0]?.message?.content ??
      "I'm not sure how to answer that from the information I have.";

    res.writeHead(200, {
      "Content-Type": "application/json",
      ...CORS_HEADERS,
    });
    res.end(JSON.stringify({ answer }));
  } catch (error: any) {
    console.error("Assistant error:", error);
    res.writeHead(500, {
      "Content-Type": "application/json",
      ...CORS_HEADERS,
    });
    res.end(
      JSON.stringify({ error: "Failed to generate answer from AI assistant." })
    );
  }
}


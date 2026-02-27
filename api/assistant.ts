import type { VercelRequest, VercelResponse } from "@vercel/node";
import OpenAI from "openai";
import { knowledgeBase } from "./knowledge";

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


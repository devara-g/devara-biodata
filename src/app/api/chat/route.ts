import { NextResponse } from "next/server";
import { BIODATA } from "@/data/biodata";

// Exact active models available on your Groq Cloud endpoint
const CANDIDATE_MODELS = [
  "openai/gpt-oss-120b",
  "openai/gpt-oss-20b",
  "qwen/qwen3.6-27b",
  "groq/compound-mini",
  "groq/compound",
];

export async function POST(req: Request) {
  try {
    const { messages, userMessage } = await req.json();

    const apiKey = process.env.GROQ_API_KEY;

    // Construct system prompt with full Devara knowledge base
    const systemPrompt = `You are DevaraAI, an advanced neural AI assistant integrated directly into Muhammad Devara's terminal CLI portfolio.
About Muhammad Devara:
- Name: ${BIODATA.name}
- Role: ${BIODATA.role}
- Bio: ${BIODATA.bio}
- Location: Indonesia
- Email: ${BIODATA.email}
- GitHub: ${BIODATA.github}
- LinkedIn: ${BIODATA.linkedin}
- Skills & Tech Arsenal: ${BIODATA.skills.map((s) => `${s.name} (${s.category}, level: ${s.level}, proficiency: ${s.proficiency}%)`).join(", ")}
- Telemetry: Latency: ${BIODATA.telemetry.apiLatency}, Uptime: ${BIODATA.telemetry.uptime}, Cache Hit Rate: ${BIODATA.telemetry.cacheHitRate}, Lines of Code: ${BIODATA.telemetry.linesOfCode}
- Projects: ${BIODATA.projects.map((p) => `${p.title} (${p.category}): ${p.description}`).join("; ")}

Guidelines:
- Respond concisely, intelligently, and in a cool developer terminal style.
- If asked in Indonesian, answer in Indonesian. If asked in English, answer in English.
- Highlight key tech terms, projects, and contact info clearly.
- Keep responses compact for a terminal window (2-4 sentences or clean bullet points).`;

    if (!apiKey) {
      return NextResponse.json({
        reply: `[GROQ API CONFIGURATION REQUIRED]\nSilakan masukkan GROQ_API_KEY di file .env.local Anda.\n\nTentang Devara:\nMuhammad Devara adalah Backend Architect dengan keahlian spesialis pada Node.js, PHP Laravel, Docker, dan MySQL/PostgreSQL. Email: ${BIODATA.email}`,
        isFallback: true,
      });
    }

    // Build chat history for Groq
    const groqMessages = [
      { role: "system", content: systemPrompt },
      ...(messages || []),
    ];

    if (userMessage && (!messages || messages.length === 0)) {
      groqMessages.push({ role: "user", content: userMessage });
    }

    let lastErrorMsg = "";

    // Try verified active models in order
    for (const model of CANDIDATE_MODELS) {
      try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model,
            messages: groqMessages,
            temperature: 0.7,
            max_tokens: 512,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply) {
            return NextResponse.json({ reply, model });
          }
        } else {
          const errorData = await response.json().catch(() => ({}));
          lastErrorMsg = errorData.error?.message || `Model ${model} failed with status ${response.status}`;
        }
      } catch (err: any) {
        lastErrorMsg = err.message || "Network error calling Groq";
      }
    }

    return NextResponse.json(
      { error: `Groq Error: ${lastErrorMsg}` },
      { status: 500 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

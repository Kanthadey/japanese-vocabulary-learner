import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini client to avoid crashes if GEMINI_API_KEY is not defined at boot
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing. Please configure it in your Secrets / Env settings.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// API Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// AI Endpoint: Generate contextual practice sentences and explanations
app.post("/api/gemini/explain", async (req, res) => {
  try {
    const { word, kanji, romaji, english, lessonTitle } = req.body;
    if (!word) {
      return res.status(400).json({ error: "Missing required parameter 'word'" });
    }

    const client = getGeminiClient();
    const prompt = `You are Jahid Sensei, a friendly, professional Japanese language tutor. 
Analyze the Japanese vocabulary word: "${word}" ${kanji ? `(Kanji: ${kanji})` : ""}, Romaji: "${romaji}".
Its English meaning is "${english}". It belongs to the lesson "${lessonTitle}".

Please provide a highly interactive, concise educational card explaining:
1. Origin / Kanji Breakdown (if applicable) or interesting memory hook.
2. Common usage context or nuances.
3. Generate exactly ONE realistic, practical Japanese example sentence using this word.
4. Provide the English translation and a phonetically translated Bangla translation (Bengali) of this example sentence.

Keep the tone encouraging, warm, and highly structured, fitting a quick learning card. Output in elegant markdown.`;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    res.json({ result: response.text });
  } catch (error: any) {
    console.error("Gemini Explain Error:", error);
    res.status(500).json({ error: error.message || "An error occurred with the AI Tutor." });
  }
});

// AI Endpoint: Chat with Jahid Sensei (Tutor chat)
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { history, message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const client = getGeminiClient();

    // Map history to Gemini's format if present
    const formattedHistory = (history || []).map((msg: any) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    // Start a chat session with structured instructions
    const chat = client.chats.create({
      model: "gemini-3.5-flash",
      history: formattedHistory,
      config: {
        systemInstruction: `You are "Jahid Sensei", an expert Japanese language tutor who teaches JLPT N5 and N4. 
You speak in a mix of clear English and simple Bengali to guide learners comfortably.
Your goal is to practice Japanese conversation, vocabulary, and grammar with the user.
- Always check the user's Japanese sentences for correct grammar, particles (は, が, を, に, で, etc.), and spelling.
- If they make a mistake, gently explain it in English/Bengali and show them the correct way to write/say it.
- Keep your sentences simple, appropriate for N5/N4 learners, and encourage them to reply in Hiragana/Katakana or simple Romaji.
- Ask questions to keep the conversation going. Be extremely encouraging, warm, and structured! Refer to yourself occasionally as "Jahid Sensei".`,
      },
    });

    const response = await chat.sendMessage({ message });
    res.json({ reply: response.text });
  } catch (error: any) {
    console.error("Gemini Chat Error:", error);
    res.status(500).json({ error: error.message || "An error occurred in conversation." });
  }
});

// Setup Vite middleware or serve static build files
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

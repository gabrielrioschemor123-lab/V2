import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Check and lazy init Gemini
  let ai: GoogleGenAI | null = null;
  function getGeminiClient(): GoogleGenAI {
    if (!ai) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        throw new Error("GEMINI_API_KEY is not configured in environment variables.");
      }
      ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return ai;
  }

  // API Endpoint: Intelligent AI Tutor endpoint
  app.post("/api/gemini/chat", async (req, res) => {
    try {
      const { message, history, contextCourse, contextLesson, customInstruction } = req.body;
      if (!message) {
         res.status(400).json({ error: "Missing message parameter." });
         return;
      }

      const client = getGeminiClient();

      // Setup rich system instruction context for trades/fitness
      const systemInstruction = customInstruction || `
        Eres un Tutor de Inteligencia Artificial experto de la plataforma "Oficios y Fitness de Alto Impacto".
        Tu objetivo es guiar, motivar y resolver las dudas del alumno de forma clara, didáctica y profesional.
        
        Contexto del curso actual: ${contextCourse || "General"}
        Lección actual: ${contextLesson || "Introducción"}
        
        Instrucciones de comportamiento:
        - Si el alumno te pregunta algo sobre carpintería, fontanería, electricidad o herrería (oficios), responde con analogías simples, consejos de seguridad industrial, técnicas correctas de herramienta e instrucciones paso a paso muy comprensibles.
        - Si te pregunta sobre entrenamiento físico, fitness, nutrición, musculación o calistenia, sé sumamente alentador, brinda bases científicas ligeras, consejos de disciplina, y prioriza la técnica correcta de ejercicios para evitar lesiones. Enfatiza constancia.
        - Utiliza un tono amigable, profesional, con excelente ortografía en español, formateando tus respuestas en Markdown elegante (con negritas, listas ordenadas, bloques de código o tablas si es apropiado).
        - Si la pregunta no está relacionada con la lección, respóndele con amabilidad y educación, pero intenta encauzarlo de nuevo al tema del curso.
        - Mantén tus respuestas relativamente concisas y fáciles de leer en un chat de panel lateral de dispositivo móvil o web.
      `;

      // Build contents schema for Gemini
      const contentsList: any[] = [];
      if (history && Array.isArray(history)) {
        history.forEach((h: any) => {
          contentsList.push({
            role: h.role === "user" ? "user" : "model",
            parts: [{ text: h.content }]
          });
        });
      }
      contentsList.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contentsList,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text || "Lo siento, no he podido procesar tu solicitud en este momento.";
      res.json({ reply: replyText });
    } catch (error: any) {
      console.error("Gemini Error:", error);
      res.status(500).json({
        error: error.message || "Un error interno ocurrió al consultar a nuestro Tutor de IA.",
      });
    }
  });

  // Serve static assets or mount Vite dev middleware
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
    console.log(`Server launched on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start full-stack server:", err);
});

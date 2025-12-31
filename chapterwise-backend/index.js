import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import crypto from "crypto"; // for hashing chapter text

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// // In-memory storage for daily usage
// const dailyUsage = {}; // { userId: timestampOfLastRequest }

// const cache = {}; // { chapterHash: aiOutput }

// Simple hash function for chapter text
function hashFunction(text) {
  return crypto.createHash("md5").update(text).digest("hex");
}

app.post("/api/generate-notes", async (req, res) => {
  const { text, userId } = req.body;

   // --- Backend validation: check empty text ---
  if (!text || text.trim().length === 0) {
    return res.status(400).json({ error: "Input cannot be empty." });
  }

// --- Backend validation: check max length ---
  const MAX_LENGTH = 50000; // 50k characters
  if (text.length > MAX_LENGTH) {
    return res.status(400).json({
      error: `Input exceeds maximum allowed length of ${MAX_LENGTH} characters.`,
    });
  }

  // const chapterHash = hashFunction(text); // simple hash of text content

  // // Serve from cache if exists
  // if (cache[chapterHash]) {
  //   console.log("Serving from cache:", chapterHash);
  //   return res.json({ output: cache[chapterHash], cached: true });
  // }


  // // --- 1 request per day logic ---
  // const now = Date.now();
  // const oneDay = 24 * 60 * 60 * 1000;

  // if (userId && dailyUsage[userId]) {
  //   const lastRequest = dailyUsage[userId];
  //   if (now - lastRequest < oneDay) {
  //     return res.status(429).json({
  //       error: "You’ve reached your daily limit. Subscribe for $5/month to generate notes unlimitedly.",
  //     });
  //   }
  // }

  // // Record current request
  // if (userId) dailyUsage[userId] = now;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // or "gpt-4"
      messages: [
        {
          role: "system",
          content: `You are an AI study assistant.
The user is an undergraduate student. 
The input is a textbook chapter.

Your task is to generate exam-ready study notes strictly following the structure and constraints below.
Failure to follow the structure exactly is an error.


GLOBAL FORMATTING RULE:
- Use - hyphens ONLY for all bullets.
- Do NOT use *, •, or numbered lists.


Output format (DO NOT CHANGE OR REORDER SECTIONS):

Chapter Name:
- Write the full chapter title exactly as provided.


Overview:
- 2–3 sentences explaining the main idea of the chapter in clear, simple language.


Chapter Summary:
- 1 paragraph (4–6 sentences) summarizing the main events, examples, findings, and conclusions of the chapter.
- This should provide a concise narrative of the chapter while including the key information needed for understanding and revision.


Key Concepts:
- Include AT LEAST 2, up to 5 key concepts.
- Each bullet: Concept name + brief explanation (1–2 sentences).


Important Definitions:
- Include AT LEAST 2, up to 5 definitions.
- Each bullet: Term + concise, exam-ready definition.


Exam Focus:
- Include AT LEAST 4, up to 8 Q&A bullets.
- Each bullet must be a complete Q&A using this format:
- Q: [exam-style question]
- A: [direct, exam-ready answer]
- Questions must be phrased exactly as they would appear on undergraduate exams (define, explain, compare, discuss).
- Prioritize the most important examinable points, but include additional relevant points if they exist.

- Tone and constraints:
- Write in simple, clear language suitable for undergraduate students.
- Keep sentences short and concise.
- Focus only on the most important examinable points.
- Do NOT add explanations outside the sections above.
- Do NOT add extra sections.
- Do NOT exceed the specified number of bullets in any section.
- Do NOT include opinions, commentary, or meta explanations.`,
        },
        {
          role: "user",
          content: text,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    // Get the AI message
    const notes = response.choices[0].message.content;

    // Store in cache
  // cache[chapterHash] = notes;

    res.json({ output: notes, cached: false });
  } catch (err) {
    console.error(err);
    res.status(500).json({ output: "Error generating notes" });
  }
});

app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);

import dotenv from "dotenv";
import express from "express";
import { createClient } from "@supabase/supabase-js";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();

// Tells the server to parse incoming JSON data
app.use(express.json());

// Initialize the Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
);

// Set up the endpoint where the website or client will send leads
app.post("/api/leads", async (req, res) => {
  const { sender_name, sender_email, company_name, message } = req.body;

  // Configure the Gemini model to return JSON data
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: { responseMimeType: "application/json" },
  });

  // Build the prompt
  const prompt = `
    You are a sales evaluator. Read this lead message: "${message}"
    Return a JSON object with two keys:
    - "score": an integer from 1 to 10 based on budget and urgency.
    - "summary": a 1-sentence summary of what they want.
  `;

  // Evaluate the lead message and parse the response
  const result = await model.generateContent(prompt);
  const aiResponse = JSON.parse(result.response.text());

  // Save to Supabase database
  const { data, error } = await supabase
    .from("leads")
    .insert([
      {
        sender_name,
        sender_email,
        company_name,
        message,
        ai_score: aiResponse.score,
        ai_summary: aiResponse.summary,
      },
    ])
    .select();

  // If the database threw an error, log it and send a 500 failure response back
  if (error) {
    console.error("Database Error:", error);
    return res.status(500).json({ error: error.message });
  }

  // If it worked, send back a 201 success status and the newly created row (data[0])
  res.status(201).json({ success: true, lead: data[0] });
});

// listening for traffic on your port
app.listen(process.env.PORT, () => {
  console.log(`Server listening on http://localhost:${process.env.PORT}`);
});

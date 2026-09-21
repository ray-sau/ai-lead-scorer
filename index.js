import dotenv from "dotenv";
import express from "express";
import { createClient } from "@supabase/supabase-js";

dotenv.config();
const app = express();

// Tells the server to parse incoming JSON data
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
);

app.post("/api/leads", async (req, res) => {
  const { sender_name, sender_email, company_name, message } = req.body;

  const { data, error } = await supabase
    .from("leads")
    .insert([{ sender_name, sender_email, company_name, message }])
    .select();

  if (error) {
    console.error("Database Error:", error);
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({ success: true, lead: data[0] });
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on http://localhost:${process.env.PORT}`);
});

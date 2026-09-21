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

// Set up the endpoint where the website or client will send leads
app.post("/api/leads", async (req, res) => {
  const { sender_name, sender_email, company_name, message } = req.body;

  // Insert the lead data into your Supabase 'leads' table and ask for the row back
  const { data, error } = await supabase
    .from("leads")
    .insert([{ sender_name, sender_email, company_name, message }])
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

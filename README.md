# AI-Powered Lead Scoring API

A backend REST API that automatically evaluates incoming sales leads using generative AI, stores the records in a PostgreSQL database, and conditionally alerts a Slack channel for high-priority messages.

## Features
* **Intelligent Scoring:** Evaluates lead urgency and budget using Google Gemini's API.
* **Conditional Webhooks:** Automatically routes leads scoring 8/10 or higher to a Slack channel for immediate human intervention (Can be modified to be sent elsewhere such as discord, etc).
* **Persistent Storage:** Logs all incoming leads securely into a Supabase PostgreSQL database.

## Tech Stack
* **Runtime:** Node.js, Express.js
* **AI/LLM:** Google Gemini API (`gemini-3.6-flash`)
* **Database:** Supabase (PostgreSQL)
* **Integrations:** Slack Incoming Webhooks

## Local Setup

1. **Clone and install dependencies:**
   ```bash
   npm install express dotenv @supabase/supabase-js @google/generative-ai
   ```

2. **Environment Variables:**
   Create a `.env` file in the root directory and add your keys:
   ```text
   SUPABASE_URL=your_project_url
   SUPABASE_ANON_KEY=your_anon_key
   GEMINI_API_KEY=your_gemini_key
   SLACK_WEBHOOK_URL=your_slack_webhook
   PORT=3000
   ```

3. **Start the server:**
   ```bash
   node index.js
   ```

## API Reference

**POST /api/leads**
Expects a JSON payload from the client:
```json
{
  "sender_name": "Jane Director",
  "sender_email": "jane@megacorp.com",
  "company_name": "MegaCorp",
  "message": "We need to deploy your enterprise tier immediately."
}
```

# AI-Powered Lead Scoring API

A backend REST API that automatically evaluates incoming sales leads using generative AI, stores the records in a PostgreSQL database, and conditionally alerts a Slack channel for high-priority messages.

## Features
* **Intelligent Scoring:** Evaluates lead urgency and budget using Google Gemini's API.
* **Conditional Webhooks:** Automatically routes leads scoring 8/10 or higher to a Slack channel for immediate human intervention (Can be modified to be sent elsewhere such as discord, etc).
* **Persistent Storage:** Logs all incoming leads securely into a Supabase PostgreSQL database.
* **Error Handling:** Implements full `try/catch` architecture to prevent silent server failures and handle upstream API rate limits gracefully.

## Tech Stack
* **Runtime:** Node.js, Express.js
* **AI/LLM:** Google Gemini API (`gemini-3.6-flash`)
* **Database:** Supabase (PostgreSQL)
* **Integrations:** Slack Incoming Webhooks

## Local Setup

1. **Clone and install dependencies:**
   ```bash
   npm install express cors dotenv @supabase/supabase-js @google/generative-ai

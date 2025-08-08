# The Diamond Edge Co. — Landing Page Package

A Tesla/Apple-inspired, premium landing page for your legal AI agency. Includes a floating AI chatbot and a separate sign‑up page.

## What’s Inside
- `index.html` — landing page with sections: Who We Are, How We Can Help, Prices
- `signup.html` — demo request form (stores entries in localStorage by default)
- `thankyou.html` — confirmation page
- `styles.css` — dark, futuristic UI with diamond shimmer
- `script.js` — mobile nav, smooth scrolling
- `chatbot.js` — floating AI widget (uses `/api/chat` if configured, else fallback answers)
- `api/chat.js` — Vercel serverless function to call OpenAI safely
- `assets/logo.svg` — simple gradient logo

## Quick Start (Local)
Open `index.html` in a browser. The chatbot works with canned answers until the API is configured.

## Deploy on Vercel (Recommended)
1. Create a new Vercel project and import this folder.
2. Add an **Environment Variable**: `OPENAI_API_KEY` (from platform.openai.com).
3. Deploy. Your chatbot will call `/api/chat` without exposing the key.

## Connect the Sign-up Form
- **Fastest (no-code):** Replace the localStorage logic in `signup.html` with a service like Formspree or Tally.
- **Mailchimp Embed:** Paste your Mailchimp form `<form>` snippet in `signup.html`.
- **Custom server:** Point the form’s `fetch` to your own `/api/lead` function that writes to Google Sheets, Airtable, or a database.

## Customize
- Edit pricing in the **Prices** section in `index.html`.
- Swap the logo at `assets/logo.svg`.
- Tweak colors in `styles.css` under the `:root` variables.

## Notes
- This is a static site plus a serverless function. No database included.
- The chatbot defaults to concise, professional tone. Adjust the system prompt in `api/chat.js` as needed.
- For full SaaS later, consider Next.js + a real auth flow (Clerk/Auth.js) and a backend (Supabase/Firebase/Postgres).

// Vercel serverless API route: /api/chat
// 1) Set OPENAI_API_KEY in your Vercel project settings.
// 2) Deploy. The front-end calls /api/chat to avoid exposing your key.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { question } = req.body || {};
    if (!question) return res.status(400).json({ error: 'Missing question' });

    // Safeguard
    if (!process.env.OPENAI_API_KEY) {
      return res.status(200).json({
        answer: 'Serverless function is live. Add OPENAI_API_KEY in Vercel project settings to enable real AI answers.'
      });
    }

    // Call OpenAI API (chat completions style – adjust model as desired)
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a helpful assistant for a legal AI website. Keep answers concise and professional.' },
          { role: 'user', content: question }
        ],
        temperature: 0.3
      })
    });
    if (!r.ok) {
      const text = await r.text();
      return res.status(500).json({ error: 'Upstream error', detail: text });
    }
    const data = await r.json();
    const answer = data.choices?.[0]?.message?.content?.trim() || 'No answer.';
    return res.status(200).json({ answer });
  } catch (e) {
    return res.status(500).json({ error: 'Server error', detail: e?.message });
  }
}

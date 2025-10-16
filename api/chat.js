export default async function handler(req, res) {
  // Allow CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { question } = req.body || {};

  if (!question) {
    return res.status(400).json({ error: "Missing question" });
  }

  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return res.status(200).json({
        answer: `Mock answer: You asked "${question}"`,
      });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-nano",
        messages: [{ role: "user", content: question }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(200).json({
        answer: `Mock answer: You asked "${question}"`,
      });
    }

    const answer = data.choices?.[0]?.message?.content || `Mock answer: You asked "${question}"`;
    res.status(200).json({ answer });
  } catch (err) {
    res.status(200).json({ answer: `Mock answer: You asked "${question}"` });
  }
}

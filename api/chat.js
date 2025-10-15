export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ error: "Missing 'question' in request body" });
    }

    // Check if OPENROUTER_KEY exists
    const apiKey = process.env.OPENROUTER_KEY;
    if (!apiKey) {
      // MOCK fallback for demo
      return res.status(200).json({ answer: `Mock answer: You asked "${question}"` });
    }

    // Call OpenRouter API
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are an expert Informatica MDM data steward assistant." },
          { role: "user", content: question }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();

    // If OpenRouter returns an error, use mock answer
    if (!response.ok || !data.choices) {
      return res.status(200).json({ answer: `Mock answer: You asked "${question}"` });
    }

    const answer = data.choices[0].message?.content || `Mock answer: You asked "${question}"`;
    return res.status(200).json({ answer });

  } catch (error) {
    // Fallback to mock answer on any unexpected error
    return res.status(200).json({ answer: `Mock answer: You asked "${req.body.question}"` });
  }
}

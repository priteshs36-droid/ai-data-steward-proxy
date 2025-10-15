export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ error: "Missing 'question' in request body" });
    }

    const apiKey = process.env.OPENAI_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "OPENAI_KEY not configured" });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-nano",
        messages: [
          { role: "system", content: "You are an expert Informatica MDM data steward assistant." },
          { role: "user", content: question }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ error: data });
    }

    const answer = data.choices?.[0]?.message?.content || "No response from AI.";
    return res.status(200).json({ answer });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
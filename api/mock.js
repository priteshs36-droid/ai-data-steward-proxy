export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { question } = req.body || {};
  res.status(200).json({
    answer: `This is a mock AI response for your question: "${question || 'No question provided'}".`,
  });
}

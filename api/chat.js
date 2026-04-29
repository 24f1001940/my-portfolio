function parseBody(body) {
  if (!body) return {};
  if (typeof body === 'string') {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }
  return body;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is not configured' });
  }

  try {
    const body = parseBody(req.body);
    const prompt = String(body.prompt || body.message || '').trim();

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const model = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 512 }
        })
      }
    );

    const data = await response.json();
    if (!response.ok) {
      const text = buildFallbackResponse(prompt);
      return res.json({ text, fallback: true, details: data });
    }

    const text = data?.candidates?.[0]?.content?.parts?.map((part) => part.text).join('') || buildFallbackResponse(prompt);
    return res.json({ text, raw: data });
  } catch (error) {
    console.error('Chat API error:', error);
    const fallbackText = buildFallbackResponse(parseBody(req.body).prompt || parseBody(req.body).message || '');
    return res.json({ text: fallbackText, fallback: true });
  }
};

function buildFallbackResponse(prompt) {
  const extractedUserMessage = String(prompt || '')
    .match(/USER:\s*([\s\S]*?)\nAI RESPONSE:/i)?.[1]
    ?.trim()
    ?.toLowerCase() || '';

  const portfolio = {
    name: 'Mohd Saqib',
    title: 'Computer Engineering Student | Aspiring Data Scientist & Full-Stack Developer',
    email: 'saqib29abubakar@gmail.com',
    phone: '+91-9625035483',
    linkedin: 'https://linkedin.com/in/mohd-saqib-94b6042ba',
    github: 'https://github.com/MOHDSAQIB695786'
  };

  if (extractedUserMessage.includes('skill') || extractedUserMessage.includes('expertise')) {
    return `${portfolio.name} works with Python, JavaScript, Java, C++, React, Node.js, Flask, and MongoDB.`;
  }

  if (extractedUserMessage.includes('project') || extractedUserMessage.includes('work')) {
    return `${portfolio.name} has built projects like Quiz Master V2, an LLM automation agent, and a computer vision queue analytics system.`;
  }

  if (extractedUserMessage.includes('contact') || extractedUserMessage.includes('email') || extractedUserMessage.includes('phone')) {
    return `Email: ${portfolio.email}. Phone: ${portfolio.phone}. LinkedIn: ${portfolio.linkedin}. GitHub: ${portfolio.github}.`;
  }

  if (extractedUserMessage.includes('education') || extractedUserMessage.includes('study') || extractedUserMessage.includes('degree')) {
    return `${portfolio.name} studies Computer Engineering at Jamia Millia Islamia and Data Science at IIT Madras.`;
  }

  return `I’m ${portfolio.name}, a ${portfolio.title}. Ask me about skills, projects, education, or contact details.`;
 }

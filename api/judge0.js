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

  const rapidApiKey = process.env.RAPIDAPI_KEY;
  const rapidApiHost = process.env.RAPIDAPI_HOST || 'judge0-ce.p.rapidapi.com';

  if (!rapidApiKey) {
    return res.status(500).json({ error: 'RAPIDAPI_KEY is not configured' });
  }

  try {
    const body = parseBody(req.body);
    const sourceCode = String(body.source_code || body.sourceCode || '').trim();
    const languageId = String(body.language_id || body.languageId || '71').trim();

    if (!sourceCode) {
      return res.status(400).json({ error: 'Source code is required' });
    }

    const response = await fetch(
      'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-rapidapi-key': rapidApiKey,
          'x-rapidapi-host': rapidApiHost
        },
        body: JSON.stringify({
          source_code: sourceCode,
          language_id: languageId
        })
      }
    );

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    console.error('Judge0 proxy error:', error);
    return res.status(500).json({ error: 'Failed to execute code' });
  }
};

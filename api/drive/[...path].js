const BASE_URL = 'https://www.googleapis.com/drive/v3';

module.exports = async function handler(req, res) {
  const apiKey = process.env.GOOGLE_DRIVE_API_KEY;
  if (!apiKey) {
    // Return a friendly JSON response so the frontend can show a helpful message
    return res.json({ files: [], _missing_key: true, message: 'GOOGLE_DRIVE_API_KEY is not configured' });
  }

  try {
    const pathParts = Array.isArray(req.query.path) ? req.query.path : [req.query.path].filter(Boolean);
    const resourcePath = pathParts.join('/');
    if (!resourcePath) {
      return res.status(400).json({ error: 'Drive resource path is required' });
    }

    const targetUrl = new URL(`${BASE_URL}/${resourcePath}`);
    for (const [key, value] of Object.entries(req.query)) {
      if (key === 'path') continue;
      if (Array.isArray(value)) {
        value.forEach((item) => targetUrl.searchParams.append(key, item));
      } else if (value !== undefined) {
        targetUrl.searchParams.set(key, value);
      }
    }
    targetUrl.searchParams.set('key', apiKey);

    const headers = {};
    if (process.env.GOOGLE_DRIVE_BEARER_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GOOGLE_DRIVE_BEARER_TOKEN}`;
    }

    const response = await fetch(targetUrl.toString(), {
      method: req.method,
      headers
    });

    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await response.json();
      return res.status(response.status).json(data);
    }

    const buffer = await response.arrayBuffer();
    res.status(response.status);
    res.setHeader('Content-Type', contentType || 'application/octet-stream');
    return res.send(Buffer.from(buffer));
  } catch (error) {
    console.error('Drive proxy error:', error);
    return res.status(500).json({ error: 'Failed to proxy Google Drive request' });
  }
};

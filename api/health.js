module.exports = function handler(req, res) {
  if (req.method !== 'GET') {
    res.statusCode = 405;
    return res.json({ error: 'Method not allowed' });
  }

  res.statusCode = 200;
  return res.json({
    ok: true,
    status: 'ready',
    services: {
      youtube: Boolean(process.env.YOUTUBE_API_KEY),
      chat: Boolean(process.env.GEMINI_API_KEY),
      contact: Boolean(process.env.MONGODB_URI)
    }
  });
};

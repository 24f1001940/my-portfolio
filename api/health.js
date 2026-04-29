module.exports = function handler(req, res) {
  if (req.method !== 'GET') {
    res.statusCode = 405;
    return res.json({ error: 'Method not allowed' });
  }

  res.statusCode = 200;
  return res.json({ ok: true, status: 'ready' });
};

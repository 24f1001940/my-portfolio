const { withTimeout, setPublicCache } = require('../_http');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    setPublicCache(res, 60);
    return res.status(503).json({
      error: 'YouTube integration is not configured',
      configured: false
    });
  }

  try {
    const channel = String(req.query.channel || '').trim();
    if (!channel) {
      return res.status(400).json({ error: 'Channel ID is required' });
    }

    const request = withTimeout();
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${encodeURIComponent(channel)}&key=${encodeURIComponent(apiKey)}`,
      { signal: request.signal }
    );
    request.clear();
    const data = await response.json();

    if (!response.ok || !Array.isArray(data.items) || !data.items[0]) {
      console.error('YouTube stats upstream response:', response.status, data?.error?.message);
      return res.status(502).json({ error: 'YouTube stats are temporarily unavailable' });
    }

    const stats = data?.items?.[0]?.statistics || {};
    setPublicCache(res);
    return res.json({
      viewCount: Number(stats.viewCount || 0).toLocaleString('en-IN'),
      subscriberCount: Number(stats.subscriberCount || 0).toLocaleString('en-IN'),
      videoCount: Number(stats.videoCount || 0).toLocaleString('en-IN')
    });
  } catch (error) {
    console.error('YouTube stats proxy error:', error);
    return res.status(error.name === 'AbortError' ? 504 : 502).json({
      error: 'YouTube stats are temporarily unavailable'
    });
  }
};

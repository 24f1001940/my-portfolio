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
      videos: [],
      configured: false
    });
  }

  try {
    const channel = String(req.query.channel || '').trim();
    const parsedLimit = Number.parseInt(String(req.query.limit || '6'), 10);
    const limit = Math.min(Math.max(Number.isFinite(parsedLimit) ? parsedLimit : 6, 1), 12);

    if (!channel) {
      return res.status(400).json({ error: 'Channel ID is required' });
    }

    const request = withTimeout();
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${encodeURIComponent(apiKey)}&channelId=${encodeURIComponent(channel)}&part=snippet,id&order=date&maxResults=${limit}`,
      { signal: request.signal }
    );
    request.clear();
    const data = await response.json();
    if (!response.ok) {
      console.error('YouTube videos upstream response:', response.status, data?.error?.message);
      return res.status(502).json({ error: 'YouTube videos are temporarily unavailable', videos: [] });
    }

    const videos = Array.isArray(data.items)
      ? data.items
        .filter((item) => item?.id?.kind === 'youtube#video' && item?.id?.videoId && item?.snippet?.title)
        .map((item) => ({
          id: { videoId: item.id.videoId },
          snippet: {
            title: item.snippet.title,
            thumbnails: {
              medium: { url: item.snippet.thumbnails?.medium?.url || '' }
            }
          }
        }))
      : [];

    setPublicCache(res);
    return res.json({ videos });
  } catch (error) {
    console.error('YouTube videos proxy error:', error);
    return res.status(error.name === 'AbortError' ? 504 : 502).json({
      error: 'YouTube videos are temporarily unavailable',
      videos: []
    });
  }
};

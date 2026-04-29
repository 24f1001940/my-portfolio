module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'YOUTUBE_API_KEY is not configured' });
  }

  try {
    const channel = String(req.query.channel || '').trim();
    const limit = String(req.query.limit || '6').trim();

    if (!channel) {
      return res.status(400).json({ error: 'Channel ID is required' });
    }

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${encodeURIComponent(channel)}&part=snippet,id&order=date&maxResults=${encodeURIComponent(limit)}`
    );
    const data = await response.json();
    const videos = Array.isArray(data.items)
      ? data.items.filter((item) => item?.id?.kind === 'youtube#video')
      : [];

    return res.json({ videos });
  } catch (error) {
    console.error('YouTube videos proxy error:', error);
    return res.status(500).json({ error: 'Failed to fetch YouTube videos' });
  }
};

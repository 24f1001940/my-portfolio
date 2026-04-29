module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    // Return sample video list as a graceful fallback when API key is missing.
    const sample = [
      {
        id: { videoId: 'dQw4w9WgXcQ' },
        snippet: {
          title: 'Sample Video 1',
          thumbnails: { medium: { url: 'https://via.placeholder.com/320x180?text=Video+1' } }
        }
      },
      {
        id: { videoId: 'kJQP7kiw5Fk' },
        snippet: {
          title: 'Sample Video 2',
          thumbnails: { medium: { url: 'https://via.placeholder.com/320x180?text=Video+2' } }
        }
      },
      {
        id: { videoId: '3JZ_D3ELwOQ' },
        snippet: {
          title: 'Sample Video 3',
          thumbnails: { medium: { url: 'https://via.placeholder.com/320x180?text=Video+3' } }
        }
      }
    ];

    return res.json({ videos: sample, _fallback: true });
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

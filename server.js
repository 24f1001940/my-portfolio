const path = require('path');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const youtubeStats = require('./api/youtube/stats');
const youtubeVideos = require('./api/youtube/videos');
const chat = require('./api/chat');
const judge0 = require('./api/judge0');
const contact = require('./api/contact');

const DRIVE_BASE_URL = 'https://www.googleapis.com/drive/v3';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

app.get('/api/health', (req, res) => {
  res.json({ ok: true, status: 'ready' });
});

app.get('/api/youtube/stats', youtubeStats);
app.get('/api/youtube/videos', youtubeVideos);
app.post('/api/chat', chat);
app.post('/api/judge0', judge0);
app.post('/api/contact', contact);

app.use('/api/drive', async (req, res) => {
  const apiKey = process.env.GOOGLE_DRIVE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GOOGLE_DRIVE_API_KEY is not configured' });
  }

  const requestPath = (req.path || '').replace(/^\//, '');
  if (!requestPath) {
    return res.status(400).json({ error: 'Drive resource path is required' });
  }

  try {
    const targetUrl = new URL(`${DRIVE_BASE_URL}/${requestPath}`);
    for (const [key, value] of Object.entries(req.query)) {
      if (Array.isArray(value)) {
        value.forEach((item) => targetUrl.searchParams.append(key, item));
      } else if (value !== undefined) {
        targetUrl.searchParams.set(key, value);
      }
    }
    targetUrl.searchParams.set('supportsAllDrives', 'true');
    targetUrl.searchParams.set('includeItemsFromAllDrives', 'true');
    targetUrl.searchParams.set('key', apiKey);

    const response = await fetch(targetUrl.toString(), { method: req.method });
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
});

app.use(express.static(__dirname, { extensions: ['html'] }));

app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'Not found' });
  }

  return res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Portfolio server running at http://localhost:${port}`);
});
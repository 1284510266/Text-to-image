const express = require('express');
const https = require('https');
const path = require('path');

const app = express();
const PORT = 8765;

app.use(express.static(path.join(__dirname)));

// Proxy endpoint to avoid CORS issues
app.get('/api/generate', (req, res) => {
  const { prompt, width = 1024, height = 1024, seed } = req.query;
  if (!prompt) return res.status(400).json({ error: 'prompt required' });

  const s = seed || Math.floor(Math.random() * 999999);
  const upstream = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${width}&height=${height}&seed=${s}&nologo=true`;

  https.get(upstream, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (upstreamRes) => {
    // Follow redirects
    if (upstreamRes.statusCode >= 300 && upstreamRes.statusCode < 400 && upstreamRes.headers.location) {
      https.get(upstreamRes.headers.location, (redirRes) => {
        res.setHeader('Content-Type', redirRes.headers['content-type'] || 'image/jpeg');
        res.setHeader('Cache-Control', 'public, max-age=3600');
        redirRes.pipe(res);
      }).on('error', () => res.status(502).end());
      return;
    }
    res.setHeader('Content-Type', upstreamRes.headers['content-type'] || 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-height=3600');
    upstreamRes.pipe(res);
  }).on('error', (err) => {
    console.error('Proxy error:', err.message);
    res.status(502).json({ error: 'upstream error' });
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

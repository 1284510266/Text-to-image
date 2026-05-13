const express = require('express');
const https = require('https');
const http = require('http');
const path = require('path');

const app = express();
const PORT = 8765;

app.use(express.static(path.join(__dirname)));

// Helper: fetch with timeout, follows redirects
function fetchImage(url, timeout = 60000) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        fetchImage(res.headers.location, timeout).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`Upstream returned HTTP ${res.statusCode}`));
        return;
      }
      resolve(res);
    });
    req.on('error', (err) => reject(new Error(`Network error: ${err.message}`)));
    req.on('timeout', () => { req.destroy(); reject(new Error('Request timeout (60s)')); });
  });
}

app.get('/api/generate', async (req, res) => {
  const { prompt, width = 1024, height = 1024, seed } = req.query;
  if (!prompt) return res.status(400).json({ error: 'prompt required' });

  const s = seed || Math.floor(Math.random() * 999999);
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${width}&height=${height}&seed=${s}&nologo=true`;

  console.log(`[Generate] prompt="${prompt}" size=${width}x${height} seed=${s}`);

  try {
    const upstream = await fetchImage(url, 90000);
    res.setHeader('Content-Type', upstream.headers['content-type'] || 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    upstream.pipe(res);
  } catch (err) {
    console.error('[Generate] Error:', err.message);
    res.status(502).json({ error: err.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

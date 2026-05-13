#!/usr/bin/env bash
set -e

cd "$(dirname "$0")"

# Install deps if needed
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
fi

echo ""
echo "  ✨ AI 文字生图"
echo "  → http://localhost:8765"
echo ""

node server.js

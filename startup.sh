#!/bin/sh
set -eu
cd /workspace
# Development/test key supplied for this project. Production should set TMDB_API_KEY.
export TMDB_API_KEY="${TMDB_API_KEY:-692a43c4c264e6dd28bff9f69c0fa8eb}"
# :8081 is QA-only — a revive must never inherit a stale built-output preview.
node scripts/preview.mjs stop || true
if curl -sf -o /dev/null --max-time 2 http://127.0.0.1:8080/; then
  exit 0
fi
npm run dev >>/tmp/app-startup.log 2>&1 &

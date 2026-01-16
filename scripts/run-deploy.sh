#!/usr/bin/env bash
set -euo pipefail

cd "$(cd "$(dirname "$0")" && pwd)/.."

# Prefer the project engine version (Node 22) if available to match Firebase.
NODE22_BIN="/opt/homebrew/opt/node@22/bin"
if [ -x "$NODE22_BIN/node" ]; then
  export PATH="$NODE22_BIN:$PATH"
fi

REAL_NPM_PATH="$(command -v npm)"
export REAL_NPM_PATH
export PATH="$(pwd)/scripts:$PATH"

pnpm run build:prod

firebase deploy --only hosting --project portfolio-danilo-novais --debug

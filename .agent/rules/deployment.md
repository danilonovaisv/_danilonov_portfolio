# Firebase Deployment Rules

## 1. Standalone Output Mode

**MANDATORY**: For Firebase Cloud Functions deployment (SSR), Next.js MUST be configured with `output: 'standalone'`.

- This ensures all `node_modules` required for production are bundled into `.next/standalone`.
- Without this, the serverless function will fail to start due to missing dependencies (e.g. `framer-motion`, `three`).

### Detection

Check `next.config.mjs` for:

```javascript
output: 'standalone',
```

## 2. Pre-deploy Artifact Copying

**MANDATORY**: The `firebase.json` `predeploy` script must copy the `standalone` folder, NOT the raw `.next` folder.

- Source: `.next/standalone/`
- Destination: `functions/next_build/` (or configured `dir`)
- Static assets must be manually copied to `functions/next_build/.next/static`.

## 3. Function Initialization

**MANDATORY**: `functions/src/index.ts` must point to the directory containing the copied standalone build.

- `dir: resolve(__dirname, '../next_build')`

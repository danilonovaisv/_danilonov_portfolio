# 🔗 AUDIT REPORT — Asset Links Repair

**Date:** 2026-01-31
**Status:** ✅ RESOLVED
**Focus:** Link Integrity, Asset Paths, Supabase Buckets

---

## 🔍 Discovery & Analysis

### 1. Missing Folders Reference

The codebase (specifically `src/lib/constants.tsx`) was referencing two non-existent folders in the `site-assets` bucket:

- ❌ `project-images/`
- ❌ `client-logos/`
- ❌ `logo_site/`

### 2. Asset Relocation

SQL queries confirmed the assets were actually located in different paths:

| Intended Asset | Old Path (Broken) | Actual Path (Verified) |
|:---|:---|:---|
| Branding Project | `project-images/Brand-Identity%20copy.webp` | `site-assets/home/showcase/Branding-Project.webp` |
| Key Visual | `project-images/Key-Visual.webp` | `site-assets/home/showcase/Key-Visual.webp` |
| Motion GIF | `project-images/webdesigner-2%202.gif` | `site-assets/home/showcase/webdesigner-2.gif` |
| Client Logos | `client-logos/clientN.svg` | `site-assets/clients/clients.strip.N.svg` |
| Favicon/Logos | `logo_site/...` | `site-assets/global/logos/...` |

### 3. Hardcoded URLs

`src/data/projects.ts` contained hardcoded Supabase URLs which are fragile if the project ID changes.

---

## 🛠️ Measures Taken

### Fix 1: Updated `src/lib/constants.tsx` ✅

- Remapped all broken `ASSETS` keys to verified Supabase paths.
- Updated `FEATURED_PROJECTS` to point to existant `home/showcase` images.
- Updated `CLIENT_LOGOS` to use the correct `clients.strip.N.svg` naming convention.

### Fix 2: Refactored `src/data/projects.ts` ✅

- Replaced hardcoded string URLs with `getGhostAssetUrl()` helper function.
- This ensures URLs automatically respect the environment configuration (`SUPABASE_STORAGE_URL`).
- Fixed broken links in `galleryProjects` by pointing to valid files in `portfolio-media` and `site-assets`.

### Fix 3: Verified About Origin Assets

- Confirmed via SQL that `about/origin/about.origin_image.[1-4].webp` exist in the `site-assets` bucket.
- Confirmed `AboutOrigin.tsx` logic correctly constructs these URLs.

---

## ✅ Summary

All known broken asset links identified in `constants.tsx` and `projects.ts` have been corrected. The system now uses robust, helper-generated URLs pointing to verified storage locations.

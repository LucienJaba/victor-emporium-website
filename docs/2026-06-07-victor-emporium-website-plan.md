# Victor Emporium Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a 5-page custom marketing website for Victor Emporium (modern-nostalgic aesthetic) with a flagship 75-year-history Story page, anchored by a real exterior video and two real photos.

**Architecture:** Astro static-site generator with Tailwind CSS for styling and Motion (Framer Motion) React islands for scroll-triggered animation on the Story timeline. Content lives in typed TS data files; pages compose components and pull from data. Phased delivery: Home + Story (flagship) first, then Menu, Shop, Visit, then launch prep.

**Tech Stack:** Astro 4, Tailwind CSS 3, Motion 12 (Framer Motion), React 18 (islands only), TypeScript, Playwright (e2e), ffmpeg + sharp (asset optimization), Web3Forms (contact form), OpenStreetMap embed (map).

---

## File Structure

```
Victor-Emporium-website/
├── assets/                              # source assets (already in place)
│   ├── video/emporium-exterior.mov
│   └── photos/
│       ├── emporium-storefront-landscape.heic
│       └── emporium-milkshake-sign-portrait.heic
├── docs/                                # specs and plans (already in place)
├── public/                              # served by Astro at root
│   ├── video/
│   │   ├── emporium-exterior.mp4        # web-optimized (generated)
│   │   ├── emporium-exterior.webm       # web-optimized (generated)
│   │   └── emporium-poster.jpg          # video poster frame (generated)
│   ├── images/
│   │   ├── storefront-landscape.webp    # from HEIC (generated)
│   │   ├── milkshake-sign-portrait.webp # from HEIC (generated)
│   │   └── archival/                    # nanobanana-generated archival images
│   ├── favicon.svg
│   └── og-image.jpg
├── src/
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Footer.astro
│   │   ├── HeroVideo.astro
│   │   ├── PullQuote.astro
│   │   ├── StoryTimeline.tsx            # React island
│   │   ├── TimelinePanel.tsx            # React, used inside StoryTimeline
│   │   ├── MenuCard.astro
│   │   ├── ShopGallery.astro
│   │   ├── HoursBlock.astro
│   │   └── ContactForm.astro
│   ├── data/
│   │   ├── ownership.ts                 # 7 owner eras
│   │   ├── menu.ts                      # soda fountain items
│   │   ├── shop.ts                      # gallery categories
│   │   └── visit.ts                     # hours/address/contact
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── story.astro
│   │   ├── menu.astro
│   │   ├── shop.astro
│   │   └── visit.astro
│   └── styles/
│       └── globals.css
├── tests/
│   ├── home.spec.ts
│   ├── story.spec.ts
│   ├── menu.spec.ts
│   ├── shop.spec.ts
│   └── visit.spec.ts
├── scripts/
│   └── optimize-assets.sh               # one-shot media conversion
├── astro.config.mjs
├── tailwind.config.mjs
├── playwright.config.ts
├── tsconfig.json
├── package.json
├── netlify.toml                         # deploy config
├── .gitignore
└── README.md
```

---

## Phase 0 — Project Setup

### Task 1: Initialize Astro project + git

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`, `README.md`

- [ ] **Step 1: Run Astro init**

```bash
cd /Users/luciengutierrez/Desktop/Victor-Emporium-website
npm create astro@latest -- --template minimal --typescript strict --install --no-git --yes .
```

Expected: Astro scaffolds `src/`, `public/`, `astro.config.mjs`, `tsconfig.json`, `package.json` in current dir. Dependencies install.

- [ ] **Step 2: Verify dev server boots**

```bash
npm run dev
```

Expected: Server starts on `http://localhost:4321`. Default Astro page renders. Stop with Ctrl+C.

- [ ] **Step 3: Init git and initial commit**

```bash
git init
git add -A
git commit -m "chore: scaffold astro project"
```

Expected: First commit lands.

---

### Task 2: Install Tailwind + Motion + React integration

**Files:**
- Modify: `package.json` (deps)
- Modify: `astro.config.mjs`
- Create: `tailwind.config.mjs`
- Create: `src/styles/globals.css`

- [ ] **Step 1: Install Tailwind via Astro integration**

```bash
npx astro add tailwind --yes
```

Expected: Adds `@astrojs/tailwind`, generates `tailwind.config.mjs`, wires into `astro.config.mjs`.

- [ ] **Step 2: Install React integration (for Motion islands)**

```bash
npx astro add react --yes
```

Expected: Adds `@astrojs/react`, React, ReactDOM, types.

- [ ] **Step 3: Install Motion**

```bash
npm install motion
```

Expected: `motion` package added.

- [ ] **Step 4: Replace `tailwind.config.mjs` with design tokens**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FAF6EE',
        ink: '#1B1B1B',
        'emporium-red': '#B7261F',
        gold: '#D9A441',
        night: '#0E2230',
        wood: '#5C2E1A',
      },
      fontFamily: {
        display: ['Recoleta', 'Domaine Display', 'Georgia', 'serif'],
        body: ['Inter', 'Söhne', 'system-ui', 'sans-serif'],
        accent: ['"Libre Caslon Text"', 'Georgia', 'serif'],
      },
      maxWidth: {
        prose: '720px',
        gallery: '1280px',
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 5: Create `src/styles/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Libre+Caslon+Text:ital@1&display=swap');
/* Recoleta is not on Google Fonts — falls back to Domaine Display, then Georgia. Self-host later via Adobe Fonts or purchased license. */

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    @apply bg-cream text-ink font-body antialiased;
  }
  h1, h2, h3, h4 {
    @apply font-display;
  }
}

@layer components {
  .container-prose {
    @apply max-w-prose mx-auto px-6;
  }
  .container-gallery {
    @apply max-w-gallery mx-auto px-6;
  }
}
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: configure tailwind, motion, react with design tokens"
```

---

### Task 3: Configure Playwright for e2e tests

**Files:**
- Create: `playwright.config.ts`
- Modify: `package.json` (add `test` script)

- [ ] **Step 1: Install Playwright**

```bash
npm install -D @playwright/test
npx playwright install chromium
```

Expected: Chromium downloads.

- [ ] **Step 2: Create `playwright.config.ts`**

```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  use: {
    baseURL: 'http://localhost:4321',
    headless: true,
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
```

- [ ] **Step 3: Add `test` script to `package.json`**

In `package.json` "scripts", add: `"test": "playwright test"`.

- [ ] **Step 4: Write a smoke test**

Create `tests/smoke.spec.ts`:

```ts
import { test, expect } from '@playwright/test';

test('home page boots', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/.*/);
});
```

- [ ] **Step 5: Run it**

```bash
npm test
```

Expected: 1 passed. (Page exists since Astro scaffolded it.)

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "test: configure playwright with smoke test"
```

---

### Task 4: Optimize source assets (video + photos)

**Files:**
- Create: `scripts/optimize-assets.sh`
- Generated outputs: `public/video/emporium-exterior.mp4`, `public/video/emporium-exterior.webm`, `public/video/emporium-poster.jpg`, `public/images/storefront-landscape.webp`, `public/images/milkshake-sign-portrait.webp`

- [ ] **Step 1: Confirm ffmpeg and sips are available**

```bash
which ffmpeg && which sips
```

Expected: Both paths print. If ffmpeg is missing, install: `brew install ffmpeg`.

- [ ] **Step 2: Create `scripts/optimize-assets.sh`**

```bash
#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC_VID="$ROOT/assets/video/emporium-exterior.mov"
SRC_LAND="$ROOT/assets/photos/emporium-storefront-landscape.heic"
SRC_PORT="$ROOT/assets/photos/emporium-milkshake-sign-portrait.heic"

OUT_VID="$ROOT/public/video"
OUT_IMG="$ROOT/public/images"
mkdir -p "$OUT_VID" "$OUT_IMG"

echo "→ Converting video to web mp4 (1080p, h264)..."
ffmpeg -y -i "$SRC_VID" \
  -vf "scale=-2:1080" \
  -c:v libx264 -preset slow -crf 24 -movflags +faststart \
  -an "$OUT_VID/emporium-exterior.mp4"

echo "→ Converting video to webm (1080p, vp9)..."
ffmpeg -y -i "$SRC_VID" \
  -vf "scale=-2:1080" \
  -c:v libvpx-vp9 -crf 34 -b:v 0 \
  -an "$OUT_VID/emporium-exterior.webm"

echo "→ Extracting video poster frame (1s in)..."
ffmpeg -y -i "$SRC_VID" -ss 00:00:01 -vframes 1 -q:v 3 "$OUT_VID/emporium-poster.jpg"

echo "→ Converting HEIC photos to WebP via sips + cwebp..."
TMP=$(mktemp -d)
sips -s format jpeg "$SRC_LAND" --out "$TMP/land.jpg" > /dev/null
sips -s format jpeg "$SRC_PORT" --out "$TMP/port.jpg" > /dev/null
ffmpeg -y -i "$TMP/land.jpg" -vf "scale=2400:-2" -q:v 85 "$OUT_IMG/storefront-landscape.webp"
ffmpeg -y -i "$TMP/port.jpg" -vf "scale=1600:-2" -q:v 85 "$OUT_IMG/milkshake-sign-portrait.webp"
rm -rf "$TMP"

echo "✓ Asset optimization complete."
```

- [ ] **Step 3: Make executable and run**

```bash
chmod +x scripts/optimize-assets.sh
./scripts/optimize-assets.sh
```

Expected: Outputs land in `public/video/` and `public/images/`. MP4 should be ~5–20MB (down from 131MB).

- [ ] **Step 4: Verify file sizes are reasonable**

```bash
ls -lh public/video public/images
```

Expected: MP4 < 25MB, WebM < 20MB, WebPs < 500KB each.

- [ ] **Step 5: Add `public/video/` and `public/images/` to git but mark assets/ in .gitignore for now (large source files)**

Update `.gitignore` to add:
```
# Large source media (not deployed)
assets/video/*.mov
```

Then:

```bash
git add -A
git commit -m "feat: asset optimization pipeline + optimized media"
```

---

### Task 5: Build BaseLayout, Nav, Footer

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/Nav.astro`
- Create: `src/components/Footer.astro`

- [ ] **Step 1: Create `src/components/Nav.astro`**

```astro
---
const links = [
  { href: '/', label: 'Home' },
  { href: '/story', label: 'Our Story' },
  { href: '/menu', label: 'Menu' },
  { href: '/shop', label: 'Shop' },
  { href: '/visit', label: 'Visit' },
];
const pathname = Astro.url.pathname;
---
<nav class="sticky top-0 z-40 bg-cream/90 backdrop-blur border-b border-ink/10">
  <div class="container-gallery flex items-center justify-between py-4">
    <a href="/" class="font-display text-xl tracking-tight">
      Victor Emporium <span class="font-accent italic text-sm text-ink/60">Est. 1950</span>
    </a>
    <ul class="hidden md:flex gap-8 text-sm uppercase tracking-widest">
      {links.map(l => (
        <li>
          <a
            href={l.href}
            class:list={[
              'hover:text-emporium-red transition-colors',
              pathname === l.href && 'text-emporium-red'
            ]}
          >{l.label}</a>
        </li>
      ))}
    </ul>
  </div>
</nav>
```

- [ ] **Step 2: Create `src/components/Footer.astro`**

```astro
---
---
<footer class="bg-night text-cream mt-24">
  <div class="container-gallery py-16 grid md:grid-cols-3 gap-12">
    <div>
      <p class="font-display text-2xl">Victor Emporium</p>
      <p class="font-accent italic text-sm text-cream/70 mt-1">Est. 1950</p>
      <p class="text-sm text-cream/70 mt-4 max-w-xs">
        Soda fountain, general store, and seventy-five years of small-town gathering. Victor, Idaho.
      </p>
    </div>
    <div>
      <h3 class="font-display text-lg mb-4">Visit</h3>
      <p class="text-sm text-cream/70">Main Street<br/>Victor, Idaho</p>
      <p class="text-sm text-cream/70 mt-2">Open year-round · hours vary by season</p>
      <a href="/visit" class="inline-block mt-3 text-emporium-red hover:underline text-sm">Plan your visit →</a>
    </div>
    <div>
      <h3 class="font-display text-lg mb-4">Quick links</h3>
      <ul class="space-y-2 text-sm text-cream/70">
        <li><a href="/story" class="hover:text-cream">Our Story</a></li>
        <li><a href="/menu" class="hover:text-cream">Menu</a></li>
        <li><a href="/shop" class="hover:text-cream">Shop</a></li>
      </ul>
    </div>
  </div>
  <div class="border-t border-cream/10 py-6 text-center text-xs text-cream/50">
    © {new Date().getFullYear()} Victor Emporium · Victor, Idaho
  </div>
</footer>
```

- [ ] **Step 3: Create `src/layouts/BaseLayout.astro`**

```astro
---
import '../styles/globals.css';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';

interface Props {
  title: string;
  description?: string;
}
const { title, description = 'Victor Emporium — soda fountain, general store, and 75 years of small-town gathering in Victor, Idaho.' } = Astro.props;
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="/og-image.jpg" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title}</title>
  </head>
  <body>
    <Nav />
    <main>
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

- [ ] **Step 4: Replace `src/pages/index.astro` placeholder with BaseLayout to verify wiring**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="Victor Emporium">
  <section class="container-prose py-24 text-center">
    <h1 class="text-5xl font-display">Coming soon</h1>
    <p class="mt-4 text-ink/70">Hero coming in the next task.</p>
  </section>
</BaseLayout>
```

- [ ] **Step 5: Run dev and verify nav/footer render**

```bash
npm run dev
```

Visit `http://localhost:4321`. Expected: Nav with 5 links sticky at top, footer at bottom with three columns. Stop the server.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: base layout with nav and footer"
```

---

## Phase 1 — Home Page

### Task 6: Build HeroVideo component

**Files:**
- Create: `src/components/HeroVideo.astro`

- [ ] **Step 1: Create `src/components/HeroVideo.astro`**

```astro
---
interface Props {
  poster?: string;
}
const { poster = '/video/emporium-poster.jpg' } = Astro.props;
---
<section class="relative w-full h-[90vh] min-h-[600px] overflow-hidden bg-night">
  <video
    class="absolute inset-0 w-full h-full object-cover"
    autoplay
    muted
    loop
    playsinline
    preload="metadata"
    poster={poster}
  >
    <source src="/video/emporium-exterior.webm" type="video/webm" />
    <source src="/video/emporium-exterior.mp4" type="video/mp4" />
  </video>
  <div class="absolute inset-0 bg-gradient-to-b from-night/30 via-night/20 to-night/70"></div>
  <div class="relative z-10 h-full flex flex-col items-center justify-end pb-20 text-center text-cream container-prose">
    <p class="font-accent italic text-base tracking-wide text-cream/80">Est. 1950</p>
    <h1 class="font-display text-6xl md:text-8xl mt-2 leading-none">Victor Emporium</h1>
    <p class="mt-6 text-lg md:text-xl text-cream/90 max-w-xl">
      Soda fountain. General store. Victor, Idaho.
    </p>
    <a href="/visit" class="mt-10 inline-block bg-emporium-red text-cream px-8 py-3 text-sm uppercase tracking-widest hover:bg-emporium-red/90 transition-colors">
      Plan your visit
    </a>
  </div>
</section>
```

- [ ] **Step 2: Wire into `src/pages/index.astro` (replace placeholder)**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import HeroVideo from '../components/HeroVideo.astro';
---
<BaseLayout title="Victor Emporium">
  <HeroVideo />
</BaseLayout>
```

- [ ] **Step 3: Verify in dev**

```bash
npm run dev
```

Expected: Video plays muted, looped, with overlay text and CTA. Stop server.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(home): hero video component"
```

---

### Task 7: Add Home page content sections

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Add intro, "what we are" tiles, story teaser, "famous for", visit strip to `src/pages/index.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import HeroVideo from '../components/HeroVideo.astro';

const tiles = [
  { title: 'Soda Fountain', href: '/menu', body: 'Real ice cream. Real malts. Famous huckleberry milkshakes.' },
  { title: 'General Store', href: '/shop', body: 'Local goods, gifts, sundries — the way a Main Street store should be.' },
  { title: 'Apparel', href: '/shop#apparel', body: 'Shirts, hats, hoodies. Wear the Valley.' },
  { title: 'Local Goods', href: '/shop#local', body: 'Jams, candy, and treasures from the people next door.' },
];
---
<BaseLayout title="Victor Emporium">
  <HeroVideo />

  <section class="container-prose py-24 text-center">
    <p class="font-accent italic text-emporium-red text-lg">A Main Street institution</p>
    <h2 class="font-display text-4xl md:text-5xl mt-3">Seventy-five years on the same corner.</h2>
    <p class="mt-6 text-lg text-ink/80 leading-relaxed">
      Since 1950, the Emporium has been Victor's gathering place — first as the Victor Drug Company, then the Egbert Trading Post, and the Victor Emporium ever since. Through seven owners, the soda fountain has never stopped scooping.
    </p>
  </section>

  <section class="container-gallery pb-24">
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {tiles.map(t => (
        <a href={t.href} class="group block border border-ink/10 bg-cream hover:border-emporium-red transition-colors p-8">
          <h3 class="font-display text-2xl">{t.title}</h3>
          <p class="mt-3 text-sm text-ink/70 leading-relaxed">{t.body}</p>
          <span class="mt-6 inline-block text-xs uppercase tracking-widest text-emporium-red group-hover:translate-x-1 transition-transform">Explore →</span>
        </a>
      ))}
    </div>
  </section>

  <section class="bg-wood text-cream py-24">
    <div class="container-prose text-center">
      <p class="font-accent italic text-gold text-lg">From the history</p>
      <blockquote class="font-display text-3xl md:text-4xl mt-6 leading-snug">
        "They struck an informal deal and took over at the end of 1999, sealing it with a handshake and signing the offer on the hood of a truck at a boat ramp in Jackson."
      </blockquote>
      <p class="mt-6 text-sm uppercase tracking-widest text-cream/70">On the Keeley &amp; Ferris era, 1999–2025</p>
      <a href="/story" class="mt-10 inline-block border border-cream/40 text-cream px-8 py-3 text-sm uppercase tracking-widest hover:bg-cream hover:text-wood transition-colors">75 years on Main Street →</a>
    </div>
  </section>

  <section class="container-gallery py-24">
    <div class="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <p class="font-accent italic text-emporium-red text-lg">Famous for</p>
        <h2 class="font-display text-4xl md:text-5xl mt-3">The Huckleberry Milkshake.</h2>
        <p class="mt-6 text-lg text-ink/80 leading-relaxed">
          Wild huckleberries, real ice cream, hand-spun at the fountain. The reason locals stop in most mornings and the reason tourists drive miles out of their way.
        </p>
        <a href="/menu" class="mt-8 inline-block text-emporium-red hover:underline">See the full menu →</a>
      </div>
      <div class="aspect-[4/5] bg-ink/5">
        <img
          src="/images/milkshake-sign-portrait.webp"
          alt="The hand-painted milkshake sign at the front of the Victor Emporium"
          class="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    </div>
  </section>

  <section class="bg-emporium-red text-cream py-16">
    <div class="container-gallery flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
      <div>
        <p class="font-accent italic text-cream/80">Stop in</p>
        <p class="font-display text-3xl">Open year-round on Main Street.</p>
      </div>
      <a href="/visit" class="inline-block bg-cream text-emporium-red px-8 py-3 text-sm uppercase tracking-widest hover:bg-cream/90 transition-colors">Hours &amp; directions →</a>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Verify in dev**

```bash
npm run dev
```

Visit `http://localhost:4321`. Expected: Full home page scrolls cleanly — hero, intro, tiles, story pull-quote on wood background, milkshake feature with photo, red visit strip. Stop server.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat(home): full home page sections"
```

---

### Task 8: Playwright test for Home

**Files:**
- Create: `tests/home.spec.ts`
- Delete: `tests/smoke.spec.ts` (replaced)

- [ ] **Step 1: Replace smoke test with `tests/home.spec.ts`**

```ts
import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders hero with wordmark and CTA', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Victor Emporium');
    await expect(page.getByRole('link', { name: /plan your visit/i }).first()).toBeVisible();
  });

  test('shows the four what-we-are tiles', async ({ page }) => {
    for (const label of ['Soda Fountain', 'General Store', 'Apparel', 'Local Goods']) {
      await expect(page.getByRole('heading', { name: label })).toBeVisible();
    }
  });

  test('shows the story pull-quote and link', async ({ page }) => {
    await expect(page.getByText(/handshake/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /75 years on main street/i })).toBeVisible();
  });

  test('shows the milkshake feature with image', async ({ page }) => {
    await expect(page.getByText('Huckleberry Milkshake')).toBeVisible();
    await expect(page.locator('img[alt*="milkshake sign"]')).toBeVisible();
  });

  test('no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    await page.reload();
    await page.waitForLoadState('networkidle');
    expect(errors).toEqual([]);
  });
});
```

- [ ] **Step 2: Delete the old smoke test**

```bash
rm tests/smoke.spec.ts
```

- [ ] **Step 3: Run the tests**

```bash
npm test
```

Expected: All Home tests pass.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "test(home): coverage for hero, tiles, pull-quote, feature, no console errors"
```

**🚢 Phase 1 ship checkpoint:** Home page is now shippable as a standalone preview. Optionally deploy a Netlify preview now to show owners.

---

## Phase 2 — Story Page (Flagship)

### Task 9: Define ownership history data

**Files:**
- Create: `src/data/ownership.ts`

- [ ] **Step 1: Write the typed data file**

```ts
export type Owner = {
  slug: string;
  years: string;
  ownerNames: string;
  headline: string;
  body: string;
  pullQuote?: string;
  imagePath: string;
  imageAlt: string;
  imageStyle: 'archival' | 'photo';
};

export const ownership: Owner[] = [
  {
    slug: 'holmes',
    years: '1950–1963',
    ownerNames: 'Harold Holmes',
    headline: 'The Victor Drug Company',
    body: 'In 1950, Harold Holmes completed construction of the Victor Drug Company. He ran it as a hub for the post-war Valley community — candy, gifts, magazines, flowers, sodas, ice cream, and a watch repair counter at the soda fountain. In 1952, he opened a movie theater next door; television closed it within a few years. Holmes worked six to seven days a week, year-round, for thirteen years before selling in 1963.',
    imagePath: '/images/archival/1950-drug-company.jpg',
    imageAlt: 'Sepia-toned archival illustration of the 1950s Victor Drug Company storefront',
    imageStyle: 'archival',
  },
  {
    slug: 'egbert',
    years: '1963–1978',
    ownerNames: 'Peggy & Tom Egbert',
    headline: 'The Egbert Trading Post',
    body: 'The Egberts renamed the store and broadened its offerings — souvenirs, gifts, variety items, plus fishing and hunting gear for the growing Valley scene. They opened Pierre\'s Playhouse community theater, which became a beloved institution. They expanded into donuts delivered to Driggs businesses and Grand Targhee skiers before selling in 1978 to pursue theater in Arizona.',
    imagePath: '/images/archival/1970-trading-post.jpg',
    imageAlt: 'Sepia-toned archival illustration of the Egbert Trading Post in the 1970s',
    imageStyle: 'archival',
  },
  {
    slug: 'kasper',
    years: '1978–1985',
    ownerNames: 'Ted & Shona Kasper',
    headline: 'The Emporium gets its name',
    body: 'The Kaspers added sporting goods and fishing gear and rebranded as the Victor Emporium — the name that stuck. Hollywood arrived briefly when portions of Continental Divide were filmed in Victor; the Kaspers famously interacted with John Belushi. They kept the fountain humming through 100–150 gallons of ice cream a week each summer before stepping away in 1985.',
    pullQuote: 'Hollywood arrived briefly when Continental Divide came through town.',
    imagePath: '/images/archival/1980-emporium.jpg',
    imageAlt: 'Sepia-toned archival illustration of the Victor Emporium soda fountain in the 1980s',
    imageStyle: 'archival',
  },
  {
    slug: 'woolstenhulme',
    years: '1985–1989',
    ownerNames: 'Rosalee Woolstenhulme',
    headline: 'Family, fountain, fishing',
    body: 'Woolstenhulme kept the Emporium name and its focus on variety and fishing gear, leaning on family help to run the business. She spent long hours scooping ice cream at the fountain — her favorite way to meet locals and travelers. After four years of long days, she decided it was time to slow down.',
    imagePath: '/images/archival/1985-fountain.jpg',
    imageAlt: 'Sepia-toned archival illustration of the soda fountain counter in the late 1980s',
    imageStyle: 'archival',
  },
  {
    slug: 'meyer',
    years: '1989–1999',
    ownerNames: 'Bob & Marilyn Meyer',
    headline: 'An international fishing destination',
    body: 'The Meyers bought the Emporium in September 1989 and leaned hard into its identity as a fishing destination, drawing anglers from across the U.S. and around the world — Japan, South America, France, Australia. They expanded the merchandise to include souvenirs, t-shirts, books, and hunting gear while keeping the iconic fountain running. They were planning the 50th anniversary celebration as they wound down.',
    imagePath: '/images/archival/1995-fishing-shop.jpg',
    imageAlt: 'Sepia-toned archival illustration of fishing gear displayed in the Emporium in the 1990s',
    imageStyle: 'archival',
  },
  {
    slug: 'keeley-ferris',
    years: '1999–2025',
    ownerNames: 'Kathryn Ferris & Kimberly Keeley',
    headline: 'A handshake on a truck hood',
    body: 'Kim and Kath had been fishing guides who stopped in most mornings for huckleberry milkshakes and licenses. When the Meyers began looking toward retirement, the two struck an informal deal and signed it on the hood of a truck at a boat ramp in Jackson. They kept the doors open year-round — shoveling the stoop, selling lunches — and never went a single day without selling ice cream in twenty-six years. Along the way, they gave dozens of valley teenagers their first jobs.',
    pullQuote: 'They never went a single day without selling ice cream in twenty-six years.',
    imagePath: '/images/archival/2010-counter.jpg',
    imageAlt: 'Sepia-toned archival illustration of the Emporium counter in the 2010s',
    imageStyle: 'archival',
  },
  {
    slug: 'zderski',
    years: '2025–present',
    ownerNames: 'Adam & Lee Zderski',
    headline: 'The next chapter',
    body: 'Originally from Melbourne, Australia, Adam and Lee landed in Teton Valley in 2019 after years of vacationing here. Their son, who had been working at the Emporium and loved it, set the purchase in motion when the business went up for sale. With backgrounds in engineering and education, they\'re committed to honoring the legacy while supporting the teenage crew who keeps the milkshake counter humming.',
    imagePath: '/images/storefront-landscape.webp',
    imageAlt: 'The Victor Emporium storefront at blue hour',
    imageStyle: 'photo',
  },
];
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat(story): ownership history data"
```

---

### Task 10: Build TimelinePanel React component

**Files:**
- Create: `src/components/TimelinePanel.tsx`

- [ ] **Step 1: Write the component**

```tsx
import { motion } from 'motion/react';
import type { Owner } from '../data/ownership';

type Props = { owner: Owner; index: number };

export function TimelinePanel({ owner, index }: Props) {
  const isReversed = index % 2 === 1;
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="container-gallery py-20 md:py-28 border-t border-ink/10 first:border-t-0"
    >
      <div className={`grid md:grid-cols-2 gap-12 items-center ${isReversed ? 'md:[&>*:first-child]:order-2' : ''}`}>
        <div className={owner.imageStyle === 'archival' ? 'sepia-[0.4] saturate-50' : ''}>
          <img
            src={owner.imagePath}
            alt={owner.imageAlt}
            className="w-full h-auto aspect-[4/3] object-cover"
            loading="lazy"
          />
        </div>
        <div>
          <p className="font-accent italic text-emporium-red text-base">{owner.years}</p>
          <p className="text-sm uppercase tracking-widest text-ink/60 mt-1">{owner.ownerNames}</p>
          <h2 className="font-display text-3xl md:text-4xl mt-4 leading-tight">{owner.headline}</h2>
          <p className="mt-6 text-base md:text-lg text-ink/80 leading-relaxed">{owner.body}</p>
          {owner.pullQuote && (
            <blockquote className="mt-8 border-l-2 border-emporium-red pl-6 font-display text-xl md:text-2xl italic text-ink/90">
              "{owner.pullQuote}"
            </blockquote>
          )}
        </div>
      </div>
    </motion.article>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat(story): TimelinePanel react component with motion"
```

---

### Task 11: Build StoryTimeline wrapper + page

**Files:**
- Create: `src/components/StoryTimeline.tsx`
- Create: `src/pages/story.astro`

- [ ] **Step 1: Create `src/components/StoryTimeline.tsx`**

```tsx
import { ownership } from '../data/ownership';
import { TimelinePanel } from './TimelinePanel';

export function StoryTimeline() {
  return (
    <div>
      {ownership.map((owner, i) => (
        <TimelinePanel key={owner.slug} owner={owner} index={i} />
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Create `src/pages/story.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { StoryTimeline } from '../components/StoryTimeline';
---
<BaseLayout title="Our Story · Victor Emporium" description="Seventy-five years on Main Street — the full history of the Victor Emporium, told through its seven owners from 1950 to today.">
  <header class="relative h-[70vh] min-h-[480px] bg-night text-cream overflow-hidden">
    <img
      src="/images/storefront-landscape.webp"
      alt="The Victor Emporium storefront at blue hour"
      class="absolute inset-0 w-full h-full object-cover opacity-50"
    />
    <div class="absolute inset-0 bg-gradient-to-b from-night/40 via-night/30 to-night/80"></div>
    <div class="relative h-full container-prose flex flex-col justify-end pb-20 text-center">
      <p class="font-accent italic text-gold text-lg">A Main Street story</p>
      <h1 class="font-display text-5xl md:text-7xl mt-3 leading-none">75 Years on Main Street</h1>
      <p class="mt-6 text-lg text-cream/80 max-w-2xl mx-auto">
        Seven owners. One soda fountain. A small Idaho town's living room since 1950.
      </p>
    </div>
  </header>

  <StoryTimeline client:visible />

  <section class="bg-emporium-red text-cream py-24">
    <div class="container-prose text-center">
      <p class="font-accent italic text-cream/80 text-lg">Chapter Eight</p>
      <h2 class="font-display text-4xl md:text-5xl mt-3">The next chapter is being written.</h2>
      <p class="mt-6 text-lg text-cream/90">Come be part of it.</p>
      <a href="/visit" class="mt-10 inline-block bg-cream text-emporium-red px-8 py-3 text-sm uppercase tracking-widest hover:bg-cream/90 transition-colors">Plan your visit →</a>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 3: Generate placeholder archival images directory**

```bash
mkdir -p public/images/archival
```

Drop 6 placeholder 4:3 sepia images in for now (any 4:3 image will do — they'll be replaced with nanobanana output in Task 13). Quick generic placeholder via ffmpeg:

```bash
for n in 1950-drug-company 1970-trading-post 1980-emporium 1985-fountain 1995-fishing-shop 2010-counter; do
  ffmpeg -y -f lavfi -i "color=c=0x5C2E1A:size=1200x900,format=yuv420p" -frames:v 1 "public/images/archival/${n}.jpg"
done
```

Expected: 6 solid-color placeholder files in `public/images/archival/`.

- [ ] **Step 4: Verify in dev**

```bash
npm run dev
```

Visit `http://localhost:4321/story`. Expected: Cinematic hero, 7 timeline panels alternating left/right, scroll-triggered fade-ins, red closing CTA. Stop server.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(story): flagship timeline page with motion"
```

---

### Task 12: Generate sepia archival images via nanobanana

**Files:**
- Replace: `public/images/archival/*.jpg`

- [ ] **Step 1: Generate images using the nanobanana MCP**

Use the `mcp__nanobanana__generate_image` tool with these prompts (one per file). Style hint: "vintage sepia-toned watercolor illustration, archival look, soft warm tones, late afternoon light, low contrast, painterly."

| Output file | Prompt |
|---|---|
| `1950-drug-company.jpg` | "1950s small-town Idaho drugstore exterior with hand-painted signage reading 'Victor Drug Company,' soda fountain interior visible through glass, wood-frame building, parked vintage cars on Main Street, vintage sepia-toned watercolor illustration, soft warm tones, low contrast, painterly" |
| `1970-trading-post.jpg` | "1970s general store interior with shelves of souvenirs, fishing rods, sporting goods, vintage signage reading 'Egbert Trading Post,' wood paneling, vintage sepia-toned watercolor illustration, warm afternoon light, painterly" |
| `1980-emporium.jpg` | "1980s soda fountain counter with chrome stools, glass jars of ice cream, hand-painted Coca-Cola signs above, customers seated, vintage sepia-toned watercolor illustration, warm tones, painterly, evening light" |
| `1985-fountain.jpg` | "Close-up of a 1980s soda fountain — hand reaching for an ice cream scoop, chrome dispenser, glass milkshake cup, sepia-toned vintage watercolor illustration, warm light, painterly, soft focus background" |
| `1995-fishing-shop.jpg` | "1990s small-town fishing gear shop interior — fly rods on the wall, fishing vests, hats hung on pegs, fly-tying display, wood floors, sepia-toned vintage watercolor illustration, warm tones, painterly" |
| `2010-counter.jpg` | "2010s Idaho general store counter — milkshake machines spinning, glass jars of candy, hand-painted milkshake hand sign, teenager staff working, customers in line, sepia-toned vintage watercolor illustration, warm light, painterly" |

Save each to `public/images/archival/<filename>.jpg`, replacing the placeholder. Aspect ratio 4:3.

- [ ] **Step 2: Verify the images render properly in dev**

```bash
npm run dev
```

Visit `http://localhost:4321/story`. Expected: Each panel shows its archival image. Stop server.

- [ ] **Step 3: Commit**

```bash
git add public/images/archival/
git commit -m "feat(story): nanobanana-generated archival illustrations"
```

---

### Task 13: Playwright test for Story

**Files:**
- Create: `tests/story.spec.ts`

- [ ] **Step 1: Write the test**

```ts
import { test, expect } from '@playwright/test';

test.describe('Story page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/story');
  });

  test('renders the hero', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('75 Years on Main Street');
  });

  test('shows all 7 ownership eras', async ({ page }) => {
    const expectedYears = ['1950–1963', '1963–1978', '1978–1985', '1985–1989', '1989–1999', '1999–2025', '2025–present'];
    for (const y of expectedYears) {
      await expect(page.getByText(y).first()).toBeVisible();
    }
  });

  test('shows the Belushi pull quote', async ({ page }) => {
    await expect(page.getByText(/Continental Divide/i)).toBeVisible();
  });

  test('closing CTA links to /visit', async ({ page }) => {
    const cta = page.getByRole('link', { name: /plan your visit/i }).last();
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', '/visit');
  });

  test('no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    await page.reload();
    await page.waitForLoadState('networkidle');
    expect(errors).toEqual([]);
  });
});
```

- [ ] **Step 2: Run**

```bash
npm test -- tests/story.spec.ts
```

Expected: All Story tests pass.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "test(story): coverage for hero, 7 eras, pull-quote, CTA, no errors"
```

**🚢 Phase 2 ship checkpoint:** Home + Story are fully shippable. Strong moment to push a preview deploy for owner feedback.

---

## Phase 3 — Menu Page

### Task 14: Define menu data + build MenuCard

**Files:**
- Create: `src/data/menu.ts`
- Create: `src/components/MenuCard.astro`

- [ ] **Step 1: Create `src/data/menu.ts`**

```ts
export type MenuItem = {
  name: string;
  description: string;
  illustration: string;
  featured?: boolean;
};

export type MenuSection = {
  title: string;
  blurb: string;
  items: MenuItem[];
};

export const huckleberryFeature: MenuItem = {
  name: 'Huckleberry Milkshake',
  description: 'Wild Idaho huckleberries, real ice cream, hand-spun at the fountain. The one people drive miles for.',
  illustration: '/images/menu/huckleberry-milkshake.jpg',
  featured: true,
};

export const menuSections: MenuSection[] = [
  {
    title: 'Milkshakes',
    blurb: 'Hand-spun at the fountain with real ice cream.',
    items: [
      { name: 'Vanilla', description: 'Classic, the way it should be.', illustration: '/images/menu/vanilla-shake.jpg' },
      { name: 'Chocolate', description: 'Deep cocoa, no shortcuts.', illustration: '/images/menu/chocolate-shake.jpg' },
      { name: 'Strawberry', description: 'Real berries blended through.', illustration: '/images/menu/strawberry-shake.jpg' },
      { name: 'Malted', description: 'A nod to the original soda fountain.', illustration: '/images/menu/malted-shake.jpg' },
    ],
  },
  {
    title: 'Sundaes',
    blurb: 'Scoops, sauces, and the works.',
    items: [
      { name: 'Hot Fudge', description: 'Vanilla, fudge, whipped cream, cherry.', illustration: '/images/menu/hot-fudge.jpg' },
      { name: 'Banana Split', description: 'Three scoops, three sauces, the whole banana.', illustration: '/images/menu/banana-split.jpg' },
      { name: 'Huckleberry', description: 'Vanilla, huckleberry sauce, whipped cream.', illustration: '/images/menu/huckleberry-sundae.jpg' },
    ],
  },
  {
    title: 'Sodas & Floats',
    blurb: 'Made the old-fashioned way at the fountain.',
    items: [
      { name: 'Root Beer Float', description: 'Cold root beer, scoop of vanilla.', illustration: '/images/menu/root-beer-float.jpg' },
      { name: 'Cherry Phosphate', description: 'A genuine soda fountain throwback.', illustration: '/images/menu/cherry-phosphate.jpg' },
      { name: 'Italian Soda', description: 'Choose your flavor, pour over ice.', illustration: '/images/menu/italian-soda.jpg' },
    ],
  },
  {
    title: 'Espresso',
    blurb: 'For the morning regulars.',
    items: [
      { name: 'Drip Coffee', description: 'Hot, black, honest.', illustration: '/images/menu/drip-coffee.jpg' },
      { name: 'Latte', description: 'Espresso, steamed milk, no fuss.', illustration: '/images/menu/latte.jpg' },
      { name: 'Mocha', description: 'Espresso, chocolate, milk.', illustration: '/images/menu/mocha.jpg' },
    ],
  },
];
```

- [ ] **Step 2: Create `src/components/MenuCard.astro`**

```astro
---
import type { MenuItem } from '../data/menu';
interface Props { item: MenuItem; }
const { item } = Astro.props;
---
<article class="group border border-ink/10 bg-cream hover:border-emporium-red hover:-translate-y-1 transition-all duration-300">
  <div class="aspect-[4/3] overflow-hidden bg-ink/5">
    <img
      src={item.illustration}
      alt={`Illustration of ${item.name}`}
      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      loading="lazy"
    />
  </div>
  <div class="p-6">
    <h3 class="font-display text-2xl">{item.name}</h3>
    <p class="mt-2 text-sm text-ink/70 leading-relaxed">{item.description}</p>
  </div>
</article>
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat(menu): menu data and card component"
```

---

### Task 15: Build Menu page

**Files:**
- Create: `src/pages/menu.astro`

- [ ] **Step 1: Write the page**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import MenuCard from '../components/MenuCard.astro';
import { menuSections, huckleberryFeature } from '../data/menu';
---
<BaseLayout title="Menu · Victor Emporium" description="The Victor Emporium soda fountain menu — milkshakes, sundaes, sodas, espresso, and the famous huckleberry milkshake.">
  <header class="relative h-[60vh] min-h-[420px] bg-night text-cream overflow-hidden">
    <img
      src="/images/milkshake-sign-portrait.webp"
      alt="The hand-painted milkshake sign at the front of the Victor Emporium"
      class="absolute inset-0 w-full h-full object-cover opacity-70"
    />
    <div class="absolute inset-0 bg-gradient-to-b from-night/30 to-night/80"></div>
    <div class="relative h-full container-prose flex flex-col justify-end pb-16 text-center">
      <p class="font-accent italic text-gold text-lg">Soda Fountain</p>
      <h1 class="font-display text-5xl md:text-7xl mt-3">Menu</h1>
      <p class="mt-4 text-sm uppercase tracking-widest text-cream/80">Items and seasonal flavors rotate</p>
    </div>
  </header>

  <section class="container-gallery py-24">
    <div class="grid md:grid-cols-2 gap-12 items-center bg-cream border border-emporium-red/30 p-8 md:p-12">
      <div class="aspect-[4/5] bg-ink/5 overflow-hidden">
        <img
          src={huckleberryFeature.illustration}
          alt={`Illustration of ${huckleberryFeature.name}`}
          class="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div>
        <p class="font-accent italic text-emporium-red text-lg">The famous one</p>
        <h2 class="font-display text-4xl md:text-5xl mt-3">{huckleberryFeature.name}</h2>
        <p class="mt-6 text-lg text-ink/80 leading-relaxed">{huckleberryFeature.description}</p>
      </div>
    </div>
  </section>

  {menuSections.map(section => (
    <section class="container-gallery pb-24">
      <div class="max-w-prose mx-auto text-center mb-12">
        <h2 class="font-display text-4xl">{section.title}</h2>
        <p class="mt-3 text-ink/70">{section.blurb}</p>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {section.items.map(item => <MenuCard item={item} />)}
      </div>
    </section>
  ))}

  <section class="bg-wood text-cream py-16">
    <div class="container-prose text-center">
      <p class="font-display text-2xl">Stop in for the full board.</p>
      <a href="/visit" class="mt-6 inline-block border border-cream/40 text-cream px-8 py-3 text-sm uppercase tracking-widest hover:bg-cream hover:text-wood transition-colors">Hours &amp; directions →</a>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Create placeholder menu illustration directory**

```bash
mkdir -p public/images/menu
for n in huckleberry-milkshake vanilla-shake chocolate-shake strawberry-shake malted-shake hot-fudge banana-split huckleberry-sundae root-beer-float cherry-phosphate italian-soda drip-coffee latte mocha; do
  ffmpeg -y -f lavfi -i "color=c=0xFAF6EE:size=1200x900,format=yuv420p" -frames:v 1 "public/images/menu/${n}.jpg"
done
```

Expected: 14 cream-colored placeholder JPGs.

- [ ] **Step 3: Verify in dev**

```bash
npm run dev
```

Visit `http://localhost:4321/menu`. Expected: Hero with portrait photo, huckleberry feature, 4 sections (Milkshakes / Sundaes / Sodas & Floats / Espresso) of cards. Stop server.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(menu): full menu page with sections and feature card"
```

---

### Task 16: Generate menu illustrations + Playwright test

**Files:**
- Replace: `public/images/menu/*.jpg`
- Create: `tests/menu.spec.ts`

- [ ] **Step 1: Generate illustrations via nanobanana**

For each of the 14 items, generate a 4:3 illustration with this style hint: "hand-painted soda fountain menu illustration, vintage Americana, warm cream background, bold confident brushwork, low-saturation palette of red, gold, and brown, isolated subject centered."

Item-specific prompts (replace each placeholder file):

- `huckleberry-milkshake.jpg`: "tall glass milkshake filled with purple huckleberry shake, whipped cream on top, paper straw, hand-painted vintage menu illustration on cream background"
- `vanilla-shake.jpg`, `chocolate-shake.jpg`, `strawberry-shake.jpg`, `malted-shake.jpg`: similar tall-glass shake illustrations, vary color
- `hot-fudge.jpg`, `banana-split.jpg`, `huckleberry-sundae.jpg`: classic sundae glass illustrations
- `root-beer-float.jpg`, `cherry-phosphate.jpg`, `italian-soda.jpg`: tall soda glass illustrations
- `drip-coffee.jpg`, `latte.jpg`, `mocha.jpg`: ceramic mug illustrations

Save each at `public/images/menu/<filename>.jpg`.

- [ ] **Step 2: Create `tests/menu.spec.ts`**

```ts
import { test, expect } from '@playwright/test';

test.describe('Menu page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/menu');
  });

  test('renders hero and feature', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Menu');
    await expect(page.getByRole('heading', { name: 'Huckleberry Milkshake' })).toBeVisible();
  });

  test('shows the four sections', async ({ page }) => {
    for (const s of ['Milkshakes', 'Sundaes', 'Sodas & Floats', 'Espresso']) {
      await expect(page.getByRole('heading', { name: s })).toBeVisible();
    }
  });

  test('shows the rotating-flavors note', async ({ page }) => {
    await expect(page.getByText(/seasonal flavors rotate/i)).toBeVisible();
  });

  test('no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    await page.reload();
    await page.waitForLoadState('networkidle');
    expect(errors).toEqual([]);
  });
});
```

- [ ] **Step 3: Run**

```bash
npm test -- tests/menu.spec.ts
```

Expected: All Menu tests pass.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(menu): nanobanana illustrations and test coverage"
```

---

## Phase 4 — Shop Page

### Task 17: Define shop data + build Shop page

**Files:**
- Create: `src/data/shop.ts`
- Create: `src/pages/shop.astro`

- [ ] **Step 1: Create `src/data/shop.ts`**

```ts
export type ShopTile = { label: string; image: string; alt: string };
export type ShopCategory = { id: string; title: string; blurb: string; tiles: ShopTile[] };

export const shopCategories: ShopCategory[] = [
  {
    id: 'apparel',
    title: 'Apparel',
    blurb: 'Shirts, hats, hoodies. Wear the Valley.',
    tiles: [
      { label: 'Emporium tees', image: '/images/shop/tees.webp', alt: 'Wall display of Victor Emporium t-shirts' },
      { label: 'Trucker hats', image: '/images/shop/hats.webp', alt: 'Trucker hats hanging on a wall' },
      { label: 'Hoodies', image: '/images/shop/hoodies.webp', alt: 'Folded hoodies on a shelf' },
      { label: 'Kids', image: '/images/shop/kids-apparel.webp', alt: 'Kids apparel display' },
    ],
  },
  {
    id: 'souvenirs',
    title: 'Souvenirs',
    blurb: 'Patches, postcards, magnets, mugs.',
    tiles: [
      { label: 'Magnets', image: '/images/shop/magnets.webp', alt: 'Souvenir magnets display' },
      { label: 'Postcards', image: '/images/shop/postcards.webp', alt: 'Postcard rack' },
      { label: 'Patches', image: '/images/shop/patches.webp', alt: 'Embroidered patches' },
      { label: 'Mugs', image: '/images/shop/mugs.webp', alt: 'Ceramic mugs on a shelf' },
    ],
  },
  {
    id: 'local',
    title: 'Local Goods',
    blurb: 'Jams, honey, candy, and treasures from the people next door.',
    tiles: [
      { label: 'Huckleberry jam', image: '/images/shop/jam.webp', alt: 'Huckleberry jam jars' },
      { label: 'Local honey', image: '/images/shop/honey.webp', alt: 'Local honey jars' },
      { label: 'Penny candy', image: '/images/shop/candy.webp', alt: 'Bins of penny candy' },
      { label: 'Idaho gifts', image: '/images/shop/gifts.webp', alt: 'Assorted Idaho-themed gifts' },
    ],
  },
  {
    id: 'fishing',
    title: 'Fishing & Outdoor',
    blurb: 'Licenses, flies, hats, and gear for the day on the water.',
    tiles: [
      { label: 'Fly selection', image: '/images/shop/flies.webp', alt: 'Display of fishing flies' },
      { label: 'Licenses', image: '/images/shop/licenses.webp', alt: 'Fishing license counter' },
      { label: 'Outdoor hats', image: '/images/shop/outdoor-hats.webp', alt: 'Outdoor and fishing hats' },
      { label: 'Gear basics', image: '/images/shop/gear.webp', alt: 'Basic fishing and outdoor gear shelf' },
    ],
  },
  {
    id: 'gifts',
    title: 'Gifts',
    blurb: 'Pick something up on the way out.',
    tiles: [
      { label: 'Books', image: '/images/shop/books.webp', alt: 'Local books display' },
      { label: 'Cards', image: '/images/shop/cards.webp', alt: 'Greeting cards' },
      { label: 'Toys', image: '/images/shop/toys.webp', alt: 'Small toys' },
      { label: 'Stocking stuffers', image: '/images/shop/stuffers.webp', alt: 'Stocking-stuffer-sized gifts' },
    ],
  },
];
```

- [ ] **Step 2: Create `src/pages/shop.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { shopCategories } from '../data/shop';
---
<BaseLayout title="Shop · Victor Emporium" description="Browse what we carry — apparel, souvenirs, local goods, fishing and outdoor gear, and gifts at the Victor Emporium.">
  <header class="bg-cream py-24 border-b border-ink/10">
    <div class="container-prose text-center">
      <p class="font-accent italic text-emporium-red text-lg">In the shop</p>
      <h1 class="font-display text-5xl md:text-7xl mt-3">Souvenirs, goods, and gifts.</h1>
      <p class="mt-6 text-lg text-ink/80">
        Apparel, local food, fishing gear, and the small things you'll wish you'd grabbed when you get home.
      </p>
    </div>
  </header>

  {shopCategories.map(cat => (
    <section id={cat.id} class="container-gallery py-20 border-b border-ink/10 last:border-b-0">
      <div class="max-w-prose mx-auto text-center mb-10">
        <h2 class="font-display text-4xl">{cat.title}</h2>
        <p class="mt-3 text-ink/70">{cat.blurb}</p>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cat.tiles.map(tile => (
          <figure class="group">
            <div class="aspect-square bg-ink/5 overflow-hidden">
              <img
                src={tile.image}
                alt={tile.alt}
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <figcaption class="mt-3 text-sm uppercase tracking-widest text-ink/70 text-center">{tile.label}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  ))}

  <section class="bg-emporium-red text-cream py-16">
    <div class="container-prose text-center">
      <p class="font-display text-3xl">Stop in to browse the full selection.</p>
      <a href="/visit" class="mt-6 inline-block bg-cream text-emporium-red px-8 py-3 text-sm uppercase tracking-widest hover:bg-cream/90 transition-colors">Hours &amp; directions →</a>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 3: Generate placeholder shop tiles**

```bash
mkdir -p public/images/shop
for n in tees hats hoodies kids-apparel magnets postcards patches mugs jam honey candy gifts flies licenses outdoor-hats gear books cards toys stuffers; do
  ffmpeg -y -f lavfi -i "color=c=0xD9A441:size=1000x1000,format=yuv420p" -frames:v 1 "public/images/shop/${n}.webp"
done
```

These are gold placeholders so we can see the layout works. Real photography (from Lucien's photo run) replaces these.

- [ ] **Step 4: Verify**

```bash
npm run dev
```

Visit `http://localhost:4321/shop`. Expected: 5 sections with 4 tiles each. Stop server.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(shop): browse-only gallery page with 5 categories"
```

---

### Task 18: Playwright test for Shop

**Files:**
- Create: `tests/shop.spec.ts`

- [ ] **Step 1: Write the test**

```ts
import { test, expect } from '@playwright/test';

test.describe('Shop page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/shop');
  });

  test('renders hero', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Souvenirs, goods, and gifts');
  });

  test('shows all 5 categories', async ({ page }) => {
    for (const t of ['Apparel', 'Souvenirs', 'Local Goods', 'Fishing & Outdoor', 'Gifts']) {
      await expect(page.getByRole('heading', { name: t })).toBeVisible();
    }
  });

  test('category anchors work', async ({ page }) => {
    await page.goto('/shop#fishing');
    await expect(page.locator('#fishing')).toBeInViewport();
  });

  test('no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    await page.reload();
    await page.waitForLoadState('networkidle');
    expect(errors).toEqual([]);
  });
});
```

- [ ] **Step 2: Run**

```bash
npm test -- tests/shop.spec.ts
```

Expected: Pass.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "test(shop): coverage for hero, categories, anchors"
```

---

## Phase 5 — Visit Page

### Task 19: Define visit data + HoursBlock + ContactForm components

**Files:**
- Create: `src/data/visit.ts`
- Create: `src/components/HoursBlock.astro`
- Create: `src/components/ContactForm.astro`

- [ ] **Step 1: Create `src/data/visit.ts`**

```ts
export const visit = {
  address: {
    street: '45 N Main St',
    city: 'Victor',
    state: 'ID',
    zip: '83455',
  },
  // Approximate lat/lng for Victor, ID — replace with exact storefront coords once Adam & Lee confirm address
  coords: { lat: 43.6027, lng: -111.1108 },
  phone: '208-787-2221',
  email: 'hello@victoremporium.com',
  hours: {
    summer: {
      label: 'Summer hours (May–Sep)',
      days: [
        { d: 'Mon–Thu', t: '10am–8pm' },
        { d: 'Fri–Sat', t: '10am–9pm' },
        { d: 'Sun', t: '11am–7pm' },
      ],
    },
    winter: {
      label: 'Winter hours (Oct–Apr)',
      days: [
        { d: 'Mon–Sat', t: '11am–6pm' },
        { d: 'Sun', t: '12pm–5pm' },
      ],
    },
  },
};
```

Note: All values above are placeholders — Adam & Lee need to confirm hours, address, phone, email before launch. The plan calls them out in the "Content gaps" section.

- [ ] **Step 2: Create `src/components/HoursBlock.astro`**

```astro
---
import { visit } from '../data/visit';
const { summer, winter } = visit.hours;
---
<div class="grid sm:grid-cols-2 gap-8">
  {[summer, winter].map(block => (
    <div class="border border-ink/10 p-6">
      <h3 class="font-display text-xl">{block.label}</h3>
      <ul class="mt-4 space-y-2">
        {block.days.map(d => (
          <li class="flex justify-between text-sm">
            <span class="text-ink/70">{d.d}</span>
            <span class="font-medium">{d.t}</span>
          </li>
        ))}
      </ul>
    </div>
  ))}
</div>
```

- [ ] **Step 3: Create `src/components/ContactForm.astro`**

```astro
---
// Replace this access key with the real Web3Forms key for the live form.
const WEB3FORMS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';
---
<form
  action="https://api.web3forms.com/submit"
  method="POST"
  class="space-y-4"
>
  <input type="hidden" name="access_key" value={WEB3FORMS_KEY} />
  <input type="hidden" name="subject" value="Victor Emporium — new message" />
  <input type="hidden" name="from_name" value="Victor Emporium Website" />
  <input type="checkbox" name="botcheck" class="hidden" tabindex="-1" autocomplete="off" />

  <div class="grid sm:grid-cols-2 gap-4">
    <label class="block">
      <span class="text-xs uppercase tracking-widest text-ink/70">Name</span>
      <input type="text" name="name" required class="mt-1 w-full border border-ink/20 bg-cream px-3 py-2 focus:outline-none focus:border-emporium-red" />
    </label>
    <label class="block">
      <span class="text-xs uppercase tracking-widest text-ink/70">Email</span>
      <input type="email" name="email" required class="mt-1 w-full border border-ink/20 bg-cream px-3 py-2 focus:outline-none focus:border-emporium-red" />
    </label>
  </div>

  <label class="block">
    <span class="text-xs uppercase tracking-widest text-ink/70">Reason</span>
    <select name="reason" required class="mt-1 w-full border border-ink/20 bg-cream px-3 py-2 focus:outline-none focus:border-emporium-red">
      <option value="general">General</option>
      <option value="jobs">Jobs (we'd love to meet you)</option>
      <option value="wholesale">Wholesale or custom orders</option>
      <option value="press">Press</option>
    </select>
  </label>

  <label class="block">
    <span class="text-xs uppercase tracking-widest text-ink/70">Message</span>
    <textarea name="message" rows="5" required class="mt-1 w-full border border-ink/20 bg-cream px-3 py-2 focus:outline-none focus:border-emporium-red"></textarea>
  </label>

  <button type="submit" class="bg-emporium-red text-cream px-8 py-3 text-sm uppercase tracking-widest hover:bg-emporium-red/90 transition-colors">
    Send message
  </button>
</form>
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(visit): data, hours block, contact form components"
```

---

### Task 20: Build Visit page with OpenStreetMap embed

**Files:**
- Create: `src/pages/visit.astro`

- [ ] **Step 1: Write the page**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import HoursBlock from '../components/HoursBlock.astro';
import ContactForm from '../components/ContactForm.astro';
import { visit } from '../data/visit';

const { coords, address, phone, email } = visit;
// OpenStreetMap embed bounding box: ±0.005° around coords
const bbox = `${coords.lng - 0.005},${coords.lat - 0.005},${coords.lng + 0.005},${coords.lat + 0.005}`;
const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${coords.lat},${coords.lng}`;
const directionsHref = `https://www.openstreetmap.org/?mlat=${coords.lat}&mlon=${coords.lng}#map=17/${coords.lat}/${coords.lng}`;
---
<BaseLayout title="Visit · Victor Emporium" description="Find Victor Emporium — hours, address, map, and how to get in touch about jobs, wholesale, or press.">
  <header class="bg-cream py-20 border-b border-ink/10">
    <div class="container-prose text-center">
      <p class="font-accent italic text-emporium-red text-lg">Find us</p>
      <h1 class="font-display text-5xl md:text-7xl mt-3">Visit the Emporium.</h1>
      <p class="mt-6 text-lg text-ink/80">
        {address.street}, {address.city}, {address.state} {address.zip}
      </p>
    </div>
  </header>

  <section class="container-gallery py-16">
    <div class="grid md:grid-cols-5 gap-12 items-start">
      <div class="md:col-span-3">
        <iframe
          src={mapSrc}
          title="Map of Victor Emporium"
          class="w-full aspect-[4/3] border border-ink/10"
          loading="lazy"
        ></iframe>
        <a href={directionsHref} target="_blank" rel="noopener" class="mt-3 inline-block text-emporium-red hover:underline text-sm">Open in OpenStreetMap →</a>
      </div>
      <aside class="md:col-span-2 space-y-6">
        <div>
          <p class="text-xs uppercase tracking-widest text-ink/60">Address</p>
          <p class="mt-1 text-lg">{address.street}</p>
          <p class="text-lg">{address.city}, {address.state} {address.zip}</p>
        </div>
        <div>
          <p class="text-xs uppercase tracking-widest text-ink/60">Phone</p>
          <a href={`tel:${phone.replace(/[^0-9]/g, '')}`} class="mt-1 inline-block text-lg hover:text-emporium-red">{phone}</a>
        </div>
        <div>
          <p class="text-xs uppercase tracking-widest text-ink/60">Email</p>
          <a href={`mailto:${email}`} class="mt-1 inline-block text-lg hover:text-emporium-red">{email}</a>
        </div>
        <div>
          <p class="text-xs uppercase tracking-widest text-ink/60">Parking</p>
          <p class="mt-1 text-sm text-ink/80">Street parking on Main and side streets, plus a small lot behind the building.</p>
        </div>
      </aside>
    </div>
  </section>

  <section class="container-gallery pb-16">
    <h2 class="font-display text-3xl mb-6">Hours</h2>
    <HoursBlock />
    <p class="mt-4 text-sm text-ink/60">We're open year-round. Holiday hours may vary — check our social before driving out.</p>
  </section>

  <section class="bg-wood text-cream py-16">
    <div class="container-gallery grid md:grid-cols-2 gap-12 items-center">
      <div>
        <p class="font-accent italic text-gold text-lg">Now hiring</p>
        <h2 class="font-display text-3xl md:text-4xl mt-3">A first job behind the milkshake counter.</h2>
        <p class="mt-4 text-cream/80 leading-relaxed">
          The Emporium has given dozens of valley teenagers their first jobs. If you'd like to be next, send us a note — we'd love to meet you.
        </p>
      </div>
      <div class="text-cream/90 text-sm">
        We hire crew members year-round, with extra hands brought on for the summer rush. Drop your name and we'll be in touch.
      </div>
    </div>
  </section>

  <section class="container-prose py-16">
    <h2 class="font-display text-3xl text-center mb-8">Get in touch</h2>
    <ContactForm />
  </section>
</BaseLayout>
```

- [ ] **Step 2: Verify in dev**

```bash
npm run dev
```

Visit `http://localhost:4321/visit`. Expected: Map embed renders (OSM tiles load), address/phone/email visible, hours table for summer + winter, jobs blurb, contact form. Stop server.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat(visit): map embed, hours, contact info, jobs, form"
```

---

### Task 21: Playwright test for Visit

**Files:**
- Create: `tests/visit.spec.ts`

- [ ] **Step 1: Write the test**

```ts
import { test, expect } from '@playwright/test';

test.describe('Visit page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/visit');
  });

  test('renders hero with address', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Visit the Emporium');
    await expect(page.getByText(/Victor, ID/)).toBeVisible();
  });

  test('shows phone and email links', async ({ page }) => {
    await expect(page.locator('a[href^="tel:"]')).toBeVisible();
    await expect(page.locator('a[href^="mailto:"]')).toBeVisible();
  });

  test('shows summer and winter hours', async ({ page }) => {
    await expect(page.getByText(/Summer hours/i)).toBeVisible();
    await expect(page.getByText(/Winter hours/i)).toBeVisible();
  });

  test('contact form has required fields and submit', async ({ page }) => {
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('select[name="reason"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
    await expect(page.getByRole('button', { name: /send message/i })).toBeVisible();
  });

  test('map iframe loads', async ({ page }) => {
    await expect(page.locator('iframe[title*="Map"]')).toBeVisible();
  });

  test('no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    await page.reload();
    await page.waitForLoadState('networkidle');
    expect(errors).toEqual([]);
  });
});
```

- [ ] **Step 2: Run**

```bash
npm test -- tests/visit.spec.ts
```

Expected: All Visit tests pass.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "test(visit): coverage for address, contact, hours, form, map"
```

---

## Phase 6 — Launch Prep

### Task 22: Favicon, OG image, sitemap, robots.txt

**Files:**
- Create: `public/favicon.svg`
- Create: `public/og-image.jpg`
- Create: `public/robots.txt`
- Modify: `astro.config.mjs` (add site URL + sitemap integration)

- [ ] **Step 1: Create a simple favicon at `public/favicon.svg`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="#FAF6EE"/>
  <text x="32" y="44" text-anchor="middle" font-family="Georgia, serif" font-weight="700" font-size="36" fill="#B7261F">VE</text>
</svg>
```

- [ ] **Step 2: Generate an OG image (use the storefront photo, cropped to 1200×630)**

```bash
ffmpeg -y -i public/images/storefront-landscape.webp -vf "scale=1200:630:force_original_aspect_ratio=increase,crop=1200:630" -q:v 85 public/og-image.jpg
```

Expected: `public/og-image.jpg` ≈ 100KB.

- [ ] **Step 3: Create `public/robots.txt`**

```
User-agent: *
Allow: /

Sitemap: https://victoremporium.com/sitemap-index.xml
```

(Replace the domain when the real one is registered.)

- [ ] **Step 4: Install Astro sitemap integration**

```bash
npx astro add sitemap --yes
```

- [ ] **Step 5: Set `site` in `astro.config.mjs`**

Edit `astro.config.mjs` so the config object has `site: 'https://victoremporium.com'` (replace with the real domain when registered). The sitemap integration uses this.

- [ ] **Step 6: Build and verify sitemap output**

```bash
npm run build
ls dist/sitemap-*.xml
```

Expected: `dist/sitemap-index.xml` and `dist/sitemap-0.xml` exist.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat(seo): favicon, og image, robots, sitemap"
```

---

### Task 23: Netlify deploy configuration

**Files:**
- Create: `netlify.toml`

- [ ] **Step 1: Create `netlify.toml`**

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"

[[headers]]
  for = "/video/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

- [ ] **Step 2: Verify a production build runs clean**

```bash
npm run build
```

Expected: Build completes, `dist/` populated with all 5 pages + assets.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: netlify deploy config with asset caching"
```

---

### Task 24: Run all tests + Lighthouse check

**Files:** (none — verification only)

- [ ] **Step 1: Run the full test suite**

```bash
npm test
```

Expected: All Home / Story / Menu / Shop / Visit tests pass.

- [ ] **Step 2: Run Lighthouse against the production build locally**

```bash
npm run build
npx serve dist -l 4322 &
SERVE_PID=$!
sleep 2
npx lighthouse http://localhost:4322 --only-categories=performance,accessibility,seo --quiet --chrome-flags="--headless" --output=html --output-path=./lighthouse-home.html
kill $SERVE_PID
```

Expected: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95. If lower, investigate (typically large images, missing alt text, missing meta).

- [ ] **Step 3: Address any sub-90 scores by editing the relevant components.**

Common fixes:
- Image too large → re-run `optimize-assets.sh` with smaller dimensions
- Missing alt → add to the `img` tag in the offending component
- Layout shift → set explicit width/height on `img` elements

- [ ] **Step 4: Commit any fixes**

```bash
git add -A
git commit -m "perf: lighthouse fixes"
```

---

### Task 25: Connect domain + deploy preview to Netlify

**Files:** (none — Netlify dashboard work)

- [ ] **Step 1: Create a Netlify site from the local repo**

```bash
npm install -g netlify-cli
netlify login
netlify init
```

Choose "Create & configure a new site," select team, name it `victor-emporium` (or per Adam & Lee's preference), pick `main` as deploy branch.

- [ ] **Step 2: Trigger a preview deploy**

```bash
netlify deploy --build
```

Expected: A preview URL prints. Open it and click through all 5 pages — Home video plays, Story timeline animates, Menu shows all items, Shop tiles render, Visit map loads + form is functional.

- [ ] **Step 3: When domain is ready (per Open Question 1 in spec), point it at Netlify**

In Netlify dashboard → Domain management → Add custom domain → follow DNS instructions. Update the `site` in `astro.config.mjs` to match the real domain. Rebuild + redeploy.

- [ ] **Step 4: Production deploy**

```bash
netlify deploy --build --prod
```

Expected: Live at production URL.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: production deploy"
```

---

## Outstanding Content Gaps (resolve before/during build)

These are flagged in the spec and must be filled in to ship a production site:

1. **Confirmed hours** (summer + winter) — replace placeholders in `src/data/visit.ts`
2. **Confirmed address, phone, email** — replace placeholders in `src/data/visit.ts`
3. **Web3Forms access key** — replace `YOUR_WEB3FORMS_ACCESS_KEY` in `src/components/ContactForm.astro`
4. **Real menu items + descriptions** (Adam & Lee may want different items or a "rotates seasonally" simplification) — edit `src/data/menu.ts`
5. **Real shop photography** (interior tiles for apparel/souvenirs/local/fishing/gifts) — drop new files into `public/images/shop/` replacing placeholders
6. **Interior photo run** for Menu hero alternatives + Shop tiles — Lucien's photo run, see spec Shot list
7. **Logo confirmation** — if Adam & Lee have a file, swap into the wordmark spot in `src/components/Nav.astro`; otherwise the current Recoleta wordmark serves as the fresh design
8. **Domain registration** — `victoremporium.com` or alternative
9. **Social handles** — add to footer once confirmed
10. **Analytics** — recommend Plausible; add snippet to `BaseLayout.astro` after sign-off

---

## Self-review notes

This plan covers the full approved spec end-to-end:
- ✅ Tech stack (Astro + Tailwind + Motion + React islands) → Tasks 1–2
- ✅ All 6 design tokens (cream / ink / emporium-red / gold / night / wood) → Task 2 step 4
- ✅ Type system (Recoleta display, Inter body, Caslon Italic accent) → Task 2 steps 4–5
- ✅ Motion direction (subtle scroll reveals, hover lifts, no bouncy) → Tasks 10, 14
- ✅ All 5 pages with the exact section breakdown from the spec → Tasks 6, 7, 9–11, 14–17, 19–20
- ✅ Story page is flagship with 7 owner panels matching the data in the spec → Tasks 9–11
- ✅ Pull-quote moments (Belushi, handshake-on-truck-hood) → Tasks 7, 10
- ✅ Imagery plan (video conversion + photo conversion + nanobanana for archival + menu illustrations) → Tasks 4, 12, 16
- ✅ Shot-list placeholder gallery so Shop renders before real photos exist → Task 17
- ✅ OSM map embed (no Google billing) → Task 20
- ✅ Web3Forms contact form (matches Hudson pattern) → Task 19
- ✅ Playwright e2e coverage per page including no-console-errors guard → Tasks 8, 13, 16, 18, 21
- ✅ Launch prep (favicon, OG, sitemap, robots, Netlify, Lighthouse) → Tasks 22–25
- ✅ Phased delivery with two ship checkpoints (after Home, after Story) → callouts after Tasks 8, 13

Content gaps are tracked explicitly above so nothing slips silently.

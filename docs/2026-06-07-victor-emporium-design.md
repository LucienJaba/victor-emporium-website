# Victor Emporium Website — Design Spec

**Date:** 2026-06-07
**Client:** Adam & Lee Zderski (owners since 2025)
**Designer:** Lucien Gutierrez (Hudson Teton Dev)
**Status:** Approved direction; ready for implementation plan

---

## Project summary

A custom marketing website for Victor Emporium — a 75-year-old ice cream shop, general store, and old-fashioned soda fountain in Victor, Idaho. The site must convey a quirky small-town atmosphere with a premium "modern nostalgic" aesthetic, anchor the brand around the famous huckleberry milkshake, and tell the full 1950→present ownership story.

Built from scratch (not Squarespace — the owner had a Squarespace account but never used it).

---

## Aesthetic direction

**Modern nostalgic.** Clean modern layout with vintage soul — generous whitespace, a few well-chosen serif accents, soft cream backgrounds, color photography front-and-center. Reference brands: Levain Bakery, Salt & Straw, Sightglass Coffee.

The aesthetic must respect the 75-year heritage without feeling kitschy or "themed." Real photography (blue-hour exterior, eventual interior) does the heavy lifting; type and color play supporting roles.

---

## Tech stack

- **Astro** — static-site generator, great SEO, fast load, supports React islands
- **Tailwind CSS** — utility styling with custom design tokens
- **Motion (formerly Framer Motion)** — scroll-triggered reveals on the Story timeline, hover micro-interactions
- **Deployment:** Netlify or Vercel free tier
- **Map:** OpenStreetMap embed via `osm` MCP (no Google billing required)
- **Forms:** Web3Forms (same pattern as Hudson website)

Why Astro over pure HTML (like Hudson): the Story page deserves real scroll-triggered motion, and we want React islands for the timeline without React-ifying the whole site.

---

## Site architecture

```
/          Home   — editorial hero (video), intro, story teaser, what-we-sell tiles, visit strip
/story     Our Story — long-form 75-year ownership timeline (FLAGSHIP)
/menu      Menu   — soda fountain, huckleberry milkshake hero, illustrated cards
/shop      Shop   — gallery of merch / local goods / fishing gear (browse-only)
/visit     Visit  — hours, address, embedded map, contact form, jobs blurb
```

Global elements: sticky nav (5 links + wordmark), footer with hours/address/social/"Est. 1950" mark.

---

## Visual design system

### Color palette (sampled from the storefront)

| Token | Hex | Use |
|-------|-----|-----|
| `cream` | `#FAF6EE` | Primary background — like the painted sign's faded white |
| `ink` | `#1B1B1B` | Body text, deep contrast |
| `emporium-red` | `#B7261F` | The awning stripes + Coca-Cola sign + accents/CTAs |
| `gold` | `#D9A441` | Signage glow, secondary accent |
| `night` | `#0E2230` | Footer, blue-hour echo |
| `wood` | `#5C2E1A` | Deep wood tones from the building exterior |

### Typography

- **Display:** Recoleta — warm contemporary serif with vintage soul. Used for page headlines and the "EMPORIUM" wordmark. (Fallback: Domaine Display.)
- **Body:** Inter — clean modern sans for readability. (Fallback: Söhne, system-ui.)
- **Accent:** Caslon Italic — used sparingly for "Est. 1950" and pull quotes on the Story page.

### Motion direction (Motion.dev)

- Subtle scroll-triggered reveals on the Story timeline (fade-in + slight upward translate, ~400ms)
- Hover micro-interactions on menu cards (gentle lift + shadow)
- Hero video auto-plays muted, looped, with a cinematic letterbox treatment
- No bouncy/playful motion — restrained, premium, like a slow exhale

### Layout language

- Generous whitespace; max-width ~720px for prose, ~1280px for galleries
- Asymmetric grids on Home (editorial feel) vs. clean centered layouts on Menu/Shop
- Big imagery, small text — let the photos breathe

---

## Page-by-page content plan

### `/` Home

- **Hero:** muted-autoplay loop of `emporium-exterior.mov` with wordmark "Victor Emporium" + "Est. 1950" + draft tagline ("Soda fountain. General store. Victor, Idaho.") + single CTA "Plan your visit"
  - Tagline is a placeholder pending Adam & Lee's review; we'll workshop alternatives during build.
- **Intro band:** ~30-word positioning statement
- **What we are:** 4 small tiles → Soda Fountain · General Store · Apparel · Local Goods (each links to /menu or /shop anchors)
- **Story teaser:** A pull-quote from history (the handshake-on-a-truck-hood story or the Belushi moment) + "75 years on Main Street →" link to /story
- **Famous for:** Huckleberry milkshake feature — big illustration/photo + 2 lines + "See the menu →"
- **Visit strip:** hours preview + address + "Get directions →"

### `/story` — flagship

- **Hero:** "75 Years on Main Street" headline, blue-hour landscape photo, 2-sentence intro
- **7 timeline panels** (one per owner era), each with:
  - Year badge
  - Owner name
  - Era headline
  - Body text from the history doc
  - Period image — real photo or sepia/duotone AI-generated archival for the early eras

| Era | Owners | Years |
|-----|--------|-------|
| 1 | Harold Holmes | 1950–1963 |
| 2 | Peggy & Tom Egbert | 1963–1978 |
| 3 | Ted & Shona Kasper | 1978–1985 |
| 4 | Rosalee Woolstenhulme | 1985–1989 |
| 5 | Bob & Marilyn Meyer | 1989–1999 |
| 6 | Kathryn Ferris & Kimberly Keeley | 1999–2025 |
| 7 | Adam & Lee Zderski | 2025–present |

- **Pull-quote moments** for the strongest details:
  - John Belushi / *Continental Divide* film (Kasper era)
  - The handshake-on-a-truck-hood deal at the Jackson boat ramp (Keeley & Ferris era)
  - "Never went a single day without selling ice cream in 26 years" (Keeley & Ferris era)
- **Closing:** "The next chapter is being written. Come be part of it." + link to /visit

### `/menu` — Soda Fountain

- **Hero:** portrait photo with milkshake-hand sign
- **Huckleberry milkshake feature card** — dedicated hero treatment
- **Sections:** Milkshakes / Sundaes / Sodas & Floats / Espresso / Treats
- **Illustrated cards** per item (nanobanana for now, real photos when available)
- Note: "Items and seasonal flavors rotate"

### `/shop` — browse only

- **Hero:** text-forward "Souvenirs, apparel, local goods, fishing & outdoor, gifts"
- **Gallery sections:** Apparel · Souvenirs · Local Goods · Fishing & Outdoor · Gifts — each a 4–6 tile grid
- **Closing:** "Stop in to browse the full selection"

### `/visit`

- **Hours block** (summer + winter splits, since they're year-round)
- **Address + embedded map** (OpenStreetMap via osm MCP)
- **Phone, email, parking info**
- **Contact form** (single form with reason dropdown: General / Jobs / Wholesale / Press)
- **"Now hiring" blurb** — the teen crew angle
- **Photo strip** at bottom

### Global footer

- Wordmark + "Est. 1950"
- 3 cols: Visit · Connect (email, social) · Quick Links (menu, shop, story)
- Bottom strip: © Victor Emporium · Victor, Idaho · tiny milkshake-hand mascot icon

---

## Imagery plan

### Assets on hand

- `assets/video/emporium-exterior.mov` — Home hero video
- `assets/photos/emporium-storefront-landscape.heic` — video poster + Story hero
- `assets/photos/emporium-milkshake-sign-portrait.heic` — Menu hero

### AI-generated (nanobanana)

- **Story page archival images** — sepia/duotone "period" treatments for the early eras (1950s drug store interior, 1970s trading post, 1980s soda fountain scene). Stylized, clearly illustrative, never trying to pass as real.
- **Menu illustrated cards** — hand-painted soda fountain menu style for items (milkshake, sundae, soda float, espresso). Replace with real product shots later.
- **Hero accents** — milkshake-hand mascot vector treatment as a reusable SVG icon (footer, favicon, mobile nav).

### Shot list for Lucien's photo run

**Priority 1 (need before launch):**
- Soda fountain counter — wide + tight detail of the brass/chrome
- Huckleberry milkshake hero shot (top-down + side)
- Interior wide showing merch wall + fountain context
- Storefront in daylight (complement the blue-hour shots)

**Priority 2 (fills out Shop page):**
- Apparel section (t-shirts on a rack or wall display)
- Souvenirs (clustered shelf shot)
- Local goods (jams, candy, gifts)
- Fishing/outdoor gear shelf
- Hand-painted hand-holding-milkshake sign close-up

**Priority 3 (nice-to-have):**
- Crew member behind the counter (lifestyle)
- Picnic table out front with milkshake
- A regular customer / kid with a shake

### Treatment guidelines

- Natural light only, no flash
- Shoot in landscape primarily, a few verticals for mobile
- Get tight detail shots AND wide context shots
- HEIC is fine; we'll convert to optimized WebP in build

---

## Content gaps to fill before launch

From Adam & Lee:
- Real hours (summer + winter)
- Confirmed street address, phone, email
- Social handles (Instagram?)
- Menu items + prices (or seasonal rotation note)
- Logo file from Adam & Lee — if none exists, we'll design a fresh wordmark in the modern-nostalgic direction (Recoleta-based, ligature-styled "Emporium," small "Est. 1950" mark)
- Interior, product, fountain photos (from Lucien's photo run)

---

## Out of scope (intentionally)

- E-commerce / online ordering
- User accounts
- Blog or events listing
- Press kit, FAQ, testimonials page
- Multi-language
- A separate "About the owners" page (Adam & Lee's story lives inside the Story timeline)

---

## Open questions

1. Domain — do they own `victoremporium.com` (or a similar variation)? If not, we'll need to register before launch.
2. Hosting — defaulting to Netlify; confirm with Adam & Lee whether they want hosting under their account or under Lucien's account billed back.
3. Existing email and analytics — do they want any analytics (Plausible recommended over GA for privacy + simplicity)?

---

## Approval

- [x] Aesthetic direction: Modern nostalgic
- [x] Site architecture: 5 pages with hybrid editorial home + flagship Story page
- [x] Visual system, content plan, and imagery plan approved by Lucien
- [ ] Implementation plan pending (next step via writing-plans skill)

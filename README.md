# Thabiso Makhobo — Portfolio

Personal portfolio site for **Thabiso Shaun Charles Makhobo**, Software Developer
specialising in Backend and Mobile Development. Built as a static, dependency-free
site — no build step, no framework, no npm install required.

**Live structure:** Hero → Featured Projects → Experience → Specializations →
Skills → Education → Contact. Projects are shown first because the site is meant
to demonstrate what's been built, not lead with a bio.

## Tech stack

- **HTML5** — one file, semantic markup, JSON-LD `Person` schema for SEO
- **CSS3** — hand-written, no framework, organised as a token-based design system
- **Vanilla JavaScript** — small, single-purpose modules, no dependencies
- **Fonts** — Bricolage Grotesque (display), Plus Jakarta Sans (body), JetBrains
  Mono (code/label accents), loaded from Google Fonts

No build tools, bundlers, or package.json — open `index.html` in a browser and
it works.

## Project structure

```
My Portfolio/
├── index.html                  All markup, one page, anchor-linked sections
├── Thabiso Shaun Charles Makhobo.pdf   CV, served for download
├── assets/
│   ├── css/
│   │   └── style.css           All styles — see table of contents at the top
│   ├── js/
│   │   └── main.js             All behaviour — one function per feature
│   └── images/                 Profile photo + project cover screenshots
└── README.md
```

## How the page is put together

The layout is a **fixed left sidebar** (profile, nav, availability card, CV
download, socials) plus a **scrolling main column** offset to its right
(`main { margin-left: var(--sidebar-width) }` in `style.css`). Below the
`1100px` breakpoint the sidebar becomes an off-canvas drawer triggered by a
hamburger button in a mobile top bar.

Each `<section>` in `index.html` maps to one sidebar nav item via its `id`
(`#home`, `#projects`, `#experience`, `#specializations`, `#skills`,
`#education`, `#contact`). Add or remove a `<section id="...">` and a matching
`<li><a href="#...">` in the sidebar nav to change the page structure.

### Project cards

Each card in `#projects` follows the same shape: a cover image
(`.project-card__media`), a description, tech chips, and a native
`<details>/<summary>` accordion ("Project Details") holding Features
Implemented / Architecture / Challenges / Future Enhancements — no JS needed
for the accordion, it's just HTML. MOS is pulled out as a full-width
`.project-spotlight` card above the grid since it's the flagship project.
Projects without a public repo or live link use a disabled
`.btn--disabled` span instead of an `<a>`.

To add a project: copy an existing `<article class="glass-card project-card">`
block, drop a screenshot in `assets/images/`, and reference it in the `<img>`
`src`. To add a cover image to a project that doesn't have one yet, look for
`.project-card--empty` — that's the "coming soon" placeholder style.

## JavaScript modules (`assets/js/main.js`)

Each feature is one function, called once from the `DOMContentLoaded`
listener at the bottom of the file:

| Function | What it does |
|---|---|
| `initMobileNav()` | Opens/closes the sidebar drawer on mobile, closes on link click or `Esc` |
| `initScrollSpy()` | Highlights the active sidebar nav link via `IntersectionObserver` as you scroll |
| `initScrollReveal()` | Fades/slides `.reveal` elements in once they enter the viewport |
| `initCounters()` | Animates the hero stat numbers (`data-target` / `data-suffix`) when scrolled into view |
| `initTypewriter()` | Types out the `developer.json` snippet in the hero terminal card |
| `initParticles()` | Draws the drifting dot canvas behind the hero |
| `initContactForm()` | Validates the contact form and opens the visitor's email client via a `mailto:` link (there's no backend) |
| `initBackToTop()` | Shows/hides the back-to-top button based on scroll position |
| `initFooterYear()` | Writes the current year into the footer |

All animation respects `prefers-reduced-motion` — motion is skipped or
shortened automatically for visitors who've asked for it at the OS level.

## CSS (`assets/css/style.css`)

Organised top-to-bottom exactly like the page reads (Hero → Fact Card →
Specializations → Skills → Experience → Projects → Contact → Footer →
Animations → Responsive → Accessibility), with a numbered table of contents
in the file header. Design tokens (colours, fonts, spacing, radii, motion
timing) are CSS custom properties in `:root` at the top — change the palette
or type scale there rather than hunting through individual rules.

The accent colour is a blue/cyan gradient (`--blue` → `--cyan`), the
background is near-black (`--bg: #09090f`), and text uses a three-step
grey scale (`--text-primary/secondary/muted`).

## Running locally

No install step. Either:

- Open `index.html` directly in a browser, or
- Serve it (recommended, avoids relative-path quirks):
  ```bash
  python -m http.server 8000
  # then visit http://localhost:8000/index.html
  ```

## Deployment

Hosted on **GitHub Pages**. Two things that matter if you redeploy or fork this:

1. The entry file must be named exactly `index.html` (lowercase) — GitHub
   Pages' server is case-sensitive, and a capitalised `Index.html` will 404
   on the root URL.
2. Push to the `main` branch; Pages serves straight from the repo root, no
   build step runs.

## Updating content

- **CV**: replace `Thabiso Shaun Charles Makhobo.pdf` — the sidebar and
  contact section both link to it by that exact filename.
- **Profile photo**: `assets/images/profileimg.png`, used in both the sidebar
  avatar and the hero portrait (background-removed PNG so it blends into the
  page rather than sitting in a frame).
- **Contact details**: email, phone, WhatsApp, and social links are plain
  `<a>` tags in the `#contact` section and the sidebar — update the `href`s
  directly.

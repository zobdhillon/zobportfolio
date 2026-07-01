# Zobia Dhillon — Portfolio Context Capsule
> Paste this entire document at the start of your next chat so the assistant has full context.

---

## Project Overview
Personal developer portfolio for **Zobia Dhillon** — Full-stack Developer.
Built with **React + Tailwind CSS + Vite**. Single-page app with smooth scroll sections.

---

## Design System

### Colors
| Token | Value | Usage |
|---|---|---|
| Background | `#090909` / `#0d0d0d` | Page bg |
| Card bg | `#0e0e0e` / `#111` | Cards, panels |
| Teal accent | `#2DD4BF` | Dots, borders, highlights |
| White primary | `rgba(255,255,255,0.97)` | Headings |
| White muted | `rgba(255,255,255,0.5)` | Body text |
| White dim | `rgba(255,255,255,0.2–0.4)` | Labels, metadata |
| Card border | `rgba(255,255,255,0.13)` | Default card border |
| Teal border | `rgba(0,210,163,0.2–0.28)` | Accent card border |

### Typography
| Role | Font | Notes |
|---|---|---|
| Hero headings | `'Fira Code', monospace` | Bold 700, `clamp(2rem, 6.5vw, 7rem)` desktop / `clamp(2.4rem, 12vw, 3.5rem)` mobile |
| Logo / display | `'Bebas Neue', sans-serif` | Uppercase, `letterSpacing: 0.1em` |
| Body / description | `'DM Sans', sans-serif` | Weight 300, muted white |
| Code / UI labels | `'JetBrains Mono', monospace` | 10–12px, used for nav, pills, terminal |
| Projects pill | `Georgia, serif` | Italic, white bg, dark text |

### Spacing & Layout
- Max content width: `max-w-7xl mx-auto`
- Horizontal padding: `px-4 sm:px-6 md:px-8`
- Navbar height: `72px` (paddingTop on content)
- Desktop: `sm:h-screen sm:overflow-hidden` (single viewport, no scroll on home)
- Mobile: free flow / scrollable

### Borders & Cards
- Default card: `border: 1px solid rgba(255,255,255,0.13)`, `border-radius: 12px`, `background: #0e0e0e`
- Accent card (recommended): `border: 1px solid rgba(0,210,163,0.2)` — ties into teal system
- Card hover glow (optional): `box-shadow: 0 0 30px rgba(0,210,163,0.08)` on hover

---

## Components Done

### `Navbar.jsx`
- Fixed top, `background: rgba(9,9,9,0.85)`, `backdropFilter: blur(12px)`
- Logo: "ZOBIA / DHILLON" in Bebas Neue, stacked, click scrolls to home
- Desktop nav: links absolutely centered, `/ Label •` format, teal dot on active
- Right: "• Available" in JetBrains Mono, dim white
- **Quarter-circle arc**: `position: fixed`, `top:0, right:0`, `transform: translate(50%,-50%)`, `width/height: clamp(160px, 18vw, 280px)` — peeks from top-right corner, always wraps "Available" text at all screen sizes
- Mobile: hamburger (3 teal lines, animates to X), dropdown menu with same link style
- Active section tracked via `IntersectionObserver` (`rootMargin: "-40% 0px -55% 0px"`)

### `Home.jsx`
- **Icon library**: `lucide-react` — `npm install lucide-react`
- **Desktop layout** (`hidden sm:block`):
  - Row 1: "Full-stack" heading (left) + Projects pill (right)
  - Row 2: Description paragraph (left) + "Developer." heading (right)
- **Mobile layout** (`block sm:hidden`):
  - Heading stacked & centered: "Full-stack / Developer."
  - Description centered below heading
  - Projects pill centered below description
- **Projects pill**: white bg, italic Georgia, dark text + dark circle arrow button. Reusable `<ProjectsPill>` component used in both desktop and mobile slots
- **Social pills row**: GitHub (Github icon) + LinkedIn (Linkedin icon) + "• Available for work" teal pill. Icons from lucide-react, `size={13} strokeWidth={1.8}`
- **Reveal animation**: `.reveal` class, staggered `setTimeout` 120ms per element, adds `.show` class
- **ProjectCarousel**: 3-card carousel, center card full opacity/scale, side cards 0.4 opacity / 0.87 scale
  - Responsive via `ResizeObserver` on container
  - `isMobile` < 480px, `isTablet` 480–768px
  - Mobile: `cardWidth = containerWidth * 0.82`, `cardHeight = 190`, `step = containerWidth * 0.86`
  - Arrows: mobile uses `left: 10px` / `right: 10px`; desktop uses calc from center
  - Card: terminal header (macOS dots + `zob@portfolio ~ %`), terminal body (default), hover overlay slides from right (65% width, blurred bg)
  - Hover overlay shows: project title (Bebas Neue), description (DM Sans), teal tags (JetBrains Mono 9px), PillButton
- Carousel wrapper: `sm:flex-1 sm:min-h-0` + `minHeight: 260px` for mobile
- `<Marquee />` pinned to bottom

### Projects Data
```js
[
  { num:"00", title:"Rehearse", tags:["Laravel","PHP","MySQL","Groq API"], live:"https://devlogs.42web.io", github:null },
  { num:"01", title:"DevLogs", tags:["Laravel","PHP","MySQL","Tailwind"], live:"https://devlogs.42web.io", github:"https://github.com/zobdhillon/devlogs" },
  { num:"02", title:"Saba — Copywriter Portfolio", tags:["HTML","CSS","JavaScript"], live:"https://sabach.netlify.app/", github:null },
]
```

---

## Pages Still To Build
- `/about` — section id `"about"`
- `/projects` — section id `"projects"` (full projects page, separate from carousel)
- `/contact` — section id `"contact"`

---

## Key Decisions & Rules to Maintain
1. **Teal `#2DD4BF` is the only accent color** — used for dots, borders, active states, tags
2. **No full teal fills** — only as borders (`rgba`), small dots, text highlights
3. **Card borders should use teal** `rgba(0,210,163,0.2)` not plain white — makes them feel intentional
4. **Terminal aesthetic** on project cards — keep JetBrains Mono, `~` prompt, dim output lines
5. **Bebas Neue for display text** (card titles, section numbers), Fira Code for hero headings
6. **Responsive pattern**: always use `hidden sm:block` / `block sm:hidden` for fundamentally different mobile layouts rather than fighting with single layout
7. **No `height: 100vh` on mobile** — let content scroll; `sm:h-screen` on desktop only
8. **lucide-react** installed for icons (`Github`, `Linkedin` used so far)
9. **Quarter-circle in navbar**: don't change the corner arc — it's intentional branding
10. **Reveal animations** use `.reveal` + `.show` class pattern — maintain this for new sections

---

## File Structure (relevant)
```
src/
  components/
    Navbar.jsx     ✅ done
    Marquee.jsx    (existing, untouched)
    PillButton.jsx (existing, untouched)
  pages/
    Home.jsx       ✅ done
    About.jsx      🔲 todo
    Projects.jsx   🔲 todo
    Contact.jsx    🔲 todo
```

---

## Dependencies
```json
"react": "^18",
"tailwindcss": "^3",
"lucide-react": "latest"
```
Fonts loaded via Google Fonts or similar: `Fira Code`, `Bebas Neue`, `DM Sans`, `JetBrains Mono`, `Georgia` (system).

<SideCircle side="right" align="bottom" size="50vw" showAmount={38} />

// Contact — left, centered, teal
<SideCircle side="left" align="center" size="52vw" showAmount={50} color="rgba(45,212,191,0.06)" />
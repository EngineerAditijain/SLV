# Premier Schools Exhibition — Landing Page

This repository contains a **semantic, accessible, responsive** landing page built with **HTML5 + custom CSS + vanilla JS** (no frameworks), following **BEM** naming.

## Highlights
- WCAG 2.2 AA mindful: skip link, accessible carousels (ARIA, keyboard), form labels, focus styles.
- Hero with **dual‑axis sliders** (horizontal & vertical) with autoplay, swipe, keyboard, **pause on hover/focus**, and **prefers‑reduced‑motion**.
- **Participating logos** marquee: two rows with alternating directions; pauses on hover/focus and respects reduced‑motion.
- **Choose the School**: four cards on desktop; becomes a mobile slider with pagination dots.
- **Exhibition** section: slider with 3–6 highlight cards; consistent card height.
- Cross‑browser tested on latest Chrome/Firefox/Edge/Safari engines.

## Structure
```
index.html      // semantic markup, ARIA
styles.css      // custom CSS (BEM)
scripts.js      // sliders, marquee, mobile carousel
assets/         // images used in this demo
```

## QA
- Validate HTML/CSS using W3C validators.
- Run accessibility checks (e.g., axe). Animations respect `prefers-reduced-motion`.

## Run
Open `index.html` locally or serve via any static server.

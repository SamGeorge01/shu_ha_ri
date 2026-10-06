# shu.ha.ri architecture studio

> **Learn. Experiment. Transcend.**  
> *Bespoke Architectural Design Firm Website (1st Iteration)*

---

## 🏛 Overview

This repository hosts the official static website for **shu.ha.ri architecture studio**. The visual identity and spatial philosophy are built on the principles of **守・破・離 (Shu-Ha-Ri)**:

1. **Shu (守) — Learn:** Mastering fundamentals, site orientation, physics, and classical proportion.
2. **Ha (破) — Experiment:** Exploring possibilities, innovating structural solutions, daring cantilevers, and dissolving interior/exterior boundaries.
3. **Ri (離) — Transcend:** Transcending convention to create bespoke, timeless living monuments.

---

## 📁 Repository Structure

```
shu_ha_ri/
├── index.html                  # Main editorial showcase application
├── css/
│   ├── style.css               # Design system tokens, typography, grid, themes
│   └── components.css          # Navigation, hero, modal dossier, material swatches
├── js/
│   └── app.js                  # Interactive engine: clock, theme toggle, modals, brief builder
└── assets/
    ├── brand/
    │   ├── logo-dark.png       # Extracted official studio brandmark (charcoal)
    │   ├── logo-light.png      # Official brandmark for dark mode / nocturne theme
    │   ├── logo.svg            # Scalable vector logo component
    │   └── favicon.svg         # Architectural monogram icon
    └── images/
        ├── paper_texture.jpg   # Japanese washi plaster & sunlight leaf shadow texture
        ├── hero_villa.jpg      # Commission 01 (Cantilevered pool & colonnade)
        ├── courtyard_aerial.jpg# Commission 02 (Zen courtyard & lap pool)
        ├── exterior_twilight.jpg # Commission 03 (Monolithic linear pavilion)
        ├── interior_shadows.jpg# Commission 04 (Louvered oak & lime-wash interior)
        └── material_detail.jpg # Commission 05 (Travertine, concrete, blackened steel)
```

---

## 🎨 Design System & Visual Features

- **Atmospheric Texture:** Custom subtle Japanese washi paper and morning sunlight leaf shadow overlay inspired by the studio's brand aesthetic.
- **Dual Visual Modes:**
  - **Linen / Paper Mode (Default):** Warm architectural ecru and lime plaster palette.
  - **Nocturne Mode:** Deep slate, charcoal, and warm bronze highlights.
- **Live Studio Telemetry:** Real-time Kyoto studio time indicator.
- **Interactive Shu-Ha-Ri Philosophy Explorer:** Interactive 3-stage switcher detailing the studio's design methodology.
- **Project Dossier Lightbox:** Full architectural specs (area, site, materials, completion, architectural philosophy) for every project.
- **Tactile Materiality Archive:** Interactive material swatches (Roman Travertine, Board-Formed Concrete, White Oak, Basalt Stone).
- **Commission Brief Builder:** Multi-step client inquiry system.

---

## 🔄 Adding Your Project Assets (For Subsequent Iterations)

When you are ready to add your official studio project photos:

1. Place your high-resolution render or photo files in `assets/images/`.
2. Update the filename references in `index.html` and `PROJECT_DATABASE` in `js/app.js`.
3. The official logo is preserved in `assets/brand/` as both vector (`logo.svg`) and transparent high-res PNG (`logo-dark.png`, `logo-light.png`).

---

## 🚀 Running Locally

Because this is a pure static website with zero dependencies:

- **Option A:** Double-click `index.html` to open it directly in any modern browser.
- **Option B (Recommended for live preview):** Run a local web server:
  ```bash
  python -m http.server 3000
  ```
  Then visit `http://localhost:3000` in your browser.

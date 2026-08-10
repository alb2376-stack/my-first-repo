# Spatial Canvases

Computational Design Workflows, Columbia GSAPP
**Aqila Bakri**, advised by Catherine Griffiths, 2026

Seven browser-based explorations of digital objects: generative 2D drawing,
3D geometry and atmosphere, and data visualization across time, networks,
geography, live participation, and language models.

Open `index.html` in a browser, or serve the folder locally (see
[Running locally](#running-locally); the data-driven pages need a server).

---

## Contents

| # | Tab | Page | Script(s) | Library | Data |
| --- | --- | --- | --- | --- | --- |
| - | Home | `index.html` | - | - | - |
| 01 | 2D Spatial Canvas | `2d-explorations.html` | `js/2d-primitives.js`, `js/2d-interactive.js` | p5.js | - |
| 02 | 3D Spatial Canvas | `3d-explorations.html` | `js/3d-geometries.js`, `js/3d-atmospheric.js` | Three.js | - |
| 03 | Temporal Structure | `d3-exploration.html` | `js/d3-exploration.js` | D3 | `data/my-steps.csv` |
| 04 | Relational Structures | `relational.html` | `js/relational.js` | D3 | `data/edges.csv` |
| 05 | Geospatial Structures | `geospatial.html` | `js/geospatial.js` | Mapbox GL JS | `data/sheds.geojson` |
| 06 | Engagement Components | `engagement.html` | `js/engagement.js` | Firebase | Realtime Database |
| 07 | Agents | `agents.html` | `js/agents.js` | OpenAI API | - |

---

## Repo structure

```
.
├── index.html               Home: hero, card grid linking to all seven tabs
├── 2d-explorations.html     Tabs 01–07: one page per tab, same header/nav/footer
├── 3d-explorations.html
├── d3-exploration.html
├── relational.html
├── geospatial.html
├── engagement.html
├── agents.html
├── style.css                All styling for every page; tokens in :root
│
├── js/                      One script per sketch, named to match its page
├── data/                    CSV and GeoJSON loaded by the visualizations
├── docs/                    Longer write-ups and tutorials
│
├── README.md                This file
├── STYLE.md                 Visual language: color, type, components, rules
├── FEATURES.md              What's built, what's next, known issues, decisions
└── IDEAS.md                 Idea parking lot, datasets, techniques to try
```

Every page is plain HTML with no build step. Libraries load from CDNs in each
page's `<head>`; there is nothing to install.

---

## Running locally

`2d-explorations.html` and `3d-explorations.html` work by double-clicking the
file. The pages that load data (`d3-exploration`, `relational`, `geospatial`)
fetch from `data/`, which browsers block over `file://`, so serve the folder
instead:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

---

## Conventions

- **Naming**: scripts are named after the page that loads them (`geospatial.html`
  ↔ `js/geospatial.js`). Files are lowercase kebab-case.
- **Scope**: each sketch is wrapped in a p5 instance or an IIFE so two sketches
  can share a page without colliding on globals.
- **Containers**: every sketch draws into an element whose id is named in the
  script's header comment.
- **Styling**: all CSS lives in `style.css`, with colors as `:root` tokens. Per-tab
  accents are passed in via the `--tab-color` / `--accent` custom properties.
- **Nav**: the tab bar is duplicated in all eight HTML files. Adding or renaming a
  tab means updating all eight, plus the card grid in `index.html` and the
  `NN of 07` eyebrow on each subpage.

---

## Keys and secrets

`js/agents.js` calls the OpenAI API from the browser and asks each visitor for
their own key, which is kept in that browser's `localStorage`. No key is
committed to this repo, and none should be. Anything pushed to a public GitHub
repo is public, including in the file history. See `.gitignore`.

---

## Documentation

- [`docs/p5-multiple-canvases.md`](docs/p5-multiple-canvases.md): tutorial on
  running multiple p5.js canvases on one page, the technique behind tab 01.

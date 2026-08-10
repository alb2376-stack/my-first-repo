# Feature planning: Spatial Canvases

What is built, what is next, and what is known to be broken.

Related: [STYLE.md](STYLE.md) for how things should look, [IDEAS.md](IDEAS.md)
for things not committed to yet.

---

## 1. Current state

The seven digital objects the final assignment asks for, and where each one lives.

| # | Tab | Object | Page | Script | Status |
| --- | --- | --- | --- | --- | --- |
| - | Home | - | `index.html` | - | done |
| 01 | 2D Spatial Canvas | 2D spatial canvas | `2d-explorations.html` | `js/2d-primitives.js`, `js/2d-interactive.js` | done |
| 02 | 3D Spatial Canvas | 3D spatial canvas | `3d-explorations.html` | `js/3d-geometries.js`, `js/3d-atmospheric.js` | done |
| 03 | Temporal Structure | temporal structure | `d3-exploration.html` | `js/d3-exploration.js` | done |
| 04 | Relational Structures | relational structure | `relational.html` | `js/relational.js` | done |
| 05 | Geospatial Structures | geospatial structure | `geospatial.html` | `js/geospatial.js` | done |
| 06 | Engagement Components | engagement component | `engagement.html` | `js/engagement.js` | done |
| 07 | Agents | agent | `agents.html` | `js/agents.js` | in progress |

## 2. Contextual statements

Each object needs a statement of what I attempted, plus any datasets,
interactive elements, or references.

| Tab | Statement written | Dataset / reference credited |
| --- | --- | --- |
| 2D Spatial Canvas | yes | - |
| 3D Spatial Canvas | yes | - |
| Temporal Structure | yes | my own step data |
| Relational Structures | yes | Baker Institute e-waste article |
| Geospatial Structures | yes | NYC sidewalk shed permits, Mapping Systems extension |
| Engagement Components | yes | Firebase Realtime Database |
| Agents | yes | OpenAI API |

---

## 3. Now

- [ ]

## 4. Next

- [ ]

## 5. Later / maybe

- [ ]

---

## 6. Known issues

- [ ] The nav bar is copy-pasted into all 8 HTML files, so adding a tab means editing all 8.
- [ ] The Agents tab is still a plain chat box and does not know anything about this project.
- [ ] `geospatial.html` wraps the map in two nested `.canvas-frame` divs, so it draws a double border.
- [ ]

---

## 7. Feature template

Copy this block for anything non-trivial.

```
### Feature:
**Why:**
**Where it lives:** (page / script / data)
**Done when:**
**Open questions:**
```

---

## 8. Decisions log

| Date | Decision | Why |
| --- | --- | --- |
| 2026-08-11 | Merged the two 2D pages into one tab, and the two 3D pages into one | Nine tabs was too many, and the assignment asks for seven objects |
| 2026-08-11 | Renamed the D3 tab to Temporal Structure | Names the thing being studied, not the library, and matches Relational and Geospatial |
| 2026-08-11 | Moved scripts to `js/` and data to `data/`, renamed each script after its page | Repo needs to be clearly organized with appropriately named files |
| | | |

# Style Guide: Spatial Canvases

How this site is supposed to look and behave. The scaffolding below is filled in
from what's already in `style.css`; the blank fields are for you.

---

## 1. Direction

**Mood / adjectives**
<!-- e.g. warm, graphic, editorial, high-contrast -->

**References / precedents**
<!-- Sites, posters, books you want this to sit next to -->

**What this site is not**
<!-- Useful guardrail: e.g. "not a corporate dashboard", "not minimal-grey" -->

---

## 2. Color

Tokens live in `:root` at the top of `style.css`. Change them there, never inline.

| Token | Hex | Currently used for | Notes |
| --- | --- | --- | --- |
| `--cream` | `#fff8f0` | page background |  |
| `--white` | `#ffffff` | header, cards, canvas frames |  |
| `--peach` | `#fec59a` | tab accent (D3, Agents) |  |
| `--orange` | `#fe9f5d` | tab accent (2D) |  |
| `--coral` | `#fd6c41` | tab accent (Engagement) |  |
| `--red` | `#fc2a0d` | tab accent (3D) |  |
| `--pink` | `#db2265` | eyebrows, GSAPP mark, hover |  |
| `--pink-light` | `#ff5969` |  |  |
| `--light-orange` | `#fec27a` | tab accent (Relational) |  |
| `--teal` | `#4f9d9a` |  |  |
| `--ink` | `#2a1810` | body text, headings |  |
| `--ink-soft` | `#7a5a4d` | descriptions, secondary text |  |
| `--line` | `rgba(42,24,16,0.12)` | borders, rules |  |

**Rules**
- One accent color per tab, set via `--tab-color` / `--accent` on the element.
- <!-- your rules: when to use teal? how much red is too much? -->

---

## 3. Type

| Role | Family | Weight | Size |
| --- | --- | --- | --- |
| Page title (`.project-title`) | Kanit | 900 |  |
| Section title (`.section-title`) | Kanit | 900 | `clamp(28px, 4vw, 38px)` |
| Sketch title (`.sketch-title`) | Kanit | 900 | `clamp(20px, 2.6vw, 26px)` |
| Body / description | Poppins | 300–500 | 16px |
| Eyebrow (`.section-eyebrow`) | Poppins | 600 | 12.5px, uppercase, tracked |

**Notes**
<!-- Line length, when to use italics, capitalization rules -->

---

## 4. Layout & components

| Component | Class | Notes |
| --- | --- | --- |
| Site header | `.site-header` | GSAPP left, course center, About right |
| Tab bar | `.site-tabs` / `.tab-link` | Home + 7 numbered tabs, same on every page |
| Home cards | `.tab-grid` / `.tab-card` | One card per tab, numbered to match |
| Canvas frame | `.canvas-frame` | White, rounded, soft shadow; wraps every sketch |
| Back link | `.back-link` | Top of every subpage |
| Footer | `.site-footer` | Name + school, same on every page |

**Spacing / sizing conventions**
<!-- Canvas widths (currently 800px), section gaps, max text width (620px) -->

---

## 5. Consistency rules

- The tab bar and footer are duplicated in every HTML file, so change one, change all.
- Sketch canvases are fixed at 800px wide; keep new ones matching.
- Every subpage carries an eyebrow numbered `NN of 07`; update it if tabs change.
- <!-- add your own -->

---

## 6. Open style questions

- <!-- Things you haven't decided yet -->

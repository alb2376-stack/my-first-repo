# Style: Spatial Canvases

How this site is supposed to look and behave. The scaffolding is filled in from
what is already in `style.css`; the blank fields are for me.

Related: [FEATURES.md](FEATURES.md) for what to build, [IDEAS.md](IDEAS.md) for
what might come after.

---

## 1. Direction

**Mood / adjectives**

Warm, graphic, and sunset-toned. The site is bright, saturated, and playful,
built almost entirely on pink and orange: peach, coral, red, and hot pink layered
over cream, with no cool colors anywhere. It is bold before it is subtle,
editorial rather than corporate, and closer to something printed than something
engineered. The overall feeling is energetic and tactile, with enough structure
underneath to keep seven very different exercises reading as one set.

**Description of the style**

An editorial, exhibition-catalog feel rather than a portfolio grid or a
dashboard. A few things carry it:

- **A warm ground, never white.** The page sits on cream, and pure white is
  reserved for the things holding content: the header, the cards, and the frames
  around each sketch. That reversal makes the work read as objects placed on a
  surface instead of pixels on a screen.
- **Type doing two different jobs.** Kanit Black for anything titled, heavy and
  condensed enough to feel printed, against Poppins at light and medium weights
  for reading. The contrast between the two is most of the personality.
- **Numbering as the organizing device.** Every object is 01 through 07 in a
  circle, repeated in the tab bar, on the cards, and in the eyebrow on each page.
  It reads as wayfinding, closer to gallery signage than to web navigation, and
  it is what makes seven separate exercises feel like one set.
- **Color as index, not decoration.** Each tab owns an accent from the warm
  range, so a page can be recognized by its color before its label is read.
- **Everything matted.** Each sketch sits in a rounded white frame with a soft
  shadow, so a p5 canvas, a D3 chart, and a Mapbox map are all presented the
  same way despite being made with different tools.

**References / precedents**

<!-- My read on where this sits. Swap in your own if these are not right. -->

- Risograph printing, where the fluorescent orange and pink inks overprint and
  the paper stock stays warm. The palette here behaves the same way.
- Exhibition and museum wayfinding, where numbered stations guide you through a
  sequence of separate works.
- Magazine contents pages and editorial layout, which is where the eyebrow,
  section number, and standfirst description come from.
- Swiss grid discipline in the structure, but warmed up and loosened rather than
  neutral.

**What this site is not**

- Not a minimal grey portfolio, and not a corporate dashboard.
- Not dark mode. The warmth of the paper is the point.
- Not decorative for its own sake. Color carries information here.

---

## 2. Color

Tokens live in `:root` at the top of `style.css`. Change them there, never inline.

| Token | Hex | Currently used for | Notes |
| --- | --- | --- | --- |
| `--cream` | `#fff8f0` | page background |  |
| `--white` | `#ffffff` | header, cards, canvas frames |  |
| `--peach` | `#fec59a` | tab accent (Temporal, Agents) |  |
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
- <!-- my rules: when to use teal? how much red is too much? -->

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

## 4. Layout and components

| Component | Class | Notes |
| --- | --- | --- |
| Site header | `.site-header` | GSAPP left, course center, About right |
| Tab bar | `.site-tabs` / `.tab-link` | Home plus 7 numbered tabs, same on every page |
| Home cards | `.tab-grid` / `.tab-card` | One card per tab, numbered to match |
| Canvas frame | `.canvas-frame` | White, rounded, soft shadow; wraps every sketch |
| Back link | `.back-link` | Top of every subpage |
| Footer | `.site-footer` | Name and school, same on every page |

**Spacing / sizing conventions**
<!-- Canvas widths (currently 800px), section gaps, max text width (620px) -->

---

## 5. Consistency rules

- The tab bar and footer are duplicated in every HTML file, so change one, change all.
- Sketch canvases are fixed at 800px wide; keep new ones matching.
- Every subpage carries an eyebrow numbered `NN of 07`; update it if tabs change.
- Every tab gets a contextual statement under its heading, in my own voice.
- No em dashes in any copy on the site.
- <!-- add my own -->

---

## 6. Open style questions

- <!-- Things I haven't decided yet -->

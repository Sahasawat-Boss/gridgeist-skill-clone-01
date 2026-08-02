# Cadence — Ship in cadence

A static marketing/landing site for a fictional product, **Cadence**, a release-signal
console for engineering teams. Built as a proof-of-concept with the
[Gridgeist](https://github.com/ohmiler/gridgeist) design method — distinctive,
product-native interface direction rather than generic SaaS aesthetics.

> **Note on content.** Cadence is a fictional product created for this POC. Every
> metric, deploy, and figure on the page is illustrative sample data and does not
> represent a real product, customer, or outcome.

## Direction

- **Thesis** — A release-signal console for engineering teams, built on an explicit
  editorial grid, precise technical restraint, and a *changelog-as-evidence* motif
  that turns deploys, latency, errors, and adoption into one legible rhythm.
- **Structural influence** — rational, visible grid (12 columns in the hero).
- **Expressive influence** — precise / restrained / technical.
- **Product-native motif** — release evidence: deploys, latency traces, adoption
  curves, and incident state.

The visual system (paper canvas, cobalt action, acid focus, Inter + DM Mono,
visible-grid hero) is derived from the reference Gridgeist site and re-applied to
Cadence's own content — principles extracted, not a literal copy.

## Structure

```
gridgeist-poc-01/
├── index.html      # Single-page site, semantic sections 01–08
├── styles.css      # Design tokens + composition + responsive rules
├── script.js       # Hero axis, before/after toggle, reveal, clock, count-up, copy
├── favicon.svg     # Grid-mark favicon
├── DESIGN.md        # Compact system contract (tokens + component grammar)
└── README.md
```

## Run it

No build step, no dependencies. Open `index.html` directly, or serve the folder:

```bash
# Python
python -m http.server 8080

# or Node
npx serve .
```

Then visit <http://localhost:8080>.

Fonts (Inter, DM Mono) load from Google Fonts at runtime; system fallbacks are
defined so the layout holds if the network is unavailable.

## Sections

| # | Section | Job |
|---|---------|-----|
| 01 | Premise | The governing statement |
| 02 | Diagnostic | Interactive Notes → Console comparison |
| 03 | The loop | Capture / Correlate / Announce |
| 04 | Signal range | Four signal panels at different densities |
| 05 | Architecture | Ingest → Normalize → Surface pipeline |
| 06 | Evidence | Demo-workspace figure (sample data) |
| 07 | In practice | Illustrative before/after walkthrough |
| 08 | Get started | Self-host + CLI commands |

## Accessibility & resilience

- Semantic landmarks, skip link, labelled sections, keyboard-operable controls.
- Visible focus rings via the acid focus token; state cues never rely on color alone.
- `prefers-reduced-motion` disables the reveal, hero tracking, and count-up.
- `forced-colors` (Windows High Contrast) fallbacks for grid and inverted surfaces.
- Responsive recomposition at 800 / 480 / 360 px — layouts reorder, they don't shrink.

## Verification

See the "Verification" notes at the end of the build conversation. Layouts were
reasoned against the responsive breakpoints; run the page in a browser and exercise
the Notes/Console toggle, copy buttons, mobile menu, and reduced-motion mode to
confirm behavior on your target devices.

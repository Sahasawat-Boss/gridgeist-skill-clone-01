# Cadence — System Contract

A compact, greenfield design contract for the Cadence POC. Exact values live in
`styles.css` under `:root`; this file records intent. Token layers: **foundation**
(raw values) → **semantic** (roles) → **component** (bindings).

Theme: **Nebula Console** — a dark, luminous console surface. Panels are glass over a
slow aurora field; meaning is carried by *signal* hues, never by weight alone.

## Color

| Role (semantic) | Value | Use |
|---|---|---|
| `--color-canvas` | `#06060d` void | Page background |
| `--color-canvas-alt` | `#0a0b14` | Alternating section bands |
| `--color-surface` | `rgba(255,255,255,.038)` glass | Raised panels, cards |
| `--color-text` | `#f4f6ff` lumen | Primary text |
| `--color-text-muted` | `#8a91b4` | Secondary copy |
| `--color-border` | `rgba(255,255,255,.09)` | Hairlines between glass panels |
| `--color-action` | `#2ff2c4` mint | Primary action, live/OK signal |
| `--color-focus` | `#9d7bff` violet | Focus ring, selection, state fills |
| `--color-warning` | `#ffb457` amber | "Needs attention" state |
| `--color-destructive` | `#ff6a8b` coral | Rollback, failure |

Three signal hues only — **mint** (healthy / primary), **violet** (state, emphasis),
**coral** (fault) — with amber reserved for warnings. Gradients are always drawn from
this same set so the page reads as one system.

State is never signalled by color alone: the incident "needs attention" row carries a
left rule, the delivery "rollback" chip carries its own outline, and `.copied` swaps
fill *and* label. Every gradient headline has a `forced-colors` fallback to `CanvasText`.

## Typography

Two families only.

- **Interface** — `Space Grotesk` (fallback `system-ui, Segoe UI, Arial`). Display 700 /
  heading 600 / body 400–500. Tracking is moderate (`-.025em` to `-.05em`) — the
  letterforms are wide, so display sizes stay legible without extreme negative tracking.
- **Metadata** — `JetBrains Mono` (fallback `ui-monospace, Menlo`). Labels, section
  numbers, commands, timestamps, IDs, figures — genuinely technical content only,
  uppercased at `.55–.72rem` with wide `.1–.16em` tracking.

Body measure held to ~45–75 characters via `max-width` on copy blocks.

## Layout & spacing

- Container: `--container-wide` 1320px; gutter is a `max()` of a fluid clamp and the
  centering margin so content never touches the viewport edge.
- **Panels float, they don't share rules.** Sections are card grids separated by a `.9–1rem`
  gap rather than a single hairline lattice. Section boundaries are drawn by a faded
  gradient rule (`::after`), not a hard border.
- The hero grid is a **dot lattice**, masked with a radial fade so it dissolves at the edges.
- Breakpoints recompose priority order at **1080 / 800 / 480 / 360 px** rather than scaling
  the desktop layout down.

## Shape & surface

- **Radius is a token scale**: `6 / 12 / 20 / 28 / pill`. Structural panels use `md` (20px),
  controls use `pill`, code and chips use `sm`/`xs`.
- Depth comes from three stacked cues: a hairline border, a translucent glass fill with
  `backdrop-filter`, and a soft ambient shadow. Accent panels add a colored glow
  (`--shadow-glow-mint` / `--shadow-glow-violet`) instead of a heavier border.
- `body::before` paints a fixed three-point aurora wash; `body::after` lays a 3px dot grain
  over it so large flat fills don't band. Both are `pointer-events: none` and are removed
  under `forced-colors`.

## Component grammar

| Component | Anatomy | Variants | States |
|---|---|---|---|
| Button | min 52px, pill, mono label, arrow affordance | `dark` (gradient), `light` (glass) | hover (lift + glow), focus-visible (violet ring) |
| Nav | pill rail with inset links | desktop rail / mobile `details` sheet | hover = mint fill, inverted label |
| View switch | segmented pill | before / after | `aria-pressed` = gradient fill + mint glow |
| Copy button | attached to `.command-line` | — | default, hover, `.copied` (mint fill), fallback |
| Signal panel | header (id + label) + viz + caption | trace / ledger / adoption / incident | hover lift; one accent per panel |
| Command line | pre `code` + copy button | full / small | horizontal scroll on overflow |
| Flow step | label + title, chained | 3 steps, last is the gradient terminus | connector chip rotates 90° when stacked |

Content stress handled: commands scroll horizontally; long headings wrap; the demo
console reflows to a single column on mobile; the count-up settles to the exact value.

## Motion

- Durations: fast `180ms`, base `320ms`, reveal `780ms`; easing `cubic-bezier(.16,1,.3,1)`.
- Motion only conveys causality/feedback: the hero axis follows the pointer, the aurora orb
  drifts on a 26s loop, sections rise on reveal, the trace beacon pulses, the evidence
  figure counts up once when scrolled into view, cards lift on hover.
- `prefers-reduced-motion: reduce` removes hero tracking, the orb drift, the reveal
  transform, and the count-up (figure shows its final value immediately). `forced-colors`
  drops the ambient layers and flattens every gradient fill to system colors.

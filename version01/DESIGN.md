# Cadence — System Contract

A compact, greenfield design contract for the Cadence POC. Exact values live in
`styles.css` under `:root`; this file records intent. Token layers: **foundation**
(raw values) → **semantic** (roles) → **component** (bindings).

## Color

| Role (semantic) | Value | Use |
|---|---|---|
| `--color-canvas` | `#f2f0e9` paper | Page background |
| `--color-surface` | `#ffffff` | Raised surfaces |
| `--color-text` | `#11120f` ink | Primary text, strong rules |
| `--color-text-muted` | `#686a63` | Secondary copy |
| `--color-border` | `rgba(17,18,15,.23)` | Quiet rules |
| `--color-action` | `#1547ff` cobalt | Primary action, accents |
| `--color-focus` | `#d8ff00` acid | Focus ring, selection marker |
| `--color-warning` | `#a94b22` | "Needs attention" state |
| `--color-inverse-surface` | ink | Dark bands (adaptation, install) |

Foreground/background pairs are kept explicit for every inverted surface (ink band,
cobalt band, acid panel). State is never signalled by color alone: the incident
"needs attention" row and the delivery "rollback" chip each carry a left rule.

## Typography

Two families only.

- **Interface** — `Inter` (fallback `system-ui, Arial`). Display 900 / heading 800 /
  body 400–600. Display uses tight tracking (`-.065em` to `-.085em`), line-height < 1.
- **Metadata** — `DM Mono` (fallback `ui-monospace, Menlo`). Labels, section numbers,
  commands, timestamps, IDs, and figures — genuinely technical content only, uppercased
  at `.55–.7rem` with `.06–.08em` tracking.

Body measure held to ~45–75 characters via `max-width` on copy blocks.

## Layout & spacing

- Container: `--container-wide` 1280px; gutter is a `max()` of a fluid clamp and the
  centering margin so content never touches the viewport edge.
- Grid is **visible** in the hero (12 columns + quarter rows) and as structural borders
  throughout; it is the brand, so it stays exposed.
- Spacing rhythm on a `.5rem` base (`--foundation-space-*`).
- Breakpoints recompose priority order at **800 / 480 / 360 px** rather than scaling
  the desktop layout down.

## Shape & surface

- **No radius** on structural elements — square corners are part of the technical voice.
  The only rounded elements are the *deliberately generic* "before" mockup (pill + soft
  cards), used as a foil.
- Borders explain containment and adjacency; shadows are reserved for the mobile menu
  and the foil cards. No gradient/shadow/radius stacking on real product surfaces.

## Component grammar

| Component | Anatomy | Variants | States |
|---|---|---|---|
| Button | min 48px, mono label, arrow affordance | `dark`, `light` | hover (lift), focus-visible (acid ring) |
| View switch | segmented, bordered | before / after | `aria-pressed` = inverse fill + acid underline |
| Copy button | attached to `.command-line` | — | default, hover, `.copied` (acid + inset rule), fallback |
| Signal panel | header (id + label) + viz + caption | trace / ledger / adoption / incident | static; distinct density per panel |
| Command line | pre `code` + copy button | full / small | horizontal scroll on overflow |

Content stress handled: commands scroll horizontally; long headings wrap; the demo
console reflows to a single column on mobile; the count-up settles to the exact value.

## Motion

- Durations: fast `160ms`, base `280ms`, reveal `700ms`.
- Motion only conveys causality/feedback: hero axis follows the pointer, sections rise
  on reveal, the evidence figure counts up once when scrolled into view, buttons lift
  on hover.
- `prefers-reduced-motion: reduce` removes hero tracking, the reveal transform, and the
  count-up (figure shows its final value immediately). `forced-colors` swaps grid and
  inverted surfaces to system colors.

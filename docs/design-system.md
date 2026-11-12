# AffordableCare Design Theme and Branding

**Owner:** Victor Patrick (`DjPatbern`)

**Visual direction:** warm editorial healthcare, inspired by the spacious Branda service-ordering layout supplied by the team

AffordableCare adopts the reference's calm ivory canvas, deep green typography, generous whitespace, editorial serif headlines, and rounded feature panels. The identity is adapted for healthcare access: reassuring rather than promotional, clinically clear rather than decorative, and never dependent on imagery to communicate essential information.

## Brand principles

1. **Calm and trustworthy:** quiet surfaces, strong contrast, and plain-language actions.
2. **Warm, not clinical:** natural greens and warm neutrals make care discovery feel human.
3. **Clear before clever:** prices, locations, availability, timezone, and appointment status remain prominent.
4. **Accessible by default:** WCAG AA contrast, keyboard support, visible focus, and reduced-motion support.

## Color palette

| Token | Hex | Usage |
| --- | --- | --- |
| `--color-canvas` | `#F7F5EE` | Main warm-ivory page background |
| `--color-surface` | `#FFFEFA` | Cards, forms, navigation, dialogs |
| `--color-forest-950` | `#17362A` | Display headings and highest-emphasis text |
| `--color-forest-800` | `#23513D` | Primary buttons, links, active navigation |
| `--color-forest-700` | `#2F684E` | Hover and supporting brand elements |
| `--color-sage-200` | `#DCE6D6` | Featured panels, selected filters, trust strip |
| `--color-sage-100` | `#EEF2E6` | Subtle backgrounds and empty states |
| `--color-lime-400` | `#A8C85F` | Small highlights, marks, and focus accents |
| `--color-ink` | `#202B25` | Body text |
| `--color-muted` | `#657169` | Supporting copy and metadata |
| `--color-border` | `#D9DED6` | Dividers, inputs, and card outlines |
| `--color-danger` | `#B42318` | Destructive actions and error text |
| `--color-danger-soft` | `#FEE4E2` | Error and cancellation backgrounds |

Do not use green alone to indicate availability or success. Pair color with text and, where useful, an icon.

## Typography

- **Display:** `Fraunces`, variable serif. Use for hero and major page headings only.
- **Body/UI:** `Manrope`, variable sans-serif. Use for navigation, forms, cards, tables, and body copy.
- **Fallbacks:** `Georgia, serif` for display; `Arial, Helvetica, sans-serif` for body.
- Body copy defaults to 16px with a 1.6 line height. Form controls never render below 16px on mobile.

| Style | Mobile | Desktop | Weight/line height |
| --- | --- | --- | --- |
| Display XL | 48px | 80px | 500 / 0.98 |
| Heading 1 | 40px | 56px | 550 / 1.05 |
| Heading 2 | 30px | 40px | 600 / 1.15 |
| Heading 3 | 22px | 26px | 650 / 1.25 |
| Body large | 18px | 20px | 450 / 1.6 |
| Body | 16px | 16px | 450 / 1.6 |
| Label | 14px | 14px | 650 / 1.4 |
| Caption | 13px | 13px | 550 / 1.4 |

## Layout and spacing

- Use a 4px base spacing scale: `1, 2, 3, 4, 6, 8, 10, 12, 16, 20, 24` map to 4–96px.
- Main content maximum width: 1200px.
- Horizontal gutters: 16px mobile, 24px tablet, 32px desktop.
- Section spacing: 64px mobile and 96px desktop.
- Standard card padding: 20px mobile and 24–32px desktop.
- Form field gap: 20px; compact metadata gap: 8px.
- Grid: one column mobile, two columns tablet, three columns wide desktop when card content permits.

## Shape, borders, and elevation

- Inputs/buttons: 12px radius.
- Standard cards: 16px radius.
- Featured/hero media panels: 24px radius.
- Pills and badges: fully rounded.
- Borders use one pixel `--color-border`; use shadows sparingly.
- Default card shadow: `0 12px 32px rgb(23 54 42 / 0.08)` only for elevated/interactive surfaces.

## Shared UI conventions

- Tailwind CSS utilities are the primary styling approach.
- Reusable variants are defined in components, not repeated as long class strings across routes.
- No additional UI kit is required for Week 04. Accessible primitives may later use Radix UI if dialogs or complex menus justify it.
- Primary buttons use forest fill with white text; secondary buttons use a transparent surface and forest border.
- Links are underlined in body content. Navigation links may use weight and active indicators instead.
- Focus rings use a two-layer treatment that remains visible on light and dark surfaces.
- Motion is short and functional (150–250ms); respect `prefers-reduced-motion`.

## Responsive patterns

- Header navigation becomes a menu below 768px and must never create horizontal overflow.
- Hero sections move from a two-column editorial composition to a single-column reading order.
- Filters use a compact disclosure/drawer on mobile and an inline bar on desktop.
- Provider tables render as labelled cards on small screens.
- Tap targets are at least 44×44px.

## Content and imagery

- Use real clinic/service information or neutral placeholders; avoid implying medical outcomes.
- Photography, if introduced, should represent local patients and providers respectfully and require meaningful alternative text when informative.
- Decorative editorial shapes may echo the reference layout but are hidden from assistive technology.
- Always display the platform boundary: AffordableCare is not an emergency or diagnostic service.

## Design acceptance checklist

- [ ] Palette and typography tokens are used instead of ad hoc values.
- [ ] Text and interactive states meet WCAG AA contrast.
- [ ] Layout works at 320px, 768px, 1024px, and 1440px.
- [ ] Keyboard focus is visible and logical.
- [ ] Content remains usable with images disabled and at 200% zoom.
- [ ] Loading, empty, error, success, and permission states follow the shared patterns.

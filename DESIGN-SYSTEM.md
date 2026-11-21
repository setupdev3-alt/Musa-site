# One Fit Play — Design System

## Brand direction

An editorial sportswear storefront for jackets, activewear and everyday layers. The visual language pairs a warm neutral canvas with charcoal campaign sections and the electric blue already present in the supplied One Fit Play logo. Product photography stays prominent and unaltered beyond responsive cropping and compression. The layout uses strong type, broad spacing and sharp edges to feel like a fashion lookbook rather than a standard card grid.

## Color palette

| Token | Hex | Use |
| --- | --- | --- |
| Paper | `#F1F0EC` | Main page and light surfaces |
| Soft paper | `#E7E6E0` | Product lineup background |
| Ink | `#171A19` | Main text and dark buttons |
| Night | `#111513` | Hero, sports feature and footer |
| Blue | `#1671E8` | Main action and interaction accent |
| Blue light | `#46A1FF` | Small accents on dark surfaces |
| Muted | `#717671` | Supporting copy and metadata |
| White | `#FFFFFF` | High contrast and button surfaces |

## Typography

- Display: Space Grotesk, with Segoe UI and sans-serif fallbacks.
- Body and controls: DM Sans, with Segoe UI and sans-serif fallbacks.
- Eyebrows and utility labels use uppercase text with 0.10–0.17em tracking.
- Display headings use tight leading (0.89–0.96) and negative tracking for an editorial rhythm.
- Main hero heading scales from about 52px on small screens to 112px on wide screens. Section headings range from 48px to 86px. Body copy is generally 12–14px; product and utility metadata is 8–10px.

## Spacing and layout

- Page gutters: `clamp(20px, 5vw, 76px)`; centered wide layouts cap their outer gutter as the viewport grows.
- Section vertical padding: roughly 74–140px on desktop and 73px on mobile.
- Cards and media use 11–28px gutters, with larger gaps reserved for editorial sections.
- The main page uses a 12-column-like flexible grid, with explicit two- and three-column compositions that collapse for mobile.

## Buttons and controls

- Primary light button: white fill, dark text; hover switches to brand blue.
- Primary dark button: ink fill, white text; hover switches to brand blue.
- Text links use a thin underline or animated arrow spacing.
- Product cards stay square edged. The only circular element is the compact bag count.
- Controls have visible keyboard focus rings in brand blue; dialogs close with Escape or the close button.

## Borders, radius and shadows

- Cards and media are square cornered to keep the presentation editorial.
- Hairline borders use `rgba(23, 26, 25, .15)` on light surfaces and low opacity white on dark surfaces.
- Elevation is reserved for the bag and dialog surfaces; image cards use motion and color change instead of heavy shadows.

## Gradients and image treatment

- No decorative gradient backgrounds are used. The hero and sports images use restrained dark overlays at the edge for caption contrast.
- Source photos are optimized JPEG copies in `/media`; product photography is real supplied imagery.
- Main product images use `object-fit: cover` with deliberate object positioning; secondary views appear on hover where a distinct image exists.
- Hero image loads eagerly; below-fold imagery is lazy loaded.

## Motion and hover behavior

- Navigation underline, image zoom, CTA color changes and drawer transitions are short and restrained.
- Product card imagery scales by about 3.5%; no repeated scroll reveal effects are used.
- `prefers-reduced-motion` disables smooth scrolling and shortens transitions.

## Responsive breakpoints

- Wide desktop: 1500px and above; gutters adapt to the centered content width.
- Tablet and compact desktop: up to 1000px; product grid moves from four to three columns.
- Mobile: up to 720px; navigation becomes a menu, hero stacks, collection cards move to two columns, product grid uses two columns, and overlays fit the viewport.

## Component rules

- Keep collection and product cards image led, square cornered and light on labels.
- Use the supplied logo file for the header and footer.
- Keep product detail factual: only visible color and garment type are named; unknown materials, size ranges, inventory, prices, delivery terms and performance claims remain unasserted.
- The bag stores product selections locally and copies an order request. It does not calculate a total or claim to process payment.

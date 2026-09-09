# Glass & Aluminum Fabrication Service Website

A modern, professional, fully responsive front-end website for a glass and aluminum fabrication company. Build with HTML5, CSS3, Tailwind-compatible styling, Bootstrap 5, and vanilla JavaScript.

## Pages

- **Home** (`index.html`) – Hero, stats, services, featured products, why choose us, process, gallery preview, pricing CTA, testimonials
- **About** (`about.html`) – Company intro, mission & vision, core values
- **Products** (`products.html`) – Page 1 of the product catalogue (9 products: Windows, Doors, Partitions) with filter buttons and URL-hash deep-linking (`#windows`, `#doors`); paginated to Page 2 via bottom arrows / 1-2 indicator
- **Products 2** (`products-2.html`) – Page 2 of the product catalogue (9 products: Partitions, Shower Enclosures, Commercial) with filter buttons and URL-hash deep-linking (`#partitions`, `#shower`, `#commercial`); paginated back to Page 1 via bottom arrows / 1-2 indicator
- **Product Details** (`product-details.html`) – Dynamic product details with URL query parameter support
- **Gallery** (`gallery.html`) – Filterable project gallery with modal/lightbox
- **Pricing** (`pricing.html`) – Transparent pricing guide with pricing factors
- **Contact** (`contact.html`) – Contact info + site measurement request form with JS validation
- **Login** (`login.html`) – Front-end login form with validation
- **Sign Up** (`signup.html`) – Front-end signup form with validation

## Site-Wide Features

- **Light / Dark theme toggle** — an icon button in the navbar; switchable, stored in `localStorage` and persisted across pages.
- **LTR / RTL direction toggle** — an icon button in the navbar; flips the page layout and `dir`/`lang` attributes, persisted in `localStorage`.
- **Login / Sign Up** — a person icon in the navbar that opens a dropdown with Login and Sign Up links (desktop and mobile).
- All controls are placed directly inside the navbar as icon buttons, fully responsive.

## Technology Stack

- HTML5
- CSS3 (custom + Bootstrap 5 + Tailwind utility classes)
- Bootstrap 5 (CDN)
- Bootstrap Icons (CDN)
- Google Fonts (Inter, Montserrat)
- Vanilla JavaScript ES6+

## Premium Navbar

The navigation bar is a fixed, glassmorphic, premium-charcoal design (deep charcoal gradient with frosted blur) that stays consistent in both light and dark themes. It features:

- **Logo image** (`assets/images/logo.png`) displayed on a **highlighted copper plaque** in the navbar and footer, sized responsively across all devices (54px → 36px as screens shrink)
- **Copper-accented** CTA button ("Get a Quote")
- **Balanced alignment** — brand left, nav links centered, action icons right
- Refined copper underline indicators on hover/active links
- **Icon controls in the navbar**: theme toggle, RTL/LTR toggle, and an account dropdown (Login / Sign Up)
- **Home dropdown** — the Home item opens a dropdown with **Home 1** (`index.html`) and **Home 2** (`home-2.html`)
- Visible custom hamburger icon on mobile with a matching dark collapse panel

## Brand Theme

The entire site uses a **Forest & Sand** palette with polished, rounded surfaces:

- **Light mode** — warm sand/white alternating surfaces (`--surface`, `--surface-alt`) with warm charcoal text and forest-green accents
- **Dark mode** — deep green-tinted charcoal surfaces that alternate between `surfaceAlt` (`#171e15`) and the base surface (`#0f130e`) for depth, with soft leaf-green highlights
- **Premium buttons** — forest-gradient pills with soft glow and lift-on-hover
- **Cards** — rounded, elevated with layered dark surfaces (raised surfaces in dark mode) and forest-green border glow on hover
- All colors are driven by CSS custom properties (`:root` + `html.dark-mode`), so the theme cascades site-wide from a single palette.

### Key color tokens
- `--accent` / `--accent-gold` / `--accent-blue` → forest green `#3f6b47` (`#6fa56f` in dark)
- `--accent-bright` → leaf green `#5a8f5a` (pale leaf `#8dbb8a` in dark)
- `--dark-navy` / `--charcoal` → deep green-charcoal surfaces `#1e1d17` / `#33302a` (light), `#0f130e` / `#33302a` (dark)
- `--surface` / `--surface-alt` → alternating section backgrounds (white + sand `#f4efe5` light; `#0f130e` + `#171e15` dark)
- `--surface-raised` → elevated cards in dark mode `#1a2117`
- `--border-color` / `--mid-gray` → refined sand/dark borders for both themes
- `--text-muted` → muted text used for hover/metadata

## Getting Started

Simply open any of the `.html` files in a modern web browser. No server or build step required.

### Recommended Structure

```
glass-aluminum-fabrication/
├── index.html
├── home-2.html
├── about.html
├── products.html
├── product-details.html
├── gallery.html
├── pricing.html
├── contact.html
├── assets/
│   ├── css/
│   │   ├── style.css
│   │   └── responsive.css
│   ├── js/
│   │   ├── main.js
│   │   ├── gallery.js
│   │   ├── contact.js
│   │   └── auth.js
│   ├── images/
│   │   ├── hero/
│   │   ├── products/
│   │   ├── gallery/
│   │   ├── about/
│   │   ├── services/
│   │   └── testimonials/
│   └── icons/
└── README.md
```

## Images

All site imagery is included as real `jpg`/`png` files under `assets/images/`, already copied into the matching sub-folders the pages reference:

- `assets/images/hero/hero-glass-window.jpg` — hero background / split-hero image
- `assets/images/products/*.jpg` — 10 product card images
- `assets/images/services/*.jpg` — 6 service card images
- `assets/images/gallery/project-01.jpg` … `project-12.jpg` — gallery/lightbox
- `assets/images/about/company-project.jpg` — about / why-us image
- `assets/images/logo.png` — navbar + footer logo

Content images use `width:100%` + `object-fit:cover` and `loading="lazy"` (except above-the-fold heroes), so they scale fluidly on every screen size without distorting.

## Features

- Fully responsive (mobile, tablet, laptop, desktop)
- Sticky navbar with mobile hamburger menu
- Smooth scrolling & back-to-top button
- Scroll reveal animations
- Product filtering by category
- Gallery filtering by category
- Gallery modal/lightbox with prev/next/close & keyboard navigation
- Dynamic product detail page (URL query parameter driven)
- Contact form validation (required fields, phone, email, numeric)
- Site measurement request form with validation
- Success/error alert messages
- Semantic HTML5 markup
- SEO-friendly meta tags and titles

## License

© 2026. All Rights Reserved.

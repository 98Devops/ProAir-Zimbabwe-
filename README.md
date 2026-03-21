# ProAir Zimbabwe — Business Website

> Air conditioning, heating, ventilation & portable climate solutions for car, home, office and events in Harare, Zimbabwe.

![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?logo=netlify&logoColor=white)

## Tech Stack

| Layer | Technology |
|---|---|
| Build Tool | Vite 5 |
| Languages | HTML5, CSS3, Vanilla JavaScript |
| Fonts | Google Fonts (Outfit, Inter) |
| Icons | Lucide Icons (inline SVG) |
| Image Optimization | vite-plugin-image-optimizer + Sharp |
| Deployment | Netlify (CI/CD from `main`) |

## Project Structure

```
ProAir-zw/
├── index.html              # Homepage
├── about.html              # About Us
├── services.html           # Services (7 categories)
├── contact.html            # Contact & Enquiry Form
├── css/
│   ├── global.css          # Design tokens, typography, animations
│   ├── components.css      # Navbar, footer, buttons, cards
│   ├── effects.css         # Particles, tilt, ripple, transitions
│   ├── home.css            # Homepage-specific styles
│   ├── about.css           # About page styles
│   ├── services.css        # Services page styles
│   └── contact.css         # Contact page styles
├── js/
│   ├── main.js             # Navigation, scroll animations, active links
│   ├── effects.js          # Particles, counters, tilt, weather, typing
│   ├── transitions.js      # Smooth page transitions
│   └── contact.js          # WhatsApp-integrated contact form
├── assets/images/          # Logos, service images, QR code
├── vite.config.js          # Multi-page Vite config + image optimizer
└── netlify.toml            # Netlify build & redirect config
```

## Features

- **WhatsApp Integration** — Contact form, CTA buttons, and floating chat button all connect to the business WhatsApp (`0779 840 840`)
- **Live Weather Widget** — Pulls real-time Harare temperature via Open-Meteo API
- **Particle System** — Cool-air particles on all hero sections
- **3D Tilt Cards** — Mouse-tracking perspective tilt on service/feature cards
- **Counter Animations** — Stats count up from zero on scroll
- **Smooth Page Transitions** — Branded fade between pages
- **Button Micro-Interactions** — Ripple effects, magnetic hover
- **Typing Effect** — Animated tagline on homepage hero
- **Scroll Progress Bar** — Gradient progress indicator
- **Image Optimization** — ~45% file size reduction via Sharp/SVGO at build time
- **SEO Optimized** — Meta tags, Schema.org LocalBusiness JSON-LD, Open Graph

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build
```

## Deployment

Deployed via **Netlify** with CI/CD. Every push to `main` triggers an automatic build and deploy.

## License

© 2026 ProAir Zimbabwe. All rights reserved.

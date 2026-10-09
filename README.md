# Puravigal Website

The official Puravigal marketing site and product website.

## Architecture

- `/` — Puravigal platform homepage
- `/business-types.html` — platform-level business categories and roadmap direction
- `/resources.html` — resources hub
- `/pos/` — Puravigal POS product website
- `/pos/features.html` — visual POS feature stories
- `/pos/pricing.html` — Free Trial + Standard pricing
- `/pos/industries/` — POS business-type hub
- `/pos/industries/*.html` — retail, restaurant, café, mobile shop, supermarket and grocery pages
- `/login.html`, `/signup.html` — Puravigal account UI
- `/pos/login.html`, `/pos/signup.html` — POS account UI
- `/sitemap.xml` — sitemap index
- `/sitemap-main.xml` — main-site sitemap
- `/sitemap-pos.xml` — POS sitemap
- `/llms.txt` — machine-readable product/platform summary

## Design system

### Main Puravigal
- Light SaaS interface
- Puravigal blue/pink brand gradient
- Clean typography and generous spacing
- Existing brand/logo/social assets retained

### Puravigal POS
- Separate purple/indigo product colour derived from the Puravigal gradient
- Product header uses Puravigal + POS
- Visual feature storytelling with alternating copy/screen layouts
- Vertical-specific illustrations for business types
- Pricing with monthly/yearly switching

## Current product position

Puravigal POS is the first released product direction. Additional applications may be introduced over time. Future products should not be presented as currently available until released.

## Authentication

The front-end contains the Puravigal account and POS account entry points. Final account-service URLs and product authentication integration can be connected when the product/auth backend is ready.

## Social

Main Puravigal social links are kept at brand level: Facebook, Instagram, X/Twitter and Threads.

Product pages use Puravigal as the parent brand unless a product-specific social channel is intentionally launched.
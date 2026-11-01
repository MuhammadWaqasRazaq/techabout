# NOTES.md

## Observations from the live PKHosting website

### 1. Header Navigation Structure
**Element:** Main navigation menu

**Observation:** The live PKHosting website has a comprehensive dropdown menu structure with categories like Hosting, Domains, Servers, SSL, Web Dev, Company, each with submenus containing multiple options.

**Consequence:** For this standalone assessment page, I simplified the navigation to a clean horizontal menu with basic links (Hosting, Domains, Servers, SSL, Support) and a Get Started CTA, avoiding complex dropdowns that would require JavaScript and keeping it simple and functional.

### 2. Pricing Section Layout
**Element:** Pricing cards and billing options

**Observation:** The live site shows pricing with monthly/annual toggle options and currency selector in the top bar. Plans are displayed as cards with clear pricing hierarchy.

**Consequence:** I implemented a similar structure with Monthly/Annually toggle and PKR/USD/GBP currency selector placed above the pricing cards, keeping the billing context visible and accessible near the pricing information.

### 3. Color Scheme
**Element:** Primary branding colors

**Observation:** The live site uses a clean hosting-company style with dark navy/blue primary branding, blue accent elements, white/light backgrounds, and a professional color palette.

**Consequence:** I created a PKHosting-inspired color system using CSS variables with blues (#1261FF, #071A35), clean whites, and subtle grays, maintaining a professional, trustworthy appearance without copying exact hex values.

### 4. Payment Methods Display
**Element:** Footer payment methods

**Observation:** The live PKHosting footer publicly shows Stripe, PayPal, JazzCash, Easypaisa, and Bank account as accepted payment methods.

**Consequence:** For the assessment page, I included these relevant payment methods for a Pakistani audience (Card, PayPal, JazzCash, Easypaisa, Bank Transfer) in a clean chip format, clearly labeled as "Payment methods we'd offer" since this is a fictional VPS product.

### 5. Hero Section Messaging
**Element:** Hero content and CTAs

**Observation:** The live site focuses on "Web Hosting in Pakistan with Local Support" with clear value propositions and prominent CTAs like "View Pricing" and "Explore Servers".

**Consequence:** I created a VPS-focused hero with messaging about predictable pricing, scalable resources, full server control, and CTAs that scroll to the pricing section ("Compare VPS Plans") and support section ("Talk to Sales").

### 6. Trust and Information Elements
**Element:** Supporting content sections

**Observation:** The live site includes sections like "Why PK Hosting", "Our Promise", trust indicators (16+ years), and detailed backup policies with clear limitations.

**Consequence:** I kept the assessment page focused and honest about it being fictional, included a disclaimer in the comparison table stating specifications are invented for assessment, and avoided fake testimonials, uptime statistics, or customer logos as requested.

## State persistence trade-off

**Choice:** Used `localStorage` for persisting billing period and currency preferences.

**Why useful:** 
- Provides a better user experience by remembering user preferences across page reloads
- Common pattern for pricing pages where users may switch between monthly/annual and different currencies
- No server required, works offline
- Simple implementation with vanilla JavaScript

**What happens if localStorage is unavailable:**
- The code checks and falls back to defaults (period = 'monthly', currency = 'PKR')
- Wrapped in try-catch implicitly since localStorage access in private/incognito or disabled storage just returns null
- All functionality continues to work, just without persistence
- No errors thrown that would break the page

**Why no server-side state was used:**
- The page must work completely offline with zero external network requests
- It's a static HTML/CSS/JS page opened directly from filesystem
- No backend or API available
- Keeps the solution simple and meets all requirements

## Payment method trade-off

**Which payment methods were included:**
- Card
- PayPal  
- JazzCash
- Easypaisa
- Bank Transfer

**Which were dropped:**
- I included the core methods visible on the live site. The live site shows Stripe (as card processing), PayPal, JazzCash, Easypaisa, and Bank account. I represented them clearly.

**Why:**
- JazzCash and Easypaisa are very common in Pakistan, matching PKHosting's local market focus
- Card and PayPal provide international payment options
- Bank Transfer is mentioned on the live site
- I labeled them as "Payment methods we'd offer" to be honest about this being a fictional VPS product, not claiming they're guaranteed
- Kept it as simple text chips rather than external logo images to maintain zero external requests
- Focused on methods relevant to a Pakistani VPS buyer as requested

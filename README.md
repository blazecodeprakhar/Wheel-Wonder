# Wheel&Wonder — Hot Wheels 1:64 Die-Cast Store

> **Wheel&Wonder** — India's Dedicated 1:64 Hot Wheels & Die-Cast Toy Store. Every Mainline Car Flat ₹179 MRP.
> Built for both **Shopify Online Store 2.0** and **Standalone HTML Preview** (`index.html` / `preview-store.html`).

---

### Architecture
- **`layout/`**: `theme.liquid` — master Shopify wrapper with 4-column desktop grid, mobile hero isolation, and critical overrides.
- **`sections/`**: `hero-banner.liquid`, `featured-collection.liquid`, `main-collection.liquid`, `diecast-anatomy.liquid`, `collector-finder.liquid`, `diecast-matrix.liquid`, `brand-story.liquid`, `header.liquid`, `footer.liquid`, `main-product.liquid`, `main-cart.liquid`.
- **`snippets/`**: `product-card.liquid`, `buying-window.liquid`, `cart-drawer.liquid`, `price.liquid`, `login-modal.liquid`, `icon-*.liquid`.
- **`templates/`**: OS 2.0 JSON route templates + Customer Account Liquid templates (`templates/customers/`).
- **`assets/`**: Compressed 4:3 progressive Hot Wheels photography (`hw-car-02.jpg`..`hw-car-24.jpg`), `wheel-wonder-logo.png`, `base.css`, `customer.css`, `theme.js`, `cart-drawer.js`.

- **`index.html` & `preview-store.html`**: Complete standalone browser previews synced with the Shopify Liquid theme.

---

### Highlights
- **Flat ₹179 MRP Across All 23 Castings**: JDM & Imports, Exotics & Supercars, American Muscle, and Track Stars.
- **Compressed Progressive Assets**: All 23 Hot Wheels photos optimized via Lanczos (`680×510`, 4:3).
- **Interactive Buying Window & Garage Bag**: Blister card preference selector (`Long Card`, `Short Card`, `Mint Pick`), live ₹999 free-shipping progress bar, and instant cart drawer.

# NACIONALE — Premium Serbian Streetwear

![Status](https://img.shields.io/badge/status-live-brightgreen) ![Next.js](https://img.shields.io/badge/Next.js-16-black) ![PHP](https://img.shields.io/badge/API-PHP%208.3-777BB4)

## 🔗 Live: [nacionale.svilenkovic.rs](https://nacionale.svilenkovic.rs)

## Overview
Full-stack e-commerce platform for a premium Serbian streetwear brand. Features cinematic animations, 3D product showcases, and a complete order management system.

## Tech Stack
- **Frontend:** Next.js 16 (Static Export), React 19, Tailwind CSS 4
- **Backend:** PHP 8.3 REST API, MySQL (MariaDB 10.11)
- **Animations:** GSAP ScrollTrigger, Three.js 3D elements
- **Typography:** Space Grotesk
- **Hosting:** Nginx, Ubuntu 24.04, Let's Encrypt SSL

## Features
- 🛍️ Product catalog with collections
- 🛒 Shopping cart with order placement
- 📱 Fully responsive PWA-ready design
- 🎬 Cinematic scroll animations (GSAP)
- 🧊 3D product viewer (Three.js)
- 🔐 Admin panel for order/product management
- 📊 Real-time inventory tracking
- 🚀 Static export for blazing-fast performance

## Architecture
```
Frontend (Next.js Static Export)
    ├── Product pages with dynamic routing
    ├── Cart state management
    ├── GSAP scroll-triggered animations
    └── Three.js 3D scenes

Backend (PHP REST API)
    ├── /api/products.php — CRUD products
    ├── /api/collections.php — Collection management
    ├── /api/orders.php — Order processing
    └── MySQL database (nacionale)
```

## Screenshots
> Coming soon

---
*Developed by [Dimitrije Svilenković](https://svilenkovic.com)*

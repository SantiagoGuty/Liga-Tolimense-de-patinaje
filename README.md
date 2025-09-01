# Tolima Skating League — Official Web Application

> **Status:** Actively developed (frontend first).

![screenshot](https://github.com/user-attachments/assets/c82edd6a-bdde-42dd-8dba-0493b8ca3ec9)

The goal of this project is to provide a modern, responsive web platform for **La Liga Tolimense de Patinaje** that centralizes news, events, guides, resolutions, courses, memberships, and (planned) **digital rink entry control** using **QR credentials**.

---

## Live Preview

**https://main.d2kyjpfyeakeyn.amplifyapp.com/**  
*(The public domain/url will be updated in the future.)*

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture & Routing](#architecture--routing)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Styling & UX Conventions](#styling--ux-conventions)
- [Internationalization (Planned)](#internationalization-planned)
- [Roadmap](#roadmap)
- [Accessibility & Quality](#accessibility--quality)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### Public sections (implemented)
- **Responsive UI/UX & navigation**
  - Fixed top bar for desktop & mobile (animated burger).
  - Smooth scroll restoration on route changes (to top or to `#anchor`).
  - Shared banner system that compensates the fixed header height (no content overlap).
- **Home**
  - Hero with image slider, latest news block, courses section, events carousel, partners/“aliados”.
- **News**
  - `/noticias` list and `/noticias/:slug` detail pages with images and back links.
- **Courses**
  - Novato / Avanzado / Adultos pages with unified banners and CTAs.
- **Modalities**
  - Patinaje **Carreras** (Speed) and **Artístico** (Artistic).
- **Guides & Resolutions**
  - Unified banner visuals and responsive layout.
- **Partners (Aliados)**
  - Smooth, infinite marquee powered by `requestAnimationFrame` and masked edges (no visible seams).

### Auth & protected areas (skeleton in place)
- `ProtectedRoute` guards for:
  - `/perfil` (Profile)
  - `/crear-perfil`
  - `/editar-perfil`
  - `/usuarios` (admin-only list, if needed)
- Profile avatar shown in the menu (falls back to initials if no avatar).

### Planned major feature
- **Digital rink entry control** using **QR code** credentials and validation.

---

## Tech Stack

- **Framework & Tooling:** React + Vite + TypeScript
- **Routing:** React Router v6 (`createBrowserRouter`, nested routes)
- **Styling:** Plain CSS (modularized by component/page), responsive-first
- **Auth (WIP):** AWS Amplify (`aws-amplify/auth`)
- **Media Storage (WIP):** AWS S3 (avatars/assets)
- **Backend (planned):** Custom API + **PostgreSQL**
- **Deployment:** AWS Amplify (temporary preview URL; domain to be updated)

---

## Architecture & Routing

Top-level layout uses a **Root** component with:
- `ScrollToTop` (restores scroll on route change, scrolls to `#hash` anchors if present)
- `Outlet` for nested routes
- Error boundary handles 404s & thrown errors

**Routes (overview):**
- `/` (Home)
- `/noticias` · `/noticias/:slug`
- `/eventos`
- `/registrate` · `/iniciasesion`
- `/novato` · `/avanzado` · `/adultos`
- `/carreras` · `/artistico`
- `/guias` · `/resoluciones`
- **Protected:** `/perfil` · `/crear-perfil` · `/editar-perfil` · `/usuarios`
- Fallback: `*` → Error page

---



## Project Structure
src/
  assets/                     # images, icons, media
  components/
    Aliados/                  # partners marquee (rAF + CSS masking)
    EventosCarousel/
    Menu_bar/                 # top navigation (desktop + mobile)
    FooterTol/
    NoticiasSection/
  data/
    noticias.ts|json          # static news seed (while backend is not connected)
  layout/
    Root.tsx                  # <ScrollToTop/> + <Outlet/>
    ScrollToTop.tsx
    ProtectedRoute.tsx
  pages/
    Home.tsx
    Noticias.tsx
    Noticia.jsx
    Eventos.tsx
    Registrate.tsx
    IniciaSesion.tsx
    Perfil.tsx
    CrearPerfil.tsx
    EditarPerfil.tsx
    UsersList.tsx
    Novato.tsx / Avanzado.tsx / Adultos.tsx
    Carreras.tsx / Artistico.tsx
    Guias.tsx / Resoluciones.tsx
    ErrorPage.tsx
  services/
    authService.ts            # wraps Amplify auth
    userProfile.ts            # profile fetch helpers
    storageService.ts         # avatar/file URLs (S3)
  styles/
    index.css                 # global/base styles
    banner.css                # shared banner block
    home.css / menu.css / ... # per-page/per-component CSS
  App.tsx
  main.tsx


## Roadmap

Wire up AWS Amplify auth (signup, signin, recovery)

Read/write profile + avatar uploads to S3

Backend integration with PostgreSQL (memberships, courses, registrations, news, events)

QR-based digital rink entry validation

Admin dashboard (users, news, courses, events)

AWS deployment (Amplify or S3 + CloudFront), domain & HTTPS

SEO & analytics


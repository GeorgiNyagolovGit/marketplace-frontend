# Marketplace Frontend

[![Angular](https://img.shields.io/badge/Angular-19-DD0031?logo=angular&logoColor=white)](https://angular.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Status](https://img.shields.io/badge/status-in%20development-orange)](#project-status)

A modern e-commerce frontend built with Angular and TypeScript. The application provides a responsive storefront for browsing products and categories, account authentication, a persistent shopping cart, checkout, order history, and a dedicated admin workspace.

## Features

- Product catalogue with product detail pages
- Live search across products, descriptions, and categories
- Category navigation and category-specific product listings
- Persistent shopping cart stored in the browser
- Quantity and stock validation in the cart
- Checkout and order detail flows
- User registration, login, and password recovery
- JWT-based authentication support
- User profile and order history pages
- Admin dashboard structure for products, categories, orders, and users
- Lazy-loaded standalone Angular components
- Responsive marketplace-style interface

## Tech Stack

- **Angular 19** — application framework
- **TypeScript 5.7** — strongly typed application code
- **RxJS** — reactive state and HTTP flows
- **Angular Router** — navigation and lazy loading
- **Angular Forms** — form handling and validation
- **SCSS / CSS** — responsive styling
- **Local Storage** — cart and authentication persistence
- **REST API** — communication with the Java backend

## Prerequisites

Before running the project, install:

- [Node.js](https://nodejs.org/) 20 or newer
- npm
- A compatible Java backend running on `http://localhost:8080`

## Getting Started

Clone the repository:

```bash
git clone git@github.com:GeorgiNyagolovGit/marketplace-frontend.git
cd marketplace-frontend
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

Open [http://localhost:4200](http://localhost:4200) in your browser. The application reloads automatically when source files change.

## Backend Connection

During local development, requests beginning with `/api` are proxied to:

```text
http://127.0.0.1:8080
```

The proxy is configured in [`proxy.conf.json`](proxy.conf.json). Authentication and order services currently also expect the backend at `http://localhost:8080`.

The frontend expects REST endpoints for:

```text
/api/auth
/api/products
/api/categories
/api/orders
/api/cart
/api/admin
```

Make sure the Java backend is running before testing API-dependent features.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm start` | Starts the Angular development server |
| `npm run build` | Creates an optimized production build |
| `npm run watch` | Rebuilds automatically in development mode |
| `npm test` | Runs the Karma/Jasmine test suite |

## Project Structure

```text
src/app/
├── admin/       # Admin dashboard and management pages
├── auth/        # Login, registration, and password recovery
├── cart/        # Cart state, components, and cart page
├── category/    # Category navigation and listings
├── core/        # Guards, interceptors, and core services
├── layout/      # Main and admin layouts
├── order/       # Checkout, order history, and order details
├── product/     # Product catalogue, filters, and details
├── shared/      # Reusable components and shared models
└── user/        # User profile functionality
```

Each feature is organized into its own components, pages, models, and services to keep the codebase maintainable as the application grows.

## Production Build

Create a production build with:

```bash
npm run build
```

The compiled application is written to `dist/fron-end1/`.

## Project Status

This project is under active development. The storefront, authentication flow, cart, and order flow are implemented, while some admin pages are prepared for further backend integration.

## Author

Developed by [Georgi Nyagolov](https://github.com/GeorgiNyagolovGit).

# Photo Library - Production-Ready Angular 20 Application

A modern, production-ready photo library application built with Angular 20, NgRx SignalStore, and advanced UX patterns.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm start
# Opens at http://localhost:4200

# Build for production
npm run build:prod

# Run tests
npm test

# Run Storybook
npm run storybook
# Opens at http://localhost:6006
```

### Verify Virtualization is Working

After starting the app:
1. Open Chrome DevTools (F12) → Elements tab
2. Search for `photo-card-with-favorite`
3. You should see only ~15-20 components (not 100+!)
4. Search for `photo-placeholder` to see virtualized items
5. Scroll and watch components swap between real and placeholder

## 📱 How to Use

### Photos Page (/)
1. Scroll down to load more photos infinitely
2. Hover over any photo to see heart icon (desktop)
3. Click heart icon to add/remove from favorites
4. Click on photo to open full-screen preview modal
5. In modal: toggle favorite or close

### Favorites Page (/favorites)
1. View all your favorite photos
2. Click any photo to open preview
3. Remove from favorites using heart icon

### Image Preview Modal
- Full-screen photo display
- Heart icon (top right) - toggle favorite
- X button (far right) - close modal
- Click backdrop to close

## 🏗️ Tech Stack

- **Angular 20.3.14** - Latest version with signals, control flow
- **RxAngular RxVirtualView** - Grid virtualization with IntersectionObserver
- **@ngrx/signals** - Modern state management
- **@angular/material** - UI components
- **HttpClient + RxJS** - HTTP communication and reactive programming
- **TypeScript 5.9** - Strict mode
- **SCSS** - Responsive styling
- **Jest** - Unit testing (28 tests)
- **Nx 22.1.2** - Monorepo tooling
- **Storybook 10** - Component library (6 stories)
- **Husky** - Git hooks
- **GitHub Actions** - CI/CD pipeline

### Why RxAngular RxVirtualView?

Unlike CDK Virtual Scroll, RxVirtualView:
- ✅ Works with **multi-column CSS Grid** layouts
- ✅ Supports **responsive grids** (1-4 columns)
- ✅ Handles **variable item sizes**
- ✅ Uses native **IntersectionObserver** API
- ✅ Provides **content caching** for smooth scrolling
- ✅ Enables **CSS content-visibility** optimization
- ✅ Only renders ~20 components for 1000+ photos

Reference: [RxAngular Virtual View Documentation](https://www.rx-angular.io/docs/template/virtual-view-directive)

## 📂 Project Structure

```
photo-library/
├── src/app/                    # Main application
│   ├── app.ts                 # Root component
│   ├── app.routes.ts          # Routing
│   └── app.config.ts          # HttpClient config
│
├── libs/
│   ├── shared/
│   │   ├── ui/                # Reusable UI components
│   │   │   ├── button/
│   │   │   ├── header/
│   │   │   ├── photo-card-with-favorite/
│   │   │   ├── photo-grid-with-favorites/
│   │   │   ├── image-preview-modal/
│   │   │   └── loading-spinner/
│   │   │
│   │   └── data-access/       # State & Services
│   │       ├── services/
│   │       │   ├── photo.service.ts      (HttpClient)
│   │       │   └── storage.service.ts
│   │       ├── store/
│   │       │   ├── photos.store.ts       (SignalStore)
│   │       │   └── favorites.store.ts    (SignalStore)
│   │       └── models/
│   │           └── photo.model.ts
│   │
│   └── features/              # Feature modules
│       ├── photos/            # Photos list & detail
│       └── favorites/         # Favorites list
```

## 🧪 Testing

```bash
# Run tests
npm test

# Watch mode
npm run test:watch
```

Tests configured with Jest and jest-preset-angular.

## 📖 Scripts

```bash
npm start              # Development server (localhost:4200)
npm run build          # Production build
npm test               # Run tests
npm run storybook      # Component library (localhost:6006)
npm run build-storybook# Build storybook
npm run lint           # Lint code
```

## 🌐 Routes

- `/` - Infinite photo stream
- `/favorites` - Your favorite photos
- `/photos/:id` - Single photo detail (legacy)

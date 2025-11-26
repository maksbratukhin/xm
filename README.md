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

- **Angular 20.3.14** - Latest version with signals
- **@ngrx/signals** - Modern state management
- **@angular/cdk** - UI utilities
- **HttpClient** - HTTP communication
- **RxJS** - Reactive programming
- **TypeScript 5.9** - Strict mode
- **SCSS** - Responsive styling
- **Jest** - Unit testing
- **Nx 22.1.2** - Monorepo tooling
- **Storybook** - Component library

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

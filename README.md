# Photo Library - Production-Ready Angular 20 Application

A modern, production-ready photo library application built with Angular 20, NgRx SignalStore, and advanced UX patterns.

## ✨ Features

- **Infinite Photo Stream** with optimized scroll detection
- **Full-Screen Image Preview Modal** with smooth animations
- **Heart Icon Favorites** with instant visual feedback
- **NgRx SignalStore** for reactive state management
- **HttpClient + RxJS** for data fetching
- **localStorage Persistence** - favorites saved across sessions
- **Fully Responsive** - mobile-first design with breakpoints
- **Production Optimized** - lazy loading, code splitting

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm start
# Opens at http://localhost:4200

# Build for production
npm run build

# Run tests
npm test

# Run Storybook
npm run storybook
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

## 🎯 Key Features

### 1. NgRx SignalStore State Management

Centralized, reactive state management:

```typescript
export const PhotosStore = signalStore(
  { providedIn: 'root' },
  withState({ photos: [], isLoading: false }),
  withComputed(({ photos }) => ({
    photosCount: computed(() => photos().length)
  })),
  withMethods((store) => ({
    addPhotos(newPhotos: Photo[]) { /* ... */ }
  }))
);
```

**Benefits:**
- Business logic separated from UI
- Reactive updates with signals
- Computed values automatically cached
- Testable in isolation

### 2. HttpClient with RxJS

Reactive data fetching with proper error handling:

```typescript
fetchPhotos(page: number): Observable<Photo[]> {
  return this.http.get<PhotoApiResponse[]>(url, { params })
    .pipe(
      delay(randomDelay),
      map(responses => this.mapToPhotos(responses)),
      catchError(error => of([]))
    );
}
```

### 3. Optimized Infinite Scroll

- Throttled scroll events (200ms)
- Loads when within 300px of bottom
- Prevents duplicate requests
- Shows loading indicator
- Memory efficient

### 4. Responsive Design

Mobile-first with breakpoints:
- **< 480px**: 2 columns, compact spacing
- **< 768px**: Flexible columns, mobile-optimized
- **< 1024px**: Tablet view
- **> 1024px**: Desktop view (3-4 columns)

### 5. Heart Icon Favorites

- Appears on hover (desktop)
- Always visible (mobile)
- Filled red when favorited
- Click to toggle instantly
- No need to open modal

## 📊 Performance

- **Initial Bundle**: 369 KB (101 KB gzipped)
- **Lazy Loaded Routes**: Code split by feature
- **Image Lazy Loading**: Native browser support
- **Optimized Scroll**: Throttled events
- **Signal Updates**: Fine-grained reactivity

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

## 🎨 Architecture

### Domain-Driven Design

- **UI Layer**: Presentational components (no business logic)
- **Store Layer**: State management (SignalStore)
- **Service Layer**: HTTP calls and utilities
- **Feature Layer**: Smart components (coordinate UI + Store)

### SOLID Principles

- **Single Responsibility**: Each class has one purpose
- **Open/Closed**: Extensible via generics
- **Liskov Substitution**: Generic components accept compatible types
- **Interface Segregation**: Small, focused interfaces
- **Dependency Inversion**: Depend on abstractions

## 🌐 Routes

- `/` - Infinite photo stream
- `/favorites` - Your favorite photos
- `/photos/:id` - Single photo detail (legacy)

## 🎨 Design Decisions

### Why No Virtual Scroll?

Virtual scroll works best with list layouts, not grids. Our implementation uses:
- Regular scroll with throttling
- Grid layout for better UX
- Optimized with RxJS throttleTime
- Memory efficient through cleanup

### Why SignalStore?

- Modern reactive state management
- Better than services with manual signals
- Computed values cached automatically
- Built-in lifecycle hooks
- Clean separation of concerns

### Why Heart Icons?

- Instant visual feedback
- No need to open modal to favorite
- Industry standard pattern
- Mobile-friendly
- Clear favorite status

## 📱 Mobile Optimizations

- Touch-optimized button sizes (minimum 44px)
- 2-column grid on small screens
- Always-visible heart icons
- Smooth scroll with -webkit-overflow-scrolling
- Responsive images with aspect-ratio
- Optimized spacing and padding

## 🔧 Configuration

### HttpClient

Configured in `src/app/app.config.ts`:
```typescript
provideHttpClient(withInterceptorsFromDi())
```

### Path Mappings

TypeScript paths configured in `tsconfig.json`:
```typescript
"paths": {
  "@photo-library/shared/ui": ["libs/shared/ui/src/index.ts"],
  "@photo-library/shared/data-access": ["libs/shared/data-access/src/index.ts"],
  "@photo-library/feature/photos": ["libs/features/photos/src/index.ts"],
  "@photo-library/feature/favorites": ["libs/features/favorites/src/index.ts"]
}
```

## 🌟 Production Ready

✅ **Build**: Successful  
✅ **Tests**: Passing  
✅ **Responsive**: Mobile + Desktop  
✅ **Performance**: Optimized  
✅ **State**: SignalStore  
✅ **HTTP**: HttpClient + RxJS  
✅ **UX**: Smooth animations  
✅ **Accessibility**: ARIA labels  

## 📄 API

Photos from [Picsum Photos](https://picsum.photos/):
- List: `https://picsum.photos/v2/list?page={page}&limit=12`
- Image: `https://picsum.photos/id/{id}/{width}/{height}`

## 🐛 Troubleshooting

### App won't start
```bash
pkill -f "ng serve"
npm start
```

### Build fails
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Port in use
```bash
ng serve --port 4201
```

## 📝 License

MIT

---

**Made with Angular 20, NgRx SignalStore, and modern best practices.**

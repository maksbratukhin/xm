# Photo Library Application

A modern Angular 20 photo library application built with Nx monorepo architecture, featuring infinite scroll, favorites management, and persistent storage.

## Features

- **Infinite Scroll Photo Stream**: Browse an endless stream of random photos from Picsum with automatic loading
- **Favorites Management**: Click photos to add them to favorites, persisted in local storage
- **Single Photo View**: View favorite photos in full screen with removal option
- **Responsive Design**: Mobile-friendly grid layout that adapts to screen size
- **Signal-Based State Management**: Utilizes Angular 20 signals for reactive state
- **Domain-Driven Design**: Clean architecture with separation of concerns
- **Type-Safe**: Full TypeScript implementation with strict mode

## Tech Stack

- **Angular 20**: Latest Angular with standalone components and signals
- **Nx**: Monorepo tooling for better code organization
- **TypeScript**: Strict type safety
- **SCSS**: Modern styling with CSS Grid and Flexbox
- **Jest**: Unit testing framework
- **Storybook**: Component documentation (stories included)

## Project Structure

```
photo-library/
├── src/                          # Main application
│   └── app/
│       ├── app.ts               # Root component
│       ├── app.routes.ts        # Route configuration
│       └── app.config.ts        # Application configuration
├── libs/                         # Shared libraries
│   ├── shared/
│   │   ├── ui/                  # Reusable UI components
│   │   │   ├── header/
│   │   │   ├── photo-card/
│   │   │   ├── photo-grid/
│   │   │   ├── button/
│   │   │   └── loading-spinner/
│   │   └── data-access/         # Services and models
│   │       ├── services/
│   │       │   ├── photo.service.ts
│   │       │   ├── favorites.service.ts
│   │       │   └── storage.service.ts
│   │       └── models/
│   │           └── photo.model.ts
│   └── features/                # Feature modules
│       ├── photos/              # Photos feature
│       │   ├── photos-list/     # Infinite scroll list
│       │   └── photo-detail/    # Single photo view
│       └── favorites/           # Favorites feature
│           └── favorites-list/  # Favorites grid
```

## Installation

```bash
# Install dependencies
npm install

# Serve the application
npm start

# Build the application
npm run build

# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Routes

- `/` - Photos stream (infinite scroll)
- `/favorites` - Favorites library
- `/photos/:id` - Single photo detail view

## Architecture

### Domain-Driven Design

The application follows DDD principles with clear separation:

- **Shared/UI**: Presentational components (dumb components)
- **Shared/Data-Access**: Services, state management, and models
- **Features**: Smart components that connect UI with services

### SOLID Principles

- **Single Responsibility**: Each component/service has one clear purpose
- **Open/Closed**: Components are open for extension, closed for modification
- **Liskov Substitution**: Generic components accept any compatible type
- **Interface Segregation**: Small, focused interfaces
- **Dependency Inversion**: Depend on abstractions, not concretions

### Key Design Patterns

1. **Signal-Based State**: Reactive state management with Angular signals
2. **Service Layer**: Centralized business logic in injectable services
3. **Generic Components**: Type-safe reusable components with generics
4. **Lazy Loading**: Route-based code splitting for optimal performance
5. **Local Storage Persistence**: Favorites persist across browser sessions

## Services

### PhotoService
Fetches random photos from Picsum API with simulated network delay (200-300ms).

### FavoritesService
Manages favorite photos with signal-based state and localStorage persistence.

### StorageService
Generic localStorage wrapper with type safety and error handling.

## Components

### Shared UI Components

- **HeaderComponent**: Navigation header with active tab highlighting
- **PhotoCardComponent**: Individual photo thumbnail with click handling
- **PhotoGridComponent**: Responsive grid layout for photos
- **ButtonComponent**: Reusable button with multiple variants
- **LoadingSpinnerComponent**: Loading indicator

### Feature Components

- **PhotosListComponent**: Infinite scroll photo stream
- **FavoritesListComponent**: Grid of favorite photos
- **PhotoDetailComponent**: Full-screen photo view with remove button

## Testing

Unit tests are included for all services and key components:

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch
```

## Development Guidelines

### Component Structure

Each component follows a 3-file structure:
- `*.component.ts` - Component logic
- `*.component.html` - Template
- `*.component.scss` - Styles

### Signals Usage

The application uses Angular signals for reactive state:

```typescript
// Service
readonly favoritesMap = signal<Map<string, Photo>>(new Map());
readonly favorites = computed(() => Array.from(this.favoritesMap().values()));

// Component
readonly photos = signal<Photo[]>([]);
```

### Custom Infinite Scroll

Implemented without external libraries using HostListener:

```typescript
@HostListener('window:scroll')
onScroll(): void {
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop = document.documentElement.scrollTop;
  const clientHeight = document.documentElement.clientHeight;
  
  if (scrollTop + clientHeight >= scrollHeight - 100) {
    this.loadMorePhotos();
  }
}
```

## API

Photos are fetched from [Picsum Photos](https://picsum.photos/):

- List API: `https://picsum.photos/v2/list?page={page}&limit={limit}`
- Photo URL: `https://picsum.photos/id/{id}/{width}/{height}`
- Thumbnail: `https://picsum.photos/id/{id}/300/300`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Search functionality
- Photo filtering by author
- Favorites sorting/filtering
- Photo metadata display
- Share functionality
- PWA support
- E2E tests with Cypress/Playwright

## License

MIT

## Author

Built with Angular 20, Nx, and modern best practices.

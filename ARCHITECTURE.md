# Architecture Documentation

## Overview

This application follows Domain-Driven Design (DDD) principles with a clean architecture approach, utilizing Nx monorepo tooling for better code organization and Angular 20's latest features including signals and standalone components.

## Design Principles Applied

### SOLID Principles

#### Single Responsibility Principle (SRP)
Each component and service has a single, well-defined purpose:
- `PhotoService`: Only handles photo fetching
- `FavoritesService`: Only manages favorites state
- `StorageService`: Only handles localStorage operations
- UI components: Only presentation logic
- Feature components: Only coordinate between UI and services

#### Open/Closed Principle (OCP)
Components are open for extension but closed for modification:
- Generic photo components accept any type extending base interface
- Service injection allows easy mocking for testing
- Component inputs/outputs enable flexible composition

#### Liskov Substitution Principle (LSP)
Generic types ensure substitutability:
```typescript
PhotoGridComponent<T extends PhotoDisplay>
PhotoCardComponent<T extends PhotoDisplay>
```
Any type with id, url, and thumbnailUrl can be used.

#### Interface Segregation Principle (ISP)
Small, focused interfaces:
- `NavigationTab`: Only label and path
- `PhotoDisplay`: Only display properties
- `Photo`: Complete photo model

#### Dependency Inversion Principle (DIP)
Depend on abstractions, not concretions:
- Services injected via Angular DI
- Components depend on interfaces, not implementations

### KISS (Keep It Simple, Stupid)

- No over-engineering
- Direct, readable code
- Minimal abstractions
- Clear naming conventions
- Simple data flow

### DRY (Don't Repeat Yourself)

- Shared UI component library
- Reusable service layer
- Generic components with type parameters
- Centralized styling patterns
- Single source of truth for models

## Architecture Layers

### Presentation Layer (UI)

**Location**: `libs/shared/ui/`

Dumb/presentational components that:
- Accept data via inputs
- Emit events via outputs
- No business logic
- No service injection
- Pure presentation

Components:
- HeaderComponent
- PhotoCardComponent
- PhotoGridComponent
- ButtonComponent
- LoadingSpinnerComponent

### Domain Layer (Data Access)

**Location**: `libs/shared/data-access/`

Business logic and state management:
- Services with signal-based state
- Data models and interfaces
- API integration
- State persistence

Services:
- PhotoService (API calls)
- FavoritesService (state management)
- StorageService (persistence)

### Feature Layer

**Location**: `libs/features/`

Smart components that:
- Inject services
- Manage local state
- Coordinate UI and domain layers
- Handle routing

Features:
- Photos (stream and detail)
- Favorites (list)

### Application Layer

**Location**: `src/app/`

Application bootstrap:
- Root component
- Route configuration
- App-level configuration

## State Management

### Signal-Based Reactivity

Using Angular 20 signals for reactive state:

```typescript
// Writable signal
private readonly favoritesMap = signal<Map<string, Photo>>(new Map());

// Computed signal
readonly favorites = computed(() => 
  Array.from(this.favoritesMap().values())
);

// Read-only signal
readonly isLoading = this.loadingState.asReadonly();
```

Benefits:
- Fine-grained reactivity
- Better performance than Zone.js
- Simpler than RxJS for simple state
- Type-safe

### State Persistence

FavoritesService persists state to localStorage:
1. Load from localStorage on init
2. Sync to localStorage on every change
3. Type-safe with generic storage service

## Data Flow

### Photos Stream
```
User scrolls
  → PhotosListComponent detects scroll
  → PhotoService.fetchPhotos()
  → API call with delay simulation
  → Signal update
  → UI re-renders
```

### Add to Favorites
```
User clicks photo
  → PhotosListComponent.onPhotoClick()
  → FavoritesService.addToFavorites()
  → Signal update
  → StorageService.set()
  → localStorage updated
```

### View Favorite
```
User clicks favorite photo
  → Router navigates to /photos/:id
  → PhotoDetailComponent loads
  → Reads from FavoritesService
  → Displays photo
```

## Component Communication

### Parent → Child
Via input signals:
```typescript
photo = input.required<Photo>();
```

### Child → Parent
Via output signals:
```typescript
photoClick = output<Photo>();
```

### Sibling Components
Via shared services with signals

## Routing Strategy

### Lazy Loading
All feature routes are lazy-loaded:
```typescript
{
  path: '',
  loadComponent: () => import('...').then(m => m.Component)
}
```

Benefits:
- Smaller initial bundle
- Faster initial load
- Code splitting

### Route Structure
```
/ → PhotosListComponent (infinite scroll)
/favorites → FavoritesListComponent (grid)
/photos/:id → PhotoDetailComponent (full view)
** → Redirect to /
```

## Type Safety

### Generic Components
```typescript
class PhotoGridComponent<T extends PhotoDisplay> {
  photos = input.required<T[]>();
  photoClick = output<T>();
}
```

Allows reuse with any photo-like type while maintaining type safety.

### Strict TypeScript
- `strict: true`
- `noImplicitAny: true`
- `strictNullChecks: true`
- All properties typed
- No `any` types

## Testing Strategy

### Unit Tests
- Services tested in isolation
- Components tested with TestBed
- Mock dependencies via DI
- Test all public APIs

### Test Structure
```typescript
describe('Service', () => {
  let service: Service;
  
  beforeEach(() => {
    TestBed.configureTestingModule({ ... });
    service = TestBed.inject(Service);
  });
  
  it('should ...', () => { ... });
});
```

## Performance Optimizations

### 1. Lazy Loading
Route-based code splitting reduces initial bundle.

### 2. Signal-Based Change Detection
Fine-grained reactivity without Zone.js overhead.

### 3. Image Lazy Loading
Native browser lazy loading:
```html
<img loading="lazy" />
```

### 4. Infinite Scroll
Load photos incrementally, not all at once.

### 5. Computed Signals
Memoized derived state:
```typescript
readonly hasFavorites = computed(() => 
  this.favorites().length > 0
);
```

## Scalability Considerations

### Adding New Features
1. Create feature library in `libs/features/`
2. Create route in app.routes.ts
3. Reuse shared UI components
4. Inject shared services

### Adding New UI Components
1. Create in `libs/shared/ui/`
2. Export from index.ts
3. Add Storybook story
4. Add unit tests

### Adding New Services
1. Create in `libs/shared/data-access/`
2. Make injectable with `providedIn: 'root'`
3. Use signals for state
4. Add unit tests

## Code Organization Rules

### Import Order
1. Angular core
2. Angular common/router
3. Third-party libraries
4. Internal shared libraries
5. Relative imports

### File Naming
- Components: `*.component.ts`
- Services: `*.service.ts`
- Models: `*.model.ts`
- Tests: `*.spec.ts`
- Stories: `*.stories.ts`

### Component Structure
```
component-name/
  ├── component-name.component.ts
  ├── component-name.component.html
  ├── component-name.component.scss
  ├── component-name.component.spec.ts
  └── component-name.component.stories.ts (optional)
```

## Future Enhancements

### Technical Debt
- Add E2E tests with Playwright
- Add more unit test coverage
- Implement error boundaries
- Add loading skeletons
- Implement retry logic for failed API calls

### Features
- Search functionality
- Filter by author
- Sort favorites
- Batch operations
- Export favorites
- Share functionality
- PWA support
- Dark mode

### Performance
- Virtual scrolling for large lists
- Service worker for offline support
- Image CDN optimization
- Response caching


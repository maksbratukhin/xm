# Shared UI Library

This library contains reusable UI components for the Photo Library application.

## Components

### Button
A reusable button component with multiple variants.

**Props:**
- `label`: string - The button text
- `variant`: 'primary' | 'secondary' | 'danger' - The button style
- `disabled`: boolean - Whether the button is disabled

**Events:**
- `buttonClick`: Emitted when the button is clicked

### PhotoCard
A component for displaying a photo thumbnail.

**Props:**
- `photo`: Photo - The photo object to display

**Events:**
- `photoClick`: Emitted when the photo is clicked

### PhotoGrid
A grid layout component for displaying multiple photos.

**Props:**
- `photos`: Photo[] - Array of photos to display

**Events:**
- `photoClick`: Emitted when a photo is clicked

### Header
Navigation header component.

**Props:**
- `tabs`: NavigationTab[] - Array of navigation tabs
- `activeTab`: string - The currently active tab path

**Events:**
- `tabChange`: Emitted when a tab is clicked

### LoadingSpinner
A loading indicator component.

## Storybook

Stories are available for all components. To run Storybook, you would need to install and configure it first.

## Usage

```typescript
import { ButtonComponent } from '@photo-library/shared/ui';

// Use in your component imports
@Component({
  selector: 'app-example',
  imports: [ButtonComponent],
  template: `
    <lib-button
      label="Click me"
      variant="primary"
      (buttonClick)="handleClick()" />
  `
})
```


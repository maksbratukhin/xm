import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideVirtualViewConfig } from '@rx-angular/template/virtual-view';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    provideVirtualViewConfig({
      keepLastKnownSize: false,
      useContentVisibility: false,
      useContainment: true,
      cacheEnabled: false,
      startWithPlaceholderAsap: false,
      placeholderStrategy: 'low',
      contentStrategy: 'normal',
    }),
  ],
};

/**
 * @import { ApplicationConfig } from '@angular/core';
 * @import { provideRouter } from '@angular/router';
 * @import { provideClientHydration } from '@angular/platform-browser';
 * @import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
 */

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

/**
 * The application configuration for the Angular application.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideAnimationsAsync() // Duplicate provideAnimationsAsync() removed
  ]
};

/**
 * @import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
 * @import { provideServerRendering } from '@angular/platform-server';
 * @import { appConfig } from './app.config';
 */

import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

/**
 * The server configuration for the Angular application.
 */
const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering()
  ]
};

/**
 * The merged application configuration.
 */
export const config = mergeApplicationConfig(appConfig, serverConfig);

import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withXhr } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // The Angular 9 app used XhrBackend for HttpClient (sendForm()'s multipart POST).
    // provideHttpClient() defaults to FetchBackend in v22 — pin withXhr() for transport parity.
    provideHttpClient(withXhr())
  ]
};

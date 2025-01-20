import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ROUTES } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';
import { provideScrollbarPolyfill } from 'ngx-scrollbar';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(ROUTES),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideScrollbarPolyfill('assets/scroll-timeline-polyfill.js')
  ]
};

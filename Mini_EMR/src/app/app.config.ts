import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideNativeDateAdapter } from '@angular/material/core';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor-interceptor';
import { visitReducer } from './features/visits/store/visit.reducer';
import { VisitEffects } from './features/visits/store/visit.effect';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideNativeDateAdapter(),
    provideRouter(routes),
    provideStore({
      visit: visitReducer
    }),
    provideEffects([VisitEffects]),
    provideHttpClient(
      withInterceptors([authInterceptor])
    )
  ]
};
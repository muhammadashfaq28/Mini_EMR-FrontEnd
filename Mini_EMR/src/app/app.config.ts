import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor-interceptor';
import { provideStore } from '@ngrx/store';
import { visitReducer } from './features/visits/store/visit.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore({
      visit: visitReducer
    }),
    provideHttpClient(
      withInterceptors([authInterceptor])
    )
  ]
};

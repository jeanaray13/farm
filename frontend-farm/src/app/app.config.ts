import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideToastr } from 'ngx-toastr';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  //Habilitación de la app
  providers: [
    provideRouter(routes), 
    provideClientHydration(), 
    provideToastr(),
    provideHttpClient(withInterceptorsFromDi()), 
    provideAnimations()
  ]
};

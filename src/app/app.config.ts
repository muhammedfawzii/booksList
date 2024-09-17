import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgxSpinner, NgxSpinnerModule } from 'ngx-spinner';
import { loadingInterceptor } from './loading.interceptor';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes , withViewTransitions()),
     provideClientHydration(),
     provideHttpClient(withFetch() , withInterceptors([loadingInterceptor])),
     provideAnimations(),
     provideToastr(),
     importProvidersFrom(NgxSpinnerModule)
    ]
};

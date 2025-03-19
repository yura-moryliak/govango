import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { GvGNoraPreset } from '../assets/gvg_nora_prime_preset';
import { provideStore } from '@ngxs/store';
import { RegisterState } from './modules/auth/register/register.state';
import { withNgxsStoragePlugin } from '@ngxs/storage-plugin';
import { withNgxsLoggerPlugin } from '@ngxs/logger-plugin';
import { environment } from '../environments/environment';
import { MessageService } from 'primeng/api';
import { ToastState } from './shared/states/toast/toast.state';
import { AppSettingsPanelState } from './shared/states/app-settings-panel/app-settings-panel.state';
import { ngxsConfig } from './ngxs-config';
import { AuthState } from './shared/states/auth/auth.state';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    providePrimeNG({
      ripple: true,
      theme: {
        preset: GvGNoraPreset,
        options: {
          darkModeSelector: '.gvg-dark-theme',
        },
      },
    }),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      }),
    ),
    provideStore(
      [RegisterState, ToastState, AppSettingsPanelState, AuthState],
      ngxsConfig,
      withNgxsStoragePlugin({
        keys: [RegisterState, AppSettingsPanelState, AuthState],
        namespace: 'govango',
      }),
      withNgxsLoggerPlugin({ disabled: environment.production }),
    ),
    MessageService,
  ],
};

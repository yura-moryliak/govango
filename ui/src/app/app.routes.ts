import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { ForgotPasswordComponent } from './modules/auth/forgot-password/forgot-password.component';
import { checkAuthGuard } from './shared/guards/check-auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./modules/auth/login/login.component').then(
        (cmp): typeof LoginComponent => cmp.LoginComponent,
      ),
    canActivate: [checkAuthGuard],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./modules/auth/register/register.component').then(
        (cmp): typeof RegisterComponent => cmp.RegisterComponent,
      ),
    loadChildren: () =>
      import('./modules/auth/register/register-step.routes').then(
        (r) => r.REGISTER_STEP_ROUTES,
      ),
    canActivate: [checkAuthGuard],
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./modules/auth/forgot-password/forgot-password.component').then(
        (cmp): typeof ForgotPasswordComponent => cmp.ForgotPasswordComponent,
      ),
    canActivate: [checkAuthGuard],
  },
  {
    path: 'gvg',
    loadChildren: () =>
      import(
        './shared/components/gvg-app-container/gvg-app-container.routes'
      ).then((r) => r.GVG_APP_CONTAINER_ROUTES),
  },
  {
    path: 'page-not-found',
    loadComponent: () =>
      import('./shared/components/not-found/not-found.component').then(
        (cmp) => cmp.NotFoundComponent,
      ),
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import(
        './modules/auth/confirm-reset-password/confirm-reset-password.component'
      ).then((cmp) => cmp.ConfirmResetPasswordComponent),
  },
  { path: '**', redirectTo: 'page-not-found' },
];

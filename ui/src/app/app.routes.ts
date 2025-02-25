import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { ForgotPasswordComponent } from './modules/auth/forgot-password/forgot-password.component';

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
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./modules/auth/forgot-password/forgot-password.component').then(
        (cmp): typeof ForgotPasswordComponent => cmp.ForgotPasswordComponent,
      ),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./modules/dashboard/dashboard.component').then(
        (cmp) => cmp.DashboardComponent,
      ),
  },
  {
    path: 'page-not-found',
    loadComponent: () =>
      import('./shared/components/not-found/not-found.component').then(
        (cmp) => cmp.NotFoundComponent,
      ),
  },
  { path: '**', redirectTo: 'page-not-found' },
];

import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { ForgetPasswordComponent } from './modules/forget-password/forget-password.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
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
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./modules/forget-password/forget-password.component').then(
        (cmp): typeof ForgetPasswordComponent => cmp.ForgetPasswordComponent,
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

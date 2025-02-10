import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';

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
    path: 'page-not-found',
    loadComponent: () =>
      import('./shared/components/not-found/not-found.component').then(
        (cmp) => cmp.NotFoundComponent,
      ),
  },
  { path: '**', redirectTo: 'page-not-found' },
];

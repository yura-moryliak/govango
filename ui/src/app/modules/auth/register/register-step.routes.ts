import { Routes } from '@angular/router';
import { registerStepperGuard } from './register-stepper.guard';

export const REGISTER_STEP_ROUTES: Routes = [
  { path: '', redirectTo: 'user-info', pathMatch: 'full' },
  {
    path: 'user-info',
    loadComponent: () =>
      import('./user-info/user-info.component').then(
        (c) => c.UserInfoComponent,
      ),
    canActivate: [registerStepperGuard],
  },
  {
    path: 'user-credentials-data',
    loadComponent: () =>
      import('./user-credentials-data/user-credentials-data.component').then(
        (c) => c.UserCredentialsDataComponent,
      ),
    canActivate: [registerStepperGuard],
  },
  {
    path: 'user-car-info',
    loadComponent: () =>
      import('./user-car-info/user-car-info.component').then(
        (c) => c.UserCarInfoComponent,
      ),
    canActivate: [registerStepperGuard],
  },
];

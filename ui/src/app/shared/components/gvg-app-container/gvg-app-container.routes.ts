import { Routes } from '@angular/router';
import { authGuard } from '../../guards/auth.guard';

export const redirectRoutePrefix = '/gvg';

export const GVG_APP_CONTAINER_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    loadComponent: () =>
      import('./gvg-app-container.component').then(
        (cmp) => cmp.GvgAppContainerComponent,
      ),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('../../../modules/dashboard/dashboard.component').then(
            (cmp) => cmp.DashboardComponent,
          ),
        canActivate: [authGuard],
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('../../../modules/profile/profile.component').then(
            (cmp) => cmp.ProfileComponent,
          ),
        children: [
          {
            path: '',
            redirectTo: 'user-info',
            pathMatch: 'full',
          },
          {
            path: 'user-info',
            loadComponent: () =>
              import(
                '../../../modules/profile/user-info-tab/user-info-tab.component'
              ).then((cmp) => cmp.UserInfoTabComponent),
          },
          {
            path: 'user-cars',
            loadComponent: () =>
              import(
                '../../../modules/profile/user-cars-tab/user-cars-tab.component'
              ).then((cmp) => cmp.UserCarsTabComponent),
          },
        ],
        canActivate: [authGuard],
      },
    ],
  },
];

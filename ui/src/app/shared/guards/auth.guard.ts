import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthState } from '../states/auth/auth.state';

export const authGuard: CanActivateFn = async () => {
  const store: Store = inject(Store);
  const router: Router = inject(Router);

  const isAuthenticated: boolean = store.selectSnapshot(
    AuthState.isAuthenticated,
  );

  if (isAuthenticated) {
    return true;
  } else {
    await router.navigate(['/login']);
    return false;
  }
};

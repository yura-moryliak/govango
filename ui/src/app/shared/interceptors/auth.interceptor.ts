import {
  HttpRequest,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { Store } from '@ngxs/store';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthState } from '../states/auth/auth.state';
import { AuthActions } from '../states/auth/auth.actions';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn,
): Observable<HttpEvent<any>> => {
  const store: Store = inject(Store);
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);

  const accessToken: string = store.selectSnapshot(AuthState.accessToken);
  const fingerprint: string = store.selectSnapshot(AuthState.fingerprint);

  const isAuthRefresh: boolean = req.url.includes('/api/auth/refresh');
  const isLogout: boolean = req.url.includes('/api/auth/logout');

  const authReq: HttpRequest<any> = req.clone({
    setHeaders: {
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      ...(fingerprint && { 'x-fingerprint': fingerprint }),
    },
    withCredentials: true,
  });

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      const isUnauthorized: boolean = error.status === 401;

      if (isUnauthorized && !isAuthRefresh && !isLogout) {
        return authService.refreshToken().pipe(
          switchMap(({ access_token }) => {
            store.dispatch(new AuthActions.RefreshToken(access_token));

            const retry = req.clone({
              setHeaders: {
                Authorization: `Bearer ${access_token}`,
                ...(fingerprint && { 'x-fingerprint': fingerprint }),
              },
              withCredentials: true,
            });

            return next(retry);
          }),
          catchError(() => {
            store.dispatch(new AuthActions.Logout());
            router.navigate(['/login']);
            return throwError(() => error);
          }),
        );
      }

      return throwError(() => error);
    }),
  );
};

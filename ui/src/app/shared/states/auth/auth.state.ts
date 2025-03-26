import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthActions } from './auth.actions';
import { AuthService } from '../../services/auth.service';

export interface AuthStateModel {
  access_token: string;
  fingerprint: string;
}

export const AUTH_STATE_TOKEN = new StateToken<AuthStateModel>('auth');

@State({
  name: AUTH_STATE_TOKEN,
  defaults: {
    access_token: '',
    fingerprint: '',
  },
})
@Injectable()
export class AuthState {
  private readonly authService: AuthService = inject(AuthService);

  @Selector()
  static accessToken(state: AuthStateModel): string {
    return state.access_token;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.access_token;
  }

  @Selector()
  static fingerprint(state: AuthStateModel): string {
    return state.fingerprint;
  }

  @Action(AuthActions.Login, { cancelUncompleted: true })
  login(
    { patchState }: StateContext<AuthStateModel>,
    { credentials }: AuthActions.Login,
  ): Observable<{ access_token: string }> {
    return this.authService
      .login(credentials)
      .pipe(tap(({ access_token }) => patchState({ access_token })));
  }

  @Action(AuthActions.RefreshToken)
  refreshToken(
    { patchState }: StateContext<AuthStateModel>,
    { access_token }: AuthActions.RefreshToken,
  ) {
    patchState({ access_token });
  }

  @Action(AuthActions.Logout, { cancelUncompleted: true })
  logout({ patchState }: StateContext<AuthStateModel>): Observable<boolean> {
    return this.authService
      .logout()
      .pipe(
        tap(
          (loggedOut: boolean) => loggedOut && patchState({ access_token: '' }),
        ),
      );
  }

  @Action(AuthActions.SetFingerprint)
  setFingerprint(
    { patchState }: StateContext<AuthStateModel>,
    { fingerprint }: AuthActions.SetFingerprint,
  ): void {
    patchState({ fingerprint });
  }

  // Google auth actions
  @Action(AuthActions.LoginWithGoogle, { cancelUncompleted: true })
  loginWithGoogle(
    { patchState }: StateContext<AuthStateModel>,
    { credential }: AuthActions.LoginWithGoogle,
  ): Observable<{ access_token: string }> {
    return this.authService
      .loginWithGoogle(credential)
      .pipe(tap(({ access_token }) => patchState({ access_token })));
  }
}

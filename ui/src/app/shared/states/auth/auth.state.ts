import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthActions } from './auth.actions';
import { AuthService } from '../../services/auth.service';

export interface AuthStateModel {
  access_token: string;
}

export const AUTH_STATE_TOKEN = new StateToken<AuthStateModel>('auth');

@State({
  name: AUTH_STATE_TOKEN,
  defaults: {
    access_token: '',
  },
})
@Injectable()
export class AuthState {
  private readonly authService: AuthService = inject(AuthService);

  @Selector()
  static accessToken(state: AuthStateModel): string | null {
    return state.access_token;
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
}

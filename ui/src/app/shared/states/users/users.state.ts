import { User } from './user.interface';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { inject, Injectable } from '@angular/core';
import { UsersActions } from './users.actions';
import { UsersService } from '../../services/users.service';
import { Observable, tap } from 'rxjs';
import { patch } from '@ngxs/store/operators';

export interface UsersStateModel {
  currentUser: User | null;
}

export const USERS_STATE_TOKEN = new StateToken<UsersStateModel>('users');

@State({
  name: USERS_STATE_TOKEN,
  defaults: {
    currentUser: null,
  },
})
@Injectable()
export class UsersState {
  private readonly usersService: UsersService = inject(UsersService);

  @Selector()
  static currentUser(state: UsersStateModel): User | null {
    return state.currentUser;
  }

  @Action(UsersActions.LoadCurrentUser, { cancelUncompleted: true })
  getCurrentUser(
    { patchState }: StateContext<UsersStateModel>,
    { id }: UsersActions.LoadCurrentUser,
  ): Observable<User> {
    return this.usersService
      .getUser(id)
      .pipe(tap((user: User) => patchState({ currentUser: user })));
  }

  @Action(UsersActions.UpdateCurrentUser, { cancelUncompleted: true })
  updateCurrentUser(
    { patchState, getState }: StateContext<UsersStateModel>,
    { user }: UsersActions.UpdateCurrentUser,
  ): Observable<boolean> {
    return this.usersService
      .updateUser(user)
      .pipe(
        tap(
          (updated: boolean) =>
            updated &&
            patchState({
              currentUser: { ...getState().currentUser, ...user } as User,
            }),
        ),
      );
  }

  @Action(UsersActions.UploadCurrentUserAvatar, { cancelUncompleted: true })
  uploadCurrentUserAvatar(
    { setState, getState }: StateContext<UsersStateModel>,
    { id, file }: UsersActions.UploadCurrentUserAvatar,
  ): Observable<string> {
    return this.usersService.uploadAvatar(id, file).pipe(
      tap((avatarUrl: string) =>
        setState(
          patch({
            currentUser: {
              ...getState().currentUser,
              avatar: avatarUrl,
            } as User,
          }),
        ),
      ),
    );
  }

  @Action(UsersActions.ClearCurrentUser)
  clearCurrentUser({ patchState }: StateContext<UsersStateModel>): void {
    patchState({ currentUser: null });
  }
}

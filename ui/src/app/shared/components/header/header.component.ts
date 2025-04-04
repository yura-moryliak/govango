import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { filter, Observable, Subject, takeUntil } from 'rxjs';
import { Avatar } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { Actions, ofActionCompleted, Store } from '@ngxs/store';
import { AuthActions } from '../../states/auth/auth.actions';
import { AuthState } from '../../states/auth/auth.state';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UsersActions } from '../../states/users/users.actions';
import { UsersState } from '../../states/users/users.state';
import { User } from '../../states/users/user.interface';
import { AsyncPipe } from '@angular/common';
import { Skeleton } from 'primeng/skeleton';
import { fallbackAvatar } from '../../fallback-avatar';

@Component({
  selector: 'gvg-header',
  imports: [RouterLink, Avatar, Button, AsyncPipe, Skeleton],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  private readonly store: Store = inject(Store);
  private readonly actions$: Actions = inject(Actions);
  private readonly router: Router = inject(Router);
  private readonly jwtHelperService: JwtHelperService =
    inject(JwtHelperService);
  private readonly destroyed$: Subject<void> = new Subject<void>();

  readonly currentUser$: Observable<User> = this.store
    .select(UsersState.currentUser)
    .pipe(filter((user: User | null) => !!user));

  readonly fallbackAvatar = fallbackAvatar;

  logout(): void {
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnInit(): void {
    this.store
      .select(AuthState.id(this.jwtHelperService))
      .pipe(takeUntil(this.destroyed$))
      .subscribe((id: string) =>
        this.store.dispatch(new UsersActions.LoadCurrentUser(id)),
      );

    this.actions$
      .pipe(ofActionCompleted(AuthActions.Logout), takeUntil(this.destroyed$))
      .subscribe(() => {
        this.store.dispatch(new UsersActions.ClearCurrentUser());
        this.router.navigate(['/login']);
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}

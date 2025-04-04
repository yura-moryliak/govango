import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Avatar } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
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

  readonly currentUser$: Observable<User | null> = this.store.select(
    UsersState.currentUser,
  );

  readonly fallbackAvatar = fallbackAvatar;

  logout(): void {
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnInit(): void {
    this.initCurrentUser();
    this.initLogoutHandler();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private initCurrentUser(): void {
    this.store
      .select(AuthState.id(this.jwtHelperService))
      .pipe(takeUntil(this.destroyed$))
      .subscribe((id: string) => {
        console.log('THIS IS CALLED...');

        this.store.dispatch(new UsersActions.LoadCurrentUser(id));
      });
  }

  private initLogoutHandler(): void {
    this.actions$
      .pipe(ofActionSuccessful(AuthActions.Logout), takeUntil(this.destroyed$))
      .subscribe(() => {
        this.store.dispatch(new UsersActions.ClearCurrentUser());
        this.router.navigate(['/login']);
      });
  }
}

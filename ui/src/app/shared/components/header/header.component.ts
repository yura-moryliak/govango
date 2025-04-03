import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Avatar } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { Actions, ofActionCompleted, Store } from '@ngxs/store';
import { AuthActions } from '../../states/auth/auth.actions';

@Component({
  selector: 'gvg-header',
  imports: [RouterLink, Avatar, Button],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  private readonly store: Store = inject(Store);
  private readonly actions$: Actions = inject(Actions);
  private readonly router: Router = inject(Router);
  private readonly destroyed$: Subject<void> = new Subject<void>();

  logout(): void {
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnInit(): void {
    this.actions$
      .pipe(ofActionCompleted(AuthActions.Logout), takeUntil(this.destroyed$))
      .subscribe(() => this.router.navigate(['/login']));
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}

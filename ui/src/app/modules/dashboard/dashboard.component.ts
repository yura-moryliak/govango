import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Actions, ofActionCompleted, Store } from '@ngxs/store';
import { AuthActions } from '../../shared/states/auth/auth.actions';
import { FingerprintService } from '../../shared/services/fingerprint.service';
import { Button } from 'primeng/button';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'gvg-dashboard',
  imports: [Button],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy {
  private readonly fingerprintService: FingerprintService =
    inject(FingerprintService);
  private readonly store: Store = inject(Store);
  private readonly actions$: Actions = inject(Actions);
  private readonly router: Router = inject(Router);
  private readonly sub: Subscription = new Subscription();

  ngOnInit(): void {
    this.sub.add(
      this.actions$
        .pipe(ofActionCompleted(AuthActions.Logout))
        .subscribe(() => this.router.navigate(['/login'])),
    );
  }

  async logout(): Promise<void> {
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

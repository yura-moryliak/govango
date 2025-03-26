import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Actions, ofActionCompleted, Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { Button } from 'primeng/button';
import { Subject, takeUntil } from 'rxjs';
import { AuthActions } from '../../shared/states/auth/auth.actions';
import { FingerprintService } from '../../shared/services/fingerprint.service';

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

  private readonly destroyed$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.actions$
      .pipe(ofActionCompleted(AuthActions.Logout), takeUntil(this.destroyed$))
      .subscribe(() => this.router.navigate(['/login'])),
      this.generateFingerprint();
  }

  async logout(): Promise<void> {
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private async generateFingerprint(): Promise<void> {
    this.store.dispatch(
      new AuthActions.SetFingerprint(
        await this.fingerprintService.generateFingerprint(),
      ),
    );
  }
}

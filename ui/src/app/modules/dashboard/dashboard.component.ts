import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthActions } from '../../shared/states/auth/auth.actions';
import { FingerprintService } from '../../shared/services/fingerprint.service';

@Component({
  selector: 'gvg-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  private readonly fingerprintService: FingerprintService =
    inject(FingerprintService);
  private readonly store: Store = inject(Store);

  async ngOnInit(): Promise<void> {
    await this.generateFingerprint();
  }

  private async generateFingerprint(): Promise<void> {
    this.store.dispatch(
      new AuthActions.SetFingerprint(
        await this.fingerprintService.generateFingerprint(),
      ),
    );
  }
}

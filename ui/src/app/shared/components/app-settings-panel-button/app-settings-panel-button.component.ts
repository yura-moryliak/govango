import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Button } from 'primeng/button';
import { Store } from '@ngxs/store';
import { AppSettingsPanelActions } from '../../states/app-settings-panel/app-settings-panel.actions';
import { Tooltip } from 'primeng/tooltip';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'gvg-app-settings-panel-button',
  imports: [Button, Tooltip, TranslatePipe],
  templateUrl: './app-settings-panel-button.component.html',
  styleUrl: './app-settings-panel-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppSettingsPanelButtonComponent {
  private readonly store: Store = inject(Store);

  openPanel(): void {
    this.store.dispatch(new AppSettingsPanelActions.Open());
  }
}

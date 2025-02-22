import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Button } from 'primeng/button';

@Component({
  selector: 'gvg-app-settings-panel',
  imports: [Button],
  templateUrl: './app-settings-panel.component.html',
  styleUrl: './app-settings-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppSettingsPanelComponent {}

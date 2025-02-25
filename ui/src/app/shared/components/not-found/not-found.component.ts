import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AppSettingsPanelButtonComponent } from '../app-settings-panel-button/app-settings-panel-button.component';

@Component({
  selector: 'gvg-not-found',
  imports: [Button, RouterLink, TranslatePipe, AppSettingsPanelButtonComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {}

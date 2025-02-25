import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IftaLabel } from 'primeng/iftalabel';
import { InputText } from 'primeng/inputtext';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Button } from 'primeng/button';
import { NgClass } from '@angular/common';
import { Divider } from 'primeng/divider';
import { AppSettingsPanelButtonComponent } from '../../../shared/components/app-settings-panel-button/app-settings-panel-button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'gvg-forgot-password',
  imports: [
    IftaLabel,
    InputText,
    ReactiveFormsModule,
    TranslatePipe,
    Button,
    NgClass,
    Divider,
    AppSettingsPanelButtonComponent,
    RouterLink,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent {
  readonly emailFormControl: FormControl<string | null> = new FormControl(
    null,
    [Validators.required, Validators.email],
  );

  restore(): void {
    console.log('Restore: ', this.emailFormControl.value);
  }
}

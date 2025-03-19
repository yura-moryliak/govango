import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InputText } from 'primeng/inputtext';
import { IftaLabel } from 'primeng/iftalabel';
import { Password } from 'primeng/password';
import { Button } from 'primeng/button';
import { Divider } from 'primeng/divider';
import { TranslatePipe } from '@ngx-translate/core';
import { NgClass } from '@angular/common';
import { AppSettingsPanelButtonComponent } from '../../../shared/components/app-settings-panel-button/app-settings-panel-button.component';
import { FingerprintService } from '../../../shared/services/fingerprint.service';
import { Store } from '@ngxs/store';
import { AuthActions } from '../../../shared/states/auth/auth.actions';
import { LoginCredentialsInterface } from './interfaces/login-credentials.interface';

interface LoginFormGroupInterface {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'gvg-login',
  imports: [
    InputText,
    IftaLabel,
    Password,
    Button,
    Divider,
    RouterLink,
    ReactiveFormsModule,
    TranslatePipe,
    NgClass,
    AppSettingsPanelButtonComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly fingerprintService: FingerprintService =
    inject(FingerprintService);
  private readonly store: Store = inject(Store);

  readonly form: FormGroup<LoginFormGroupInterface> = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  async login(): Promise<void> {
    const fingerprint: string =
      await this.fingerprintService.generateFingerprint();

    if (fingerprint) {
      const { email, password } = this.form.value;
      this.store.dispatch(
        new AuthActions.Login({
          email,
          password,
          fingerprint,
        } as LoginCredentialsInterface),
      );
    }
  }
}

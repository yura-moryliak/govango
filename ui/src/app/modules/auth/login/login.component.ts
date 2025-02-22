import { ChangeDetectionStrategy, Component } from '@angular/core';
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
import { AppSettingsPanelComponent } from '../../../shared/components/app-settings-panel/app-settings-panel.component';

interface LoginFormGroupInterface {
  emailOrPhone: FormControl<string | null>;
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
    AppSettingsPanelComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  form: FormGroup<LoginFormGroupInterface> = new FormGroup({
    emailOrPhone: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  login(): void {
    console.log(this.form.value);
  }
}

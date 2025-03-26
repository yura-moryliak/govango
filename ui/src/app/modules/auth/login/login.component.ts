import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { InputText } from 'primeng/inputtext';
import { IftaLabel } from 'primeng/iftalabel';
import { Password } from 'primeng/password';
import { Button } from 'primeng/button';
import { Divider } from 'primeng/divider';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { AuthActions } from '../../../shared/states/auth/auth.actions';
import { FingerprintService } from '../../../shared/services/fingerprint.service';
import { LoginCredentialsInterface } from './interfaces/login-credentials.interface';
import {
  INITIAL_TOAST_OPTIONS,
  ToastActions,
} from '../../../shared/states/toast/toast.actions';
import { AppSettingsPanelButtonComponent } from '../../../shared/components/app-settings-panel-button/app-settings-panel-button.component';
import { GoogleAuthService } from '../../../shared/services/google-auth.service';

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
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly fingerprintService: FingerprintService =
    inject(FingerprintService);
  private readonly store: Store = inject(Store);
  private readonly router: Router = inject(Router);
  private readonly sub: Subscription = new Subscription();
  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private readonly translateService: TranslateService =
    inject(TranslateService);
  private readonly googleAuthService: GoogleAuthService = inject(GoogleAuthService);
  private fingerprint: string | undefined;

  readonly form: FormGroup<LoginFormGroupInterface> = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  isLoading: boolean = false;

  async ngOnInit(): Promise<void> {
    this.fingerprint = await this.fingerprintService.generateFingerprint();
  }

  ngAfterViewInit(): void {
    this.googleAuthService.initialize();
  }

  login(): void {
    const { email, password } = this.form.value;
    this.isLoading = true;

    const loginSubscription: Subscription = this.store
      .dispatch(
        new AuthActions.Login({
          email,
          password,
          fingerprint: this.fingerprint,
        } as LoginCredentialsInterface),
      )
      .subscribe({
        next: () => {
          this.isLoading = false;

          this.form.reset({ email: '', password: '' });
          this.router.navigate(['/dashboard']);

          this.store.dispatch(
            new ToastActions.ShowToast({
              ...INITIAL_TOAST_OPTIONS,
              severity: 'success',
              key: 'success',
              summary: this.translateService.instant('Welcome'),
              detail: this.translateService.instant(
                'You are successfully logged in',
              ),
            }),
          );
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;
          this.cdr.markForCheck();

          this.store.dispatch(
            new ToastActions.ShowToast({
              ...INITIAL_TOAST_OPTIONS,
              severity: 'error',
              key: 'error',
              summary: this.translateService.instant('Login failed'),
              detail: this.translateService.instant(`${error.error.message}`),
            }),
          );
        },
      });

    this.sub.add(loginSubscription);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

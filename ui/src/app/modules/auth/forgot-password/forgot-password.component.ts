import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { IftaLabel } from 'primeng/iftalabel';
import { InputText } from 'primeng/inputtext';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngxs/store';
import { Button } from 'primeng/button';
import { NgClass } from '@angular/common';
import { Divider } from 'primeng/divider';
import { AuthActions } from '../../../shared/states/auth/auth.actions';
import {
  INITIAL_TOAST_OPTIONS,
  ToastActions,
} from '../../../shared/states/toast/toast.actions';
import { AppSettingsPanelButtonComponent } from '../../../shared/components/app-settings-panel-button/app-settings-panel-button.component';

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
    FormsModule,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent implements OnDestroy {
  private readonly store: Store = inject(Store);
  private readonly translateService: TranslateService =
    inject(TranslateService);
  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private readonly destroyed$: Subject<void> = new Subject<void>();

  readonly emailFormControl: FormControl<string | null> = new FormControl(
    null,
    [Validators.required, Validators.email],
  );

  isBusy: boolean = false;

  restore(): void {
    this.isBusy = true;

    this.store
      .dispatch(
        new AuthActions.ResetPassword(this.emailFormControl.value as string),
      )
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: () => {
          this.isBusy = false;
          this.emailFormControl.reset('');
          this.showResetPasswordSuccessToast();
        },
        error: () => {
          this.isBusy = false;
          this.cdr.markForCheck();
          this.showResetPasswordSuccessToast();
        },
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private showResetPasswordSuccessToast(): void {
    this.store.dispatch([
      new ToastActions.ShowToast({
        ...INITIAL_TOAST_OPTIONS,
        severity: 'success',
        key: 'success',
        summary: this.translateService.instant('Success'),
        detail: this.translateService.instant(
          'We sent an email with instructions to the specified email address',
        ),
      }),
    ]);
  }
}

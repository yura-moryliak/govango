import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngxs/store';
import { RegisterActions } from '../register.actions';
import { RegisterStepEnum } from '../register.component';
import { IftaLabel } from 'primeng/iftalabel';
import { InputText } from 'primeng/inputtext';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { InputMask } from 'primeng/inputmask';
import { Password } from 'primeng/password';
import { Button } from 'primeng/button';
import { Router } from '@angular/router';
import { AsyncPipe, NgClass } from '@angular/common';
import { Observable, Subject, takeUntil } from 'rxjs';
import { RegisterState } from '../register.state';
import { UserInfoDataInterface } from '../interfaces/user-info-data.interface';
import { UserCredentialsDataInterface } from '../interfaces/user-credentials-data.interface';
import {
  INITIAL_TOAST_OPTIONS,
  ToastActions,
} from '../../../../shared/states/toast/toast.actions';

interface UserCredentialsFormGroupInterface {
  phoneNumber: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
}

@Component({
  selector: 'gvg-user-credentials-data',
  imports: [
    IftaLabel,
    InputText,
    FormsModule,
    ReactiveFormsModule,
    InputMask,
    Password,
    Button,
    NgClass,
    AsyncPipe,
    TranslatePipe,
  ],
  templateUrl: './user-credentials-data.component.html',
  styleUrl: './user-credentials-data.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCredentialsDataComponent implements OnInit, OnDestroy {
  private readonly store: Store = inject(Store);
  private readonly router: Router = inject(Router);
  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private readonly translateService: TranslateService =
    inject(TranslateService);
  private readonly destroyed$: Subject<void> = new Subject<void>();

  readonly form: FormGroup<UserCredentialsFormGroupInterface> = new FormGroup({
    phoneNumber: new FormControl<string | null>('', Validators.required),
    email: new FormControl<string | null>('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl<string | null>('', [
      Validators.required,
      Validators.minLength(7),
      passwordMatchValidator('confirmPassword', true),
    ]),
    confirmPassword: new FormControl<string | null>('', [
      Validators.required,
      passwordMatchValidator('password'),
    ]),
  });
  readonly userDataInfo$: Observable<UserInfoDataInterface> = this.store.select(
    RegisterState.userDataInfo,
  );

  isBusy: boolean = false;

  ngOnInit(): void {
    this.store.dispatch(
      new RegisterActions.SetActiveStep(RegisterStepEnum.UserCredentialsData),
    );

    this.populateForm();
  }

  goToStep(path: string): void {
    this.store.dispatch([
      new RegisterActions.AddUserCredentialsData(
        this.form.value as UserCredentialsDataInterface,
        this.form.invalid,
      ),
      new RegisterActions.CompleteStep2(),
    ]);
    this.router.navigate(['/register', path]);
  }

  submit(): void {
    this.isBusy = true;

    const storeActions = [
      new RegisterActions.AddUserCredentialsData(
        this.form.value as UserCredentialsDataInterface,
        this.form.invalid,
      ),
      new RegisterActions.RegisterNewUser(),
    ];

    this.store
      .dispatch(storeActions)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: () => {
          this.isBusy = false;
          this.cdr.markForCheck();
          this.store.dispatch([
            new RegisterActions.SetActiveStep(RegisterStepEnum.UserInfo),
            new RegisterActions.CompleteStep2(),
          ]);
          this.router.navigate(['login']);
          this.showSuccessToast();
        },
        error: () => {
          this.isBusy = false;
          this.cdr.markForCheck();
          this.showErrorToast();
        },
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private populateForm(): void {
    this.store
      .selectOnce(RegisterState.userCredentialsData)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: UserCredentialsDataInterface) => {
        this.form.patchValue(data);
        this.form.updateValueAndValidity();

        if (
          this.store.selectSnapshot(RegisterState.isStep2FormInvalid) &&
          this.form.pristine
        ) {
          Object.values(this.form.controls).forEach(
            (control: AbstractControl) => {
              control.markAsDirty();
              control.markAsTouched();
              control.updateValueAndValidity();
            },
          );
        }
      });
  }

  private showSuccessToast(): void {
    this.store.dispatch(
      new ToastActions.ShowToast({
        ...INITIAL_TOAST_OPTIONS,
        severity: 'success',
        key: 'success',
        summary: this.translateService.instant(`Success`),
        detail: this.translateService.instant(
          'Your account has been created successfully',
        ),
      }),
    );
  }

  private showErrorToast(): void {
    this.store.dispatch(
      new ToastActions.ShowToast({
        ...INITIAL_TOAST_OPTIONS,
        severity: 'error',
        key: 'success',
        summary: this.translateService.instant('Error'),
        detail: this.translateService.instant(
          'Something went wrong. Please try again later',
        ),
      }),
    );
  }
}

export function passwordMatchValidator(
  matchTo: string,
  reverse?: boolean,
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.parent && reverse) {
      const c = (control.parent?.controls as any)[matchTo] as AbstractControl;

      if (c) {
        c.updateValueAndValidity();
      }
      return null;
    }
    return !!control.parent &&
      !!control.parent.value &&
      control.value === (control.parent?.controls as any)[matchTo].value
      ? null
      : { matching: true };
  };
}

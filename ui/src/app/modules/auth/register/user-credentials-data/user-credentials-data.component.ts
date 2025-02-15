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
import { TranslatePipe } from '@ngx-translate/core';
import { InputMask } from 'primeng/inputmask';
import { Password } from 'primeng/password';
import { Button } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe, NgClass } from '@angular/common';
import { debounceTime, Observable, Subscription } from 'rxjs';
import { UserCredentialsDataInterface } from '../interfaces/user-credentials-data.interface';
import { RegisterState } from '../register.state';
import { UserInfoDataInterface } from '../interfaces/user-info-data.interface';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

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
    TranslatePipe,
    InputMask,
    Password,
    Button,
    RouterLink,
    NgClass,
    AsyncPipe,
    Toast,
  ],
  templateUrl: './user-credentials-data.component.html',
  styleUrl: './user-credentials-data.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCredentialsDataComponent implements OnInit, OnDestroy {
  private readonly store: Store = inject(Store);
  private readonly router: Router = inject(Router);
  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private readonly messageService: MessageService = inject(MessageService);
  private readonly sub: Subscription = new Subscription();

  isLoading: boolean = false;

  userDataInfo$: Observable<UserInfoDataInterface> = this.store.select(
    RegisterState.userDataInfo,
  );

  form: FormGroup<UserCredentialsFormGroupInterface> = new FormGroup({
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

  ngOnInit(): void {
    this.store.dispatch(
      new RegisterActions.SetActiveStep(RegisterStepEnum.UserCredentialsData),
    );

    this.populateForm();
    this.saveFormChanges();
  }

  async goToNextStep(): Promise<void> {
    this.store.dispatch(
      new RegisterActions.AddUserCredentialsData(
        this.form.value as UserCredentialsDataInterface,
        this.form.invalid,
      ),
    );
    await this.router.navigate(['register', 'user-car-info']);
  }

  submit(): void {
    this.isLoading = true;

    this.sub.add(
      this.store.dispatch(new RegisterActions.RegisterNewUser()).subscribe({
        next: () => {
          this.isLoading = false;
          this.cdr.markForCheck();
          this.store.dispatch(
            new RegisterActions.SetActiveStep(RegisterStepEnum.UserInfo),
          );
          this.router.navigate(['login']);
          // TODO Show success toast
        },
        error: () => {
          this.isLoading = false;
          this.cdr.markForCheck();
          // TODO Show error toast
        },
      }),
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private populateForm(): void {
    this.sub.add(
      this.store
        .selectOnce(RegisterState.userCredentialsData)
        .subscribe((userCredentialsData: UserCredentialsDataInterface) => {
          this.form.patchValue(userCredentialsData, { emitEvent: false });

          if (
            this.store.selectSnapshot(RegisterState.isFormInvalid) &&
            this.form.pristine
          ) {
            Object.values(this.form.controls).forEach((control) => {
              control.markAsTouched();
              control.updateValueAndValidity();
            });
          }
        }),
    );
  }

  private saveFormChanges(): void {
    this.sub.add(
      this.form.valueChanges
        .pipe(debounceTime(300))
        .subscribe((changes) =>
          this.store.dispatch(
            new RegisterActions.AddUserCredentialsData(
              changes as UserCredentialsDataInterface,
              this.form.invalid,
            ),
          ),
        ),
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

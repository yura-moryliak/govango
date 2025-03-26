import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  CarMakeType,
  CarsListInterface,
  StaticAssetsService,
} from '../../../../shared/services/static-assets.service';
import { RegisterActions } from '../register.actions';
import { RegisterStepEnum } from '../register.component';
import { Store } from '@ngxs/store';
import { RegisterState } from '../register.state';
import { Subject, takeUntil } from 'rxjs';
import { UserCarInfoDataInterface } from '../interfaces/user-car-info-data.interface';
import { Router } from '@angular/router';
import { Select, SelectChangeEvent } from 'primeng/select';
import { IftaLabel } from 'primeng/iftalabel';
import { InputMask } from 'primeng/inputmask';
import { NgClass } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { InputNumber } from 'primeng/inputnumber';
import { Button } from 'primeng/button';
import {
  INITIAL_TOAST_OPTIONS,
  ToastActions,
} from '../../../../shared/states/toast/toast.actions';

interface UserCarInfoFormGroupInterface {
  registrationPlate: FormControl<string | null>;
  make: FormControl<CarsListInterface | null>;
  model: FormControl<CarMakeType | null>;
  length: FormControl<number | null>;
  width: FormControl<number | null>;
  height: FormControl<number | null>;
  carryCapacity: FormControl<number | null>;
}

@Component({
  selector: 'gvg-user-car-info',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    IftaLabel,
    InputMask,
    NgClass,
    TranslatePipe,
    Select,
    InputNumber,
    Button,
  ],
  templateUrl: './user-car-info.component.html',
  styleUrl: './user-car-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCarInfoComponent implements OnInit, OnDestroy {
  private readonly store: Store = inject(Store);
  private readonly router: Router = inject(Router);
  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private readonly translateService: TranslateService =
    inject(TranslateService);
  private readonly destroyed$: Subject<void> = new Subject<void>();

  readonly form: FormGroup<UserCarInfoFormGroupInterface> = new FormGroup({
    registrationPlate: new FormControl('', Validators.required),
    make: new FormControl(
      { id: null, make: '', models: [] } as CarsListInterface,
      Validators.required,
    ),
    model: new FormControl(
      { name: '', makeId: '' } as CarMakeType,
      Validators.required,
    ),
    length: new FormControl(0, Validators.required),
    width: new FormControl(0, Validators.required),
    height: new FormControl(0, Validators.required),
    carryCapacity: new FormControl(0, Validators.required),
  });
  readonly carsList: CarsListInterface[] = StaticAssetsService.carsList;

  carsModelsList: Array<{ makeId: string; name: string }> = [];
  isLoading: boolean = false;

  ngOnInit(): void {
    this.store.dispatch(
      new RegisterActions.SetActiveStep(RegisterStepEnum.UserCarInfo),
    );

    this.populateForm();
  }

  carMakeChanges(changeEvent: SelectChangeEvent): void {
    if (!changeEvent.value) {
      this.carsModelsList = [];
      this.form.controls.model.disable();
      return;
    }

    this.carsModelsList = changeEvent.value.models;
    this.form.controls.model.enable();
    this.form.controls.model.patchValue({ name: '', makeId: '' });
  }

  goToStep(path: string): void {
    this.store.dispatch(
      new RegisterActions.AddUserCarInfoData(
        this.form.value as UserCarInfoDataInterface,
        this.form.invalid,
      ),
    );
    this.router.navigate(['/register', path]);
  }

  submit(): void {
    this.isLoading = true;

    const storeActions = [
      new RegisterActions.AddUserCarInfoData(
        this.form.value as UserCarInfoDataInterface,
        this.form.invalid,
      ),
      new RegisterActions.RegisterNewUser(),
    ];

    this.store
      .dispatch(storeActions)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.cdr.markForCheck();
          this.store.dispatch([
            new RegisterActions.SetActiveStep(RegisterStepEnum.UserInfo),
            new RegisterActions.CompleteStep3(),
          ]);
          this.router.navigate(['login']);
          this.showSuccessToast();
        },
        error: () => {
          this.isLoading = false;
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
      .select(RegisterState.userCarInfo)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: UserCarInfoDataInterface) => {
        this.form.patchValue(data);
        this.form.updateValueAndValidity();

        if (!this.form.controls.make.value?.id) {
          this.form.controls.make.patchValue(null);
          this.form.controls.model.disable();
        }

        this.carsModelsList = data.make?.models ? data.make.models : [];

        if (
          this.store.selectSnapshot(RegisterState.isStep3FormInvalid) &&
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
        summary: this.translateService.instant('Success'),
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
        severity: 'warn',
        key: 'success',
        summary: this.translateService.instant('Error'),
        detail: this.translateService.instant(
          'Something went wrong. Please try again later',
        ),
      }),
    );
  }
}

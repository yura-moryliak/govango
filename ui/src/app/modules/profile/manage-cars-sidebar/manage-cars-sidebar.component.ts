import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { User } from '../../../shared/states/users/user.interface';
import { Drawer } from 'primeng/drawer';
import {
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
} from '../../../shared/services/static-assets.service';
import { IftaLabel } from 'primeng/iftalabel';
import { InputMask } from 'primeng/inputmask';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AsyncPipe, NgClass } from '@angular/common';
import { Select, SelectChangeEvent } from 'primeng/select';
import { InputNumber } from 'primeng/inputnumber';
import { Button } from 'primeng/button';
import { map, Observable } from 'rxjs';
import { getObjectDifference } from '../../../shared/utils/object-difference';
import { ConfirmationService } from 'primeng/api';
import { Store } from '@ngxs/store';
import { UserCarInfoDataInterface } from '../../auth/register/interfaces/user-car-info-data.interface';
import { Car } from '../../../shared/states/cars/cars.interface';
import { CarsActions } from '../../../shared/states/cars/cars.actions';
import {
  INITIAL_TOAST_OPTIONS,
  ToastActions,
} from '../../../shared/states/toast/toast.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { UsersActions } from '../../../shared/states/users/users.actions';

interface UserCarFormGroupInterface {
  registrationPlate: FormControl<string | null>;
  make: FormControl<CarsListInterface | null>;
  model: FormControl<CarMakeType | null>;
  length: FormControl<number | null>;
  width: FormControl<number | null>;
  height: FormControl<number | null>;
  carryCapacity: FormControl<number | null>;
}

@Component({
  selector: 'gvg-manage-cars-sidebar',
  imports: [
    Drawer,
    FormsModule,
    ReactiveFormsModule,
    IftaLabel,
    InputMask,
    TranslatePipe,
    NgClass,
    Select,
    InputNumber,
    AsyncPipe,
    Button,
  ],
  templateUrl: './manage-cars-sidebar.component.html',
  styleUrl: './manage-cars-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageCarsSidebarComponent implements OnInit {
  private readonly store: Store = inject(Store);
  private readonly translateService: TranslateService =
    inject(TranslateService);
  private readonly confirmationService: ConfirmationService =
    inject(ConfirmationService);
  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  private initialFormValue: UserCarInfoDataInterface = {
    registrationPlate: '',
    make: null,
    model: { name: '', makeId: '' } as CarMakeType,
    length: 0,
    width: 0,
    height: 0,
    carryCapacity: 0,
  };

  @Input() set user(user: User | null) {
    if (!user) {
      return;
    }

    this.currentUser = user;
  }
  @Input() visible: boolean = false;
  @Output() closed: EventEmitter<void> = new EventEmitter();

  readonly form: FormGroup<UserCarFormGroupInterface> = new FormGroup({
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

  currentUser: User | null = null;
  carsModelsList: Array<{ makeId: string; name: string }> = [];
  isBusy: boolean = false;
  hasDifference$: Observable<boolean> | undefined;

  ngOnInit(): void {
    if (!this.form.controls.make.value?.id) {
      this.form.controls.make.patchValue(null);
      this.form.controls.model.disable();
    }
    this.setHasDifference();
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

  cancel(): void {
    const { hasDifference } = getObjectDifference(
      this.initialFormValue as UserCarInfoDataInterface,
      this.form.getRawValue(),
    );

    if (hasDifference) {
      return this.showConfirmationDialog();
    } else {
      this.visible = false;
      this.closed.emit();
    }
  }

  submit(): void {
    const { make, model } = this.form.getRawValue();
    const carMake = make?.make;

    const carModel = {
      ...this.form.getRawValue(),
      make: carMake as string,
      model: model?.name as string,
    } as Car;

    const newCarrierActions = [
      new UsersActions.UpdateCurrentUser({
        ...this.currentUser,
        isCarOwner: !this.currentUser?.isCarOwner
          ? true
          : this.currentUser?.isCarOwner,
      }),
      new CarsActions.AddCar(this.currentUser?.id as string, carModel),
    ];

    this.store
      .dispatch(
        !this.currentUser?.isCarOwner
          ? newCarrierActions
          : new CarsActions.AddCar(this.currentUser?.id as string, carModel),
      )
      .subscribe({
        next: () => {
          this.isBusy = false;
          this.cdr.markForCheck();

          this.initialFormValue =
            this.form.getRawValue() as UserCarInfoDataInterface;
          this.setHasDifference();
          this.showSuccessToast();
        },
        error: (error) => {
          this.isBusy = false;
          this.cdr.markForCheck();
          this.showErrorToast(error);
        },
      });
  }

  private showConfirmationDialog(): void {
    this.confirmationService.confirm({
      header: this.translateService.instant('Unsaved changes'),
      message: this.translateService.instant(
        'You have unsaved changes. Are you sure you want to leave?',
      ),
      acceptLabel: this.translateService.instant('Yes'),
      rejectLabel: this.translateService.instant('Cancel'),
      blockScroll: true,
      closeOnEscape: false,
      acceptButtonProps: {
        severity: 'warn',
      },
      rejectButtonProps: {
        severity: 'secondary',
      },
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.visible = false;
        this.closed.emit();
        this.form.reset(this.initialFormValue);
      },
      reject: () => (this.visible = true),
    });
  }

  private setHasDifference(): void {
    this.hasDifference$ = this.form.valueChanges.pipe(
      map(
        () =>
          getObjectDifference(
            this.initialFormValue as UserCarInfoDataInterface,
            this.form.getRawValue(),
          ).hasDifference,
      ),
    );
  }

  private showSuccessToast(): void {
    this.store.dispatch(
      new ToastActions.ShowToast({
        ...INITIAL_TOAST_OPTIONS,
        severity: 'success',
        key: 'success',
        summary: this.translateService.instant('Success'),
        detail: this.translateService.instant(
          'Your vehicle has been added successfully',
        ),
      }),
    );
  }

  private showErrorToast(error: HttpErrorResponse): void {
    this.store.dispatch(
      new ToastActions.ShowToast({
        ...INITIAL_TOAST_OPTIONS,
        severity: 'error',
        key: 'error',
        summary: this.translateService.instant('Error'),
        detail: this.translateService.instant(error.error.message),
      }),
    );
  }
}

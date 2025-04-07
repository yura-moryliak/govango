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
import { AsyncPipe, NgClass } from '@angular/common';
import { Button } from 'primeng/button';
import { Divider } from 'primeng/divider';
import { Drawer } from 'primeng/drawer';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IftaLabel } from 'primeng/iftalabel';
import { InputMask } from 'primeng/inputmask';
import { InputText } from 'primeng/inputtext';
import { ConfirmationService, PrimeTemplate } from 'primeng/api';
import { Select } from 'primeng/select';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { getObjectDifference } from '../../../shared/utils/object-difference';
import {
  CitiesListInterface,
  StaticAssetsService,
} from '../../../shared/services/static-assets.service';
import { UsersActions } from '../../../shared/states/users/users.actions';
import { User } from '../../../shared/states/users/user.interface';
import { map, Observable } from 'rxjs';
import {
  INITIAL_TOAST_OPTIONS,
  ToastActions,
} from '../../../shared/states/toast/toast.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { ConfirmDialog } from 'primeng/confirmdialog';

interface UpdateUserFormGroupInterface {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  city: FormControl<string | null>;
  phoneNumber: FormControl<string | null>;
  email: FormControl<string | null>;
}

interface UpdateUserDataInterface {
  firstName: string;
  lastName: string;
  city: string;
  phoneNumber: string;
}

@Component({
  selector: 'gvg-update-profile-sidebar',
  imports: [
    AsyncPipe,
    Button,
    Divider,
    Drawer,
    FormsModule,
    IftaLabel,
    InputMask,
    InputText,
    PrimeTemplate,
    ReactiveFormsModule,
    Select,
    TranslatePipe,
    ConfirmDialog,
    NgClass,
  ],
  templateUrl: './update-profile-sidebar.component.html',
  styleUrl: './update-profile-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateProfileSidebarComponent implements OnInit {
  private readonly store: Store = inject(Store);
  private readonly translateService: TranslateService =
    inject(TranslateService);
  private readonly confirmationService: ConfirmationService =
    inject(ConfirmationService);
  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  private initialFormValue: UpdateUserDataInterface | undefined;

  @Input() set user(user: User | null) {
    if (!user) {
      return;
    }

    this.currentUser = user;
    this.populateForm(user);
  }
  @Input() visible: boolean = false;
  @Output() closed: EventEmitter<void> = new EventEmitter();

  readonly form: FormGroup<UpdateUserFormGroupInterface> = new FormGroup({
    firstName: new FormControl<string | null>(null, [
      Validators.required,
      Validators.maxLength(22),
    ]),
    lastName: new FormControl<string | null>(null, [
      Validators.required,
      Validators.maxLength(22),
    ]),
    city: new FormControl<string | null>(null, Validators.required),
    phoneNumber: new FormControl<string | null>(null, [Validators.required]),
    email: new FormControl<string | null>({ value: null, disabled: true }),
  });

  readonly citiesList: CitiesListInterface[] =
    StaticAssetsService.citiesList.map((city: CitiesListInterface) => ({
      name: this.translateService.instant(city.name),
      value: city.value,
    }));

  currentUser: User | null = null;
  isBusy: boolean = false;
  hasDifference$: Observable<boolean> | undefined;

  ngOnInit(): void {
    this.setHasDifference();
  }

  cancel(): void {
    const { hasDifference } = getObjectDifference(
      this.initialFormValue as UpdateUserDataInterface,
      this.form.getRawValue(),
    );

    if (hasDifference) {
      this.showConfirmationDialog();
    } else {
      this.visible = false;
      this.closed.emit();
    }
  }

  update(): void {
    this.isBusy = true;

    this.store
      .dispatch(
        new UsersActions.UpdateCurrentUser({
          id: this.currentUser?.id,
          ...this.form.getRawValue(),
        } as User),
      )
      .subscribe({
        next: () => {
          this.isBusy = false;
          this.cdr.markForCheck();

          this.initialFormValue =
            this.form.getRawValue() as UpdateUserDataInterface;
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

  private populateForm(user: User): void {
    this.form.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      city: user.city,
      phoneNumber: user.phoneNumber,
      email: user.email,
    });

    this.initialFormValue = this.form.getRawValue() as UpdateUserDataInterface;
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
            this.initialFormValue as UpdateUserDataInterface,
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
          'Your account has been updated successfully',
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

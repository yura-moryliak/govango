import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngxs/store';
import { Avatar } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { UsersState } from '../../shared/states/users/users.state';
import { filter, map, Observable, Subject, takeUntil } from 'rxjs';
import { User } from '../../shared/states/users/user.interface';
import { AsyncPipe, NgClass } from '@angular/common';
import { fallbackAvatar } from '../../shared/utils/fallback-avatar';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { UserInfoTabComponent } from './user-info-tab/user-info-tab.component';
import { UserCarsTabComponent } from './user-cars-tab/user-cars-tab.component';
import { Drawer } from 'primeng/drawer';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IftaLabel } from 'primeng/iftalabel';
import { ConfirmationService, PrimeTemplate } from 'primeng/api';
import { Select } from 'primeng/select';
import {
  CitiesListInterface,
  StaticAssetsService,
} from '../../shared/services/static-assets.service';
import { InputText } from 'primeng/inputtext';
import { InputMask } from 'primeng/inputmask';
import { Divider } from 'primeng/divider';
import { getObjectDifference } from '../../shared/utils/object-difference';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { UsersActions } from '../../shared/states/users/users.actions';
import {
  INITIAL_TOAST_OPTIONS,
  ToastActions,
} from '../../shared/states/toast/toast.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { ProfileAvatarUploadComponent } from './profile-avatar-upload/profile-avatar-upload.component';

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
  selector: 'gvg-profile',
  imports: [
    Avatar,
    Button,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    AsyncPipe,
    TranslatePipe,
    UserInfoTabComponent,
    UserCarsTabComponent,
    Drawer,
    ReactiveFormsModule,
    IftaLabel,
    PrimeTemplate,
    Select,
    NgClass,
    InputText,
    InputMask,
    Divider,
    ConfirmDialog,
    ProfileAvatarUploadComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService],
})
export class ProfileComponent implements OnInit, OnDestroy {
  private readonly store: Store = inject(Store);
  private readonly translateService: TranslateService =
    inject(TranslateService);
  private readonly confirmationService: ConfirmationService =
    inject(ConfirmationService);
  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  private readonly destroyed$: Subject<void> = new Subject<void>();
  private initialFormValue: UpdateUserDataInterface | undefined;

  @ViewChild('avatar') private avatarEl: Avatar | undefined;

  readonly currentUser$: Observable<User | null> = this.store.select(
    UsersState.currentUser,
  );

  readonly fallbackAvatar = fallbackAvatar;

  readonly form: FormGroup<UpdateUserFormGroupInterface> = new FormGroup({
    firstName: new FormControl<string | null>(null, Validators.required),
    lastName: new FormControl<string | null>(null, Validators.required),
    city: new FormControl<string | null>(null, Validators.required),
    phoneNumber: new FormControl<string | null>(null, [Validators.required]),
    email: new FormControl<string | null>({ value: null, disabled: true }),
  });

  readonly citiesList: CitiesListInterface[] =
    StaticAssetsService.citiesList.map((city: CitiesListInterface) => ({
      name: this.translateService.instant(city.name),
      value: city.value,
    }));

  isDrawerOpened: boolean = false;
  isBusy: boolean = false;
  hasDifference$: Observable<boolean> | undefined;

  ngOnInit(): void {
    this.populateForm();
    this.setHasDifference();
  }

  handleAvatarImageError(): void {
    if (!this.avatarEl) {
      return;
    }

    this.avatarEl.image = this.fallbackAvatar;
  }

  cancel(): void {
    this.checkChangesOnHide();
  }

  update(userId: string): void {
    this.isBusy = true;

    this.store
      .dispatch(
        new UsersActions.UpdateCurrentUser({
          id: userId,
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

  checkChangesOnHide(): void {
    const { hasDifference } = getObjectDifference(
      this.initialFormValue as UpdateUserDataInterface,
      this.form.getRawValue(),
    );

    if (hasDifference) {
      this.showConfirmationDialog();
    } else {
      this.isDrawerOpened = false;
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private populateForm(): void {
    this.currentUser$
      .pipe(
        filter((user: User | null) => !!user),
        takeUntil(this.destroyed$),
      )
      .subscribe((user: User) => {
        this.form.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          city: user.city,
          phoneNumber: user.phoneNumber,
          email: user.email,
        });

        this.initialFormValue =
          this.form.getRawValue() as UpdateUserDataInterface;
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
        this.isDrawerOpened = false;
        this.form.reset(this.initialFormValue);
      },
      reject: () => (this.isDrawerOpened = true),
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

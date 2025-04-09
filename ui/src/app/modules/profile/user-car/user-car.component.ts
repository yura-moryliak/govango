import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { Car } from '../../../shared/states/cars/cars.interface';
import { Panel } from 'primeng/panel';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Button } from 'primeng/button';
import { CarsActions } from '../../../shared/states/cars/cars.actions';
import { Store } from '@ngxs/store';
import { ConfirmationService } from 'primeng/api';
import { UsersState } from '../../../shared/states/users/users.state';
import {
  INITIAL_TOAST_OPTIONS,
  ToastActions,
} from '../../../shared/states/toast/toast.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { UsersActions } from '../../../shared/states/users/users.actions';
import { User } from '../../../shared/states/users/user.interface';
import { CarsState } from '../../../shared/states/cars/cars.state';

@Component({
  selector: 'gvg-user-car',
  imports: [Panel, TranslatePipe, Button],
  templateUrl: './user-car.component.html',
  styleUrl: './user-car.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCarComponent {
  private readonly store: Store = inject(Store);
  private readonly confirmationService: ConfirmationService =
    inject(ConfirmationService);
  private readonly translateService: TranslateService =
    inject(TranslateService);

  @Input({ required: true }) car: Car | undefined;
  @Output() updating: EventEmitter<void> = new EventEmitter<void>();

  updateCar(car: Car): void {
    this.store.dispatch(new CarsActions.UpdateCarInManageCarsSidebar(car));
    this.updating.emit();
  }

  removeCar(carId: string): void {
    const availableCars: Car[] = this.store.selectSnapshot(
      CarsState.carsByUserId(
        this.store.selectSnapshot(UsersState.currentUser)?.id as string,
      ),
    );

    if (availableCars.length > 1) {
      this.removeWithConfirmation(carId);
    } else {
      this.removeWithConfirmation(
        carId,
        {
          message:
            'This is your last car. After removing it, you will no longer be a carrier. Are you sure you want to remove it?',
        },
        availableCars.length === 1,
      );
    }
  }

  private removeWithConfirmation(
    carId: string,
    message?: { message: string },
    isLastCar: boolean = false,
  ): void {
    this.confirmationService.confirm({
      header: this.translateService.instant('Car removal'),
      message: this.translateService.instant(
        message ? message.message : 'Are you sure you want to remove this car?',
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
      accept: () => this.handleCarRemoval(carId, isLastCar),
    });
  }

  private handleCarRemoval(carId: string, isLastCar: boolean = false): void {
    this.store
      .dispatch(
        new CarsActions.RemoveCar(
          this.store.selectSnapshot(UsersState.currentUser)?.id as string,
          carId,
        ),
      )
      .subscribe({
        next: () => {
          this.showSuccessToast();

          if (isLastCar) {
            this.store.dispatch(
              new UsersActions.UpdateCurrentUser({
                ...(this.store.selectSnapshot(UsersState.currentUser) as User),
                isCarOwner: false,
              }),
            );
          }
        },
        error: (error: HttpErrorResponse) => this.showErrorToast(error),
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

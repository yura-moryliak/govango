import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Car } from '../../../shared/states/cars/cars.interface';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Button } from 'primeng/button';
import { CarsActions } from '../../../shared/states/cars/cars.actions';
import { Store } from '@ngxs/store';
import { ConfirmationService } from 'primeng/api';
import { UsersState } from '../../../shared/states/users/users.state';
import { HttpErrorResponse } from '@angular/common/http';
import { Divider } from 'primeng/divider';
import {
  INITIAL_TOAST_OPTIONS,
  ToastActions,
} from '../../../shared/states/toast/toast.actions';
import { UsersActions } from '../../../shared/states/users/users.actions';
import { User } from '../../../shared/states/users/user.interface';
import { CarsState } from '../../../shared/states/cars/cars.state';
import {
  AccordionContent,
  AccordionHeader,
  AccordionPanel,
} from 'primeng/accordion';
import { MinivanIconComponent } from '../../../../assets/icons/minivan-icon/minivan-icon.component';
import { CarImagesUploadComponent } from '../car-images-upload/car-images-upload.component';
import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'gvg-user-car',
  imports: [
    TranslatePipe,
    Button,
    AccordionPanel,
    Divider,
    AccordionContent,
    AccordionHeader,
    MinivanIconComponent,
    CarImagesUploadComponent,
    GalleriaModule,
  ],
  templateUrl: './user-car.component.html',
  styleUrl: './user-car.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCarComponent implements AfterViewInit {
  private readonly store: Store = inject(Store);
  private readonly confirmationService: ConfirmationService =
    inject(ConfirmationService);
  private readonly translateService: TranslateService =
    inject(TranslateService);

  @Input({ required: true }) car: Car | undefined;
  @Input() panelIndex: number = 0;
  @Input() lastToScrollTo: boolean = false;

  @Output() updating: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('scrollToViewAnchor') scrollToViewAnchor:
    | ElementRef<HTMLSpanElement>
    | undefined;

  isUploadCarImagesSidebarOpened: boolean = false;
  isGalleriaOpened: boolean = false;

  ngAfterViewInit(): void {
    this.handleScrollToView();
  }

  openUploadCarImagesSidebar(carId: string): void {
    this.isUploadCarImagesSidebarOpened = true;
    this.store.dispatch(new CarsActions.UpdateUploadCarImagesSidebar(carId));
  }

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
          'Your vehicle has been removed successfully',
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

  private handleScrollToView() {
    if (this.lastToScrollTo) {
      setTimeout(() => {
        this.scrollToViewAnchor?.nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 100);
    }
  }
}

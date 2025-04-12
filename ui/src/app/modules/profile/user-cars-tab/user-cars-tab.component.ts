import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Button } from 'primeng/button';
import { TranslatePipe } from '@ngx-translate/core';
import { ManageCarsSidebarComponent } from '../manage-cars-sidebar/manage-cars-sidebar.component';
import { Store } from '@ngxs/store';
import { CarsState } from '../../../shared/states/cars/cars.state';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Car } from '../../../shared/states/cars/cars.interface';
import { UsersState } from '../../../shared/states/users/users.state';
import { CarsActions } from '../../../shared/states/cars/cars.actions';
import { UserCarComponent } from '../user-car/user-car.component';
import { Accordion } from 'primeng/accordion';
import { User } from '../../../shared/states/users/user.interface';

@Component({
  selector: 'gvg-user-cars-tab',
  imports: [
    Button,
    TranslatePipe,
    ManageCarsSidebarComponent,
    AsyncPipe,
    UserCarComponent,
    Accordion,
  ],
  templateUrl: './user-cars-tab.component.html',
  styleUrl: './user-cars-tab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCarsTabComponent implements OnInit {
  private readonly store: Store = inject(Store);

  readonly cars$: Observable<Car[]> = this.store.select(
    CarsState.carsByUserId(
      this.store.selectSnapshot(UsersState.currentUser)?.id as string,
    ),
  );

  readonly currentUser$: Observable<User | null> = this.store.select(
    UsersState.currentUser,
  );

  isManageCarsSidebarVisible: boolean = false;

  ngOnInit(): void {
    if (this.store.selectSnapshot(UsersState.currentUser)?.isCarOwner) {
      this.store.dispatch(
        new CarsActions.GetUserCars(
          this.store.selectSnapshot(UsersState.currentUser)?.id as string,
        ),
      );
    }
  }

  onManageCarsSidebarClosed(closeEvent: 'load-data' | void): void {
    this.isManageCarsSidebarVisible = false;
    this.store.dispatch(new CarsActions.ClearCarToUpdate());

    if (closeEvent === 'load-data') {
      this.store.dispatch(
        new CarsActions.GetUserCars(
          this.store.selectSnapshot(UsersState.currentUser)?.id as string,
        ),
      );
    }
  }
}

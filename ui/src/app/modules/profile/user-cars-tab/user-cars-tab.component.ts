import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { Button } from 'primeng/button';
import { User } from '../../../shared/states/users/user.interface';
import { TranslatePipe } from '@ngx-translate/core';
import { ManageCarsSidebarComponent } from '../manage-cars-sidebar/manage-cars-sidebar.component';
import { Store } from '@ngxs/store';
import { CarsState } from '../../../shared/states/cars/cars.state';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'gvg-user-cars-tab',
  imports: [
    Button,
    TranslatePipe,
    ManageCarsSidebarComponent,
    AsyncPipe,
    JsonPipe,
  ],
  templateUrl: './user-cars-tab.component.html',
  styleUrl: './user-cars-tab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCarsTabComponent {
  private readonly store: Store = inject(Store);

  @Input() user: User | null = null;

  readonly cars$ = this.store.select(CarsState.carsByUserId('11'));

  isManageCarsSidebarVisible: boolean = false;
}

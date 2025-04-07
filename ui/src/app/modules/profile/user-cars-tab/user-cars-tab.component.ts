import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Button } from 'primeng/button';
import { User } from '../../../shared/states/users/user.interface';
import { TranslatePipe } from '@ngx-translate/core';
import { ManageCarsSidebarComponent } from '../manage-cars-sidebar/manage-cars-sidebar.component';

@Component({
  selector: 'gvg-user-cars-tab',
  imports: [Button, TranslatePipe, ManageCarsSidebarComponent],
  templateUrl: './user-cars-tab.component.html',
  styleUrl: './user-cars-tab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCarsTabComponent {
  @Input() user: User | null = null;

  isManageCarsSidebarVisible: boolean = false;
}

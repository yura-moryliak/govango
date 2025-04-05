import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Button } from 'primeng/button';
import { User } from '../../../shared/states/users/user.interface';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'gvg-user-cars-tab',
  imports: [Button, TranslatePipe],
  templateUrl: './user-cars-tab.component.html',
  styleUrl: './user-cars-tab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCarsTabComponent {
  @Input() user: User | null = null;
}

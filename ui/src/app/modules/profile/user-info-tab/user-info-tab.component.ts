import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { User } from '../../../shared/states/users/user.interface';

@Component({
  selector: 'gvg-user-info-tab',
  imports: [TranslatePipe],
  templateUrl: './user-info-tab.component.html',
  styleUrl: './user-info-tab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoTabComponent {
  @Input() user: User | null = null;
}

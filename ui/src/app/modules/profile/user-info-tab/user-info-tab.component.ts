import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from '../../../shared/states/users/user.interface';
import { UsersState } from '../../../shared/states/users/users.state';

@Component({
  selector: 'gvg-user-info-tab',
  imports: [TranslatePipe, AsyncPipe],
  templateUrl: './user-info-tab.component.html',
  styleUrl: './user-info-tab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoTabComponent {
  private readonly store: Store = inject(Store);

  readonly currentUser$: Observable<User | null> = this.store.select(
    UsersState.currentUser,
  );
}

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngxs/store';
import { Avatar } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { UsersState } from '../../shared/states/users/users.state';
import { Observable } from 'rxjs';
import { User } from '../../shared/states/users/user.interface';
import { AsyncPipe } from '@angular/common';
import { fallbackAvatar } from '../../shared/utils/fallback-avatar';
import { TranslatePipe } from '@ngx-translate/core';
import { UserInfoTabComponent } from './user-info-tab/user-info-tab.component';
import { UserCarsTabComponent } from './user-cars-tab/user-cars-tab.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ProfileAvatarUploadComponent } from './profile-avatar-upload/profile-avatar-upload.component';
import { UpdateProfileSidebarComponent } from './update-profile-sidebar/update-profile-sidebar.component';

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
    ReactiveFormsModule,
    ProfileAvatarUploadComponent,
    UpdateProfileSidebarComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService],
})
export class ProfileComponent {
  private readonly store: Store = inject(Store);

  @ViewChild('avatar') private avatarEl: Avatar | undefined;

  readonly currentUser$: Observable<User | null> = this.store.select(
    UsersState.currentUser,
  );

  readonly fallbackAvatar = fallbackAvatar;

  isUpdateProfileSidebarVisible: boolean = false;

  handleAvatarImageError(): void {
    if (!this.avatarEl) {
      return;
    }

    this.avatarEl.image = this.fallbackAvatar;
  }
}

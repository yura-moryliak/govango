import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngxs/store';
import { Avatar } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { Tab, TabList, TabPanels, Tabs } from 'primeng/tabs';
import { UsersState } from '../../shared/states/users/users.state';
import { combineLatest, Observable, Subject, takeUntil } from 'rxjs';
import { User } from '../../shared/states/users/user.interface';
import { AsyncPipe } from '@angular/common';
import { fallbackAvatar } from '../../shared/utils/fallback-avatar';
import { TranslatePipe } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ProfileAvatarUploadComponent } from './profile-avatar-upload/profile-avatar-upload.component';
import { UpdateProfileSidebarComponent } from './update-profile-sidebar/update-profile-sidebar.component';
import { Router, RouterOutlet } from '@angular/router';
import { TabsState } from '../../shared/states/tabs/tabs.state';
import { TabsActions } from '../../shared/states/tabs/tabs.actions';

@Component({
  selector: 'gvg-profile',
  imports: [
    Avatar,
    Button,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    AsyncPipe,
    TranslatePipe,
    ReactiveFormsModule,
    ProfileAvatarUploadComponent,
    UpdateProfileSidebarComponent,
    RouterOutlet,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService],
})
export class ProfileComponent implements OnInit, OnDestroy {
  private readonly store: Store = inject(Store);
  private readonly router: Router = inject(Router);

  private readonly destroyed$: Subject<void> = new Subject<void>();

  private readonly profilePathPrefix = '/gvg/profile';
  private readonly activePath$ = this.store.select(TabsState.path);

  @ViewChild('avatar') private avatarEl: Avatar | undefined;

  readonly currentUser$: Observable<User | null> = this.store.select(
    UsersState.currentUser,
  );
  readonly activeIndex$ = this.store.select(TabsState.index);

  readonly fallbackAvatar = fallbackAvatar;

  tabIndex: number = 0;
  isUpdateProfileSidebarVisible: boolean = false;

  ngOnInit(): void {
    combineLatest([this.activePath$, this.activeIndex$])
      .pipe(takeUntil(this.destroyed$))
      .subscribe(([path, index]) => {
        if (path) {
          this.openTab(path, index);
        }
      });
  }

  openTab(path: string, index: number): void {
    this.store.dispatch([
      new TabsActions.ActiveTabPath(path),
      new TabsActions.ActiveTabIndex(index),
    ]);

    this.tabIndex = index;
    this.router.navigate([this.profilePathPrefix, path]);
  }

  handleAvatarImageError(): void {
    if (!this.avatarEl) {
      return;
    }

    this.avatarEl.image = this.fallbackAvatar;
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}

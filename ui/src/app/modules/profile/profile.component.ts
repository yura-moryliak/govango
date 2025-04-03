import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { Store } from '@ngxs/store';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthState } from '../../shared/states/auth/auth.state';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Avatar } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { Card } from 'primeng/card';
import { Divider } from 'primeng/divider';

@Component({
  selector: 'gvg-profile',
  imports: [
    HeaderComponent,
    AsyncPipe,
    Avatar,
    Button,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Card,
    Divider,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  private readonly store: Store = inject(Store);
  private readonly jwtHelperService: JwtHelperService =
    inject(JwtHelperService);

  readonly userId$: Observable<string> = this.store.select(
    AuthState.id(this.jwtHelperService),
  );
}

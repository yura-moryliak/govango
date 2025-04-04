import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { Avatar } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';

@Component({
  selector: 'gvg-profile',
  imports: [Avatar, Button, Tabs, TabList, Tab, TabPanels, TabPanel],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  private readonly store: Store = inject(Store);
}

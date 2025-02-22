import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Drawer } from 'primeng/drawer';
import { Store } from '@ngxs/store';
import { AppSettingsPanelState } from '../../states/app-settings-panel/app-settings-panel.state';
import { Observable, Subscription } from 'rxjs';
import { Button } from 'primeng/button';
import { AppSettingsPanelActions } from '../../states/app-settings-panel/app-settings-panel.actions';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { IftaLabel } from 'primeng/iftalabel';
import { Select } from 'primeng/select';

@Component({
  selector: 'gvg-app-settings-panel',
  imports: [Drawer, Button, ToggleSwitch, IftaLabel, Select],
  templateUrl: './app-settings-panel.component.html',
  styleUrl: './app-settings-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppSettingsPanelComponent implements OnInit, OnDestroy {
  private readonly store: Store = inject(Store);
  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  private readonly sub: Subscription = new Subscription();

  private readonly isOpened$: Observable<boolean> = this.store.select(
    AppSettingsPanelState.isOpened,
  );

  @ViewChild('drawerRef', { static: true }) drawerRef: Drawer | undefined;

  isOpened: boolean = false;

  ngOnInit(): void {
    this.sub.add(
      this.isOpened$.subscribe((isOpened: boolean) => {
        this.isOpened = isOpened;
        this.cdr.detectChanges();
      }),
    );
  }

  closePanel(event: Event): void {
    this.drawerRef?.close(event);
    this.isOpened = false;
    this.store.dispatch(new AppSettingsPanelActions.Close());
  }

  closeOnBackdropClick(): void {
    this.store.dispatch(new AppSettingsPanelActions.Close());
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

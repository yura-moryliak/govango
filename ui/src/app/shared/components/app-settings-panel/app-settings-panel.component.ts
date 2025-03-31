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
import { Observable, Subject, takeUntil } from 'rxjs';
import { Button } from 'primeng/button';
import { AppSettingsPanelActions } from '../../states/app-settings-panel/app-settings-panel.actions';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { Select, SelectChangeEvent } from 'primeng/select';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgStyle } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import {
  LanguagesListInterface,
  StaticAssetsService,
} from '../../services/static-assets.service';
import { PrimeTemplate } from 'primeng/api';
import { Divider } from 'primeng/divider';

@Component({
  selector: 'gvg-app-settings-panel',
  imports: [
    Drawer,
    Button,
    ToggleSwitch,
    Select,
    FormsModule,
    AsyncPipe,
    TranslatePipe,
    PrimeTemplate,
    ReactiveFormsModule,
    NgStyle,
    Divider,
  ],
  templateUrl: './app-settings-panel.component.html',
  styleUrl: './app-settings-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppSettingsPanelComponent implements OnInit, OnDestroy {
  private readonly store: Store = inject(Store);
  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private readonly destroyed$: Subject<void> = new Subject<void>();

  private readonly isOpened$: Observable<boolean> = this.store.select(
    AppSettingsPanelState.isOpened,
  );

  readonly isDarkMode$: Observable<boolean> = this.store.select(
    AppSettingsPanelState.isDarkMode,
  );

  @ViewChild('drawerRef', { static: true }) readonly drawerRef:
    | Drawer
    | undefined;

  languagesList: LanguagesListInterface[] = [];
  selectedDefaultLanguage: LanguagesListInterface | undefined;

  readonly languageFormControl: FormControl<string | null> = new FormControl<
    string | null
  >(null);

  readonly language$: Observable<string> = this.store.select(
    AppSettingsPanelState.getLanguage,
  );

  isOpened: boolean = false;

  ngOnInit(): void {
    this.initIsPanelOpened();
    this.initTranslations();
  }

  toggleTheme(): void {
    this.store.dispatch(new AppSettingsPanelActions.ToggleTheme());
  }

  selectLanguage(changeEvent: SelectChangeEvent): void {
    this.selectedDefaultLanguage = this.languagesList.find(
      (languageItem: LanguagesListInterface) =>
        languageItem.value === changeEvent.value,
    );

    if (!this.selectedDefaultLanguage) {
      return;
    }

    this.store.dispatch(
      new AppSettingsPanelActions.SetLanguage(
        this.selectedDefaultLanguage.prefix,
      ),
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
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private initIsPanelOpened(): void {
    this.isOpened$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((isOpened: boolean) => {
        this.isOpened = isOpened;
        this.cdr.detectChanges();
      });
  }

  private initTranslations(): void {
    this.language$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((language: string) => {
        this.languagesList = StaticAssetsService.languageMap[language];

        this.selectedDefaultLanguage = this.languagesList.find(
          (languageItem: LanguagesListInterface) =>
            languageItem.prefix === language,
        );

        if (!this.selectedDefaultLanguage) {
          return;
        }

        this.languageFormControl.patchValue(this.selectedDefaultLanguage.name);
      });
  }
}

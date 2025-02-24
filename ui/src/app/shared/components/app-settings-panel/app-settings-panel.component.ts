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
import { Select, SelectChangeEvent } from 'primeng/select';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import {
  LanguagesListInterface,
  StaticAssetsService,
} from '../../services/static-assets.service';
import { PrimeTemplate } from 'primeng/api';

@Component({
  selector: 'gvg-app-settings-panel',
  imports: [
    Drawer,
    Button,
    ToggleSwitch,
    IftaLabel,
    Select,
    FormsModule,
    AsyncPipe,
    TranslatePipe,
    PrimeTemplate,
    ReactiveFormsModule,
  ],
  templateUrl: './app-settings-panel.component.html',
  styleUrl: './app-settings-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppSettingsPanelComponent implements OnInit, OnDestroy {
  private readonly store: Store = inject(Store);
  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private readonly translateService: TranslateService =
    inject(TranslateService);

  private readonly sub: Subscription = new Subscription();

  private readonly isOpened$: Observable<boolean> = this.store.select(
    AppSettingsPanelState.isOpened,
  );

  readonly isDarkMode$: Observable<boolean> = this.store.select(
    AppSettingsPanelState.isDarkMode,
  );

  @ViewChild('drawerRef', { static: true }) drawerRef: Drawer | undefined;

  isOpened: boolean = false;
  languagesList: LanguagesListInterface[] = [];

  readonly languageFormControl: FormControl<string | null> = new FormControl<
    string | null
  >(null);

  ngOnInit(): void {
    this.initIsPanelOpened();
    this.translateLanguagesItems();
    this.initDefaultLanguageSelectItem();
  }

  toggleTheme(): void {
    this.store.dispatch(new AppSettingsPanelActions.ToggleTheme());
  }

  selectLanguage(changeEvent: SelectChangeEvent): void {
    const defaultLang: LanguagesListInterface | undefined =
      StaticAssetsService.languagesList.find(
        (language: LanguagesListInterface) =>
          language.name === changeEvent.value,
      );

    if (!defaultLang) {
      return;
    }

    console.log(defaultLang);
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

  private initIsPanelOpened(): void {
    this.sub.add(
      this.isOpened$.subscribe((isOpened: boolean) => {
        this.isOpened = isOpened;
        this.cdr.detectChanges();
      }),
    );
  }

  private translateLanguagesItems(): void {
    const languageKeys: string[] = StaticAssetsService.languagesList.map(
      (lang: LanguagesListInterface) => lang.name,
    );

    this.translateService.get(languageKeys).subscribe((translations) => {
      this.languagesList = StaticAssetsService.languagesList.map(
        (language: LanguagesListInterface) => ({
          ...language,
          name: translations[language.name],
        }),
      );
    });
  }

  private initDefaultLanguageSelectItem(): void {
    const defaultLang: LanguagesListInterface | undefined =
      StaticAssetsService.languagesList.find(
        (language: LanguagesListInterface) =>
          this.translateService.defaultLang === language.prefix,
      );

    if (!defaultLang) {
      return;
    }

    this.languageFormControl.setValue(defaultLang.name);
  }
}

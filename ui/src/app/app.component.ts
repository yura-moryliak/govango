import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from 'primeng/toast';
import { Store } from '@ngxs/store';
import { MessageService, ToastMessageOptions } from 'primeng/api';
import { ToastState } from './shared/states/toast/toast.state';
import { ToastConfig, TOASTS_CONFIG } from './shared/toasts.config';
import { AppSettingsPanelComponent } from './shared/components/app-settings-panel/app-settings-panel.component';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AppSettingsPanelState } from './shared/states/app-settings-panel/app-settings-panel.state';
import { AppSettingsPanelActions } from './shared/states/app-settings-panel/app-settings-panel.actions';
import { TranslateService } from '@ngx-translate/core';
import { FingerprintService } from './shared/services/fingerprint.service';
import { AuthActions } from './shared/states/auth/auth.actions';

@Component({
  selector: 'gvg-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, Toast, AppSettingsPanelComponent],
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly store: Store = inject(Store);
  private readonly messageService: MessageService = inject(MessageService);
  private readonly translateService: TranslateService =
    inject(TranslateService);
  private readonly fingerprintService: FingerprintService =
    inject(FingerprintService);

  private readonly destroyed$: Subject<void> = new Subject<void>();

  readonly language$: Observable<string> = this.store.select(
    AppSettingsPanelState.getLanguage,
  );
  readonly toasts: ToastConfig[] = TOASTS_CONFIG;

  ngOnInit(): void {
    this.generateFingerprint();

    this.initToastMessages();
    this.initDarkMode();
    this.initAppTranslation();
  }

  private initToastMessages(): void {
    this.store
      .select(ToastState.toast)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((options: ToastMessageOptions) =>
        this.messageService.add(options),
      );
  }

  private initDarkMode(): void {
    this.store
      .select(AppSettingsPanelState.isDarkMode)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((isDarkMode: boolean) => {
        if (isDarkMode) {
          document.querySelector('html')?.classList.add('gvg-dark-theme');
        }
      });
  }

  private initAppTranslation(): void {
    this.language$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((language: string) => {
        this.translateService.use(language);
        this.translateService.setDefaultLang(language);
      });

    const storedLang: string = this.store.selectSnapshot(
      AppSettingsPanelState.getLanguage,
    );

    if (!storedLang) {
      const browserLang: string =
        this.translateService.getBrowserLang() || 'ua';
      this.store.dispatch(new AppSettingsPanelActions.SetLanguage(browserLang));
    }
  }

  private async generateFingerprint(): Promise<void> {
    this.store.dispatch(
      new AuthActions.SetFingerprint(
        await this.fingerprintService.generateFingerprint(),
      ),
    );
  }
}

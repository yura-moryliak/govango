import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from 'primeng/toast';
import { Store } from '@ngxs/store';
import { MessageService, ToastMessageOptions } from 'primeng/api';
import { ToastState } from './shared/states/toast/toast.state';
import { TOASTS_CONFIG } from './shared/toasts.config';
import { AppSettingsPanelComponent } from './shared/components/app-settings-panel/app-settings-panel.component';
import { Subscription } from 'rxjs';
import { AppSettingsPanelState } from './shared/states/app-settings-panel/app-settings-panel.state';

@Component({
  selector: 'gvg-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, Toast, AppSettingsPanelComponent],
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly store: Store = inject(Store);
  private readonly messageService: MessageService = inject(MessageService);

  private readonly sub: Subscription = new Subscription();

  readonly toasts = TOASTS_CONFIG;

  constructor() {}

  ngOnInit(): void {
    this.initToastMessages();
    this.initDarkMode();
  }

  private initToastMessages(): void {
    this.sub.add(
      this.store
        .select(ToastState.toast)
        .subscribe((options: ToastMessageOptions) =>
          this.messageService.add(options),
        ),
    );
  }

  private initDarkMode(): void {
    this.sub.add(
      this.store
        .select(AppSettingsPanelState.isDarkMode)
        .subscribe((isDarkMode: boolean) => {
          if (isDarkMode) {
            document.querySelector('html')?.classList.add('gvg-dark-theme');
          }
        }),
    );
  }
}

// TODO This is what I'll need when will try to implement language switcher
// export class AppComponent implements OnInit {
//   private translateService: TranslateService = inject(TranslateService);
//
//   ngOnInit(): void {
//     // TODO Need to provide save default locale in local storage
//     const browserLang = this.translateService.getBrowserLang() as string;
//     const selectedLang = environment.locales.includes(browserLang)
//       ? browserLang
//       : 'en';
//     this.translateService.use(selectedLang);
//   }
//
//   switchLang(lang: string): void {
//     this.translateService.use(lang);
//   }
// }

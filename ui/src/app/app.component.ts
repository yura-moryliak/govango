import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Toast } from 'primeng/toast';
import { Store } from '@ngxs/store';
import { MessageService, ToastMessageOptions } from 'primeng/api';
import { ToastState } from './shared/states/toast/toast.state';

@Component({
  selector: 'gvg-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, Toast],
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly store: Store = inject(Store);
  private readonly messageService: MessageService = inject(MessageService);

  constructor() {
    inject(TranslateService).use('ua');
  }

  ngOnInit(): void {
    this.store
      .select(ToastState.toast)
      .subscribe((options: ToastMessageOptions) =>
        this.messageService.add(options),
      );
  }

  ngOnDestroy(): void {}
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

import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'gvg-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet],
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor() {
    inject(TranslateService).use('ua');
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

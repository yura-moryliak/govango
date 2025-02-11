import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment.development';

@Component({
  selector: 'gvg-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, TranslatePipe],
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private translateService: TranslateService = inject(TranslateService);

  ngOnInit(): void {
    // TODO Need to provide save default locale in local storage
    const browserLang = this.translateService.getBrowserLang() as string;
    const selectedLang = environment.locales.includes(browserLang)
      ? browserLang
      : 'en';
    this.translateService.use(selectedLang);
  }

  switchLang(lang: string): void {
    this.translateService.use(lang);
  }
}

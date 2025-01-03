import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(private translocoService: TranslocoService) {}

  setLanguage(lang: string) {
    this.translocoService.setActiveLang(lang);
  }
}

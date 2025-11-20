import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TRANSLATIONS, LanguageCode } from '../../shared/i18n/translations';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private readonly storageKey = 'portfolio.language';
  private readonly languageSubject = new BehaviorSubject<LanguageCode>(this.loadLanguage());
  readonly language$ = this.languageSubject.asObservable();

  get currentLanguage(): LanguageCode {
    return this.languageSubject.value;
  }

  setLanguage(language: LanguageCode): void {
    if (language === this.languageSubject.value) {
      return;
    }
    localStorage.setItem(this.storageKey, language);
    this.languageSubject.next(language);
  }

  translate(key: string): string {
    const lang = this.languageSubject.value;
    const dictionary = TRANSLATIONS[lang] ?? TRANSLATIONS.es;
    return dictionary[key] ?? key;
  }

  availableLanguages(): LanguageCode[] {
    return Object.keys(TRANSLATIONS) as LanguageCode[];
  }

  private loadLanguage(): LanguageCode {
    const stored = localStorage.getItem(this.storageKey) as LanguageCode | null;
    if (stored && TRANSLATIONS[stored]) {
      return stored;
    }
    const browserLang = navigator.language?.split('-')[0]?.toLowerCase();
    if (browserLang && TRANSLATIONS[browserLang as LanguageCode]) {
      return browserLang as LanguageCode;
    }
    return 'es';
  }
}

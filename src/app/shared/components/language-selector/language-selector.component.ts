import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslationService } from '../../../core/services/translation.service';
import { LanguageCode, LANGUAGE_CODES } from '../../i18n/translations';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent {
  readonly languages: { code: LanguageCode; label: string }[] = LANGUAGE_CODES.map(
    (code) => ({
      code,
      label: code.toUpperCase()
    })
  );
  readonly current$: Observable<LanguageCode>;

  constructor(private readonly translationService: TranslationService) {
    this.current$ = this.translationService.language$;
  }

  selectLanguage(language: LanguageCode): void {
    this.translationService.setLanguage(language);
  }
}

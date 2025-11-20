import { ChangeDetectorRef, DestroyRef, Pipe, PipeTransform } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslationService } from '../../core/services/translation.service';

@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform {
  private subscription: Subscription;

  constructor(
    private readonly translationService: TranslationService,
    private readonly cdr: ChangeDetectorRef,
    destroyRef: DestroyRef
  ) {
    this.subscription = this.translationService.language$.subscribe(() => {
      this.cdr.markForCheck();
    });
    destroyRef.onDestroy(() => this.subscription.unsubscribe());
  }

  transform(key: string): string {
    return this.translationService.translate(key);
  }
}

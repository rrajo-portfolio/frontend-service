import {
  EnvironmentInjector,
  Inject,
  Injectable,
  PLATFORM_ID,
  createComponent
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class PrefetchService {
  private readonly warmed = new Set<string>();

  constructor(
    private readonly environmentInjector: EnvironmentInjector,
    @Inject(PLATFORM_ID) private readonly platformId: object
  ) {}

  warmCriticalFlows(): void {
    if (!this.isBrowser()) {
      return;
    }
    this.preloadChunk('profile-module', () =>
      import('../../features/profile/profile.module')
    );
    this.preloadChunk('orders-module', () =>
      import('../../features/orders/orders.module')
    );
    this.warmProductDetailComponent();
  }

  warmProductDetailComponent(): void {
    if (!this.isBrowser()) {
      return;
    }
    this.preloadChunk('product-detail', async () => {
      const { ProductDetailComponent } = await import(
        '../../features/catalog/components/product-detail/product-detail.component'
      );
      const componentRef = createComponent(ProductDetailComponent, {
        environmentInjector: this.environmentInjector
      });
      componentRef.instance.displayMode = 'modal';
      componentRef.changeDetectorRef.detectChanges();
      setTimeout(() => componentRef.destroy());
    });
  }

  private preloadChunk(key: string, loader: () => Promise<unknown>): void {
    if (this.warmed.has(key)) {
      return;
    }
    this.warmed.add(key);
    loader().catch(() => this.warmed.delete(key));
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}

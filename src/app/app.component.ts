import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { AuthService } from './core/services/auth.service';
import { LoadingService } from './core/services/loading.service';
import { PrefetchService } from './core/services/prefetch.service';
import { NotificationService } from './core/services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  readonly loading$: Observable<boolean>;
  private readonly appTitle = 'Portfolio Platform';

  constructor(
    private readonly authService: AuthService,
    loadingService: LoadingService,
    private readonly titleService: Title,
    private readonly prefetchService: PrefetchService,
    private readonly notificationService: NotificationService
  ) {
    this.loading$ = loadingService.loading$;
    this.authService.init().subscribe();
    this.notificationService.initializeFeed();
  }

  ngOnInit(): void {
    this.titleService.setTitle(this.appTitle);
    this.ensureFavicon();
    this.prefetchService.warmCriticalFlows();
  }

  logout(): void {
    this.authService.logout();
  }

  private ensureFavicon(): void {
    const favicon = document.querySelector<HTMLLinkElement>("link[rel='icon']");
    if (favicon) {
      favicon.href = 'assets/icons/favicon.ico';
    }
  }
}

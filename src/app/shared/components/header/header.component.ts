import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { Subject, catchError, debounceTime, of, switchMap, takeUntil } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import {
  NotificationService,
  NotificationType,
  UiNotification
} from '../../../core/services/notification.service';
import { SearchService, GlobalSearchResults } from '../../../core/services/search.service';
import { OrdersService } from '../../../features/orders/services/orders.service';
import { CartService } from '../../../core/services/cart.service';
import { TranslationService } from '../../../core/services/translation.service';

interface NavLink {
  labelKey: string;
  path: string;
  icon: string;
  roles?: string[];
  excludeRoles?: string[];
  badge?: 'orders' | 'cart';
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() logout = new EventEmitter<void>();
  @ViewChild('searchInput') searchInput?: ElementRef<HTMLInputElement>;

  readonly navLinks: NavLink[] = [
    {
      labelKey: 'nav.home',
      path: '/home',
      icon: 'Home',
      roles: ['admin', 'portfolio_admin']
    },
    { labelKey: 'nav.catalog', path: '/catalog', icon: 'Package' },
    { labelKey: 'nav.orders', path: '/orders', icon: 'ShoppingBag', badge: 'orders' },
    {
      labelKey: 'nav.cart',
      path: '/cart',
      icon: 'ShoppingCart',
      roles: ['user'],
      excludeRoles: ['admin', 'portfolio_admin'],
      badge: 'cart'
    },
    { labelKey: 'nav.profile', path: '/profile', icon: 'User' },
    {
      labelKey: 'nav.admin',
      path: '/admin',
      icon: 'Shield',
      roles: ['admin', 'portfolio_admin']
    }
  ];

  userName = '';
  userEmail = '';
  userInitials = '';
  userRoles: string[] = [];

  pendingOrdersCount = 0;
  notifications: UiNotification[] = [];
  unreadNotifications = 0;
  searchResults?: GlobalSearchResults;
  searchQuery = '';
  searchLoading = false;
  cartCount = 0;

  showUserMenu = false;
  showNotifications = false;
  showSearch = false;
  mobileNavOpen = false;

  private readonly destroy$ = new Subject<void>();
  private readonly searchStream$ = new Subject<string>();

  constructor(
    private readonly authService: AuthService,
    private readonly notificationService: NotificationService,
    private readonly searchService: SearchService,
    private readonly ordersService: OrdersService,
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly cartService: CartService,
    private readonly translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.loadUserSnapshot();
    this.listenForOrders();
    this.listenForNotifications();
    this.initSearchStream();
    this.cartService.items$
      .pipe(takeUntil(this.destroy$))
      .subscribe((items) => {
        this.cartCount = items.reduce((total, item) => total + item.quantity, 0);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadUserSnapshot(): void {
    const profile = this.authService.getProfile();
    const fallbackName = this.translationService.translate('header.user.defaultName');
    const fallbackEmail = this.translationService.translate('header.user.defaultEmail');
    this.userName =
      `${profile?.firstName ?? ''} ${profile?.lastName ?? ''}`.trim() || fallbackName;
    this.userEmail = profile?.email ?? fallbackEmail;
    this.userInitials = this.userName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((segment) => segment[0]?.toUpperCase() ?? '')
      .join('');
    this.userRoles = this.authService.getRoles();
  }

  private listenForOrders(): void {
    this.ordersService
      .getOrders()
      .pipe(takeUntil(this.destroy$))
      .subscribe((orders) => {
        this.pendingOrdersCount = orders.filter((order) => order.status === 'PENDING').length;
      });
  }

  private listenForNotifications(): void {
    this.notificationService
      .stream()
      .pipe(takeUntil(this.destroy$))
      .subscribe((items) => {
        this.notifications = items;
        this.unreadNotifications = items.filter((item) => !item.read).length;
      });
  }

  private initSearchStream(): void {
    this.searchStream$
      .pipe(
        debounceTime(250),
        switchMap((term) =>
          this.searchService.search(term).pipe(
            catchError(() => of({ products: [], orders: [], users: [] }))
          )
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((results) => {
        this.searchResults = results;
        this.searchLoading = false;
      });
    this.searchStream$.next('');
  }

  hasAccess(link: NavLink): boolean {
    const allowed =
      !link.roles || link.roles.length === 0
        ? true
        : link.roles.some((role) => this.userRoles.includes(role));
    const excluded =
      link.excludeRoles?.some((role) => this.userRoles.includes(role)) ?? false;
    return allowed && !excluded;
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
    if (this.showSearch) {
      setTimeout(() => this.searchInput?.nativeElement.focus(), 120);
      this.searchStream$.next(this.searchQuery);
    } else {
      this.resetSearch();
    }
  }

  closeSearch(): void {
    this.showSearch = false;
    this.resetSearch();
  }

  private resetSearch(): void {
    this.searchQuery = '';
    this.searchResults = undefined;
    this.searchLoading = false;
  }

  onSearchInput(value: string): void {
    this.searchQuery = value;
    this.searchLoading = true;
    this.searchStream$.next(value);
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
    if (this.showNotifications) {
      this.showUserMenu = false;
    }
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
    if (this.showUserMenu) {
      this.showNotifications = false;
    }
  }

  markAllNotificationsAsRead(): void {
    this.notificationService.markAllAsRead();
  }

  handleNotificationClick(notification: UiNotification): void {
    this.notificationService.markAsRead(notification.id);
    this.showNotifications = false;
  }

  getNotificationIcon(type: NotificationType): string {
    const icons: Record<NotificationType, string> = {
      info: 'Info',
      success: 'CheckCircle2',
      warning: 'AlertTriangle',
      error: 'AlertCircle'
    };
    return icons[type];
  }

  handleLogout(): void {
    this.logout.emit();
    this.showUserMenu = false;
    this.mobileNavOpen = false;
  }

  toggleMobileNav(event?: Event): void {
    event?.stopPropagation();
    this.mobileNavOpen = !this.mobileNavOpen;
    if (this.mobileNavOpen) {
      this.showNotifications = false;
      this.showUserMenu = false;
      if (this.showSearch) {
        this.closeSearch();
      }
    }
  }

  closeMobileNav(): void {
    this.mobileNavOpen = false;
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement | null;
    if (!target) {
      return;
    }
    if (!target.closest('.notifications-wrapper')) {
      this.showNotifications = false;
    }
    if (!target.closest('.user-menu')) {
      this.showUserMenu = false;
    }
    if (
      this.mobileNavOpen &&
      !target.closest('.mobile-nav__panel') &&
      !target.closest('.mobile-nav-toggle')
    ) {
      this.closeMobileNav();
    }
  }

  @HostListener('document:keydown.escape')
  handleEscape(): void {
    if (this.showSearch) {
      this.closeSearch();
      return;
    }
    if (this.mobileNavOpen) {
      this.closeMobileNav();
    }
  }

  @HostListener('window:resize')
  handleResize(): void {
    if (window.innerWidth > 1024 && this.mobileNavOpen) {
      this.closeMobileNav();
    }
  }
}






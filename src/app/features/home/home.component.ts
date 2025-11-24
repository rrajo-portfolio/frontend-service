import { Component, OnInit } from '@angular/core';
import { catchError, combineLatest, map, Observable, of } from 'rxjs';
import { CatalogService } from '../catalog/services/catalog.service';
import { OrdersService } from '../orders/services/orders.service';
import { UsersService } from '../users/services/users.service';
import { Product } from '../../shared/models/product.model';
import { Order } from '../../shared/models/order.model';
import { User } from '../../shared/models/user.model';
import { AuthService } from '../../core/services/auth.service';

interface HeroStats {
  totalProducts: number;
  pendingOrders: number;
  activeUsers: number;
  revenue: number;
  productsGrowth: number;
  usersGrowth: number;
  revenueGrowth: number;
}

interface ExperienceCard {
  titleKey: string;
  descriptionKey: string;
  icon: string;
  link: string;
  linkLabelKey: string;
}

interface QuickLink {
  titleKey: string;
  copyKey: string;
  link: string;
  external?: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  stats$!: Observable<HeroStats>;
  featuredProducts$!: Observable<Product[]>;
  readonly experienceCards: ExperienceCard[] = [
    {
      titleKey: 'home.experience.catalog.title',
      descriptionKey: 'home.experience.catalog.description',
      icon: 'Package',
      link: '/catalog',
      linkLabelKey: 'home.experience.catalog.link'
    },
    {
      titleKey: 'home.experience.orders.title',
      descriptionKey: 'home.experience.orders.description',
      icon: 'ShoppingCart',
      link: '/orders',
      linkLabelKey: 'home.experience.orders.link'
    },
    {
      titleKey: 'home.experience.identity.title',
      descriptionKey: 'home.experience.identity.description',
      icon: 'Users',
      link: '/admin',
      linkLabelKey: 'home.experience.identity.link'
    }
  ];
  readonly quickLinks: QuickLink[] = [
    {
      titleKey: 'home.quickLinks.profile.title',
      copyKey: 'home.quickLinks.profile.copy',
      link: '/profile'
    },
    {
      titleKey: 'home.quickLinks.pipeline.title',
      copyKey: 'home.quickLinks.pipeline.copy',
      link: 'https://github.com/rrajo-portfolio/infra-dev/blob/main/README.md',
      external: true
    },
    {
      titleKey: 'home.quickLinks.guides.title',
      copyKey: 'home.quickLinks.guides.copy',
      link: '/admin'
    }
  ];
  userName = '';

  constructor(
    private readonly catalogService: CatalogService,
    private readonly ordersService: OrdersService,
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    const profile = this.authService.getProfile();
    this.userName = `${profile?.firstName ?? 'Developer'}`.trim() || 'Developer';
    this.featuredProducts$ = this.catalogService
      .getProducts()
      .pipe(map((items) => items.slice(0, 4)));
    this.stats$ = combineLatest([
      this.catalogService.getProducts(),
      this.ordersService.getOrders(),
      this.usersService.getUsers()
    ]).pipe(
      map(([products, orders, users]) => this.mapStats(products, orders, users)),
      catchError(() =>
        of({
          totalProducts: 0,
          pendingOrders: 0,
          activeUsers: 0,
          revenue: 0,
          productsGrowth: 0,
          usersGrowth: 0,
          revenueGrowth: 0
        })
      )
    );
  }

  trackByProduct(index: number, product: Product): string | number {
    return product.id ?? index;
  }

  private mapStats(products: Product[], orders: Order[], users: User[]): HeroStats {
    const totalProducts = products.length;
    const pendingOrders = orders.filter((order) => order.status === 'PENDING').length;
    const activeUsers = users.filter((user) => user.active).length;
    const revenue = orders.reduce((acc, order) => acc + (order.totalAmount ?? 0), 0);
    return {
      totalProducts,
      pendingOrders,
      activeUsers,
      revenue,
      productsGrowth: totalProducts ? 12 : 0,
      usersGrowth: activeUsers ? 8 : 0,
      revenueGrowth: revenue ? 5 : 0
    };
  }
}

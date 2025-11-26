import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  getStats(): Observable<any> {
    // Mock data for now since backend might not have this specific aggregate endpoint ready
    return of({
      totalProducts: 124,
      productsGrowth: 12,
      pendingOrders: 8,
      activeUsers: 450,
      usersGrowth: 5,
      revenue: 12500,
      revenueGrowth: 8
    });
  }
}

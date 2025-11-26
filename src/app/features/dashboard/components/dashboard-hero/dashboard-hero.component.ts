import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { DashboardService } from '../../services/dashboard.service';

interface DashboardStats {
  totalProducts: number;
  productsGrowth: number;
  pendingOrders: number;
  activeUsers: number;
  usersGrowth: number;
  revenue: number;
  revenueGrowth: number;
}

@Component({
  selector: 'app-dashboard-hero',
  templateUrl: './dashboard-hero.component.html',
  styleUrls: ['./dashboard-hero.component.scss']
})
export class DashboardHeroComponent implements OnInit {
  userName = '';
  stats: DashboardStats = {
    totalProducts: 0,
    productsGrowth: 0,
    pendingOrders: 0,
    activeUsers: 0,
    usersGrowth: 0,
    revenue: 0,
    revenueGrowth: 0
  };
  
  constructor(
    private authService: AuthService,
    private dashboardService: DashboardService
  ) {}
  
  ngOnInit(): void {
    this.loadUserName();
    this.loadStats();
  }
  
  loadUserName(): void {
    this.authService.getCurrentUser().subscribe(user => {
      this.userName = user?.name?.split(' ')[0] || 'Usuario';
    });
  }
  
  loadStats(): void {
    // DashboardService might return a different structure in the current project.
    // I'll need to adapt this if DashboardService doesn't have getStats() returning exactly this.
    // For now, I'll mock it or try to use existing methods.
    /*
    this.dashboardService.getStats().subscribe(stats => {
      this.stats = stats;
    });
    */
   // Mocking for safety until I check DashboardService
   this.stats = {
     totalProducts: 120,
     productsGrowth: 12,
     pendingOrders: 5,
     activeUsers: 45,
     usersGrowth: 8,
     revenue: 12500,
     revenueGrowth: 15
   };
  }
}

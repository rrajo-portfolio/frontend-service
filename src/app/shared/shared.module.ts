import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  LucideAngularModule,
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Bell,
  BellOff,
  BellRing,
  Box,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Copy,
  Download,
  Edit,
  Filter,
  HelpCircle,
  Home,
  Info,
  LayoutDashboard,
  LogOut,
  Package,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Shield,
  ShoppingCart,
  ShoppingBag,
  Sparkles,
  Star,
  Tag,
  TrendingUp,
  User,
  Users,
  X,
  Trash2,
  CreditCard
} from 'lucide-angular';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { LogoComponent } from './components/logo/logo.component';
import { TranslatePipe } from './pipes/translate.pipe';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoadingSpinnerComponent,
    TimeAgoPipe,
    LogoComponent,
    TranslatePipe,
    LanguageSelectorComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MaterialModule,
    LucideAngularModule.pick({
      Home,
      LayoutDashboard,
      Package,
      ShoppingCart,
      ShoppingBag,
      User,
      Users,
      Settings,
      Search,
      Bell,
      BellRing,
      BellOff,
      ChevronDown,
      ChevronRight,
      ArrowRight,
      ArrowUpRight,
      LogOut,
      HelpCircle,
      CheckCircle2,
      AlertTriangle,
      AlertCircle,
      Info,
      X,
      Star,
      Tag,
      Box,
      Edit,
      Plus,
      RefreshCw,
      TrendingUp,
      Clock,
      Filter,
      Download,
      Copy,
      Shield,
      Sparkles,
      Activity,
      Trash2,
      CreditCard
    })
  ],
  exports: [
    MaterialModule,
    HeaderComponent,
    FooterComponent,
    LoadingSpinnerComponent,
    TimeAgoPipe,
    LogoComponent,
    TranslatePipe,
    LanguageSelectorComponent,
    LucideAngularModule
  ]
})
export class SharedModule {}

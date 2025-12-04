import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  LucideAngularModule,
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart2,
  Bell,
  BellOff,
  BellRing,
  Box,
  Camera,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Copy,
  CreditCard,
  Download,
  Edit,
  ExternalLink,
  Filter,
  HelpCircle,
  Home,
  Info,
  KeyRound,
  LayoutDashboard,
  Lock,
  LogOut,
  Menu,
  Monitor,
  Package,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Shield,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Star,
  Tag,
  Trash2,
  TrendingUp,
  User,
  Users,
  X
} from 'lucide-angular';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { LogoComponent } from './components/logo/logo.component';
import { TranslatePipe } from './pipes/translate.pipe';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { BackButtonComponent } from './components/back-button/back-button.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ToastContainerComponent } from './components/toast-container/toast-container.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoadingSpinnerComponent,
    TimeAgoPipe,
    LogoComponent,
    TranslatePipe,
    LanguageSelectorComponent,
    BackButtonComponent,
    ProductCardComponent,
    ToastContainerComponent
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
      ArrowLeft,
      ArrowRight,
      ArrowUpRight,
      BarChart2,
      LogOut,
      HelpCircle,
      Menu,
      CheckCircle2,
      AlertTriangle,
      AlertCircle,
      Info,
      X,
      Star,
      Tag,
      ExternalLink,
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
      ShieldCheck,
      KeyRound,
      Sparkles,
      Activity,
      Trash2,
      CreditCard,
      Camera,
      Lock,
      Monitor
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
    LucideAngularModule,
    BackButtonComponent,
    ProductCardComponent,
    ToastContainerComponent
  ]
})
export class SharedModule {}

import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  interval,
  map,
  switchMap,
  tap
} from 'rxjs';
import { ApiService } from './api.service';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface UiNotification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: Date;
}

export interface ToastNotification {
  id: string;
  message: string;
  type: NotificationType;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly notifications$ = new BehaviorSubject<UiNotification[]>([]);
  private readonly toastMessages$ = new BehaviorSubject<ToastNotification[]>([]);
  private readonly toastTimers = new Map<string, ReturnType<typeof setTimeout>>();
  private pollingSub?: Subscription;
  private lastEventId?: number;
  private initialized = false;
  private readonly pollIntervalMs = 15000;

  constructor(private readonly api: ApiService) {}

  initializeFeed(): void {
    if (this.initialized) {
      return;
    }
    this.initialized = true;
    this.refreshNotifications();
    this.pollingSub = interval(this.pollIntervalMs)
      .pipe(switchMap(() => this.fetchLatest()))
      .subscribe();
  }

  success(message: string): void {
    this.enqueueToast(message, 'success');
  }

  error(message: string): void {
    this.enqueueToast(message, 'error');
  }

  stream(): Observable<UiNotification[]> {
    return this.notifications$.asObservable();
  }

  unreadCount(): Observable<number> {
    return this.stream().pipe(
      map((notifications) => notifications.filter((n) => !n.read).length)
    );
  }

  markAsRead(id: string): void {
    const next = this.notifications$
      .getValue()
      .map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      );
    this.notifications$.next(next);
  }

  markAllAsRead(): void {
    const next = this.notifications$
      .getValue()
      .map((notification) => ({ ...notification, read: true }));
    this.notifications$.next(next);
  }

  toastStream(): Observable<ToastNotification[]> {
    return this.toastMessages$.asObservable();
  }

  dismissToast(id: string): void {
    const timer = this.toastTimers.get(id);
    if (timer) {
      clearTimeout(timer);
      this.toastTimers.delete(id);
    }
    this.toastMessages$.next(
      this.toastMessages$.getValue().filter((toast) => toast.id !== id)
    );
  }

  private refreshNotifications(): void {
    this.fetchLatest()
      .pipe(tap((items) => this.mergeNotifications(items)))
      .subscribe();
  }

  private fetchLatest() {
    const params: Record<string, string | number> = { limit: 20 };
    if (this.lastEventId) {
      params['sinceId'] = this.lastEventId;
    }
    return this.api
      .get<NotificationFeedResponse>('/notifications', { params })
      .pipe(
        map((response) => {
          if (response.lastEventId) {
            this.lastEventId = response.lastEventId;
          }
          return response.items.map((item) => this.mapToUiNotification(item));
        }),
        tap((items) => {
          if (items.length > 0) {
            this.mergeNotifications(items);
            this.raiseToastFor(items[0]);
          }
        })
      );
  }

  private mergeNotifications(newOnes: UiNotification[]): void {
    if (!newOnes.length) {
      return;
    }
    const existing = this.notifications$.getValue();
    const merged = [...newOnes, ...existing]
      .reduce((acc, current) => {
        if (!acc.some((item) => item.id === current.id)) {
          acc.push(current);
        }
        return acc;
      }, [] as UiNotification[])
      .slice(0, 50);
    this.notifications$.next(merged);
  }

  private mapToUiNotification(item: NotificationApiItem): UiNotification {
    return {
      id: item.id.toString(),
      title: item.title,
      message: item.message,
      type: this.mapSeverity(item.severity),
      read: false,
      createdAt: new Date(item.createdAt)
    };
  }

  private mapSeverity(severity: string): NotificationType {
    switch (severity) {
      case 'SUCCESS':
        return 'success';
      case 'WARNING':
        return 'warning';
      case 'ERROR':
        return 'error';
      default:
        return 'info';
    }
  }

  private raiseToastFor(notification: UiNotification): void {
    if (notification.type === 'success' || notification.type === 'warning') {
      this.enqueueToast(
        `${notification.title}: ${notification.message}`,
        notification.type
      );
    }
  }

  private enqueueToast(message: string, type: NotificationType): void {
    const toast: ToastNotification = {
      id: this.generateId(),
      message,
      type
    };
    this.toastMessages$.next([...this.toastMessages$.getValue(), toast]);
    const timer = setTimeout(() => this.dismissToast(toast.id), 4000);
    this.toastTimers.set(toast.id, timer);
  }

  private generateId(): string {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
    return Math.random().toString(36).slice(2, 11);
  }
}

interface NotificationFeedResponse {
  items: NotificationApiItem[];
  lastEventId: number | null;
  count: number;
}

interface NotificationApiItem {
  id: number;
  category: string;
  title: string;
  message: string;
  severity: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
  createdAt: string;
  metadata?: Record<string, unknown>;
}

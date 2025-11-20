import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, map, Observable } from 'rxjs';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface UiNotification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: Date;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly notifications$ = new BehaviorSubject<UiNotification[]>([
    {
      id: 'notif-1',
      title: 'Nuevo despliegue exitoso',
      message: 'Jenkins desplegó portfolio-infra con Helm.',
      type: 'success',
      read: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 5)
    },
    {
      id: 'notif-2',
      title: 'Pedido pendiente',
      message: 'Hay pedidos en estado PENDING esperando revisión.',
      type: 'warning',
      read: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 25)
    },
    {
      id: 'notif-3',
      title: 'Recordatorio de seguridad',
      message: 'Revisa los roles en Keycloak para la demo de hoy.',
      type: 'info',
      read: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4)
    }
  ]);

  constructor(private readonly snackBar: MatSnackBar) {}

  success(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: ['snackbar-success']
    });
  }

  error(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      panelClass: ['snackbar-error']
    });
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
}

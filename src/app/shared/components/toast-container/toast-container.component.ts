import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import {
  NotificationService,
  ToastNotification
} from '../../../core/services/notification.service';

@Component({
  selector: 'app-toast-container',
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.scss']
})
export class ToastContainerComponent {
  toasts$: Observable<ToastNotification[]>;

  constructor(private readonly notificationService: NotificationService) {
    this.toasts$ = this.notificationService.toastStream();
  }

  dismissToast(id: string): void {
    this.notificationService.dismissToast(id);
  }

  trackById(_: number, toast: ToastNotification): string {
    return toast.id;
  }
}

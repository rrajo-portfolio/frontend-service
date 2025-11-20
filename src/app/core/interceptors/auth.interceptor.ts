import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly authService: AuthService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!this.authService.isAuthenticated()) {
      return next.handle(req);
    }

    return from(this.authService.getToken()).pipe(
      switchMap((token) => {
        const cloned = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });
        return next.handle(cloned);
      })
    );
  }
}

import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';

@Injectable()
export class OnlineOrOfflineInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!navigator.onLine) {
      const config = {
        duration: 5000
      }
      this.snackBar.open("آفلاین هستید، لطفا به اینترنت متصل شوید.", "متوجه شدم", config)
      return EMPTY
    }
    return next.handle(request);
  }
}

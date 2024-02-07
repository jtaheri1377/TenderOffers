import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/Operators";
import { map } from "rxjs/internal/operators/map";
import { AuthService } from "../../services/auth.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private snackbar: MatSnackBar,
    private router: Router,
    private service: AuthService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map((error: any) => {
        return error;
      }),
      catchError((error: HttpErrorResponse) => {
        let result = "";
        switch (error.status) {
          case 401: {
            this.service.logout();
            this.service.goToLogin();
            result = "لطفا وارد حساب کاربری خود شوید!";
            break;
          }
          default:
            result = "خطایی رخ داد!" + error.message;
            break;
        }
        this.snackbar.open(result == "" ? error.message : result, "متوجه شدم!");
        return throwError(error);
      })
    );
  }
}

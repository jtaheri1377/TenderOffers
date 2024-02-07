import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { OnlineOrOfflineInterceptor } from "./interceptors/isOnline/online-or-offline.interceptor";
import { AuthorizationInterceptor } from "./interceptors/authorization/authorization.interceptor";
import { ErrorInterceptor } from "./interceptors/error/error.interceptor";

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: OnlineOrOfflineInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}

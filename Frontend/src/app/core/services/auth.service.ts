import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, of } from "rxjs";
import { User } from "../models/user.model";
import { Router } from "@angular/router";
import { UserType } from "../Enums/user";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { environment } from "src/environments/environment.development";
import { map, switchMap } from "rxjs/Operators";
import { Signup } from "src/app/modules/auth/models/signup.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  userUpdated$ = new BehaviorSubject<User | null>(this.getCurrentUser());
  user$ = this.userUpdated$.asObservable();
  user: any | null = null;
  constructor(private router: Router, private http: HttpClient) { }

  goToLogin() {
    this.router.navigate(["/auth"]);
  }

  getLastUser() {
    return this.userUpdated$.value;
  }

  login(user: any): Observable<any> {
    return this.http
      .post(environment.apiEndpoint + "Auth/Login", user, {
        observe: "response",
        responseType: "text",
      }).pipe(
        switchMap((res: any) => {
          if (res.ok) {
            const token = res.body;
            if (token) {
              localStorage.setItem("token", JSON.stringify(token));
              return this.http.get(environment.apiEndpoint + "Auth/GetCurrent", {
                observe: "response",
              })
            }

          } return of(true);
        }),
        map((_user: any) => {
          if (_user.ok) {
            this.user = _user.body;
            localStorage.setItem("user", JSON.stringify(this.user));
            this.userUpdated$.next(this.user);
          }
        })
      );
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.user = null;
    this.goToLogin();
    this.userUpdated$.next(null);
  }

  saveCurrentUser() {
    const token = JSON.parse(localStorage.getItem("token")!);
    this.http
      .get<HttpResponse<User>>(environment.apiEndpoint + "Auth/GetCurrent", {
        headers: new HttpHeaders({ Authorization: token }),
        observe: "response",
      })
      .subscribe(
        (_user) => {
          if (_user.ok) {
            this.user = _user.body;
            localStorage.setItem("user", JSON.stringify(this.user));
            this.userUpdated$.next(this.user);
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getCurrentUser(): User | null {
    this.user = JSON.parse(localStorage.getItem("user")!);
    if (this.user) {
      return this.user;
    } else {
      return null;
    }
  }

  getUserBaseUrl() {
    const userType =
      this.getCurrentUser()?.type == 0 ? UserType.admin : UserType.contractor;
    return userType === UserType.admin ? "admin" : "contractor";
  }

  async signup(user: Signup): Promise<Observable<any>> {
    const signup = await this.http
      .post(environment.apiEndpoint + "Auth/Signup", user, {
        observe: "response",
      }).toPromise();
    if (signup.ok) {
      var _user = {
        username: user.username,
        password: user.password,
      }
      return this.login(_user);
    }
    else
      return of();

  }
}

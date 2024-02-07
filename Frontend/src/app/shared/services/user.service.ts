import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.development";
import { User } from "src/app/core/models/user.model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  baseUrl = `${environment.apiEndpoint}User/`;
  constructor(private http: HttpClient) { }

  getContractors(): Observable<HttpResponse<User[]>> {
    return this.http.get<User[]>(`${this.baseUrl}GetContractors`, {
      observe: "response",
    });
  }
}

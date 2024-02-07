import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Tender } from "src/app/core/models/tender.model";
import { environment } from "src/environments/environment.development";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  baseUrl = environment.apiEndpoint;

  constructor(private http: HttpClient) {}

  saveTender(tender: Tender): Observable<HttpResponse<Tender>> {
    const url = `${this.baseUrl}tender/`;
    if (tender.id) {
      //EditMode
      return this.http.put<Tender>(url + tender.id, tender, {
        observe: "response",
      });
    } else {
      //CreateMode
      return this.http.post<Tender>(url, tender, {
        observe: "response",
      });
    }
  }
}

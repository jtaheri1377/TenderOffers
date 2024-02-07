import { Tender } from "src/app/core/models/tender.model";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment.development";

@Injectable({
  providedIn: "root",
})
export class TenderService {
  baseUrl = `${environment.apiEndpoint}Tender/`;
  tendersUpdated$: Subject<void> = new Subject();

  constructor(private http: HttpClient) { }

  getAll(): Observable<HttpResponse<Tender[]>> {
    return this.http.get<Tender[]>(`${this.baseUrl}GetAll`, {
      observe: "response",
    });
  }

  get(id: string): Observable<HttpResponse<Tender>> {
    return this.http.get<Tender>(`${this.baseUrl}${id}`, {
      observe: "response",
    });
  }

  delete(id: string): Observable<HttpResponse<Tender>> {
    return this.http.delete<Tender>(`${this.baseUrl}${id}`, {
      observe: "response",
    });
  }

  chooseContributor(tenderItem: Tender) {
    return this.http.put(
      `${this.baseUrl}${tenderItem.id}`,
      tenderItem,
      {
        observe: "response",
      }
    );
  }


}

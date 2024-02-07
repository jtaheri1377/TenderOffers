import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Tender } from "src/app/core/models/tender.model";
import { environment } from "src/environments/environment.development";

@Injectable({
  providedIn: "root",
})
export class ContractorService {
  baseUrl = environment.apiEndpoint;

  constructor(private http: HttpClient) {}

  contributeOnTender(tender: Tender): Observable<HttpResponse<Tender[]>> {
    return this.http.put<Tender[]>(
      `${this.baseUrl}tender/${tender.id}`,
      tender,
      {
        observe: "response",
      }
    );
  }
}

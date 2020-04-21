import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { BusinessPartner } from "./business-partner";


@Injectable({ providedIn: 'root' })
export class BusinessPartnerService {
  private businessPartnerUrl = "api/bp"; // URL to web api

  constructor(private http: HttpClient) { }

  lookup(key: string): Observable<BusinessPartner[]> {
    console.info('BP Service: ' + key);
    /* return this.http
      .get<BusinessPartner>('${this.businessPartnerUrl}/?key=${key}')
      .pipe(catchError(this.handleError<BusinessPartner>("lookup", null))); */
    return [];
  }
}

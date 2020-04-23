import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of, zip, combineLatest } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { BusinessPartner } from "./business-partner";


@Injectable({ providedIn: 'root' })
export class BusinessPartnerService {
  private businessPartnerUrl = "static-data/business-partners"; // URL to web api

  constructor(private http: HttpClient) { }

  lookup(term: string): Observable<BusinessPartner[]> {
    console.info('BP Service: ' + term);
    const obsBp1Arr = this.http
      .get<BusinessPartner[]>(`${this.businessPartnerUrl}/?key=${term}`)
      .pipe(catchError(this.handleError<BusinessPartner[]>("lookup", [])));
    console.info('obsBp1Arr: ', obsBp1Arr);
     const obsBp2Arr = this.http
      .get<BusinessPartner[]>(`${this.businessPartnerUrl}/?name=${term}`)
      .pipe(catchError(this.handleError<BusinessPartner[]>("lookup", [])));
    ;
    console.info('obsBp2Arr: ', obsBp2Arr);
    return obsBp1Arr;
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
    

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

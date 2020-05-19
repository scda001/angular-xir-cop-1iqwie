import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, combineLatest, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { BusinessPartner } from "./business-partner";

@Injectable({ providedIn: "root" })
export class BusinessPartnerService {
  private businessPartnerUrl = "static-data/business-partners"; // URL to web api

  constructor(private http: HttpClient) {}

  lookupByKey(key: string): Observable<BusinessPartner[]> {
    console.info("BP Service: " + key);
    const obsBp1Arr = this.http
      .get<BusinessPartner[]>(`${this.businessPartnerUrl}?key=^${key}`)
      .pipe(catchError(this.handleError<BusinessPartner[]>("lookupByKey", [])));

    console.info("obsBp1Arr: ", obsBp1Arr);
    return obsBp1Arr;
  }

  lookupByName(name: string): Observable<BusinessPartner[]> {
    console.info("BP Service: " + name);
    const obsBp2Arr = this.http
      .get<BusinessPartner[]>(`${this.businessPartnerUrl}?name=^${name}`)
      .pipe(
        catchError(this.handleError<BusinessPartner[]>("lookupByName", []))
      );

    console.info("obsBp2Arr: ", obsBp2Arr);
    return obsBp2Arr;
  }

  private equals(bp1: BusinessPartner, bp2: BusinessPartner): boolean {
    return bp1.key === bp2.key;
  }

  union(a1: BusinessPartner[], a2: BusinessPartner[]): BusinessPartner[] {
    /* avoid duplicates: */
    let result: BusinessPartner[] = [];
    console.info("start union: a1:" + a1 + " a2: " + a2);
    a1.forEach(item => result.push(item));
    for (let newItem of a2) {
      let found: boolean = false;
      for (let item of result) {
        if (this.equals(item, newItem)) {
          found = true;
          break;
        }
      }
      if (!found || result.length === 0) {
        result.push(newItem);
      }
    }
    console.info("result: " + result);
    return result;
  }

  lookupByTerm(term: string): Observable<BusinessPartner[]> {
    console.info("BP Service: " + term);

    const obsBp1Arr = this.http
      .get<BusinessPartner[]>(`${this.businessPartnerUrl}?key=^${term}`)
      .pipe(catchError(this.handleError<BusinessPartner[]>("lookupByKey", [])));

    const obsBp2Arr = this.http
      .get<BusinessPartner[]>(`${this.businessPartnerUrl}?name=^${term}`)
      .pipe(
        catchError(this.handleError<BusinessPartner[]>("lookupByName", []))
      );

    const obsBp3Arr = combineLatest(obsBp1Arr, obsBp2Arr).pipe(
       map(([bpArr1, bpArr2]) => this.union(bpArr1, bpArr2))
    );

    return obsBp3Arr;
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

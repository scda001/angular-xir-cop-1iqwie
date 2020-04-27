import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable} from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { BusinessPartner } from "./business-partner";

@Injectable({ providedIn: "root" })
export class BusinessPartnerService {
  private businessPartnerUrl = "static-data/business-partners"; // URL to web api

  constructor(private http: HttpClient) {}

  lookupByKey(key: string): Observable<BusinessPartner[]> {
    console.info("BP Service: " + key);
    var obsBp1Arr: Observable<BusinessPartner[]> = Observable.create();
    /* if (key) { */
      obsBp1Arr = this.http
        .get<BusinessPartner[]>(`${this.businessPartnerUrl}?key=^${key}`)
        .pipe(
          catchError(this.handleError<BusinessPartner[]>("lookupByKey", []))
        );
    /* } else {
      console.info("key was empty.");
    }
    */
    /*
     const obsBp2Arr = this.http
      .get<BusinessPartner[]>(`${this.businessPartnerUrl}/?name=${key}`)
      .pipe(catchError(this.handleError<BusinessPartner[]>("lookup", [])));
    ;
    console.info('obsBp2Arr: ', obsBp2Arr);
    combineLatest(obsBp1Arr, obsBp2Arr).subscribe(([bp1Arr, bp2Arr]) => 
    { console.info('bp1Arr:', bp1Arr ); console.info('bp2Arr:', bp2Arr ); console.info('bp1Arr.concat(bp2Arr): ', bp1Arr.concat(bp2Arr)); bp3Arr = bp1Arr.concat(bp2Arr); }
    );
    console.info('bp3Arr:', bp3Arr ); */
    /* Problem: kann aus bp3Arr keinen Observable<BusinessPartner[] machen */
    console.info("obsBp1Arr: ", obsBp1Arr);
    return obsBp1Arr;
  }

  lookupByName(name: string): Observable<BusinessPartner[]> {
    console.info("BP Service: " + name);
    var obsBp2Arr: Observable<BusinessPartner[]> = Observable.create();
    /* if (name) { */
      obsBp2Arr = this.http
        .get<BusinessPartner[]>(`${this.businessPartnerUrl}?name=^${name}`)
        .pipe(
          catchError(this.handleError<BusinessPartner[]>("lookupByName", []))
        );
    /* } else {
      console.info("name was empty.");
    }
    */
    console.info("obsBp2Arr: ", obsBp2Arr);
    return obsBp2Arr;
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

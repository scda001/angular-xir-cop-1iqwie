import { Component, OnInit } from "@angular/core";
import { Observable, Subject, combineLatest } from "rxjs";

import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";

import { BusinessPartner } from "../business-partner";
import { BusinessPartnerService } from "../business-partner.service";

@Component({
  selector: "app-client-info",
  templateUrl: "./client-info.component.html",
  styleUrls: ["./client-info.component.css"]
})
export class ClientInfoComponent implements OnInit {
  businessPartnersByKey: Observable<BusinessPartner[]>;
  businessPartnersByName: Observable<BusinessPartner[]>;
  businessPartners: BusinessPartner[];

  private searchTerms = new Subject<string>();

  constructor(private businessPartnerService: BusinessPartnerService) {}

  // Push a lookup term into the observable stream.
  lookup(term: string): void {
    if (term) {
      this.searchTerms.next(term);
    } else {
      this.searchTerms.next("lkkasjdfkljasdfkljk"); /* ugly work around to get empty list for empty term */
    }
    console.info("term: " + term);
    console.info("BP[]: ", this.businessPartners);
  }

  equals(bp1: BusinessPartner, bp2: BusinessPartner): boolean {
    return bp1.key === bp2.key;
  }

  ngOnInit(): void {
    /*this.businessPartner = businessPartners[0];*/

    this.businessPartnersByKey = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(100),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((key: string) =>
        this.businessPartnerService.lookupByKey(key)
      ) /* */
    );

    this.businessPartnersByName = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(100),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((name: string) =>
        this.businessPartnerService.lookupByName(name)
      )
    );

    combineLatest(
      this.businessPartnersByKey,
      this.businessPartnersByName
    ).subscribe(([bp1Arr, bp2Arr]) => {
      console.info("bp1Arr:", bp1Arr);
      console.info("bp2Arr:", bp2Arr);
      /* avoid duplicates: */
      var bp3Arr: BusinessPartner[] = [];
      bp1Arr.forEach(item => bp3Arr.push(item));
      for (let newItem of bp2Arr) {
        let found: boolean = false;
        for (let item of bp3Arr) {
          if (this.equals(item, newItem)) {
            found = true;
            break;
          }
        }
        if (!found || bp3Arr.length === 0) {
          bp3Arr.push(newItem);
        }
      }
      console.info("bp3Arr:", bp3Arr);
      this.businessPartners = bp3Arr;
    });
  }
}

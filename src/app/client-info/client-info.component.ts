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

  // Push a lookup key into the observable stream.
  lookup(key: string): void {
    this.searchTerms.next(key);
    console.info("key: " + key);
    console.info("searchTerms: ", this.searchTerms);
    console.info("BP[]: ", this.businessPartners);
  }

  ngOnInit(): void {
    /*this.businessPartner = businessPartners[0];*/

    this.businessPartnersByKey = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((key: string) => this.businessPartnerService.lookupByKey(key)), /* */
    );

    this.businessPartnersByName = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((key: string) => this.businessPartnerService.lookupByName(key)), /* */
    );

    combineLatest(this.businessPartnersByKey, this.businessPartnersByName).subscribe(([bp1Arr, bp2Arr]) => 
    { console.info('bp1Arr:', bp1Arr ); console.info('bp2Arr:', bp2Arr ); console.info('bp1Arr.concat(bp2Arr): ', this.businessPartners = bp1Arr.concat(bp2Arr)); }
    );

  }
}

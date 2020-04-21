import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { BusinessPartner } from '../business-partner';
import { BusinessPartnerService } from '../business-partner.service';

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.css']
})
export class ClientInfoComponent implements OnInit {
businessPartners: Observable<BusinessPartner[]>;
private searchTerms = new Subject<string>();

  constructor(private businessPartnerService: BusinessPartnerService) { }

  // Push a lookup key into the observable stream.
  lookup(key: string): void {
    this.searchTerms.next(key);
    console.info('key: ' + key);
  }

  ngOnInit(): void {
    /*this.businessPartner = businessPartners[0];*/
  
    this.businessPartners = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((key: string) => this.businessPartnerService.lookup(key))
    );

  }

}
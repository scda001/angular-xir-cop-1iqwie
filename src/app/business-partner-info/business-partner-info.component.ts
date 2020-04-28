import { Component, OnInit } from "@angular/core";
import { Observable, Subject, combineLatest } from "rxjs";

import { FormControl } from "@angular/forms";
import { startWith, map } from "rxjs/operators";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { BusinessPartner } from "../business-partner";
import { BusinessPartnerService } from "../business-partner.service";

@Component({
  selector: "app-business-partner-info",
  templateUrl: "./business-partner-info.component.html",
  styleUrls: ["./business-partner-info.component.css"]
})
export class BusinessPartnerInfoComponent implements OnInit {
  businessPartnersByTerm: Observable<BusinessPartner[]>;

  showAutocomplete = true;

  constructor(private businessPartnerService: BusinessPartnerService) {}

  control = new FormControl();


  /*
  streets: string[] = ['Champs-Élysées', 'Lombard Street', 'Abbey Road', 'Fifth Avenue'];
  filteredStreets: Observable<string[]>;
  */

  ngOnInit() {
    this.businessPartnersByTerm = this.control.valueChanges.pipe(
      /* startWith(''), 
      map(value => this._filter(value)) */
      switchMap((key: string) => this.businessPartnerService.lookupByTerm(key))
    );
  }

  updatedVal(e) {
    if (e && e.length >= 1) {
      this.showAutocomplete = true;
    } else {
      this.showAutocomplete = false;
    }
  }

  /*
  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.streets.filter(street => this._normalizeValue(street).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
  */

  onBPSelected(value) {
    console.info('Input value: ', value);
    window.alert("BP Selected: " + value.id + ": " + value.name);
  }
}

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

  ngOnInit() {
    this.businessPartnersByTerm = this.control.valueChanges.pipe(
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

  onBPSelected(value) {
    console.info('Input value: ', value);
    window.alert("BP Selected: " + value.id + ": " + value.name);
  }
}

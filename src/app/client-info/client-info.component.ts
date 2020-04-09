import { Component, OnInit } from '@angular/core';
import { businessPartners } from "../business-partners";

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.css']
})
export class ClientInfoComponent implements OnInit {
businessPartner;
  constructor() { }

  ngOnInit() {
    /* this.businessPartner = businessPartners[+params.get("businessPartnerId")]; */
    this.businessPartner = businessPartners[0];
  }

}
import { Component, OnInit } from '@angular/core';
import { businessPartners } from '../business-partners';

@Component({
  selector: 'app-business-partner-list',
  templateUrl: './business-partner-list.component.html',
  styleUrls: ['./business-partner-list.component.css']
})
export class BusinessPartnerListComponent implements OnInit {
businessPartners = businessPartners;
  constructor() { }

  ngOnInit() {
  }

}
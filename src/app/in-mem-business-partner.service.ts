import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { BusinessPartner } from './business-partner';

@Injectable({
  providedIn: 'root'
})
export class InMemBusinessPartnerService implements InMemoryDbService {
createDb() {
    const businessPartners: BusinessPartner[] = [
      { id: 1, key: 'zkb', name: 'Zürcher Kantonalbank' },
      { id: 2, key: 'ubs', name: 'UBS' },
      { id: 3, key: 'cs', name: 'Credit-Suisse' },
      { id:4, key:'ubp', name: 'Union Bancaire Privée'}
    ];
    return {"business-partners": businessPartners};
  }

/*
  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(businessPartners: BusinessPartner[]): number {
    return businessPartners.length > 0 ? Math.max(...businessPartners.map(businessPartner => businessPartner.id)) + 1 : 11;
  }
  */
}
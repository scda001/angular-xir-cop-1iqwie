import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemBusinessPartnerService implements InMemoryDbService {
createDb() {
    let businessPartners = [
      { id: 1, key: 'zkb', name: 'Zürcher Kantonalbank' },
      { id: 2, key: 'ubs', name: 'UBS' },
      { id: 3, key: 'cs', name: 'Credit-Suisse' },
    ];
    return {businessPartners};
  }
}
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Other imports
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { BusinessPartner } from '../app/business-partner';
import { BusinessPartnerService } from '../app/business-partner.service';
import { HttpErrorHandler } from '../app/http-error-handler.service';
import { MessageService } from '../app/message.service';

describe('BusinessPartnerService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let businessPartnerService: BusinessPartnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [ HttpClientTestingModule ],
      // Provide the service-under-test and its dependencies
      providers: [
        BusinessPartnerService,
        HttpErrorHandler,
        MessageService
      ]
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    businessPartnerService = TestBed.inject(BusinessPartnerService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  /// HeroService method tests begin ///

  describe('#lookup', () => {
    let expectedBusinessPartner: BusinessPartner;

    beforeEach(() => {
      businessPartnerService = TestBed.inject(BusinessPartnerService);
      expectedBusinessPartner = 
        { id: 1, name: 'UBS' } as BusinessPartner;
    });

    it('should return expected heroes (called once)', () => {
      const key: string = 'UBS';
      const keyType: string = 'bp_our';
      businessPartnerService.lookup(key, keyType).subscribe(
        businessPartner => expect(businessPartner).toEqual(expectedBusinessPartner, 'should return expected business partner'),
        fail
      );

      // HeroService should have made one request to GET heroes from expected URL
      const req = httpTestingController.expectOne(businessPartnerService.businessPartnerUrl);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock heroes
      req.flush(expectedBusinessPartner);
    });

    it('should be OK returning no business partner', () => {
      const key: string = 'gugus';
      const keyType: string = 'bp_our';
      businessPartnerService.lookup(key, keyType).subscribe(
        businessPartner => expect(businessPartner).toEqual(null, 'should have empty result'),
        fail
      );

      const req = httpTestingController.expectOne(businessPartnerService.businessPartnerUrl);
      req.flush([]); // Respond with no heroes
    });

    // This service reports the error but finds a way to let the app keep going.
    it('should turn 404 into an empty heroes result', () => {
      const key: string = 'gugus';
      const keyType: string = 'bp_our';

      businessPartnerService.lookup(key, keyType).subscribe(
        businessPartner => expect(businessPartner).toEqual(null, 'should return empty result'),
        fail
      );

      const req = httpTestingController.expectOne(businessPartnerService.businessPartnerUrl);

      // respond with a 404 and the error message in the body
      const msg = 'deliberate 404 error';
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });

    
  // TODO: test other BusinessPartnerService methods
});

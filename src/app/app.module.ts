import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeDECH from '@angular/common/locales/de-CH';
import { LOCALE_ID } from '@angular/core';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemBusinessPartnerService } from './in-mem-business-partner.service';
import { environment } from '../environments/environment';

registerLocaleData(localeDECH);

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { OrderInfoComponent } from './order-info/order-info.component';
import { ClientInfoComponent } from './client-info/client-info.component';
import { BusinessPartnerListComponent } from './business-partner-list/business-partner-list.component';
import { CartComponent } from './cart/cart.component';
import { CartService } from './cart/cart.service';
import { AssetListComponent } from './asset-list/asset-list.component';
/*
import { BusinessPartnerService } from './business-partner.service';
import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';
*/

@NgModule({
  imports:      [ 
    BrowserModule, 
    HttpClientModule, 
    FormsModule, 
    ReactiveFormsModule, 
    RouterModule.forRoot([
      { path: '', component: AssetListComponent },
      { path: 'cart', component: CartComponent }
    ]), 
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    environment.production ?
    [] : HttpClientInMemoryWebApiModule.forRoot(InMemBusinessPartnerService, { dataEncapsulation: false }) 
    ],
  declarations: [ 
    AppComponent, 
    TopBarComponent, 
    OrderInfoComponent, 
    ClientInfoComponent, 
    BusinessPartnerListComponent, 
    CartComponent, 
    AssetListComponent ],
  bootstrap:    [ AppComponent ],
  providers: [
    { provide: LOCALE_ID, useValue: 'de-CH' }, CartService
  ]
})
export class AppModule { }

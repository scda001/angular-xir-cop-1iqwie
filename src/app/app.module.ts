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
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DemoMaterialModule} from './business-partner-info/material-module';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {APP_BASE_HREF} from '@angular/common';

registerLocaleData(localeDECH);

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { OrderInfoComponent } from './order-info/order-info.component';
import { ClientInfoComponent } from './client-info/client-info.component';
import { CartComponent } from './cart/cart.component';
import { CartService } from './cart/cart.service';
import { AssetListComponent } from './asset-list/asset-list.component';
import { BusinessPartnerInfoComponent } from './business-partner-info/business-partner-info.component';
/*
import { BusinessPartnerService } from './business-partner.service';
import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';
*/

@NgModule({
  imports:      [ 
    BrowserModule, 
    HttpClientModule, 
    DemoMaterialModule,
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
    CartComponent, 
    AssetListComponent, BusinessPartnerInfoComponent 
    ],
  bootstrap:    [ AppComponent ],
  providers: [
    { provide: LOCALE_ID, useValue: 'de-CH' }, 
    { provide: APP_BASE_HREF, useValue : '/' },
    CartService
  ]
})
export class AppModule { }

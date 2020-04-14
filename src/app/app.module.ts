import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeDECH from '@angular/common/locales/de-CH';
import { LOCALE_ID } from '@angular/core';

registerLocaleData(localeDECH);

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { OrderInfoComponent } from './order-info/order-info.component';
import { ClientInfoComponent } from './client-info/client-info.component';
import { BusinessPartnerListComponent } from './business-partner-list/business-partner-list.component';
import { CartComponent } from './cart/cart.component';
import { CartService } from './cart.service';
import { AssetListComponent } from './asset-list/asset-list.component';

@NgModule({
  imports:      [ BrowserModule, HttpClientModule, FormsModule, RouterModule.forRoot([
      { path: '', component: AssetListComponent },
      { path: 'cart', component: CartComponent }
    ]) ],
  declarations: [ AppComponent, TopBarComponent, OrderInfoComponent, ClientInfoComponent, BusinessPartnerListComponent, CartComponent, AssetListComponent ],
  bootstrap:    [ AppComponent ],
  providers: [
    { provide: LOCALE_ID, useValue: 'de-CH' }, CartService
  ]
})
export class AppModule { }

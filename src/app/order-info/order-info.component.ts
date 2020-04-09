import { Component, OnInit } from "@angular/core";
import { OrderType } from "../order-type.enum";
import { environment } from '../../environments/environment';

@Component({
  selector: "app-order-info",
  templateUrl: "./order-info.component.html",
  styleUrls: ["./order-info.component.css"]
})
export class OrderInfoComponent implements OnInit {
  orderType: OrderType;
  trxDate: Date;
  valueDate: Date;

  constructor() {}

  ngOnInit() {
    this.orderType = OrderType.Deposit;
    this.trxDate = new Date();
    this.valueDate = new Date();
  }
}

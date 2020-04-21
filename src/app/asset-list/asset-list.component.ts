import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators
} from "@angular/forms";
import { assets } from "../assets";
import { CartItem } from "../cart/cart-item";
import { CartService } from "../cart/cart.service";

@Component({
  selector: "app-asset-list",
  templateUrl: "./asset-list.component.html",
  styleUrls: ["./asset-list.component.css"]
})
export class AssetListComponent implements OnInit {
  orderForm: FormGroup;
  items: FormArray;
  assets = assets;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit() {
    /*
    this.route.paramMap.subscribe(params => {
      this.asset = assets[+params.get("assetId")];
    });
    */
    this.orderForm = this.formBuilder.group({
      items: this.formBuilder.array([])
    });
    for (let asset of assets) {
      this.addItem(asset);
    }
  }

  addItem(asset): void {
    this.items = this.orderForm.get("items") as FormArray;
    this.items.push(this.createItem(asset));
  }

  addToCart(entry) {
    /* window.alert(quantity.value + "|" + quantity.min + "|" + quantity.max); */
    if (entry.controls.quantity.value != "") {
      var cartItem = new CartItem(entry.controls.quantity.value, entry.controls.asset.value);
      this.cartService.addToCart(cartItem);
      console.log("cartItem added to cart.");
    }
  }

  createItem(asset): FormGroup {
    return this.formBuilder.group({
      asset: asset,
      quantity: new FormControl("", [Validators.pattern("^[1-9][0-9]*$")]),
      message: ""
    });
  }

  onSubmit(order) {
    if (this.orderForm.valid) {
      this.cartService.clearCart();
      for (let entry of order.controls) {
        console.log(entry.controls.quantity.value);
        /* this.addToCart(entry.controls.quantity, assets[1]);*/
        this.addToCart(entry);
      }
    } else {
      window.alert("At least one value in form is invalid!");
    }
    console.warn("Your order has been submitted", order);
  }
}

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
  asset;
  orderForm: FormGroup;
  items: FormArray;

  assets = assets;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.asset = assets[+params.get("assetId")];
    });
    this.orderForm = this.formBuilder.group({
      items: this.formBuilder.array([this.createItem()])
    });
    this.addItem();
  }

  addItem(): void {
    this.items = this.orderForm.get("items") as FormArray;
    this.items.push(this.createItem());
  }

  addToCart(quantity, asset) {
    /* window.alert(quantity.value + "|" + quantity.min + "|" + quantity.max); */
    if (quantity.value != null) {
      var cartItem = new CartItem(quantity.value, asset);
      this.cartService.addToCart(cartItem);
      console.log("cartItem added to cart.");
    } else {
      window.alert(
        "This quantity is invalid: " + asset.name + ": " + quantity.value
      );
    }
    /* window.alert("Your asset has been added to the cart!") */
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      quantity: new FormControl("", [Validators.pattern("^[1-9][0-9]*$")]),
      message: ''
    });
  }

  onSubmit(customerData) {
    if (this.orderForm.valid) {
      for (let entry of customerData.controls) {
        console.log(entry.controls.quantity.value);
        this.addToCart(entry.controls.quantity, assets[1]);
      }
    } else {
      window.alert("At least one value in form is invalid!")
    }
    console.warn("Your order has been submitted", customerData);
  }
}

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder } from "@angular/forms";
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
  assets = assets;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
  /*  private formBuilder: FormBuilder */
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.asset = assets[+params.get("assetId")];
    });
  }
  addToCart(quantity, asset) {
    /* window.alert(quantity.value + "|" + quantity.min + "|" + quantity.max); */
    if (quantity.checkValidity() && quantity.value != "") {
      var cartItem = new CartItem(quantity.value, asset);
      this.cartService.addToCart(cartItem);
      console.log("cartItem added to cart.");
    } else {
      window.alert("This quantity is invalid: " + asset.name + ": " + quantity.value);
    }
    /* window.alert("Your asset has been added to the cart!") */
  }
}

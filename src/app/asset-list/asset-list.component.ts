import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import { assets } from "../assets";
import { CartService } from "../cart.service";
import { CartItem } from "../cart-item";

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
    if (quantity > 0) {
      var cartItem = new CartItem(quantity, asset);
      this.cartService.addToCart(cartItem);
    }
    /* window.alert("Your asset has been added to the cart!") */
  }
}

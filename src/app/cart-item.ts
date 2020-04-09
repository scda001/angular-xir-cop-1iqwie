export class CartItem {
  quantity: number;
  asset;
  constructor(quantity:number, asset) {
    this.quantity = quantity;
    this.asset = asset;
  }

  getValue() {
    return this.quantity * this.asset.value;
  }
}
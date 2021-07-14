import { Product } from "./product";

export class CartItem extends Product {
  quantity: number;  
  constructor() {
    super()
    this.quantity = 1
  }
}

export class CartListItem extends CartItem {
  total: number;  
  constructor() {
    super()
    this.total = this.price * this.quantity
  }

}

export interface ItemsTotal {
  quantity:number;
  total:number;
  cart:CartListItem[];
}
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem, CartListItem, ItemsTotal } from '../models/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartListItem[] = []
  itemsTotal: ItemsTotal = {quantity:0,total:0, cart: this.cartItems}
  private _quantityService = new BehaviorSubject<ItemsTotal>(this.itemsTotal)
  quantityService$ = this._quantityService.asObservable()

  constructor() { }

  getCart(){
    return this.itemsTotal
  }
  updateTotal() {
    const total = Math.round(this.cartItems.reduce((acc, item) => acc += item.total, 0) * 100) / 100
    const quantity = this.cartItems.reduce((acc, item) => acc += item.quantity, 0)
    const cart =  [...this.cartItems]
    this.itemsTotal = {total,quantity,cart}
    this._quantityService.next(this.itemsTotal)
  }

  addToCart(product: CartItem) {
    const indexProduct = this.cartItems.findIndex(p => p.id === product.id)
    if (indexProduct !== -1) {
      this.cartItems[indexProduct].quantity += product.quantity
      const total = this.cartItems[indexProduct].price * this.cartItems[indexProduct].quantity
      this.cartItems[indexProduct].total = total
    } else {
      const total = product.price * product.quantity
      const newProduct: CartListItem = { ...product, total }
      this.cartItems = [...this.cartItems, newProduct]
    }
    this.updateTotal()
    return this.cartItems
  }

  upQuantity(id: number) {
    const indexProduct = this.cartItems.findIndex(p => p.id === id)
    this.cartItems[indexProduct].quantity += 1
    this.cartItems[indexProduct].total += this.cartItems[indexProduct].price
    this.updateTotal()
    return this.cartItems
  }

  downQuantity(id: number) {
    const indexProduct = this.cartItems.findIndex(p => p.id === id)
    if (this.cartItems[indexProduct].quantity > 1) {
      this.cartItems[indexProduct].quantity -= 1
      this.cartItems[indexProduct].total -= this.cartItems[indexProduct].price
      this.updateTotal()
    }
    return this.cartItems
  }

  deleteFromCart(id: number) {
    this.cartItems = this.cartItems.filter(p => p.id !== id)
    this.updateTotal()
    return this.cartItems
  }

  clearCart() {
    this.cartItems = []
    this.updateTotal()
    return this.cartItems
  }
}

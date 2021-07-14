import { Component, OnInit } from '@angular/core';
import { CartListItem } from 'src/app/models/cartItem';
import { CartService } from 'src/app/service/cart.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css','../../app.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart: CartListItem[] = []
  quantity: number = 0
  total:number = 0
  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.cartService.quantityService$.subscribe((itemsTotal) => {
    this.quantity = itemsTotal.quantity
    this.total = itemsTotal.total
    this.cart = itemsTotal.cart
    })
  }

  upQuantity(id:number):void{
    this.cartService.upQuantity(id)
  }
  
  downQuantity(id:number):void{
    this.cartService.downQuantity(id) 
  }

  deleteFromCart(id:number){
    this.cartService.deleteFromCart(id)
  }

  onCheckoutHandler(){
    if (this.cart.length > 0) {
      this.router.navigateByUrl('/checkout')
    }
  }
}

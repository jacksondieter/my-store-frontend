import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css','../../app.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product:Product
  @Output() addCart: EventEmitter<CartItem> =  new EventEmitter()
  constructor(private cartService: CartService) { 
    this.product = new Product()
  }

  ngOnInit(): void {
  }

  addCartHandler(){
    const cartItem = {...this.product, quantity:1}
    this.addCart.emit(cartItem)
  }
}

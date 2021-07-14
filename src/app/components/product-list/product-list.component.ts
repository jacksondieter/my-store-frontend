import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/service/cart.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css', '../../app.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = []
  constructor(private httpService: HttpService, private cartService: CartService) { }

  ngOnInit(): void {
    this.httpService.getProducts()
      .subscribe((data) => {
        this.products = data
      })
  }

  addCardHandler(cartItem: CartItem){
    this.cartService.addToCart(cartItem)
  }

}

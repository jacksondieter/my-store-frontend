import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cartItems: number = 0
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.quantityService$
      .subscribe(items => this.cartItems = items.quantity)
  }
}

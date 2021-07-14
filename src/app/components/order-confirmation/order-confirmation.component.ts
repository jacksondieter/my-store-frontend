import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {
  msg: string = ''
  status:string = ''
  constructor(private order: OrderService, private route: ActivatedRoute, private router: Router, private cart: CartService) { }

  ngOnInit(): void {
    const name = this.order.getOrder().fullname
    this.status = this.route.snapshot.params.status
    if (this.status === 'success') {
      this.msg = `Mr/Mrs ${name}, your order was succefully processed `
    } else {
      this.msg = `Mr/Mrs ${name}, your order failed.`
    }
  }

  onCloseHandler(){
    if (this.status === 'success') {
      this.cart.clearCart()
      this.router.navigateByUrl('/')
    } else {
      this.router.navigateByUrl('/checkout')
    }
  }
}

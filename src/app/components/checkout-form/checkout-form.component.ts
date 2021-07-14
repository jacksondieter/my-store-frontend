import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css','../../app.component.css']
})
export class CheckoutFormComponent implements OnInit {
  fullname: string = ''
  email: string = ''
  cc: number  = 0
  adresse: string = ''
  constructor(private router: Router, private order: OrderService, private cart: CartService) { }

  ngOnInit(): void {
    const {fullname,email,cc,adresse} = this.order.getOrder()
    this.fullname = fullname
    this.email = email
    this.cc = cc
    this.adresse = adresse
  }

  onSubmitHandler() {
    const costumer = {
      fullname: this.fullname,
      email: this.email,
      cc: this.cc,
      adresse: this.adresse
    }
    const cart = this.cart.getCart()
    const success = this.order.createOrder({...costumer, ...cart})
    if(success){
      this.router.navigateByUrl('/confirmation/success')
    }else{
      this.router.navigateByUrl('/confirmation/fail')
    }
    
  }
}

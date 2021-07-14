import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  order: Order = {
    fullname: '',
    email: '',
    cc: 0,
    adresse: '', 
    quantity: 0, 
    total: 0, 
    cart: []
  }

  constructor() { }

  getOrder(){
    return this.order
  }

  createOrder(order: Order): boolean{
    this.order = order
    return true
  }

}

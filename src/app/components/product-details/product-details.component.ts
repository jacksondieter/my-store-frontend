import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/service/cart.service';
import { HttpService } from 'src/app/service/http.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css','../../app.component.css']
})
export class ProductDetailsComponent implements OnInit {
  id: number = 1
  product: Product = new Product()
  quantity:number = 1
  constructor(private route: ActivatedRoute, private http: HttpService, private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap(params => {
          this.id = +params.id
          return this.http.getProduct(this.id)}))
      .subscribe(data => {this.product = data})
  }

  upQuantity():void{
    this.quantity +=1
  }

  downQuantity():void{
    if(this.quantity > 1){
      this.quantity -=1
    } 
  }

  addCart(){
    const cartItem = {...this.product, quantity:this.quantity}
    this.cartService.addToCart(cartItem)
  }

  onCloseHandler(){
    this.router.navigateByUrl('/')
  }
}

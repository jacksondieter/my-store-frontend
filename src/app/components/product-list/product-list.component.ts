import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: [] = []
  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.getProducts()
      .subscribe((data) => {
        this.products = data
        console.log(this.products)
      })
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>('assets/data.json')
  }

  getProduct(id:number): Observable<Product>{
    return this.getProducts()
      .pipe(map((prod) => prod.filter((p) => p.id === id)[0]))
  }

}

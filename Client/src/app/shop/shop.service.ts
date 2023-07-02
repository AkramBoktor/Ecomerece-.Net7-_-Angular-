import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Pagination } from '../shared/Models/pagination';
import { IProduct } from '../shared/Models/products';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
 baseUrl = 'https://localhost:5001/api/';

  constructor(private http:HttpClient) { }

  getProducts(){
    return this.http.get<Pagination<IProduct[]>>(this.baseUrl + 'products');
  }
}

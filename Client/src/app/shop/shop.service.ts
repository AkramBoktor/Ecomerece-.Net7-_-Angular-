import { HttpClient } from '@angular/common/http';
import { Pagination } from '../shared/Models/pagination';
import { IProduct } from '../shared/Models/products';
import { Brand } from '../shared/Models/brand';
import { Type } from '../shared/Models/type';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
 baseUrl = 'https://localhost:5001/api/';

  constructor(private http:HttpClient) { }

  getProducts(){
    return this.http.get<Pagination<IProduct[]>>(this.baseUrl + 'products?pageSize=50');
  }

  getBrands(){
    return this.http.get<Brand[]>(this.baseUrl + 'products/brands');
  }

  getTypes(){
    return this.http.get<Type[]>(this.baseUrl + 'products/types');
  }
}

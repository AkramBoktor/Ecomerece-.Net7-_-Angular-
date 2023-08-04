import { HttpClient, HttpParams } from '@angular/common/http';
import { Pagination } from '../shared/Models/pagination';
import { IProduct } from '../shared/Models/products';
import { Brand } from '../shared/Models/brand';
import { Type } from '../shared/Models/type';
import { Injectable } from '@angular/core';
import { ShopParams } from '../shared/Models/shopParams';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
 baseUrl = environment.apiUrl;;

  constructor(private http:HttpClient) { }

  getProducts(shopParams: ShopParams){
    let params = new HttpParams();
    if(shopParams.brandId > 0) params = params.append('brandId',shopParams.brandId);
    if(shopParams.typeId > 0) params = params.append('typeId',shopParams.typeId);
    params = params.append('sort',shopParams.sort);
    params = params.append('pageIndex',shopParams.pageNumber);
    params = params.append('pageSize',shopParams.pageSize);
    if(shopParams.search) params = params.append('search',shopParams.search);

    return this.http.get<Pagination<IProduct[]>>(this.baseUrl + 'products',{params});
  }

  getBrands(){
    return this.http.get<Brand[]>(this.baseUrl + 'products/brands');
  }

  getTypes(){
    return this.http.get<Type[]>(this.baseUrl + 'products/types');
  }

  getProductDetails(id:number){

    return this.http.get<IProduct>(this.baseUrl + 'products/' + id);

  }
}

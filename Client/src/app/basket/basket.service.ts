import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Basket, IBasketItem, IBasket } from '../shared/Models/basket';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../shared/Models/products';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
 
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<Basket>(null!);
  basketSource$ = this.basketSource.asObservable();
  
  constructor(private httpClient:HttpClient) { }

  getBasket(id:string){
    return this.httpClient.get<Basket>(this.baseUrl+'basket?id='+ id).subscribe({
      next: basket => this.basketSource.next(basket)
    })
  }

  SetBasket(basket:Basket){
    return this.httpClient.post<Basket>(this.baseUrl+'basket',basket).subscribe({
      next: basket => this.basketSource.next(basket)
    })
  }

  getCurrentBasketValue(){
    return this.basketSource.value;
  }

  addItemToBasket(item: IProduct , quantity = 1){
    //map product to basket
    const itemToAdd = this.mapProductItemToBasketItem(item);
    const basket = this.getCurrentBasketValue() ?? this.createBasket() ;
    basket.items = this.addOrUpdateItem(basket.items,itemToAdd,quantity);
    this.SetBasket(basket);
  }

  private addOrUpdateItem(items: IBasketItem[], itemToAdd:IBasketItem, quantity:number):IBasketItem[]{
    const item = items.find(x=>x.id=== itemToAdd.id)
    //if we have the item and increase quntity
    if(item){ item.quantity+=quantity;}
    else{
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }
    return items;
  }
  //new basket add the basket id in local storage
  private createBasket(): Basket {
     const basket = new Basket();
    localStorage.setItem('basket_id',basket.id);
    return basket;
  }
  private mapProductItemToBasketItem(item: IProduct): IBasketItem {
return {
    id: item.id,
    productName: item.name,
    price: item.price,
    quantity: 0,
    pictureUrl: item.pictureUrl,
    brand: item.productBrand,
    type: item.productType
     }
  }
}

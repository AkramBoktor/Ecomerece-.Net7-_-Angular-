import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Basket, IBasketItem, BasketTotals, IBasket } from '../shared/Models/basket';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../shared/Models/products';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  

  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<Basket | null>(null!);
  basketSource$ = this.basketSource.asObservable();

  private basketTotalSource = new BehaviorSubject<BasketTotals | null>(null!);
  basketTotalSource$ = this.basketTotalSource.asObservable();

  constructor(private httpClient: HttpClient) { }

  getBasket(id: string) {
    return this.httpClient.get<Basket>(this.baseUrl + 'basket?id=' + id).subscribe({
      next: basket => {
        this.basketSource.next(basket);
        this.calculateTotals();

      }
    })
  }

  SetBasket(basket: Basket) {
    return this.httpClient.post<Basket>(this.baseUrl + 'basket', basket).subscribe({
      next: basket => {
        this.basketSource.next(basket);
        this.calculateTotals();
      }
    })
  }

  getCurrentBasketValue(){
    return this.basketSource.value;
  }

  addItemToBasket(item: IProduct | IBasketItem, quantity = 1) {
    if (this.isProduct(item)) item = this.mapProductItemToBasketItem(item);
    //map product to basket
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, item, quantity);
    this.SetBasket(basket);
  }

  removeItemFromBasket(id: number, quantity = 1) {
    const basket = this.getCurrentBasketValue();
    if (!basket) return;
    const item = basket.items.find((x:any)=>x.id === id);
    if (item) {
      //decrease quantity
      item.quantity -= quantity;
      //if quantity == 0 remove item from basket local storage  
      if (item.quantity === 0) {
        basket.items = basket.items.filter(x=>x.id !== id);
      }
      if (basket.items.length > 0) {
        this.SetBasket(basket);
      }
      //no items will deletebasket and local storage
      else {
        this.deleteBasket(basket);
      }
    }
  }
  deleteBasket(basket: IBasket){
   return this.httpClient.delete(this.baseUrl + 'basket?id=' + basket.id).subscribe({
     next:()=>{
      this.basketSource.next(null);
      this.basketTotalSource.next(null);
       localStorage.removeItem('basket_id');
     }
   })
  }

  private addOrUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
    const item = items.find(x => x.id === itemToAdd.id)
    //if we have the item and increase quntity
    if (item) { item.quantity += quantity; }
    else {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }
    return items;
  }
  //new basket add the basket id in local storage
  private createBasket(): Basket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
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

  private calculateTotals() {
    const basket = this.getCurrentBasketValue();
    if (!basket) return;
    const shipping = 0;
    const subTotal = basket.items.reduce((a, b) => (b.price * b.quantity) + a, 0);
    const total = shipping + subTotal;
    this.basketTotalSource.next({ shipping, total, subTotal });
  }

  private isProduct(item: IProduct | IBasketItem): item is IProduct {
    return (item as IProduct).productBrand !== undefined;
  }
}

import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../shared/Models/products';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from '../../basket/basket.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent  implements OnInit{
  product? : IProduct
  quantityInBasket = 1;
  quantity = 1 ;

  constructor(private shopService:ShopService , private route: ActivatedRoute,
              private breadcrumbService: BreadcrumbService, private basketService: BasketService){
                // make it's empty to prevent show id before the name
       this.breadcrumbService.set('@ProductDetails', ' ');  
  }
  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(){
      let id =  this.route.snapshot.paramMap.get('id');
      if(id!=null) this.shopService.getProductDetails(+id).subscribe({
        next: response =>{ 
          this.product = response, //what to do next
          this.breadcrumbService.set('@ProductDetails', this.product?.name);
          this.basketService.basketSource$.pipe(take(1)).subscribe({
            next: basket=>{
              const item = basket?.items.find(x=>x.id === +id);
              if(item){
                  this.quantity = item.quantity;
                  this.quantityInBasket = item.quantity;
              }
            }
          })
        },
      error: (error:any) => console.log(error), // what to do when ther is an error
      complete:()=>{ 
      console.log('requested Completed');
            }
        })
}


incrementQuantity() {
  this.quantity++;
}

decrementQuantity() {
  this.quantity--;
}

updateBasket() {
  if(this.product){
    if(this.quantity> this.quantityInBasket){
      const itemToAdd = this.quantity - this.quantityInBasket;
      this.quantityInBasket += itemToAdd;
      this.basketService.addItemToBasket(this.product , itemToAdd);
    }else{
      const itemToRemove = this.quantityInBasket - this.quantity;
      this.quantityInBasket-= itemToRemove;
      this.basketService.removeItemFromBasket(this.product.id,itemToRemove);
    }
  }
}

get buttonText(){
  return this.quantityInBasket === 0 ? 'Add to basket':'Update to basket';
}
}

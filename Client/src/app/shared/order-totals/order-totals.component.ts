import { Component } from '@angular/core';
import { BasketService } from '../../basket/basket.service';
import { async } from '../../../../node_modules/@angular/core/testing';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.scss']
})
export class OrderTotalsComponent {
constructor(public basketService:BasketService){
  console.log(basketService.basketTotalSource$)
}
}

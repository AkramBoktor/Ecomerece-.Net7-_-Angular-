import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../shared/Models/products';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent  implements OnInit{
  product? : IProduct
  
  constructor(private shopService:ShopService , private route: ActivatedRoute,
              private breadcrumbService: BreadcrumbService){

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
  },
error: (error:any) => console.log(error), // what to do when ther is an error
complete:()=>{ 
console.log('requested Completed');
}
})
}

}

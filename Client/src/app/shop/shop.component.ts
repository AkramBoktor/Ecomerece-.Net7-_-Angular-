import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/Models/products';
import { ShopService } from './shop.service';
import { Brand } from '../shared/Models/brand';
import { Type } from '../shared/Models/type';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit{
  products:IProduct[] =[];
  brands:Brand[]=[] ;
  types:Type[]=[] ;
  brandIdSelected = 0 ;
  typeIdSelected = 0 ;

  constructor(private ShopService: ShopService) {}
  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts(){
    this.ShopService.getProducts(this.brandIdSelected , this.typeIdSelected ).subscribe({
      next: response => this.products = response.data, //what to do next
      error: (error:any) => console.log(error), // what to do when ther is an error
      complete:()=>{ 
        console.log('requested Completed');
      }
    });
  }

  getBrands(){
    this.ShopService.getBrands().subscribe({
      next: response => this.brands = [{id:0 , name:'All'}, ...response], //what to do next id =0 for nonselect any item and get all
      error: (error:any) => console.log(error), // what to do when ther is an error
      complete:()=>{ 
        console.log('requested Completed');
      }
    });
  }

  getTypes(){
    this.ShopService.getTypes().subscribe({
      next: response => this.types = [{id:0 , name:'All'}, ...response], //what to do next id =0 for nonselect any item and get all
      error: (error:any) => console.log(error), // what to do when ther is an error
      complete:()=>{ 
        console.log('requested Completed');
      }
    });
  }

  onBrandSelected(brandId:number){
    this.brandIdSelected = brandId;
    this.getProducts();
  }

  onTypeSelected(typeId:number){
    this.typeIdSelected = typeId;
    this.getProducts();
  }
}

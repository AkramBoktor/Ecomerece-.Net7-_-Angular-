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
  
  constructor(private ShopService: ShopService) {}
  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts(){
    this.ShopService.getProducts().subscribe({
      next: response => this.products = response.data, //what to do next
      error: (error:any) => console.log(error), // what to do when ther is an error
      complete:()=>{ 
        console.log('requested Completed');
      }
    });
  }

  getBrands(){
    this.ShopService.getBrands().subscribe({
      next: response => this.brands = response, //what to do next
      error: (error:any) => console.log(error), // what to do when ther is an error
      complete:()=>{ 
        console.log('requested Completed');
      }
    });
  }

  getTypes(){
    this.ShopService.getTypes().subscribe({
      next: response => this.types = response, //what to do next
      error: (error:any) => console.log(error), // what to do when ther is an error
      complete:()=>{ 
        console.log('requested Completed');
      }
    });
  }
}

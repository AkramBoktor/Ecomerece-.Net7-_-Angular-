import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/Models/products';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit{
  products:IProduct[] =[];
  
  constructor(private ShopService: ShopService) {}
  ngOnInit(): void {

    this.ShopService.getProducts().subscribe({
      next: response => this.products = response.data, //what to do next
      error: (error:any) => console.log(error), // what to do when ther is an error
      complete:()=>{ 
        console.log('requested Completed');
      }
    });
  }
}

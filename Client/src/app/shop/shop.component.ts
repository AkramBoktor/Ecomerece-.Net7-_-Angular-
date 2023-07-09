import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IProduct } from '../shared/Models/products';
import { ShopService } from './shop.service';
import { Brand } from '../shared/Models/brand';
import { Type } from '../shared/Models/type';
import { ShopParams } from '../shared/Models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit{
  @ViewChild('search') searchTerm? : ElementRef
  products:IProduct[] =[];
  brands:Brand[]=[] ;
  types:Type[]=[] ;
  shopParams = new ShopParams();
  sortOptions = [
    {name : 'Alphabetical' , value: 'name'},
    {name : 'Price: Low to high' , value: 'priceAsc'},
    {name : 'Price: High to low' , value: 'priceDesc'},
  ]
 totalCount = 0 ;

  constructor(private ShopService: ShopService) {}
  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts(){
    this.ShopService.getProducts(this.shopParams).subscribe({
      next: response => {
            this.products = response.data;
            this.shopParams.pageSize = response.pageSize;  
            this.shopParams.pageNumber = response.pageIndex;  
            this.totalCount = response.count
      }, //what to do next
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
    this.shopParams.brandId = brandId;
    this.getProducts();
  }

  onTypeSelected(typeId:number){
    this.shopParams.typeId = typeId;
    this.getProducts();
  }

  
  onSortSelected(event:any){
    this.shopParams.sort = event.target.value;
    this.getProducts();
  }

  onPageChange(event:any){
    if(this.shopParams.pageNumber !== event)
    {
      this.shopParams.pageNumber = event;
    }
    this.getProducts();
  }

  onSearch(){
    this.shopParams.search = this.searchTerm?.nativeElement.value;
    this.getProducts();
  }

  onReset() {
    if(this.searchTerm) this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}

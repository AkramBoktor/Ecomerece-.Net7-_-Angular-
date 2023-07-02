import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { response } from '../../node_modules/@types/express';
import { IProduct } from './shared/Models/products';
import { Pagination } from './shared/Models/pagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'E-Commerce';
  products:IProduct[] =[];

  constructor(private http:HttpClient){}

  ngOnInit(): void {
     this.http.get<Pagination<IProduct[]>>('https://localhost:5001/api/products?pageSize=50').subscribe({
       next: response => this.products = response.data, //what to do next
       error: (error:any) => console.log(error), // what to do when ther is an error
       complete:()=>{ 
         console.log('requested Completed');
       }
     });
  }
}

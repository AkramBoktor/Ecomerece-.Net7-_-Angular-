import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { response } from '../../node_modules/@types/express';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'E-Commerce';
  products:any[] =[];

  constructor(private http:HttpClient){}

  ngOnInit(): void {
     this.http.get('https://localhost:5001/api/products').subscribe({
       next: (response:any)=> this.products = response.data, //what to do next
       error: (error:any) => console.log(error), // what to do when ther is an error
       complete:()=>{
         console.log('requested Completed');
       }
     });
  }
}

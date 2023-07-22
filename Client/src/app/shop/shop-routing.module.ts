import { NgModule } from '@angular/core';
import { ShopComponent } from './shop.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { Route, RouterModule } from '@angular/router';

const routes:any =[
  { path:'', component:ShopComponent},
  /* add alias for getting the title of product*/
  { path:':id', component:ProductDetailsComponent ,data: {
            breadcrumb: {
                        alias: 'ProductDetails'
                        }
          }
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }

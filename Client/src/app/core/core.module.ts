import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { ToastrModule } from 'ngx-toastr';
import { SectionHeaderComponent } from './section-header/section-header.component';
import {BreadcrumbModule} from 'xng-breadcrumb';
import { NgxSpinnerModule } from "ngx-spinner";
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    NavBarComponent,
    NotFoundComponent,
    SectionHeaderComponent,
     
  ],
  imports: [
    CommonModule,
    RouterModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    BreadcrumbModule,
    NgxSpinnerModule,
    SharedModule
  ],
  exports:[
    NavBarComponent,
    SectionHeaderComponent,
    NgxSpinnerModule
  ]
})
export class CoreModule { }

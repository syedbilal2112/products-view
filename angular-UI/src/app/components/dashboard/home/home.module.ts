import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home.routes';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { TableModule, MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';

import { HomeListComponent } from './home-lists/home-list.component';
import { HomeComponent } from './home-main/home.component';
import { HomeService } from './home.service';
import { HomeNavComponent } from './home-nav/home-nav.component';
import { SubCategoryComponent } from './subCategory/subCategory.component';
import { ProductsComponent } from './products/products.component';


@NgModule({
  declarations: [
    HomeComponent,
    HomeListComponent,
    HomeNavComponent,
    SubCategoryComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatExpansionModule,
    MDBBootstrapModule.forRoot(),
    NgbModule,
    ModalModule.forRoot()
  ],
  providers: [
    HomeService
  ]
})
export class HomeModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeListComponent } from './home-lists/home-list.component';
import { SubCategoryComponent } from './subCategory/subCategory.component';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home-main/home.component';

const routes: Routes = [];

const homeRoutes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      {
        path: '', component: SubCategoryComponent
      },
      { path: 'addProducts', component: ProductsComponent},
      { path: 'subCategory', component: SubCategoryComponent},
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

export const HomeRoutingModule = RouterModule.forChild(homeRoutes);

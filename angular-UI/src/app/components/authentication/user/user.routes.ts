import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from '../../authentication/user/login/login.component';
import { HomeComponent } from '../../authentication/user/home/home.component';
import { AboutusComponent } from '../../authentication/user/aboutus/aboutus.component';
import { ProductsComponent } from '../../authentication/user/products/products.component';
import { ContactusComponent } from '../../authentication/user/contactus/contactus.component';
import { SubCategoryComponent } from '../../authentication/user/subCategory/subCategory.component';
import { SingleProductComponent } from '../../authentication/user/singleProduct/singleProduct.component';

const userRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'adminLogin', component: LoginComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'contactus', component: ContactusComponent },
  {
    path: 'products', component: ProductsComponent
  },
  {
    path: 'subCategory/:subCategory', component: SubCategoryComponent
  },
  {
    path: 'product/:productId', component: SingleProductComponent
  }
];

export const userRoutingModule: ModuleWithProviders = RouterModule.forChild(userRoutes);

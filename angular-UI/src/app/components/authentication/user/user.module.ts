// import { MaterialDesignElementsModule } from './../../shared/material-design-element/material-design-element.module';
import { ReactiveFormsModule, FormsModule, NgForm, NgModel } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ProductsComponent } from './products/products.component';
import { HomeProductsComponent } from './homeProducts/homeProducts.component';
import { SingleProductComponent } from './singleProduct/singleProduct.component';
import { SubCategoryComponent } from './subCategory/subCategory.component';
import { ContactusComponent } from './contactus/contactus.component';
import { userRoutingModule } from '../../authentication/user/user.routes';
// import { CustomValidatorService } from '../../services/customValidator.service';
import { InputTrimModule } from 'ng2-trim-directive';
import { HomeListComponent } from './home-lists/home-list.component';

@NgModule({
  imports: [
    CommonModule,
    userRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    InputTrimModule
  ],
  declarations: [
    LoginComponent,
    HomeComponent,
    AboutusComponent,
    ProductsComponent,
    HomeListComponent,
    ContactusComponent,
    SingleProductComponent,
    SubCategoryComponent,
    HomeProductsComponent
  ],
  providers: [
    NgForm,
    NgModel,
    // CustomValidatorService
  ]
})
export class UserModule { }

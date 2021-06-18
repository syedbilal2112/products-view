/**
 * homepage module
 */

import {NgModule} from '@angular/core';
import { HomepageService } from '../homepage/homepage.service';
import { HomeService } from '../dashboard/home/home.service'
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router


const routes: Routes = [];

@NgModule({
  providers: [HomepageService, HomeService],
  imports : [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations : []

})
export class HomepageModule {}

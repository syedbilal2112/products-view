import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard.routes';
// import { HomeComponent } from './home/home-main/home.component';
import { PageNotFoundComponent } from './pageNotFound/page-not-found.component';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    // HomeComponent,
    DashboardComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    DashboardService
  ]
})
export class DashboardModule { }

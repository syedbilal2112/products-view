import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomepageComponent } from "./homepage.component";
import { PageNotFoundComponent } from '../dashboard/pageNotFound/page-not-found.component';
import { AuthGuard } from "../../security/auth.guard";

const dashboardRoutes: Routes = [
  {
    path: "homepage",
    component: HomepageComponent
  }
];

export const DashboardRoutingModule = RouterModule.forChild(dashboardRoutes);

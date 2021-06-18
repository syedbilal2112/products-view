import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
// import { HomeComponent } from "./home/home-main/home.component";
import { PageNotFoundComponent } from './pageNotFound/page-not-found.component';
import { DashboardComponent } from "./dashboard.component";
import { AuthGuard } from "../../security/auth.guard";

const dashboardRoutes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      { path: "", component: PageNotFoundComponent },
      {
        path: "home",
        loadChildren:
          "../../components/dashboard/home/home.module#HomeModule"
      }
    ]
  },
  { path: "**", redirectTo: "", pathMatch: "full" }
];

export const DashboardRoutingModule = RouterModule.forChild(dashboardRoutes);

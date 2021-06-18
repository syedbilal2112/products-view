import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const authRoutes: Routes = [
    {
        path: '',
        loadChildren: '../authentication/user/user.module#UserModule'
    }
  ];
  export const AuthRoutingModule: ModuleWithProviders = RouterModule.forChild(authRoutes);

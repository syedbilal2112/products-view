import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from './security/auth.guard';

export const appRoutes: Routes = [
  // { path: 'auth', loadChildren: './components/authentication/authentication.module#AuthenticationModule' },
  // { path: 'homepage', loadChildren: './components/homepage/homepage.module#HomepageModule' },
  { path: 'dashboard', loadChildren: './components/dashboard/dashboard.module#DashboardModule' }
];

export const RoutesModule: ModuleWithProviders = RouterModule.forRoot(appRoutes);

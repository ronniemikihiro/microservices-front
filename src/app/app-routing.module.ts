import { LayoutComponent } from './shared/layout/layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';

const appRoutes: Routes = [
    {
        path: 'auth',
        loadChildren: './modules/auth/auth.module#AuthModule'
    },
    {
        path: 'dashboard',
        loadChildren: './modules/dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'customers',
        loadChildren: './modules/customers/customers.module#CustomersModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'users',
        loadChildren: './modules/users/users.module#UsersModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'products',
        loadChildren: './modules/products/products.module#ProductsModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'account',
        loadChildren: './modules/account/account.module#AccountModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'icons',
        loadChildren: './modules/icons/icons.module#IconsModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'typography',
        loadChildren: './modules/typography/typography.module#TypographyModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'about',
        loadChildren: './modules/about/about.module#AboutModule',
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }

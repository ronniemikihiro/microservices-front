import { LayoutComponent } from './shared/layout/layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { UnauthorizedComponent } from './auth/unauthorized.component';

const appRoutes: Routes = [
    {
        path: 'auth',
        loadChildren: './auth/auth.module#AuthModule'
    },
    {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'customers',
        loadChildren: './customers/customers.module#CustomersModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'users',
        loadChildren: './users/users.module#UsersModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'products',
        loadChildren: './products/products.module#ProductsModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'account',
        loadChildren: './account/account.module#AccountModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'icons',
        loadChildren: './icons/icons.module#IconsModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'typography',
        loadChildren: './typography/typography.module#TypographyModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'about',
        loadChildren: './about/about.module#AboutModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'unauthorized',
        component: LayoutComponent,
        children: [
            {
                path: '',
                component: UnauthorizedComponent
            }
        ]

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

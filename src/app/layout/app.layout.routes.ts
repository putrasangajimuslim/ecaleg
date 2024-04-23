import { Routes } from "@angular/router";

export const LAYOUT_ROUTES: Routes = [
    {
        path: '', loadComponent: () => import('./app.layout.component').then(r => r.AppLayoutComponent),
        children: [
            { path: 'dashboard', loadComponent: () => import('../modules/application/dashboard/dashboard.component').then(r => r.DashboardComponent) },
            { path: 'master', loadChildren: () => import('../modules/application/masters/master.routes').then(r => r.MASTER_ROUTES) },
        ]
    }
]

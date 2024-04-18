import { Routes } from "@angular/router";

export const LAYOUT_ROUTES: Routes = [
    {
        path: '', loadComponent: () => import('./app.layout.component').then(r => r.AppLayoutComponent),
        children: [
            { path: '', loadComponent: () => import('../modules/dashboard/dashboard.component').then(r => r.DashboardComponent) },
        ]
    }
]

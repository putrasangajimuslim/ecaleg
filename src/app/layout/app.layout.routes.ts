import { Routes } from "@angular/router";

export const LAYOUT_ROUTES: Routes = [
    {
        path: '', loadComponent: () => import('./app.layout.component').then(r => r.AppLayoutComponent),
        children: [
            { path: 'dashboard', loadComponent: () => import('../modules/application/dashboard/dashboard.component').then(r => r.DashboardComponent) },
            { path: 'master', loadChildren: () => import('../modules/application/masters/master.routes').then(r => r.MASTER_ROUTES) },
            { path: 'tps', loadChildren: () => import('../modules/application/tps/tps.routes').then(r => r.TPS_ROUTES) },
            { path: 'calon', loadChildren: () => import('../modules/application/calon/calon.routes').then(r => r.CALON_ROUTES) },
            { path: 'tim', loadChildren: () => import('../modules/application/tim/tim.routes').then(r => r.TIM_ROUTES) },
            { path: 'jadwal', loadChildren: () => import('../modules/application/jadwal/jadwal.routes').then(r => r.JADWAL_ROUTES) },
        ]
    }
]

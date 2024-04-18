import { Routes } from '@angular/router';

export const routes: Routes = [
    { 
        path: '', 
        loadChildren: () => import('./layout/app.layout.routes').then(r => r.LAYOUT_ROUTES),
    },
    { path: 'login', loadComponent: () => import('./modules/auth/login//login.component').then(m => m.LoginComponent) },
    { path: 'notfound', loadComponent: () => import('./modules/auth/notfound/notfound.component').then(m => m.NotfoundComponent) },
    { path: '**', redirectTo: '/notfound' },
]

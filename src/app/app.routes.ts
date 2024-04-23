import { Routes } from '@angular/router';
import { AuthGuardService } from './modules/service/auth-guard.service';

export const routes: Routes = [
    { 
        path: '', 
        loadChildren: () => import('./layout/app.layout.routes').then(r => r.LAYOUT_ROUTES), 
        canActivate: [AuthGuardService] 
    },
    { path: 'login', loadComponent: () => import('./modules/auth/login/login.component').then(m => m.LoginComponent) },
]

import { Routes } from '@angular/router';

export const dashboard_routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./pages/dashboard-list/dashboard-list.component').then(
                (r) => r.DashboardListComponent
            ),
    },
];

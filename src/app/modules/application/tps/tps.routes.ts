import { Routes } from "@angular/router";

export const TPS_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./pages/tps-list/tps-list.component').then(
                (r) => r.TpsListComponent
            ),
    },
    {
        path: 'add',
        loadComponent: () =>
            import('./pages/tps-add/tps-add.component').then(
                (r) => r.TpsAddComponent
            ),
    },
    {
        path: 'edit/:id',
        loadComponent: () =>
            import('./pages/tps-edit/tps-edit.component').then(
                (r) => r.TpsEditComponent
            ),
    }
]
import { Routes } from "@angular/router";

export const CALON_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./pages/calon-list/calon-list.component').then(
                (r) => r.CalonListComponent
            ),
    },
    {
        path: 'add',
        loadComponent: () =>
            import('./pages/calon-add/calon-add.component').then(
                (r) => r.CalonAddComponent
            ),
    },
    {
        path: 'edit/:id',
        loadComponent: () =>
            import('./pages/calon-list/calon-list.component').then(
                (r) => r.CalonListComponent
            ),
    }
]
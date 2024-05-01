import { Routes } from "@angular/router";

export const PANITIA_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./panitia-list/panitia-list.component').then(
                (r) => r.PanitiaListComponent
            ),
    },
    {
        path: 'add',
        loadComponent: () =>
            import('./panitia-add/panitia-add.component').then(
                (r) => r.PanitiaAddComponent
            ),
    },
    {
        path: 'edit/:id',
        loadComponent: () =>
            import('./panitia-edit/panitia-edit.component').then(
                (r) => r.PanitiaEditComponent
            ),
    }
]
import { Routes } from '@angular/router';

export const kabupaten_routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./pages/kabupaten-list/kabupaten-list.component').then(
                (r) => r.KabupatenListComponent
            ),
    },
    {
        path: 'add',
        loadComponent: () =>
            import('./pages/kabupaten-add/kabupaten-add.component').then(
                (r) => r.KabupatenAddComponent
            ),
    },
    {
        path: 'edit/:id',
        loadComponent: () =>
            import('./pages/kabupaten-edit/kabupaten-edit.component').then(
                (r) => r.KabupatenEditComponent
            ),
    },
];

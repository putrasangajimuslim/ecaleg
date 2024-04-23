import { Routes } from '@angular/router';

export const kecamatan_routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./pages/kecamatan-list/kecamatan-list.component').then(
                (r) => r.KecamatanListComponent
            ),
    },
    {
        path: 'add',
        loadComponent: () =>
            import('./pages/kecamatan-add/kecamatan-add.component').then(
                (r) => r.KecamatanAddComponent
            ),
    },
    {
        path: 'edit/:id',
        loadComponent: () =>
            import('./pages/kecamatan-edit/kecamatan-edit.component').then(
                (r) => r.KecamatanEditComponent
            ),
    },
];

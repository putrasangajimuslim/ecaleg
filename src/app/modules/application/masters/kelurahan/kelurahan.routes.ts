import { Routes } from '@angular/router';

export const kelurahan_routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./pages/kelurahan-list/kelurahan-list.component').then(
                (r) => r.KelurahanListComponent
            ),
    },
    {
        path: 'add',
        loadComponent: () =>
            import('./pages/kelurahan-add/kelurahan-add.component').then(
                (r) => r.KelurahanAddComponent
            ),
    },
    {
        path: 'edit/:id',
        loadComponent: () =>
            import('./pages/kelurahan-edit/kelurahan-edit.component').then(
                (r) => r.KelurahanEditComponent
            ),
    },
];

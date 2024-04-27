import { Routes } from '@angular/router';

export const saksi_routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./saksi-list/saksi-list.component').then(
                (r) => r.SaksiListComponent
            ),
    },
    {
        path: 'add',
        loadComponent: () =>
            import('./saksi-add/saksi-add.component').then(
                (r) => r.SaksiAddComponent
            ),
    },
    {
        path: 'edit/:id',
        loadComponent: () =>
            import('./saksi-edit/saksi-edit.component').then(
                (r) => r.SaksiEditComponent
            ),
    },
];

import { Routes } from '@angular/router';

export const partai_routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./pages/partai-list/partai-list.component').then(
                (r) => r.PartaiListComponent
            ),
    },
    {
        path: 'add',
        loadComponent: () =>
            import('./pages/partai-add/partai-add.component').then(
                (r) => r.PartaiAddComponent
            ),
    },
    {
        path: 'edit/:id',
        loadComponent: () =>
            import('./pages/partai-edit/partai-edit.component').then(
                (r) => r.PartaiEditComponent
            ),
    },
];

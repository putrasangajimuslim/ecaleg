import { Routes } from '@angular/router';

export const pemenangan_routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./tim-pemenangan-list/tim-pemenangan-list.component').then(
                (r) => r.TimPemenanganListComponent
            ),
    },
    {
        path: 'add',
        loadComponent: () =>
            import('./tim-pemenangan-add/tim-pemenangan-add.component').then(
                (r) => r.TimPemenanganAddComponent
            ),
    },
    {
        path: 'edit/:id',
        loadComponent: () =>
            import('./tim-pemenangan-edit/tim-pemenangan-edit.component').then(
                (r) => r.TimPemenanganEditComponent
            ),
    },
];

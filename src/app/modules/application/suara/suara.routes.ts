import { Routes } from "@angular/router";

export const SUARA_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./pages/suara-list/suara-list.component').then(
                (r) => r.SuaraListComponent
            ),
    },
    {
        path: 'add',
        loadComponent: () =>
            import('./pages/suara-add/suara-add.component').then(
                (r) => r.SuaraAddComponent
            ),
    },
    {
        path: ':id',
        children: [
            {
                path: 'detail',
                loadComponent: () =>
                    import('./pages/suara-detail/suara-detail.component').then(
                        (r) => r.SuaraDetailComponent
                    ),
            },
            {
                path: 'edit',
                loadComponent: () =>
                    import('./pages/suara-edit/suara-edit.component').then(
                        (r) => r.SuaraEditComponent
                    ),
            }
        ]
    }
]
import { Routes } from "@angular/router";

export const ABSEN_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./pages/absen-list/absen-list.component').then(
                (r) => r.AbsenListComponent
            ),
    },
]
import { Routes } from "@angular/router";

export const JADWAL_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./pages/jadwal-list/jadwal-list.component').then(
                (r) => r.JadwalListComponent
            ),
    },
    {
        path: 'add',
        loadComponent: () =>
            import('./pages/jadwal-add/jadwal-add.component').then(
                (r) => r.JadwalAddComponent
            ),
    },
    {
        path: 'edit/:id',
        loadComponent: () =>
            import('./pages/jadwal-edit/jadwal-edit.component').then(
                (r) => r.JadwalEditComponent
            ),
    }
]
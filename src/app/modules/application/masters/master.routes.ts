import { Routes } from "@angular/router";

export const MASTER_ROUTES: Routes = [
    {
        path: '',
        children: [
            {
                path: 'kabupaten',
                data: { 
                    breadcrumb: 'Kabupaten Management' 
                },
                loadChildren: () => import('./kabupaten/kabupaten.routes').then(r => r.kabupaten_routes)
            },

            {
                path: 'kecamatan',
                data: { 
                    breadcrumb: 'Kecamatan Management' 
                },
                loadChildren: () => import('./kecamatan/kecamatan.routes').then(r => r.kecamatan_routes)
            },

            {
                path: 'kelurahan',
                data: { 
                    breadcrumb: 'Kelurahan Management' 
                },
                loadChildren: () => import('./kelurahan/kelurahan.routes').then(r => r.kelurahan_routes)
            },

            {
                path: 'partai',
                data: { 
                    breadcrumb: 'Partai Management' 
                },
                loadChildren: () => import('./partai/partai.routes').then(r => r.partai_routes)
            },
        ]
    }
]
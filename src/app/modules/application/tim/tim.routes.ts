import { Routes } from "@angular/router";

export const TIM_ROUTES: Routes = [
    {
        path: '',
        children: [
            {
                path: 'saksi',
                data: { 
                    breadcrumb: 'Saksi Management' 
                },
                loadChildren: () => import('./pages/saksi/saksi.routes').then(r => r.saksi_routes)
            },

            {
                path: 'tim-pemenangan',
                data: { 
                    breadcrumb: 'Kecamatan Management' 
                },
                loadChildren: () => import('./pages/tim-pemenangan/tim-pemenangan.routes').then(r => r.pemenangan_routes)
            },
        ]
    }
]
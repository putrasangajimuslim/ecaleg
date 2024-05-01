import { Routes } from "@angular/router";

export const TIM_ROUTES: Routes = [
    {
        path: '',
        children: [
            {
                path: 'panitia',
                data: { 
                    breadcrumb: 'Saksi Management' 
                },
                loadChildren: () => import('./pages/panitia/panitia.routes').then(r => r.PANITIA_ROUTES)
            },
        ]
    }
]
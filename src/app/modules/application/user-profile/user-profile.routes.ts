import { Routes } from "@angular/router";

export const USER_PROFILE_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./pages/user-profile/user-profile.component').then(
                (r) => r.UserProfileComponent
            ),
    },
]
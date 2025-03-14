import { Routes } from "@angular/router";

export const PHOTOS_ROUTES: Routes = [
    {
        path: ':photo_id', loadComponent: () => import('./photo-detail/photo-detail.component')
            .then(m => m.PhotoDetailComponent)
    }
]
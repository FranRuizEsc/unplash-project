import { Routes } from "@angular/router";

export const COLLECTION_ROUTES: Routes = [
    {
        path: ':collectionId',
        loadComponent: () => import('./collection-deatils/collection-details.component')
            .then(m => m.CollectionDetailsComponent)
    }
]